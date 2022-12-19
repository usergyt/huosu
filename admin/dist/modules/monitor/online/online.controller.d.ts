import { ReqOnline } from './dto/req-online.dto';
import { ResOnlineDto } from './dto/res-online.dto';
import { OnlineService } from './online.service';
export declare class OnlineController {
    private readonly onlineService;
    constructor(onlineService: OnlineService);
    online(reqOnline: ReqOnline): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<ResOnlineDto>>;
    deletOnline(tokenKey: string): Promise<void>;
}
