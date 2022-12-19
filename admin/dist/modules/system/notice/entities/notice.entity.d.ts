import { BaseEntity } from 'src/common/entities/base.entity';
export declare class Notice extends BaseEntity {
    noticeId: number;
    noticeTitle: string;
    noticeType: string;
    noticeContent: string;
    status: string;
}
