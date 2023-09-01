import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateCampusDto, CreateClassDto, CreateDepartmentDto, CreateSchoolDto, UpdateCampusDto, UpdateClassDto, UpdateDepartmentDto, UpdateSchoolDto } from "src/microservice/dto";
import { UsersOrganizationService } from "src/microservice/service";

@ApiTags('usersOrganization')
@Controller('users/organization')
export class UsersOrganizationController {
  constructor(private readonly organizationService: UsersOrganizationService) { }

  // -------------------------------班级-----------------------------------------

  // 创建班级
  @ApiOperation({ summary: "班级创建接口", description: "创建新班级" })
  @Post("/classCreate")
  async createClass(@Body() createClassDto: CreateClassDto) {
    return this.organizationService.createClass(createClassDto);
  }

  // 修改班级
  @ApiOperation({ summary: "班级修改接口", description: "修改班级" })
  @Patch("/classUpdate")
  async updateClass(@Body() updateClassDto: UpdateClassDto) {
    return await this.organizationService.updateClass(updateClassDto)
  }

  // 获取所有班级
  @ApiOperation({ summary: "查询所有班级接口", description: "查询返回所有班级信息" })
  @Get("/findClassAll")
  async findClassAll() {
    return await this.organizationService.findClassAll();
  }

  // -------------------------------学院-----------------------------------------

  // 创建学院
  @ApiOperation({ summary: "学院创建接口", description: "创建新学院" })
  @Post("/campusCreate")
  async createCampus(@Body() createCampusDto: CreateCampusDto) {
    return await this.organizationService.createCampus(createCampusDto)
  }

  // 修改学院
  @ApiOperation({ summary: "学院修改接口", description: "修改学院" })
  @Patch("/campusUpdate")
  async updateCampus(@Body() updateCampusDto: UpdateCampusDto) {
    return await this.organizationService.updateCampus(updateCampusDto)
  }

  // 获取所有学院
  @ApiOperation({ summary: "查询所有学院接口", description: "获取所有学院信息" })
  @Get("/findCampusAll")
  async findCampusAll() {
    return await this.organizationService.findCampusAll()
  }

  // -------------------------------部门-----------------------------------------

  // 创建部门
  @ApiOperation({ summary: "部门创建接口", description: "创建新部门" })
  @Post("/departmentCreate")
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.organizationService.createDepartment(createDepartmentDto)
  }

  // 修改部门
  @ApiOperation({ summary: "部门修改接口", description: "修改部门" })
  @Patch("/departmentUpdate")
  async updateDepartment(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return await this.organizationService.updateDepartment(updateDepartmentDto)
  }

  // 获取所有部门
  @ApiOperation({ summary: "查询所有部门接口", description: "获取所有部门信息" })
  @Get("/findDepartmentAll")
  async findDepartmentAll() {
    return await this.organizationService.findDepartmentAll()
  }

  // -------------------------------学校-----------------------------------------

  // 创建学校
  @ApiOperation({ summary: "学校创建接口", description: "创建新学校" })
  @Post("/schoolCreate")
  async createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    return await this.organizationService.createSchool(createSchoolDto)
  }

  // 修改学校
  @ApiOperation({ summary: "学校修改接口", description: "修改学校信息" })
  @Patch("/schoolUpdate")
  async updateSchool(@Body() updateSchoolDto: UpdateSchoolDto) {
    return await this.organizationService.updateSchool(updateSchoolDto)
  }

  // 获取所有学校
  @ApiOperation({ summary: "查询所有学校接口", description: "获取所有学校信息" })
  @Get("/findSchoolAll")
  async findSchoolAll() {
    return await this.organizationService.findSchoolAll()
  }
}