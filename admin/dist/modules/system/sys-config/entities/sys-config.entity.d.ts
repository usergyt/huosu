import { BaseEntity } from 'src/common/entities/base.entity';
export declare class SysConfig extends BaseEntity {
    configId: number;
    configName: string;
    configKey: string;
    configValue: string;
    configType: string;
}
