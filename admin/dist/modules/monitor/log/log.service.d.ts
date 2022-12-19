import { Redis } from '@nestjs-modules/ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { SharedService } from 'src/shared/shared.service';
import { Repository } from 'typeorm';
import { ReqLogininforDto, ReqOperLogDto } from './dto/req-log.dto';
import { Logininfor } from './entities/logininfor.entity';
import { OperLog } from './entities/oper_log.entity';
import { Request } from 'express';
export declare class LogService {
    private readonly logininforRepository;
    private readonly operLogRepository;
    private readonly redis;
    private readonly sharedService;
    constructor(logininforRepository: Repository<Logininfor>, operLogRepository: Repository<OperLog>, redis: Redis, sharedService: SharedService);
    addOperLog(operLog: OperLog): Promise<OperLog>;
    operLogList(reqOperLogDto: ReqOperLogDto): Promise<PaginatedDto<OperLog>>;
    deleteOperLog(operLogArr: string[] | number[]): Promise<import("typeorm").DeleteResult>;
    cleanOperLog(): Promise<import("typeorm").DeleteResult>;
    addLogininfor(request: Request, msg: string, token?: string): Promise<Logininfor>;
    logininforList(reqLogininforDto: ReqLogininforDto): Promise<PaginatedDto<Logininfor>>;
    deleteLogininfor(logininforArr: string[] | number[]): Promise<import("typeorm").DeleteResult>;
    cleanLogininfor(): Promise<import("typeorm").DeleteResult>;
}
