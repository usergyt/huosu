import { Seller } from 'src/modules/system/user/entities/seller.entity';
export declare class ResImageCaptchaDto {
    img: string;
    uuid: string;
}
export declare class ResLoginDto {
    token: string;
}
export declare class ResSellerDto {
    sellserId: string;
}
export declare class ResInfo {
    seller: Seller;
}
