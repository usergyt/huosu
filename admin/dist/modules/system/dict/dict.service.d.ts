import { Redis } from '@nestjs-modules/ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository } from 'typeorm';
import { ReqAddDictDataDto, ReqAddDictTypeDto, ReqDictDataListDto, ReqDictTypeListDto, ReqUpdateDictDataDto } from './dto/req-dict.dto';
import { DictData } from './entities/dict_data.entity';
import { DictType } from './entities/dict_type.entity';
export declare class DictService {
    private readonly dictTypeRepository;
    private readonly dictDataRepository;
    private readonly redis;
    constructor(dictTypeRepository: Repository<DictType>, dictDataRepository: Repository<DictData>, redis: Redis);
    addOrUpdateType(reqAddDictTypeDto: ReqAddDictTypeDto): Promise<void>;
    typeList(reqDictTypeListDto: ReqDictTypeListDto): Promise<{
        rows: DictType[];
        total: number;
    }>;
    findByDictType(dictType: string, dictId?: number): Promise<DictType>;
    deleteByDictIdArr(dictIdArr: string[] | number[]): Promise<void>;
    findDictTypeById(dictId: number): Promise<DictType>;
    getDictDataByDictType(dictType: string): Promise<DictData[]>;
    refreshCache(): Promise<void>;
    dictDataList(reqDictDataListDto: ReqDictDataListDto): Promise<PaginatedDto<DictData>>;
    addOrUpdateDictData(reqAddDictDataDto: ReqAddDictDataDto): Promise<DictData>;
    findDictDataById(dictCode: number): Promise<ReqUpdateDictDataDto>;
    deleteDictDataByids(dictDataArr: number[] | string[]): Promise<import("typeorm").DeleteResult>;
    getDictDataByTypeOrValue(dictType: string, dictValue: string, dictCode?: number): Promise<DictData>;
}
