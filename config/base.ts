import { ConfigService } from "@nestjs/config"

const config = new ConfigService()
export default () => ({
    port: config.get('port'),

    jwt: {
        KEY: config.get('JWT_ENC'),
        TIME: config.get('JWT_TIME')
    },

    log: {
        dirname: config.get("LOG_DIRNAME"),        // 日志保存的目录
        filename: config.get("LOG_FILENAME"),      // 日志名称，占位符 %DATE% 取值为 datePattern 值。
        datePattern: config.get("LOG_DATEPATTERN"),// 日志轮换的频率，此处表示每天。
        zippedArchive: true,                       // 是否通过压缩的方式归档被轮换的日志文件。
        maxSize: config.get("LOG_MAXSIZE"),        // 设置日志文件的最大大小，m 表示 mb 。
        maxFiles: config.get("LOG_MAXFILES")       // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
    },

    roles: {
        studentKEY: config.get('student'),
        adminKEY: config.get('admin'),
        employeeKEY: config.get('employee'),
        repairsAdminKEY: config.get('repairsAdmin'),
        repairsMtrKEY: config.get('repairsMtr'),
        userKEY: config.get("user")
    },

    userService: {
        name: config.get('USER_NAME'),
        transport: config.get('USER_TRANSPORT'),
        options: {
            host: config.get('USER_OPTIONS_HOST'),
            port: config.get('USER_OPTIONS_PORT')
        }
    },
    smsService: {
        name: config.get('SMS_NAME'),
        transport: config.get('SMS_TRANSPORT'),
        options: {
            host: config.get('SMS_OPTIONS_HOST'),
            port: config.get('SMS_OPTIONS_PORT')
        }
    },
    noticeService: {
        name: config.get('NOTICE_NAME'),
        transport: config.get('NOTICE_TRANSPORT'),
        options: {
            host: config.get('NOTICE_OPTIONS_HOST'),
            port: config.get('NOTICE_OPTIONS_PORT')
        }
    },
    leaveService: {
        name: config.get('LEAVE_NAME'),
        transport: config.get('LEAVE_TRANSPORT'),
        options: {
            host: config.get('LEAVE_OPTIONS_HOST'),
            port: config.get('LEAVE_OPTIONS_PORT')
        }
    },
    repairsService: {
        name: config.get('REPAIRS_NAME'),
        transport: config.get('REPAIRS_TRANSPORT'),
        options: {
            host: config.get('REPAIRS_OPTIONS_HOST'),
            port: config.get('REPAIRS_OPTIONS_PORT')
        }
    },
    epiService: {
        name: config.get('EPI_NAME'),
        transport: config.get('EPI_TRANSPORT'),
        options: {
            host: config.get('EPI_OPTIONS_HOST'),
            port: config.get('EPI_OPTIONS_PORT')
        }
    },
    reportService: {
        name: config.get('REPROT_NAME'),
        transport: config.get('REPROT_TRANSPORT'),
        options: {
            host: config.get('REPROT_OPTIONS_HOST'),
            port: config.get('REPROT_OPTIONS_PORT')
        }
    },
    historyService: {
        name: config.get('HISTORY_NAME'),
        transport: config.get('HISTORY_TRANSPORT'),
        options: {
            host: config.get('HISTORY_OPTIONS_HOST'),
            port: config.get('HISTORY_OPTIONS_PORT')
        }
    },
    module: {
        users: config.get('MODULE_USERS')
    },
    blackList: {
        key: config.get('BLACKLIST_KEY'),
        time: +config.get("BLACKLIST_TIME"),
        max: +config.get('BLACKLIST_MAX'),
        fileName: config.get('BLACKLIST_FILE')
    }
})