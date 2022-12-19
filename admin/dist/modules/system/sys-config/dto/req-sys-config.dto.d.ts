import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { SysConfig } from '../entities/sys-config.entity';
declare const ReqAddConfigDto_base: import("@nestjs/common").Type<Omit<SysConfig, "configId">>;
export declare class ReqAddConfigDto extends ReqAddConfigDto_base {
}
export declare class ReqConfigListDto extends PaginationDto {
    configName?: string;
    configKey?: string;
    configType?: string;
    params: ParamsDto;
}
export {};
