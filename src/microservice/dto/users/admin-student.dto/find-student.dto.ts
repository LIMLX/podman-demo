import { IsIn } from "class-validator"

export class FindStudentDto {
    @IsIn([0, 1, "0", "1", undefined])
    monitor: number
    campusId: string
    classId: string
    search: string
    page: number
}