import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateCampusDto, CreateClassDto, CreateDepartmentDto, CreateSchoolDto, UpdateCampusDto, UpdateClassAssistantDto, UpdateClassDto, UpdateClassTeacherDto, UpdateDepartmentDto, UpdateSchoolDto } from "src/microservice/dto";

@Injectable()
export class UsersOrganizationService {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ){}
    // -------------------------------班级-----------------------------------------
  
    // 创建班级
    async createClass(createClassDto: CreateClassDto) {
        const pattern = { cmd: "class_create" };
        const data = createClassDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 修改班级
    async updateClass(updateClassDto: UpdateClassDto) {
        const pattern = { cmd: "class_update" };
        const data = updateClassDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 获取所有班级
    async findClassAll () {
        const pattern = { cmd: "class_findAll" };
        const data = {}

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 添加班主任
    async updateClassTeacher(updateClass : UpdateClassTeacherDto) {
        const pattern = { cmd: "class_teacherUpdate" };
        const data = updateClass

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 添加辅导员
    async updateClassAssistant(updateClass : UpdateClassAssistantDto) {
        const pattern = { cmd: "class_assistantUpdate" };
        const data = updateClass

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // -------------------------------学院-----------------------------------------
  
    // 创建学院
    async createCampus (createCampusDto: CreateCampusDto) {
        const pattern = { cmd: "campus_create" };
        const data = createCampusDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 修改学院
    async updateCampus (updateCampusDto: UpdateCampusDto) {
        const pattern = { cmd: "campus_update" };
        const data = updateCampusDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 获取所有学院
    async findCampusAll () {
        const pattern = { cmd: "campus_findAll" };
        const data = {}

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // -------------------------------部门-----------------------------------------
  
    // 创建部门
    async createDepartment (createDepartmentDto : CreateDepartmentDto) {
        const pattern = { cmd: "department_create" };
        const data = createDepartmentDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 修改部门
    async updateDepartment (updateDepartmentDto: UpdateDepartmentDto) {
        const pattern = { cmd: "department_update" };
        const data = updateDepartmentDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 获取所有部门
    async findDepartmentAll () {
        const pattern = { cmd: "department_findAll" };
        const data = {}

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // -------------------------------学校-----------------------------------------
  
    // 创建学校
    async createSchool (createSchoolDto: CreateSchoolDto) {
        const pattern = { cmd: "school_create" };
        const data = createSchoolDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 修改学校
    async updateSchool (updateSchoolDto: UpdateSchoolDto) {
        const pattern = { cmd: "school_update" };
        const data = updateSchoolDto

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
  
    // 获取所有学校
    async findSchoolAll () {
        const pattern = { cmd: "school_findAll" };
        const data = {}

        let status = this.userService
        .send<any>(pattern,data)
        .pipe(
          map((message: any) => {
            return message
          }
        ))
        return status
    }
}