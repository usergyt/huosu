import { ReqAddSellerDto, ReqUpdateSellerDto } from './dto/req-seller.dto';
import { ResSellerDto } from './dto/res-seller.dto';
import { SellerService } from './seller.service';
export declare class SellerController {
    private readonly sellerService;
    constructor(sellerService: SellerService);
    profile(sellerId: string): Promise<{
        data: import("./entities/seller.entity").Seller;
    }>;
    updataProfile(reqUpdataSelfDto: ReqUpdateSellerDto, sellerId: string): Promise<void>;
    one(sellerId: string): Promise<ResSellerDto>;
    add(reqAddSellerDto: ReqAddSellerDto, sellerId: string): Promise<void>;
    changeStatus(reqChangeStatusDto: ReqAddSellerDto, sellerId: string): Promise<void>;
}
