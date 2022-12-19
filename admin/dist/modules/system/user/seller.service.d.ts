import { Redis } from '@nestjs-modules/ioredis';
import { SharedService } from 'src/shared/shared.service';
import { Repository } from 'typeorm';
import { ReqAddSellerDto, ReqUpdataSelfDto, ReqUpdateSellerDto } from './dto/req-seller.dto';
import { Seller } from './entities/seller.entity';
export declare class SellerService {
    private readonly sellerRepository;
    private readonly sharedService;
    private readonly redis;
    constructor(sellerRepository: Repository<Seller>, sharedService: SharedService, redis: Redis);
    sellerAllInfo(sellerId: string): Promise<Seller>;
    findOneBySellerId(sellerId: string): Promise<Seller>;
    addSeller(reqAddSellerDto: ReqAddSellerDto): Promise<void>;
    updateSeller(reqUpdateSellerDto: ReqUpdateSellerDto): Promise<void>;
    delete(sellerId: string, sellerIdOper: string): Promise<import("typeorm").UpdateResult>;
    findById(sellerId: string): Promise<Seller>;
    changeStatus(sellerId: string, state: string, updateBy: string): Promise<import("typeorm").UpdateResult>;
    updataProfile(reqUpdataSelfDto: ReqUpdataSelfDto, sellerId: string): Promise<import("typeorm").UpdateResult>;
}
