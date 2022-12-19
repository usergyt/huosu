import { Redis } from '@nestjs-modules/ioredis';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class UserInfoPipe implements PipeTransform {
    private readonly redis;
    constructor(redis: Redis);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
