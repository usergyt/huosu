import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { DictData } from '../entities/dict_data.entity';
import { DictType } from '../entities/dict_type.entity';
declare const ReqAddDictTypeDto_base: import("@nestjs/common").Type<Omit<DictType, "dictId">>;
export declare class ReqAddDictTypeDto extends ReqAddDictTypeDto_base {
}
export declare class ReqDictTypeListDto extends PaginationDto {
    dictName?: string;
    dictType?: string;
    status?: string;
    params?: ParamsDto;
}
export declare class ReqDictDataListDto extends PaginationDto {
    dictType: string;
    dictLabel: string;
    status: string;
}
declare const ReqUpdateDictDataDto_base: import("@nestjs/common").Type<Omit<DictData, "dictType">>;
export declare class ReqUpdateDictDataDto extends ReqUpdateDictDataDto_base {
    dictType: string;
}
declare const ReqAddDictDataDto_base: import("@nestjs/common").Type<Omit<ReqUpdateDictDataDto, "dictCode">>;
export declare class ReqAddDictDataDto extends ReqAddDictDataDto_base {
}
export {};
