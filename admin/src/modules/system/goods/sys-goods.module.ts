import { SysGoodsService } from './sys-goods.service';
import { SysGoodsController } from './sys-goods.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsCopy } from './entities/sys-goods.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsCopy])],
  controllers: [SysGoodsController],
  providers: [SysGoodsService],
})
export class SysGoodsModule {}
