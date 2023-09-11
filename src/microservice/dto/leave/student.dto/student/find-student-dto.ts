import { ApiProperty } from "@nestjs/swagger"
import { Contains, IsIn, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

export class ClassStudentDto {
    student: [
        {
            class: {
                student: [
                    {
                        student_name: string
                    }
                ]
            }
        }
    ]
}


export class FindLeaveAllDto {
    leave_id?: number
    leave_uuid?: string
    user_id?: string
    status_id?: string
    type_id?: string
    content?: string
    start_time?: Date
    end_time?: Date
    status?: number
    leave_creation_time?: Date
    leave_update_time?: Date

    type?: {
        type_id?: string
        type_num?: string
        type_name?: string
        type_creation_time?: Date
    }

    leaveStatus?: {
        status_id?: string
        status_num?: string
        status_name?: string
        status_creation_time?: Date
        status_update_time?: Date
    }
}

export class FindLeaveSchoolAllDto {
    leave_user_id?: string
    leave_school_id?: number
    leave_school_uuid?: string
    start_time?: Date
    end_time?: Date
    flight?: string
    province?: string
    city?: string
    country?: string
    leave_school_creation_time?: Date
    content?: string

    transportation?: {
        transportation_name?: string
    }

    type?: {
        type_name?: string
    }

    leaveStatus?: {
        status_name?: string
    }
}

export class FindLeaveOneDto {
    leave_id?: number
    leave_uuid?: string
    user_id?: string
    status_id?: string
    type_id?: string
    content?: string
    start_time?: Date
    end_time?: Date
    approver_id?: string
    remark?: string
    status?: number
    leave_creation_time?: Date
    leave_update_time?: Date

    type?: {
        type_id?: string
        type_num?: string
        type_name?: string
        type_creation_time?: Date
    }

    leaveStatus?: {
        status_id?: string
        status_num?: string
        status_name?: string
        status_creation_time?: Date
        status_update_time?: Date
    }

    file?: {
        file_id?: string
        leave_uuid?: string
        file_name?: string
        file_type?: string
        file_creation_time?: string
    }[]
}

export class PresidentStudentLikeDto {
    studentData?: {
        class?: {
            student?: {
                student_id?: string
                student_name?: string
            }[]
        }
    }

    studentLikeData?: {
        class?: {
            student?: {
                student_id?: string
                student_name?: string
            }[]
        }
    }
}

export class FindLeaveFilterDto {
    studentId: string

    statusNum: string
    @IsIn(['Today', 'Week', 'Month', 'HalfYear', 'Year', undefined])
    time: string

    @IsIn(['0', '1', 'leave', 'all', 'school', 'returnSchool', undefined])
    typeNum: string


    @ApiProperty({
        required: true,
        description: '页数'
    })
    @IsNotEmpty()
    @IsInt()
    page: number
}

export class FindLeavePagingDto {
    @ApiProperty({
        required: true,
        description: '页数'
    })

    @IsNotEmpty({
        message: "不能为空"
    })
    @IsInt()
    @Min(1)
    page: number
}