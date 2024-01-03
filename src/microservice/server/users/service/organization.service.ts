import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { CreateCampusDto, CreateClassDto, CreateDepartmentDto, CreateSchoolDto, UpdateCampusDto, UpdateClassDto, UpdateDepartmentDto, UpdateSchoolDto } from "src/microservice/dto";

@Injectable()
export class UsersOrganizationService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy
  ) { }

  // 创建二级学院
  async createCampus(createCampusDto: CreateCampusDto) {
    const pattern = { cmd: "users_organization_createCampus" };
    const data = createCampusDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 编辑二级学院
  async updateCampus(updateCampusDto: UpdateCampusDto) {
    const pattern = { cmd: "users_organization_updateCampus" };
    const data = updateCampusDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 删除二级学院
  async delCampus(campusId: string) {
    const pattern = { cmd: "users_organization_delCampus" };
    const data = { campusId: campusId };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取所有二级学院
  async findCampus() {
    const pattern = { cmd: "users_organization_findCampus" };
    const data = {};

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 创建学院下的班级
  async createCampusClass(createClassDto: CreateClassDto) {
    const pattern = { cmd: "users_organization_createCampusClass" };
    const data = createClassDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 修改学院下的班级
  async updateCampusClass(updateClassDto: UpdateClassDto) {
    const pattern = { cmd: "users_organization_updateCampusClass" };
    const data = updateClassDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 删除学院下的班级
  async delCampusClass(classId: string) {
    const pattern = { cmd: "users_organization_delCampusClass" };
    const data = { classId: classId };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取学院下的所有班级
  async findCampusClass(campusId: string, page: number, like: string) {
    const pattern = { cmd: "users_organization_findCampusClass" };
    const data = { campusId: campusId, page: page, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取学院下的所有班级总数
  async findCampusClassSum(campusId: string, like: string) {
    const pattern = { cmd: "users_organization_findCampusClassSum" };
    const data = { campusId: campusId, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取班级下的学生
  async findClassStudent(classId: string, page: number, like: string) {
    const pattern = { cmd: "users_organization_findClassStudent" };
    const data = { classId: classId, page: page, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取班级下的学生总数
  async findClassStudentSum(classId: string, like: string) {
    const pattern = { cmd: "users_organization_findClassStudentSum" };
    const data = { classId: classId, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 创建职工部门
  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const pattern = { cmd: "users_organization_createDepartment" };
    const data = createDepartmentDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 编辑职工部门
  async updateDepartment(updateDepartmentDto: UpdateDepartmentDto) {
    const pattern = { cmd: "users_organization_updateDepartment" };
    const data = updateDepartmentDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 删除职工部门
  async delDepartment(departmenId: string) {
    const pattern = { cmd: "users_organization_delDepartment" };
    const data = { departmenId: departmenId };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取所有职工部门
  async findDepartment() {
    const pattern = { cmd: "users_organization_findDepartment" };
    const data = {};

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取职工部门下的职工数据
  async findDepartmentEmployee(departmentId: string, page: number, like: string) {
    const pattern = { cmd: "users_organization_findDepartmentEmployee" };
    const data = { departmentId: departmentId, page: page, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取职工部门下的职工数据总数
  async findDepartmentEmployeeSum(departmentId: string, like: string) {
    const pattern = { cmd: "users_organization_findDepartmentEmployeeSum" };
    const data = { departmentId: departmentId, like: like };

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // -------------------------------学校-----------------------------------------

  // 创建学校
  async createSchool(createSchoolDto: CreateSchoolDto) {
    const pattern = { cmd: "users_school_create" };
    const data = createSchoolDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 修改学校
  async updateSchool(updateSchoolDto: UpdateSchoolDto) {
    const pattern = { cmd: "users_school_update" };
    const data = updateSchoolDto;

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }

  // 获取所有学校
  async findSchoolAll() {
    const pattern = { cmd: "users_school_findAll" };
    const data = {};

    let status = this.userService
      .send<any>(pattern, data)
      .pipe(
        map((message: any) => {
          return message;
        }
        ))
    return status;
  }
}