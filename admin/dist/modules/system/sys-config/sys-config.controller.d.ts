import { StreamableFile } from '@nestjs/common';
import { DataObj } from 'src/common/class/data-obj.class';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ReqAddConfigDto, ReqConfigListDto } from './dto/req-sys-config.dto';
import { SysConfig } from './entities/sys-config.entity';
import { SysConfigService } from './sys-config.service';
export declare class SysConfigController {
    private readonly sysConfigService;
    private readonly excelService;
    constructor(sysConfigService: SysConfigService, excelService: ExcelService);
    add(reqAddConfigDto: ReqAddConfigDto, userName: string): Promise<void>;
    list(reqConfigListDto: ReqConfigListDto): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<SysConfig>>;
    refreshCache(): Promise<void>;
    oneByconfigKey(configKey: string): Promise<DataObj<string>>;
    one(configId: number): Promise<DataObj<SysConfig>>;
    updata(sysConfig: SysConfig, userName: string): Promise<void>;
    delete(configIds: string): Promise<void>;
    export(reqConfigListDto: ReqConfigListDto): Promise<StreamableFile>;
}
