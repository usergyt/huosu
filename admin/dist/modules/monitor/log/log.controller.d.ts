import { StreamableFile } from '@nestjs/common';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ReqLogininforDto, ReqOperLogDto } from './dto/req-log.dto';
import { Logininfor } from './entities/logininfor.entity';
import { OperLog } from './entities/oper_log.entity';
import { LogService } from './log.service';
export declare class LogController {
    private readonly logService;
    private readonly excelService;
    constructor(logService: LogService, excelService: ExcelService);
    operLogList(reqOperLogDto: ReqOperLogDto): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<OperLog>>;
    cleanOperLog(): Promise<void>;
    deleteOperLog(operLogIds: string): Promise<void>;
    exportOperlog(reqOperLogDto: ReqOperLogDto): Promise<StreamableFile>;
    logininforList(reqLogininforDto: ReqLogininforDto): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<Logininfor>>;
    cleanLogininfor(): Promise<void>;
    deleteLogininfor(logininforIds: string): Promise<void>;
    exportLogininfor(reqLogininforDto: ReqLogininforDto): Promise<StreamableFile>;
}
