import { Redis } from '@nestjs-modules/ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ReqOnline } from './dto/req-online.dto';
import { ResOnlineDto } from './dto/res-online.dto';
export declare class OnlineService {
    private readonly redis;
    constructor(redis: Redis);
    online({ ipaddr, userName, }: ReqOnline): Promise<PaginatedDto<ResOnlineDto>>;
    deletOnline(tokenKey: string): Promise<void>;
}
