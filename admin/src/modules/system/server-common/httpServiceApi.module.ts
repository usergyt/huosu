/*
 * @Author: guyatao
 * @Date: 2021-12-08 16:44:29
 * @LastEditTime: 2022-12-09 22:06:04
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 公共模块
 * @FilePath: /meimei-admin/src/shared/shared.module.ts
 
 */
import { HttpServiceApi } from './httpServiceApi.service';
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ReponseTransformInterceptor } from 'src/common/interceptors/reponse-transform.interceptor';
import { OperationLogInterceptor } from 'src/common/interceptors/operation-log.interceptor';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PermissionAuthGuard } from 'src/common/guards/permission-auth.guard';
import { RoleAuthGuard } from 'src/common/guards/role-auth.guard';
import { LogModule } from 'src/modules/monitor/log/log.module';
import { BullModule } from '@nestjs/bull';
import { DataScopeInterceptor } from 'src/common/interceptors/data-scope.interceptor';
import { RepeatSubmitGuard } from 'src/common/guards/repeat-submit.guard';
import { DemoEnvironmentGuard } from 'src/common/guards/demo-environment.guard';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    HttpServiceApi,],
  exports: [HttpServiceApi],
})
export class HttpServiceApiModule { }
