import { DataObj } from 'src/common/class/data-obj.class';
import { ReqAddNoticeDto, ReqNoeiceList } from './dto/req-notice.dto';
import { Notice } from './entities/notice.entity';
import { NoticeService } from './notice.service';
export declare class NoticeController {
    private readonly noticeService;
    constructor(noticeService: NoticeService);
    add(reqAddNoticeDto: ReqAddNoticeDto, userName: string): Promise<void>;
    list(reqNoeiceList: ReqNoeiceList): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<Notice>>;
    one(noticeId: number): Promise<DataObj<Notice>>;
    update(notice: Notice, userName: string): Promise<void>;
    delete(noticeIds: string): Promise<void>;
}
