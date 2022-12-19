import { Seller } from '../entities/seller.entity';
declare const ReqAddSellerDto_base: import("@nestjs/common").Type<Omit<Seller, "sellerId">>;
export declare class ReqAddSellerDto extends ReqAddSellerDto_base {
    sellerId: string;
    name: string;
}
declare const ReqUpdateSellerDto_base: import("@nestjs/common").Type<Omit<Seller, "sellerId">>;
export declare class ReqUpdateSellerDto extends ReqUpdateSellerDto_base {
    sellerId: string;
    name: string;
}
export declare class ReqUpdataSelfDto {
}
export {};
