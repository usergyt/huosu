import { Redis } from '@nestjs-modules/ioredis';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RepeatSubmitGuard implements CanActivate {
    private readonly reflector;
    private readonly redis;
    constructor(reflector: Reflector, redis: Redis);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
