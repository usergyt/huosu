import { Redis } from '@nestjs-modules/ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository } from 'typeorm';
import { ReqAddConfigDto, ReqConfigListDto } from './dto/req-sys-config.dto';
import { SysConfig } from './entities/sys-config.entity';
export declare class SysConfigService {
    private readonly sysConfigRepository;
    private readonly redis;
    constructor(sysConfigRepository: Repository<SysConfig>, redis: Redis);
    addOrUpdate(reqAddConfigDto: ReqAddConfigDto): Promise<ReqAddConfigDto & SysConfig>;
    list(reqConfigListDto: ReqConfigListDto): Promise<PaginatedDto<SysConfig>>;
    findById(configId: number): Promise<SysConfig>;
    delete(configIdArr: number[] | string[]): Promise<import("typeorm").DeleteResult>;
    findByConfigKey(configKey: string, configId?: number): Promise<SysConfig>;
    lazyFindByConfigKey(configKey: string): Promise<string>;
    refreshCache(): Promise<void>;
}
