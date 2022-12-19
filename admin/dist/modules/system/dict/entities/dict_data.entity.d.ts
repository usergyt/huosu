import { BaseEntity } from 'src/common/entities/base.entity';
import { DictType } from './dict_type.entity';
export declare class DictData extends BaseEntity {
    dictCode: number;
    dictSort: number;
    dictLabel: string;
    dictValue: string;
    cssClass?: string;
    listClass?: string;
    isDefault?: string;
    status: string;
    dictType: DictType;
}
