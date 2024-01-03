import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Admin, AdminRole, AdminRoleGuard } from "src/common";
import { CreateCampusDto, CreateClassDto, CreateDepartmentDto, CreateSchoolDto, UpdateCampusDto, UpdateClassDto, UpdateDepartmentDto, UpdateSchoolDto } from "src/microservice/dto";
import { UsersOrganizationService } from "src/microservice/service";

@ApiTags('组织')
@UseGuards(AdminRoleGuard)
@Controller('users/organization')
export class UsersOrganizationController {
  constructor(private readonly organizationService: UsersOrganizationService) { }

  @ApiOperation({ summary: "创建二级学院", description: "创建二级学院" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("createCampus")
  async createCampus(@Body() createCampusDto: CreateCampusDto) {
    return await this.organizationService.createCampus(createCampusDto);
  }

  @ApiOperation({ summary: "编辑二级学院", description: "编辑二级学院" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch("updateCampus")
  async updateCampus(@Body() updateCampusDto: UpdateCampusDto) {
    return await this.organizationService.updateCampus(updateCampusDto);
  }

  @ApiOperation({ summary: "删除二级学院", description: "删除二级学院" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("delCampus/campusId=:campusId")
  async delCampus(@Param("campusId") campusId: string) {
    return await this.organizationService.delCampus(campusId);
  }

  @ApiOperation({ summary: "获取所有二级学院", description: "获取所有二级学院" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findCampus")
  async findCampus() {
    return await this.organizationService.findCampus();
  }

  @ApiOperation({ summary: "创建学院下的班级", description: "创建学院下的班级" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("createCampusClass")
  async createCampusClass(@Body() createClassDto: CreateClassDto) {
    return await this.organizationService.createCampusClass(createClassDto);
  }

  @ApiOperation({ summary: "修改学院下的班级", description: "修改学院下的班级" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch("updateCampusClass")
  async updateCampusClass(@Body() updateClassDto: UpdateClassDto) {
    return await this.organizationService.updateCampusClass(updateClassDto);
  }

  @ApiOperation({ summary: "删除学院下的班级", description: "删除学院下的班级" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("delCampusClass/classId=:classId")
  async delCampusClass(@Param("classId") classId: string) {
    return await this.organizationService.delCampusClass(classId);
  }

  @ApiOperation({ summary: "获取学院下的所有班级", description: "获取学院下的所有班级" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findCampusClass/campusId=:campusId/page=:page")
  async findCampusClass(@Param() { campusId, page }: { campusId: string, page: any }, @Query("like") like: string) {
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    page = Number(page);
    return await this.organizationService.findCampusClass(campusId, page, like);
  }

  @ApiOperation({ summary: "获取学院下的所有班级总数", description: "获取学院下的所有班级总数" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("/findCampusClassSum/campusId=:campusId")
  async findCampusClassSum(@Param("campusId") campusId: string, @Query("like") like: string) {
    return await this.organizationService.findCampusClassSum(campusId, like);
  }

  @ApiOperation({ summary: "获取班级下的学生", description: "获取班级下的学生" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("/findClassStudent/classId=:classId/page=:page")
  async findClassStudent(@Param() { classId, page }: { classId: string, page: any }, @Query("like") like: string) {
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    page = Number(page);
    return await this.organizationService.findClassStudent(classId, page, like);
  }

  @ApiOperation({ summary: "获取班级下的学生总数", description: "获取班级下的学生总数" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findClassStudentSum/classId=:classId")
  async findClassStudentSum(@Param("classId") classId: string, @Query("like") like: string) {
    return await this.organizationService.findClassStudentSum(classId, like);
  }

  @ApiOperation({ summary: "创建职工部门", description: "创建职工部门" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("createDepartment")
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.organizationService.createDepartment(createDepartmentDto);
  }

  @ApiOperation({ summary: "编辑职工部门", description: "编辑职工部门" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch("updateDepartment")
  async updateDepartment(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return await this.organizationService.updateDepartment(updateDepartmentDto);
  }

  @ApiOperation({ summary: "删除职工部门", description: "删除职工部门" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Delete("delDepartment/departmenId=:departmenId")
  async delDepartment(@Param("departmenId") departmenId: string) {
    return await this.organizationService.delDepartment(departmenId);
  }

  @ApiOperation({ summary: "获取所有职工部门", description: "获取所有职工部门" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findDepartment")
  async findDepartment() {
    return await this.organizationService.findDepartment();
  }

  @ApiOperation({ summary: "获取职工部门下的职工数据", description: "获取职工部门下的职工数据" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findDepartmentEmployee/departmentId=:departmentId/page=:page")
  async findDepartmentEmployee(@Param() { departmentId, page }: { departmentId: string, page: any }, @Query("like") like: string) {
    if (!/^[0-9]*$/.test(page)) {
      return "abnormal";
    }
    page = Number(page);
    return await this.organizationService.findDepartmentEmployee(departmentId, page, like);
  }

  @ApiOperation({ summary: "获取职工部门下的职工数据总数", description: "获取职工部门下的职工数据总数" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("findDepartmentEmployeeSum/departmentId=:departmentId")
  async findDepartmentEmployeeSum(@Param("departmentId") departmentId: string, @Query("like") like: string) {
    return await this.organizationService.findDepartmentEmployeeSum(departmentId, like);
  }

  // -------------------------------学校-----------------------------------------

  // 创建学校
  @ApiOperation({ summary: "学校创建接口", description: "创建新学校" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Post("/schoolCreate")
  async createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    return await this.organizationService.createSchool(createSchoolDto);
  }

  // 修改学校
  @ApiOperation({ summary: "学校修改接口", description: "修改学校信息" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Patch("/schoolUpdate")
  async updateSchool(@Body() updateSchoolDto: UpdateSchoolDto) {
    return await this.organizationService.updateSchool(updateSchoolDto);
  }

  // 获取所有学校
  @ApiOperation({ summary: "查询所有学校接口", description: "获取所有学校信息" })
  @AdminRole([{ admin: Admin.SuperAdmin, level: 1 }])
  @Get("/findSchoolAll")
  async findSchoolAll() {
    return await this.organizationService.findSchoolAll();
  }
}