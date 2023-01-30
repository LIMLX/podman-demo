import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { StudentDTO, EmployeeDTO, StudentDTO_Create, EmployeeDTO_Create, CampusDTO_Create, ClassDTO_Create, SchoolDTO_Create, ApplicationCreateDTO, ApplicationDTO, ApplicationAutCreatehDTO, } from "src/common";
import { RoleAuthCreateDTO, RoleCreateDTO, RoleDTO } from "src/common/dto/role";

@Injectable()
export class UsersService {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
        ) {}

    login_student (userDTO: StudentDTO) {
    const pattern = { cmd: "student_validateUser" };

    let userData = this.userService
    .send<StudentDTO>(pattern,userDTO)
    .pipe(
      map((message: any) => {
        if (message) {
          return {token: this.jwtService.sign({student: message})}
      } else {
        return {"message": "Unauthorized"}
      }
    })
    )
    return userData
    }

    sign_in (userDTO: StudentDTO_Create) {
      const pattern = { cmd: "student_signIn" };

      let status = this.userService
      .send<StudentDTO_Create>(pattern,userDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }

    update (userDTO: StudentDTO) {
      const pattern = { cmd: "student_update" };

      let status = this.userService
      .send<StudentDTO>(pattern,userDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }

    login_employee (employeeDTO: EmployeeDTO) {
      const pattern = { cmd: "employee_validateUser" }

      let data = this.userService
      .send<EmployeeDTO>(pattern,employeeDTO)
      .pipe(
        map((message: any) => {
          if (message) {
            return {token: this.jwtService.sign({student: message})}
        } else {
          return {"message": "Unauthorized"}
        }
      }
      ))
      return data
    }

    sign_in_employee (employeeDTO: EmployeeDTO_Create) {
      const pattern = { cmd: "employee_signIn" }

      let status = this.userService
      .send<EmployeeDTO_Create>(pattern,employeeDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }

    campus_getAll () {
      const pattern = { cmd: "campus_getAll" }

      let data = this.userService
      .send(pattern,{})
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return data
    }

    class_getAll () {
      const pattern = { cmd: "class_getAll" }

      let data = this.userService
      .send(pattern,{})
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return data
    }

    school_getAll () {
      const pattern = { cmd: "school_getAll" }

      let data = this.userService
      .send(pattern,{})
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return data
    }

    campus_add (campusDTO: CampusDTO_Create) {
      const pattern = { cmd: "campus_add" }

      let status = this.userService
      .send<CampusDTO_Create>(pattern,campusDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }

    class_add (classDTO: ClassDTO_Create) {
      const pattern = { cmd: "class_add" }

      let status = this.userService
      .send<ClassDTO_Create>(pattern,classDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }

    school_add (schoolDTO: SchoolDTO_Create) {
      const pattern = { cmd: "school_add" }

      let status = this.userService
      .send<SchoolDTO_Create>(pattern,schoolDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }

    // ==========================身份模块====================================
    role_getAll () {
      const pattern = { cmd: "role_getAll" }

      let data = this.userService
      .send(pattern,{})
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return data
    }
  
    role_add (roleDTO: RoleCreateDTO) {
      const pattern = { cmd: "role_add" }

      let status = this.userService
      .send<RoleCreateDTO>(pattern,roleDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
  
    role_update (roleDTO: RoleDTO) {
      const pattern = { cmd: "role_update" }

      let status = this.userService
      .send<RoleDTO>(pattern,roleDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
  
    role_user_auth (roleUserAuthDTO : RoleAuthCreateDTO[]) {
      const pattern = { cmd: "role_user_auth" }

      let status = this.userService
      .send<RoleAuthCreateDTO>(pattern,roleUserAuthDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
  
    // ==========================应用模块====================================
    app_getAll () {
      const pattern = { cmd: "app_getAll" }

      let data = this.userService
      .send(pattern,{})
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return data
    }
  
    app_add (appAdd: ApplicationCreateDTO) {
      const pattern = { cmd: "app_add" }

      let status = this.userService
      .send<ApplicationCreateDTO>(pattern,appAdd)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
  
    app_update (appDTO: ApplicationDTO) {
      const pattern = { cmd: "app_update" }

      let status = this.userService
      .send<ApplicationDTO>(pattern,appDTO)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
  
    app_role_auth (appRoleAuth: ApplicationAutCreatehDTO[]) {
      const pattern = { cmd: "app_role_auth" }

      let status = this.userService
      .send<ApplicationAutCreatehDTO>(pattern,appRoleAuth)
      .pipe(
        map((message: any) => {
          return {message : message}
        }
      ))
      return status
    }
}