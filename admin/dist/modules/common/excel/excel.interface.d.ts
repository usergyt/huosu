import { ExcelTypeEnum } from './excel.enum';
import { DictData } from 'src/modules/system/dict/entities/dict_data.entity';
export interface ExcelOption {
    sort?: number;
    name: string;
    dateFormat?: string;
    dictType?: string;
    readConverterExp?: any;
    separator?: string;
    suffix?: string;
    defaultValue?: string;
    type?: ExcelTypeEnum;
}
export interface ExcelOptionAll extends ExcelOption {
    propertyKey: string;
    dictDataArr: DictData[];
}
