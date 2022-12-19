export declare enum BusinessTypeEnum {
    other = "1",
    insert = "2",
    update = "3",
    delete = "4",
    grant = "5",
    export = "6",
    import = "7",
    force = "8",
    clean = "9"
}
export declare class LogOption {
    title: string;
    businessType?: BusinessTypeEnum;
    isSaveRequestData?: boolean;
    isSaveResponseData?: boolean;
}
export declare const Log: (logOption: LogOption) => import("@nestjs/common").CustomDecorator<string>;
