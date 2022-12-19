/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { RoleService } from '../role/role.service';
import { ReqAddUserDto, ReqChangeStatusDto, ReqResetPwdDto, ReqUpdataSelfDto, ReqUpdateAuthRoleDto, ReqUpdateSelfPwd, ReqUpdateUserDto, ReqUserListDto } from './dto/req-user.dto';
import { ResAuthRoleDto, ResUserInfoDto } from './dto/res-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ExcelService } from 'src/modules/common/excel/excel.service';
export declare class UserController {
    private readonly userService;
    private readonly postService;
    private readonly excelService;
    private readonly roleService;
    constructor(userService: UserService, postService: PostService, excelService: ExcelService, roleService: RoleService);
    list(reqUserListDto: ReqUserListDto, sataScopeSql: string): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<User>>;
    getPostAndRole(): Promise<ResUserInfoDto>;
    profile(userId: number): Promise<{
        data: User;
        postGroup: string;
        roleGroup: string;
    }>;
    updataProfile(reqUpdataSelfDto: ReqUpdataSelfDto, userId: number): Promise<void>;
    updateSelfPwd(reqUpdateSelfPwd: ReqUpdateSelfPwd, userName: string): Promise<void>;
    avatar(file: Express.Multer.File, fileName: any, userId: number): Promise<{
        imgUrl: any;
    }>;
    one(userId: number): Promise<ResUserInfoDto>;
    add(reqAddUserDto: ReqAddUserDto, userName: string): Promise<void>;
    update(reqUpdateUserDto: ReqUpdateUserDto, userName: string): Promise<void>;
    delete(userIds: string, userName: string): Promise<void>;
    resetPwd(reqResetPwdDto: ReqResetPwdDto, userName: string): Promise<void>;
    authRole(userId: number): Promise<ResAuthRoleDto>;
    updateAuthRole(reqUpdateAuthRoleDto: ReqUpdateAuthRoleDto, userName: string): Promise<void>;
    changeStatus(reqChangeStatusDto: ReqChangeStatusDto, userName: string): Promise<void>;
    export(reqUserListDto: ReqUserListDto): Promise<StreamableFile>;
    importTemplate(): Promise<StreamableFile>;
    importData(file: Express.Multer.File, userName: string): Promise<void>;
}
