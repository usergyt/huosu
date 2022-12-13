/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-11-16 20:29:30
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-16 21:09:53
 * @FilePath: /huosu/admin/src/modules/system/user/seller.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { storage } from 'src/modules/common/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forFeature([Seller]),
  ],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule { }
