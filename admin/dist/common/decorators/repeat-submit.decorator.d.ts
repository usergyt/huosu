export declare class RepeatSubmitOption {
    interval?: number;
    message?: string;
}
export declare const RepeatSubmit: (option?: RepeatSubmitOption) => import("@nestjs/common").CustomDecorator<string>;
