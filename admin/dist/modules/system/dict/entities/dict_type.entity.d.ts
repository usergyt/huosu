import { BaseEntity } from 'src/common/entities/base.entity';
import { DictData } from './dict_data.entity';
export declare class DictType extends BaseEntity {
    dictId: number;
    dictName: string;
    dictType: string;
    status: string;
    dictDatas: DictData[];
}
