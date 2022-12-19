import { Redis } from '@nestjs-modules/ioredis';
import { SharedService } from 'src/shared/shared.service';
import { UserService } from '../user/user.service';
import { SellerService } from '../user/seller.service';
export declare class AuthService {
    private readonly redis;
    private readonly sharedService;
    private readonly userService;
    private readonly sellerService;
    constructor(redis: Redis, sharedService: SharedService, userService: UserService, sellerService: SellerService);
    validateSeller(sellerId: string): Promise<import("../user/entities/seller.entity").Seller>;
    validateAuthToken(sellerId: any, pv: number, restoken: string): Promise<void>;
    checkImgCaptcha(uuid: string, code: string): Promise<void>;
    validateUser(sellerId: string): Promise<import("../user/entities/seller.entity").Seller>;
    validateToken(userId: number, pv: number, restoken: string): Promise<void>;
}
