import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import * as amqp from 'amqplib';
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { JWTDATA } from '../../common';

@WebSocketGateway(13005, { namespace: "repairs" })
export class MtrRepairsSocket implements OnGatewayInit {
    @WebSocketServer() server: Server;
    connection: amqp.Connection
    channels: amqp.Channel
    config: ConfigService
    connectSum = 0
    jwtData: JWTDATA

    // 初始连接
    async handleConnection(client: Socket) {
        // 客户端连接事件
        console.log('客户端连接id ： ' + client.id);
        const token = client.handshake.headers.authorization
        if (!token) {
            console.log('未携带token连接')
            client.disconnect();
            return
        }
        const userData = await this.authentication(token)
        if (!userData) {
            console.log('身份验证错误或过期')
            client.disconnect();
            return
        }
        // 添加当前连接人数
        this.connectSum++
        if (this.connectSum === 1) {
            console.log('再一次有人访问开启')
        }
    }

    // 断开连接
    handleDisconnect(client: Socket) {
        // 客户端断开连接事件
        console.log('断开id: ' + client.id);
        // 记录是否还有消费者在内
        this.connectSum--
        if (this.connectSum <= 0) {
            console.log('无人访问关闭')
            this.connectSum = 0
        }
    }

    async afterInit(server: Server) {
        // WebSocket服务器初始化事件
        console.log('socket用户初始化');
        // rabbitMQ服务初始化
        this.config = new ConfigService()
        const mqOptions = {
            protocol: this.config.get('RabbitMQ_protocol'),
            username: this.config.get('RabbitMQ_username'),
            password: this.config.get('RabbitMQ_password'),
            hostname: this.config.get('RabbitMQ_hostname'),
            port: this.config.get('RabbitMQ_port'),
            vhost: this.config.get('RabbitMQ_vhost')
        }
        try {
            this.connection = await amqp.connect(mqOptions);
            this.channels = await this.connection.createChannel();
            console.log("RabbitMQ连接建立成功");
        } catch (error) {
            console.log("RabbitMQ连接错误");
            console.error(error)
        }
        // JWT初始化配置
        // 配置option
        const options: JwtModuleOptions = {
            secret: this.config.get('JWT_ENC'),
            signOptions: { expiresIn: this.config.get('JWT_TIME') }
        }
        this.jwtData = new JWTDATA(new JwtService(options))
        // MQ消费者监听
        try {
            // 检测是否存在此队列，存在不进行操作，不存在则进行持久化创建
            await this.channels.assertQueue(this.config.get('RabbitMQ_socketQueueName'), { durable: true })
            // 队列监听
            await this.channels.consume(this.config.get('RabbitMQ_socketQueueName'), (msg) => {
                // 当有传递1时
                if (msg.content.toString() === "1") {
                    this.channels.ack(msg)
                    // 使用socket发送true
                    if (this.connectSum > 0) {
                        this.server.emit('message', true)
                    }
                }
            })
        } catch (error) {
            console.log("RabbitMQ消费者接收错误")
            console.error(error)
        }
    }

    // // 接收消息
    // @SubscribeMessage('rapairSocket')
    // handleMessage(client: Server, payload: any): void {
    //     this.server.emit('rapairSocket', payload);
    // }

    // 身份验证
    async authentication(token: string) {
        try {
            return await this.jwtData.getJWT(token)
        } catch (error) {
        }
    }
}