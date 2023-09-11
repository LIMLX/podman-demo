import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ClassStudentDto {

}

export class FindLeaveAllDto {
    employeeId: string
    page: number
}

export class FindLeaveDataDto {
    leave_id: number
    leave_uuid: string
    user_id: string
    content: string
    start_time: Date
    end_time: Date
    type: { type_name: string }
    leaveStatus: { status_name: string }
}

export class FindLeaveSchoolDataDto {
    leave_school_id: number
    leave_school_uuid: string
    leave_user_id: string
    start_time: Date
    end_time: Date
    content: string
    leaveStatus: { status_name: string }
}

export class FindLeaveAdvancedFilterDto {
    @ApiProperty({
        required: true,
        description: '状态num'
    })
    statusNum: string

    @ApiProperty({
        required: false,
        description: '类型Num'
    })
    @IsIn(['0', '1', 'leave', 'all', 'school', 'returnSchool', undefined])
    typeNum: string

    @ApiProperty({
        required: true,
        description: '时间'
    })
    @IsIn(['Today', 'Week', 'Month', 'HalfYear', 'Year', undefined])
    Time: string

    @ApiProperty({
        required: true,
        description: '页数'
    })
    @IsNotEmpty()
    @IsNumber()
    page: number
    startTime: Date
    endTime: Date
    classId: string
    studentName: string
    studentNum: string
    employeeId: string
}

export class FindStudentOneData {
    student_num: string
    student_name: string
    class: {
        classes_name: string,
        campus: {
            campus_name: string,
            school: {
                school_name: string
            }
        }
    }
}

export class StudentOneData {
    studentNum: string
    studentName: string
    studentClassName: string
    studentCampusName: string
    studentSchoolName: string
}

export class FindLeaveOneDto {
    leave_id: number
    leave_uuid: string
    user_id: string
    content: string
    start_time: Date
    end_time: Date
    type: {
        type_name: string
    }
    leaveStatus: {
        status_name: string
    }
    file: { file_name: string; file_type: string; }[]
}

export class FindLeaveSchoolOneDto {
    leave_user_id: string
    leave_school_id: number
    leave_school_uuid: string
    start_time: Date
    end_time: Date
    flight: string
    province: string
    city: string
    country: string
    leave_school_creation_time?: Date
    content: string

    transportation: {
        transportation_name: string
    }

    type: {
        type_name: string
    }

    leaveStatus: {
        status_name: string
    }
}