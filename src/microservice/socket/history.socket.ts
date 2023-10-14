import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import * as amqp from 'amqplib';
import { ConfigService } from "@nestjs/config";
import { JwtAuth } from "./jwt";
import { Admin } from "src/common";

// 党史模块socket
@WebSocketGateway(13008)
export class HistorySocket implements OnGatewayInit {
    socketName = "党史-13008---";
    @WebSocketServer() server: Server;
    jwtAuth: JwtAuth;
    connection: amqp.Connection;
    channels: amqp.Channel;
    config: ConfigService;
    connectSum = 0;
    user: string[] = [];

    // 初始连接
    async handleConnection(client: Socket) {
        // 客户端连接事件
        console.log('客户端连接id ： ' + client.id);
        const token = client.handshake.headers.authorization;
        if (!token) {
            console.log('未携带token连接');
            client.disconnect();
            return;
        }
        // 进行身份数据获取及验证
        const userData = await this.jwtAuth.authentication(token, "admin", [{ module: Admin.History, level: 1 }]);
        if (!userData.auth) {
            console.log('身份验证错误或过期');
            client.disconnect();
            return;
        }
        // 成功连接后，将其数据存入user中
        this.userLink(userData.userId, client.id);
        this.server.emit('message', true);
    }

    // 断开连接
    handleDisconnect(client: Socket) {
        // 客户端断开连接事件
        console.log('断开id: ' + client.id);
        this.userDisconnect(client.id);
        // 记录是否还有消费者在内
        if (this.connectSum <= 0) {
            console.log('无人访问关闭');
            this.connectSum = 0;
        }
    }

    // 初始化
    async afterInit(server: Server) {
        // WebSocket服务器初始化事件
        console.log('socket用户初始化');
        // rabbitMQ服务初始化
        this.config = new ConfigService();
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
            console.log(`${this.socketName}RabbitMQ连接建立成功`);
        } catch (error) {
            console.log(`${this.socketName}RabbitMQ连接错误`);
            console.error(error);
        }
        // 进行初始化
        this.jwtAuth = new JwtAuth();
        this.jwtAuth.init(this.socketName);
        // MQ消费者监听
        try {
            // 检测是否存在此队列，存在不进行操作，不存在则进行持久化创建
            await this.channels.assertQueue(this.config.get('RabbitMQ_history_socketQueueName'), { durable: true });
            // 队列监听
            await this.channels.consume(this.config.get('RabbitMQ_history_socketQueueName'), (msg) => {
                // 当有数值传递时，以数值作为消息时间发送出去
                if (msg.content) {
                    this.channels.ack(msg);
                    // 使用socket发送true
                    if (this.connectSum > 0) {
                        // 给指定用户发送消息
                        this.server.to(this.user.map(data => { return data })).emit(msg.content.toString(), true);
                    }
                }
            })
        } catch (error) {
            console.log("RabbitMQ消费者接收错误");
            console.error(error);
        }
    }

    // // 接收消息
    // @SubscribeMessage('rapairSocket')
    // handleMessage(client: Server, payload: any): void {
    //     this.server.emit('rapairSocket', payload);
    // }

    // 用户连接
    async userLink(userId: string, socketId: string) {
        // 成功连接后，将其数据存入user中
        this.user[userId] = socketId;
        this.connectSum++;
    }

    // 用户断开连接
    async userDisconnect(socketId: string) {
        for (const [key, value] of Object.entries(this.user)) {
            if (value === socketId) {
                delete this.user[key]; // 移除断开连接的用户
                this.connectSum--;
                break;
            }
        }
    }
}