import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { JWTDATA } from "src/common";

export class JwtAuth {
    jwtData: JWTDATA;
    config: ConfigService;
    // 初始化
    async init(socketName: string) {
        // 初始化配置文件
        this.config = new ConfigService();
        // JWT初始化配置
        // 配置option
        const options: JwtModuleOptions = {
            secret: this.config.get('JWT_ENC'),
            signOptions: { expiresIn: this.config.get('JWT_TIME') }
        }
        this.jwtData = new JWTDATA(new JwtService(options));
        console.log(`${socketName}socket-Jwt初始化成功`);
    }

    // 身份验证
    async authentication(token: string, id: string | "user" | "admin" | "student" | "employee", roles: [{ module: string, level: number }]): Promise<{ auth: boolean, userId: string }> {
        // 身份验证结果
        let returnData = {
            auth: false,
            userId: null
        };
        try {
            // 解析jwt数据
            const userData = await this.jwtData.getJWT(token);
            // 验证身份
            // 设置所有用户
            if (id === "user") {
                // 验证是否为超级管理员---超级管理员对所有权限具有使用权
                if (userData.turboAdmin) {
                    if (userData.turboAdmin.startTime && userData.turboAdmin.endTime) {
                        // 当管理员时间过期时进行阻止
                        if (userData.turboAdmin.endTime <= new Date().getTime()) {
                            return returnData;
                        }
                        returnData.auth = true;
                        returnData.userId = "turbo";
                        return returnData;
                    }
                }
                // 验证普通权限---根据上面传输的权限
                if (userData.admin) {
                    // 当为管理员访问时,验证普通权限---根据上面传输的权限
                    if (userData.admin) {
                        // 当此角色有权限时
                        if (userData.admin.module && userData.admin.module.length > 0) {
                            // 获取用户jwt的数据
                            let adminAuth = [];
                            userData.admin.module.forEach((data: { moduleNum: string, moduleLevel: number }) => {
                                adminAuth[data.moduleNum] = data.moduleLevel;
                            });
                            // 当前守护权限值
                            let flag = true;
                            roles.forEach((data) => {
                                // 当有确定模块权限时，同时当adminAuth内有数据也就是有确认模块，同时等级大于约束等级时
                                if (!adminAuth[data.module] || adminAuth[data.module] < data.level) {
                                    flag = false;
                                    return;
                                }
                            })
                            if (flag) {
                                returnData.auth = true;
                                returnData.userId = userData.admin.employeeId ? userData.admin.employeeId : userData.admin.studentId;
                            }
                            return returnData;
                        } else {
                            return returnData;
                        }
                    }
                }
                // 对比查找是否有模块权限
                let userAuth = [];
                userData.module.forEach((data: { moduleNum: string, operationLevel: number }) => {
                    userAuth[data.moduleNum] = data.operationLevel;
                });
                let flag = true;
                roles.forEach((data) => {
                    // 当有确定模块权限时，同时当userAuth内有数据也就是有确认模块，同时等级大于约束等级时
                    if (!userAuth[data.module] || userAuth[data.module] < data.level) {
                        flag = false;
                        return;
                    }
                })
                if (flag) {
                    returnData.auth = true;
                    returnData.userId = userData.student ? userData.student.studentId : userData.employee.employeeId;
                }
                return returnData;
            }

            // 当设置成管理员时
            if (id === "admin") {
                // 验证是否为超级管理员---超级管理员对所有权限具有使用权
                if (userData.turboAdmin) {
                    if (userData.turboAdmin.startTime && userData.turboAdmin.endTime) {
                        // 当管理员时间过期时进行阻止
                        if (userData.turboAdmin.endTime <= new Date().getTime()) {
                            return returnData;
                        }
                        returnData.auth = true;
                        returnData.userId = "turbo";
                        return returnData;
                    }
                }
                // 验证普通权限---根据上面传输的权限
                if (userData.admin) {
                    // 当为管理员访问时,验证普通权限---根据上面传输的权限
                    if (userData.admin) {
                        // 当此角色有权限时
                        if (userData.admin.module && userData.admin.module.length > 0) {
                            // 获取用户jwt的数据
                            let adminAuth = [];
                            userData.admin.module.forEach((data: { moduleNum: string, moduleLevel: number }) => {
                                adminAuth[data.moduleNum] = data.moduleLevel;
                            });
                            // 当前守护权限值
                            let flag = true;
                            roles.forEach((data) => {
                                // 当有确定模块权限时，同时当adminAuth内有数据也就是有确认模块，同时等级大于约束等级时
                                if (!adminAuth[data.module] || adminAuth[data.module] < data.level) {
                                    flag = false;
                                    return;
                                }
                            })
                            if (flag) {
                                returnData.auth = true;
                                returnData.userId = userData.admin.employeeId ? userData.admin.employeeId : userData.admin.studentId;
                            }
                            return returnData;
                        } else {
                            return returnData;
                        }
                    }
                }
                return returnData;
            }
            // 当验证的为学生/职工时
            if (id === "student" || id === "employee") {
                let userFlag = false;
                switch (id) {
                    case "student": userData.student ? userFlag = true : userFlag = false; break;
                    case "employee": userData.employee ? userFlag = true : userFlag = false; break;
                }
                // 身份验证错误
                if (!userFlag) {
                    return returnData;
                }
                // 对比查找是否有模块权限
                let userAuth = [];
                userData.module.forEach((data: { moduleNum: string, operationLevel: number }) => {
                    userAuth[data.moduleNum] = data.operationLevel;
                });
                let flag = true;
                roles.forEach((data) => {
                    // 当有确定模块权限时，同时当userAuth内有数据也就是有确认模块，同时等级大于约束等级时
                    if (!userAuth[data.module] || userAuth[data.module] < data.level) {
                        flag = false;
                        return;
                    }
                })
                if (flag) {
                    returnData.auth = true;
                    returnData.userId = userData.student ? userData.student.studentId : userData.employee.employeeId;
                }
                return returnData;
            }
        } catch (error) {
            console.log('jwt解密错误');
            return returnData;
        }
    }

    // 当验证
}