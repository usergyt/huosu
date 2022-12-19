import { Type } from '@nestjs/common';
export declare enum typeEnum {
    'string' = "string",
    'number' = "number",
    'boolean' = "boolean",
    'object' = "object",
    'stringArr' = "stringArr",
    'numberArr' = "numberArr",
    'booleanArr' = "booleanArr",
    'objectArr' = "objectArr"
}
export declare const ApiDataResponse: <TModel extends Type<any>>(type: typeEnum, model?: TModel) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
