import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends CreateStudentDto {
    studentId: string
}

export class UpdateStudentPswDto {
    studentId: string
    studentPassword: string
}