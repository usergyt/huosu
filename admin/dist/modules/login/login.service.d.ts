import { Redis } from '@nestjs-modules/ioredis';
import { JwtService } from '@nestjs/jwt';
import { SharedService } from 'src/shared/shared.service';
import { MenuService } from '../system/menu/menu.service';
import { SellerService } from '../system/user/seller.service';
import { UserService } from '../system/user/user.service';
import { ResInfo } from './dto/res-login.dto';
import { Request } from 'express';
import { LogService } from '../monitor/log/log.service';
import { ConfigService } from '@nestjs/config';
import { ReqLoginDto } from './dto/req-login.dto';
export declare class LoginService {
    private readonly sharedService;
    private readonly redis;
    private readonly jwtService;
    private readonly userService;
    private readonly menuService;
    private readonly logService;
    private readonly configService;
    private readonly sellerService;
    constructor(sharedService: SharedService, redis: Redis, jwtService: JwtService, userService: UserService, menuService: MenuService, logService: LogService, configService: ConfigService, sellerService: SellerService);
    createImageCaptcha(): Promise<{
        img: string;
        uuid: string;
    }>;
    login(request: Request): Promise<{
        token: string;
    }>;
    authLogin(reqLoginDto: ReqLoginDto): Promise<{
        sellserId: any;
    }>;
    logout(token: string): Promise<void>;
    getInfo(userId: string): Promise<ResInfo>;
    getRouterByUser(userId: number): Promise<import("../system/menu/dto/res-menu.dto").Router[]>;
}
