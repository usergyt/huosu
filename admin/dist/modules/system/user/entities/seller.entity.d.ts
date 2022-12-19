import { BaseEntity } from 'src/common/entities/base.entity';
export declare class Seller extends BaseEntity {
    id: number;
    name: string;
    sex: string;
    head?: string;
    bigHead?: string;
    sellerId: string;
    openId: string;
    staffId: string;
    state: string;
}
