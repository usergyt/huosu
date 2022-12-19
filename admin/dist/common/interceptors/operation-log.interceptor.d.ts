import { Redis } from '@nestjs-modules/ioredis';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { OperLog } from 'src/modules/monitor/log/entities/oper_log.entity';
import { LogService } from 'src/modules/monitor/log/log.service';
import { SharedService } from 'src/shared/shared.service';
import { AjaxResult } from '../class/ajax-result.class';
export declare class OperationLogInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly redis;
    private readonly logService;
    private readonly sharedService;
    constructor(reflector: Reflector, redis: Redis, logService: LogService, sharedService: SharedService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    log(context: ExecutionContext, data: AjaxResult): Promise<OperLog>;
}
