import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Notice } from '../entities/notice.entity';
declare const ReqAddNoticeDto_base: import("@nestjs/common").Type<Omit<Notice, "noticeId">>;
export declare class ReqAddNoticeDto extends ReqAddNoticeDto_base {
}
export declare class ReqNoeiceList extends PaginationDto {
    noticeTitle: string;
    createBy: string;
    noticeType: string;
}
export {};
