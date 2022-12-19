import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { AjaxResult } from '../class/ajax-result.class';
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
    errorResult(exception: unknown): {
        status: number;
        result: AjaxResult;
    };
}
