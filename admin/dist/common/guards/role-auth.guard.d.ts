import { Redis } from '@nestjs-modules/ioredis';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RoleAuthGuard implements CanActivate {
    private reflector;
    private readonly redis;
    constructor(reflector: Reflector, redis: Redis);
    canActivate(context: ExecutionContext): Promise<true>;
}
