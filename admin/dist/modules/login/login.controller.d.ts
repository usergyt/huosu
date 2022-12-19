import { DataObj } from 'src/common/class/data-obj.class';
import { Router } from '../system/menu/dto/res-menu.dto';
import { ReqLoginDto } from './dto/req-login.dto';
import { ResImageCaptchaDto, ResLoginDto, ResSellerDto } from './dto/res-login.dto';
import { LoginService } from './login.service';
import { Request } from 'express';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    captchaImage(): Promise<ResImageCaptchaDto>;
    login(reqLoginDto: ReqLoginDto, req: Request): Promise<ResLoginDto>;
    authLogin(reqLoginDto: ReqLoginDto, req: Request): Promise<ResSellerDto>;
    getInfo(userId: string): Promise<import("./dto/res-login.dto").ResInfo>;
    getRouters(userId: number): Promise<DataObj<Router[]>>;
    logout(authorization: string): Promise<void>;
}
