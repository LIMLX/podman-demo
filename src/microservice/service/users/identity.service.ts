import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { map } from "rxjs"
import { CampusCreateDTO, ClassCreateDTO, SchoolCreateDTO } from "src/microservice/dto"

@Injectable()
export class UserIdentityService { 

    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ) {}

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

  campus_add (campusDTO: CampusCreateDTO) {
    const pattern = { cmd: "campus_add" }

    let status = this.userService
    .send<CampusCreateDTO>(pattern,campusDTO)
    .pipe(
      map((message: any) => {
        return {message : message}
      }
    ))
    return status
  }

  class_add (classDTO: ClassCreateDTO) {
    const pattern = { cmd: "class_add" }

    let status = this.userService
    .send<ClassCreateDTO>(pattern,classDTO)
    .pipe(
      map((message: any) => {
        return {message : message}
      }
    ))
    return status
  }

  school_add (schoolDTO: SchoolCreateDTO) {
    const pattern = { cmd: "school_add" }

    let status = this.userService
    .send<SchoolCreateDTO>(pattern,schoolDTO)
    .pipe(
      map((message: any) => {
        return {message : message}
      }
    ))
    return status
  }
    
}