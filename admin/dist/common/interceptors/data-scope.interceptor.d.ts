import { Redis } from '@nestjs-modules/ioredis';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { DeptOrUserAlias } from '../decorators/datascope.decorator';
export declare class DataScopeInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly redis;
    constructor(reflector: Reflector, redis: Redis);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    setDataScope(request: any, aliaObj: DeptOrUserAlias): Promise<void>;
}
