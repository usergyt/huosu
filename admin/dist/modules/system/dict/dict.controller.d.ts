import { StreamableFile } from '@nestjs/common';
import { DataObj } from 'src/common/class/data-obj.class';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { DictService } from './dict.service';
import { ReqAddDictDataDto, ReqAddDictTypeDto, ReqDictDataListDto, ReqDictTypeListDto, ReqUpdateDictDataDto } from './dto/req-dict.dto';
import { DictData } from './entities/dict_data.entity';
import { DictType } from './entities/dict_type.entity';
export declare class DictController {
    private readonly dictService;
    private readonly excelService;
    constructor(dictService: DictService, excelService: ExcelService);
    addType(reqAddDictTypeDto: ReqAddDictTypeDto, userName: string): Promise<void>;
    typeList(reqDictTypeListDto: ReqDictTypeListDto): Promise<PaginatedDto<DictType>>;
    refreshCache(): Promise<void>;
    deleteDictType(typeIds: string): Promise<void>;
    oneDictType(typeId: number): Promise<DataObj<DictType>>;
    updateDictType(dictType: DictType, userName: string): Promise<void>;
    dictDataByDictType(dictType: string): Promise<DataObj<DictData[]>>;
    dictDataList(reqDictDataListDto: ReqDictDataListDto): Promise<PaginatedDto<DictData>>;
    addDictData(reqAddDictDataDto: ReqAddDictDataDto, userName: string): Promise<void>;
    oneDictData(dictCode: number): Promise<DataObj<ReqUpdateDictDataDto>>;
    updateDictData(reqUpdateDictDataDto: ReqUpdateDictDataDto, userName: string): Promise<void>;
    deleteDictData(dictDatas: string): Promise<void>;
    export(reqDictTypeListDto: ReqDictTypeListDto): Promise<StreamableFile>;
    exportData(reqDictDataListDto: ReqDictDataListDto): Promise<StreamableFile>;
}
