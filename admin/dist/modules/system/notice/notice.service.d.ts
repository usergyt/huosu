import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository } from 'typeorm';
import { ReqAddNoticeDto, ReqNoeiceList } from './dto/req-notice.dto';
import { Notice } from './entities/notice.entity';
export declare class NoticeService {
    private readonly noticeRepository;
    constructor(noticeRepository: Repository<Notice>);
    addOrUpdate(reqAddNoticeDto: ReqAddNoticeDto): Promise<ReqAddNoticeDto & Notice>;
    list(reqNoeiceList: ReqNoeiceList): Promise<PaginatedDto<Notice>>;
    findById(noticeId: number): Promise<Notice>;
    delete(noticeIdArr: number[] | string[]): Promise<import("typeorm").DeleteResult>;
}
