/// <reference types="node" />
/// <reference types="multer" />
import { Type } from '@nestjs/common';
import { DictService } from 'src/modules/system/dict/dict.service';
export declare class ExcelService {
    private readonly dictService;
    constructor(dictService: DictService);
    export<Model, TModel extends Type<Model>>(model: TModel, list: Model[]): Promise<Buffer>;
    import<TModel extends Type<any>>(model: TModel, file: Express.Multer.File): Promise<any[]>;
    importTemplate<TModel extends Type<any>>(model: TModel): Promise<Buffer>;
    private formatExport;
    private formatImport;
}
