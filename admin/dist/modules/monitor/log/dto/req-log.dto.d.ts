import { PaginationDto } from "src/common/dto/pagination.dto";
import { ParamsDto } from "src/common/dto/params.dto";
export declare class ReqOperLogDto extends PaginationDto {
    title?: string;
    operName?: string;
    businessType?: string;
    status?: number;
    params?: ParamsDto;
}
export declare class ReqLogininforDto extends PaginationDto {
    ipaddr?: string;
    userName?: string;
    status?: string;
    params?: ParamsDto;
}
export declare class ReqOnline {
    ipaddr?: string;
    userName?: string;
}
