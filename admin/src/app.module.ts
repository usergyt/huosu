/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-10-19 15:44:04
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-12-09 22:07:09
 * @FilePath: /huosu/admin/src/app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { SysConfigModule } from './modules/system/sys-config/sys-config.module';
import { CommonModule } from './modules/common/common.module';
import { LoginModule } from './modules/login/login.module';
import { SharedModule } from './shared/shared.module';
import { ExistingProvider, Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/system/auth/auth.module';
import { UserModule } from './modules/system/user/user.module';
import { SellerModule } from './modules/system/user/seller.module';
import { DictModule } from './modules/system/dict/dict.module';
import { NoticeModule } from './modules/system/notice/notice.module';
import { PostModule } from './modules/system/post/post.module';
import { DeptModule } from './modules/system/dept/dept.module';
import { MenuModule } from './modules/system/menu/menu.module';
import { RoleModule } from './modules/system/role/role.module';
import { LogModule } from './modules/monitor/log/log.module';
import { OnlineModule } from './modules/monitor/online/online.module';
import { JobModule } from './modules/monitor/job/job.module';
import { SysGoodsModule } from './modules/system/goods/sys-goods.module';
import { ServerModule } from './modules/monitor/server/server.module';
import { JobService } from './modules/monitor/job/job.service';
import { HttpServiceApiModule } from './modules/system/server-common/httpServiceApi.module';

import { HttpServiceApi } from './modules/system/server-common/httpServiceApi.service';

/* 将 provider的类名作为别名，方便定时器调用 */
const providers = [JobService];
function createAliasProviders(): ExistingProvider[] {
  const aliasProviders: ExistingProvider[] = [];
  for (const p of providers) {
    aliasProviders.push({
      provide: p.name,
      useExisting: p,
    });
  }
  return aliasProviders;
}
const aliasProviders = createAliasProviders();

@Module({
  imports: [
    /* 配置文件模块 */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    /* 公共模块 */
    SharedModule,

    /* 业务模块 */
    CommonModule,
    LoginModule,
    AuthModule,
    UserModule,
    SellerModule,
    DictModule,
    SysConfigModule,
    NoticeModule,
    PostModule,
    DeptModule,
    MenuModule,
    RoleModule,
    LogModule,
    OnlineModule,
    JobModule,
    SysGoodsModule,
    ServerModule,
    HttpServiceApiModule
  ],
  providers: [...aliasProviders],
})
export class AppModule { }
