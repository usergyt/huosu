/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SellerEnum } from 'src/common/decorators/user.decorator';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import {
  ReqAddSellerDto, ReqUpdateSellerDto
} from './dto/req-seller.dto';
import { ResSellerDto, ResSellerInfoDto } from './dto/res-seller.dto';
import { User } from './entities/user.entity';
import { User as UserDec, Seller as SellerDec } from 'src/common/decorators/user.decorator';
import { SellerService } from './seller.service';
import { ApiException } from 'src/common/exceptions/api.exception';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { Keep } from 'src/common/decorators/keep.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { DataScope } from 'src/common/decorators/datascope.decorator';
import { DataScopeSql } from 'src/common/decorators/data-scope-sql.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { ReqChangStatusDto } from 'src/modules/monitor/job/dto/req-job.dto';

@ApiTags('商户管理')
@Controller('system/seller')
export class SellerController {
  constructor(
    private readonly sellerService: SellerService,
  ) { }





  /* 获取用户信息 */
  @Get('profile')
  async profile(@SellerDec(SellerEnum.sellerId) sellerId: string) {

    const data = await this.sellerService.sellerAllInfo(sellerId);
    return {
      data,
    };
  }

  /* 更改个人用户信息 */
  @RepeatSubmit()
  @Put('profile')
  @Log({
    title: '商户管理',
    businessType: BusinessTypeEnum.update,
  })
  async updataProfile(
    @Body() reqUpdataSelfDto: ReqUpdateSellerDto,
    @SellerDec(SellerEnum.sellerId) sellerId: string,
  ) {
    await this.sellerService.updataProfile(reqUpdataSelfDto, sellerId);
  }

  /* 通过id查询用户信息 */
  @Get(':sellerId')
  // @RequiresPermissions('system:user:query')
  async one(@Param('sellerId') sellerId: string): Promise<ResSellerDto> {
    const seller = (await this.sellerService.sellerAllInfo(sellerId)) as ResSellerDto;
    return seller
  }

  /* 新增用户 */
  @RepeatSubmit()
  @Post()
  // @RequiresPermissions('system:user:add')
  @Log({
    title: '商户管理',
    businessType: BusinessTypeEnum.insert,
  })
  async add(
    @Body() reqAddSellerDto: ReqAddSellerDto,
    @SellerDec(SellerEnum.sellerId, UserInfoPipe) sellerId: string,
  ) {
    const seller = await this.sellerService.findOneBySellerId(
      reqAddSellerDto.sellerId,
    );
    if (seller) throw new ApiException('该用户名已存在，请更换');
    reqAddSellerDto.createBy = reqAddSellerDto.updateBy = sellerId;
    await this.sellerService.addSeller(reqAddSellerDto);
  }



  /* 改变用户状态 */
  @RepeatSubmit()
  @Put('changeStatus')
  async changeStatus(
    @Body() reqChangeStatusDto: ReqAddSellerDto,
    @SellerDec(SellerEnum.sellerId, UserInfoPipe) sellerId: string,
  ) {
    await this.sellerService.changeStatus(
      reqChangeStatusDto.sellerId,
      reqChangeStatusDto.state,
      sellerId,
    );
  }


}
