import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogService } from 'src/modules/monitor/log/log.service';
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
    private readonly logService;
    constructor(logService: LogService);
    context: ExecutionContext;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    handleRequest(err: any, user: any, info: any): any;
}
export {};
