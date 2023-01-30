import { ConfigService } from "@nestjs/config"

const config = new ConfigService()
export default () => ({
    port: config.get('port'),

    jwt: {
        KEY: config.get('JWT_ENC'),
        TIME: config.get('JWT_TIME')
    },

    roles: {
        studentKEY: config.get('student'),
        adminKEY: config.get('admin'),
        employeeKEY: config.get('employee')
    },

    userService: {
        name: config.get('USER_NAME'),
        transport: config.get('USER_TRANSPORT'),
        options: {
            host: config.get('USER_OPTIONS_HOST'),
            port: config.get('USER_OPTIONS_PORT')
        }
    },
    smsService : {
        name: config.get('SMS_NAME'),
        transport: config.get('SMS_TRANSPORT'),
        options: {
            host: config.get('SMS_OPTIONS_HOST'),
            port: config.get('SMS_OPTIONS_PORT')
        }
    },
    module: {
        users: config.get('MODULE_USERS')
    }

})