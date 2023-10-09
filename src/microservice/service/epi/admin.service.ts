import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { AuditReportDto, CreateReportTypeDto, DelReportDto, DelReportTypeDto, FindClassDto, FindClassStuReportDto, FindClassStudentDto, UpdateClockDto, UpdateReportDto, UpdateReportTypeDto } from "src/microservice/dto/epi/dto/admin.dto";

@Injectable()
export class EpiClockAdminService {
    constructor(
        @Inject("EPI_SERVICE") private readonly epiService: ClientProxy
    ) { }

    // 获取所有学院数据
    async findCampus() {
        const pattern = { cmd: "ep_admin_findCampus" };
        const data = {};
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }


    // 获取用户数量
    async findUserSum() {
        const pattern = { cmd: "ep_admin_findUserSum" };
        const data = {};
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 打卡基础数据统计
    async findClockData() {
        const pattern = { cmd: "ep_admin_findClockData" };
        const data = {};
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 打卡基础数据趋势统计
    async findClockTendency() {
        const pattern = { cmd: "ep_admin_findClockTendency" };
        const data = {};
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 根据学院获取班级的数量
    async findClassSum(findClassDto: FindClassDto) {
        const pattern = { cmd: "ep_admin_findClassSum" };
        const data = findClassDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取根据学院获取班级下数据
    async findClass(findClassDto: FindClassDto) {
        const pattern = { cmd: "ep_admin_findClass" };
        const data = findClassDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取某班级的学生总人数
    async findStudentSum(classId: string, like: string) {
        const pattern = { cmd: "ep_admin_findStudentSum" };
        const data = { classId: classId, like: like };
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取某班级的打卡状况
    async findClock(findClassStudentDto: FindClassStudentDto) {
        const pattern = { cmd: "ep_admin_findClock" };
        const data = findClassStudentDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查看详细打卡情况
    async findClockOne(clockId: number) {
        const pattern = { cmd: "ep_admin_findClockOne" };
        const data = { clockId: clockId };
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取所有打卡类型选项
    async findClockType() {
        const pattern = { cmd: "ep_admin_findClockType" };
        const data = {};
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 修改打卡类型
    async updateClock(updateClockDto: UpdateClockDto) {
        const pattern = { cmd: "ep_admin_updateClock" };
        const data = updateClockDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // ------------------------------------------------------报备模块------------------------------------------------------
    // 外出报备基础数据统计
    async findReportData() {
        const pattern = { cmd: "ep_admin_findReportData" };
        const data = {};
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取根据学院获取班级下数据
    async findReportClass(campusId: string) {
        const pattern = { cmd: "ep_admin_findReportClass" };
        const data = { campusId: campusId };
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取某班级的报备总数
    async findClassStuReportSum(findClassStuReportDto: FindClassStuReportDto) {
        const pattern = { cmd: "ep_admin_findClassStuReportSum" };
        const data = findClassStuReportDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 获取某班级的报备情况
    async findClassStuReport(findClassStuReportDto: FindClassStuReportDto) {
        const pattern = { cmd: "ep_admin_findClassStuReport" };
        const data = findClassStuReportDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 外出报备编辑详情
    async findClassStuReportOne(reportId: string) {
        const pattern = { cmd: "ep_admin_findClassStuReportOne" };
        const data = { reportId: reportId };
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 报备详情记录查看
    async findReportOne(reportId: string) {
        const pattern = { cmd: "ep_admin_findReportOne" };
        const data = { reportId: reportId };
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 编辑报备单
    async updateReport(updateReportDto: UpdateReportDto) {
        const pattern = { cmd: "ep_admin_updateReport" };
        const data = updateReportDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除报备单
    async delReport(delReportDto: DelReportDto) {
        const pattern = { cmd: "ep_admin_delReport" };
        const data = delReportDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 审核报备单
    async auditReport(auditReportDto: AuditReportDto) {
        const pattern = { cmd: "ep_admin_auditReport" };
        const data = auditReportDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 查看报备单类型
    async findReportType() {
        const pattern = { cmd: "ep_admin_findReportType" };
        const data = {};
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 创建报备单类型
    async createReportType(createReportTypeDto: CreateReportTypeDto) {
        const pattern = { cmd: "ep_admin_createReportType" };
        const data = createReportTypeDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 修改报备单类型
    async updateReportType(updateReportTypeDto: UpdateReportTypeDto) {
        const pattern = { cmd: "ep_admin_updateReportType" };
        const data = updateReportTypeDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }

    // 删除报备单类型
    async delReportType(delReportTypeDto: DelReportTypeDto) {
        const pattern = { cmd: "ep_admin_delReportType" };
        const data = delReportTypeDto;
        let status = this.epiService.send<any>(pattern, data).pipe(map((message: any) => { return message }));
        return status;
    }
}