import { Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ClientProxy } from "@nestjs/microservices"
import { map } from "rxjs"
import { ApplicationAutCreatehDTO, ApplicationCreateDTO, ApplicationDTO, RoleAuthCreateDTO, RoleCreateDTO, RoleDTO } from "src/microservice/dto"

@Injectable()
export class UserAuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ){}

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