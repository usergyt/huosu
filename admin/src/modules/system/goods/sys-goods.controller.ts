/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataObj } from 'src/common/class/data-obj.class';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { Keep } from 'src/common/decorators/keep.decorator';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ReqAddGoodsDto, ReqGoodsListDto, ReqGoodsListByUrlDto } from './dto/req-sys-goods.dto';
import { GoodsCopy } from './entities/sys-goods.entity';
import { SysGoodsService } from './sys-goods.service';
import { HttpServiceApi } from 'src/modules/system/server-common/httpServiceApi.service';
import { User as UserDec } from 'src/common/decorators/user.decorator';

@ApiTags('商品复制')
@Controller('system/goods')
export class SysGoodsController {
  constructor(
    private readonly sysGoodsService: SysGoodsService,
    private readonly excelService: ExcelService,
    private readonly HttpServiceApi: HttpServiceApi
  ) { }

  /* 新增商品 */
  @RepeatSubmit()
  @Post()
  @Log({
    title: '商品新增',
    businessType: BusinessTypeEnum.insert,
  })
  @RequiresPermissions('system:goods:add')
  async add(
    @Body() reqAddGoodsDto: ReqAddGoodsDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddGoodsDto.createBy = reqAddGoodsDto.updateBy = userName;
    await this.sysGoodsService.addOrUpdate(reqAddGoodsDto);
  }

  /* 获取采集地址-搬家 */
  @Post('collect')
  @RequiresPermissions('system:goods:query')

  async collectList(@Body() reqGoodsListByUrlDto: ReqGoodsListByUrlDto) {

    return await this.sysGoodsService.getGoodsInfo(reqGoodsListByUrlDto)
  }

  /* 分页查询参数列表 */
  @Get('tasklist')
  // @RequiresPermissions('system:goods:query')
  @ApiPaginatedResponse(GoodsCopy)
  async list(@Query(PaginationPipe) reqGoodsListDto: ReqGoodsListDto) {
    const tasklist = await this.sysGoodsService.list(reqGoodsListDto);
    return DataObj.create(tasklist);
  }

  /* 删除记录 */
  @Delete(':goods_id')
  @Log({
    title: '复制记录',
    businessType: BusinessTypeEnum.delete,
  })
  @RequiresPermissions('system:goods:remove')
  async delete(@Param('goods_id') goods_id: string) {

    await this.sysGoodsService.delete(goods_id.split(','));
  }
  /* 获取类目 */
  @Get('categoryList')
  // @RequiresPermissions('system:goods:add')

  async getCategory() {
    return await this.HttpServiceApi.getCategory()
  }
  /* 获取运费模版 */

  @Get('expressList')

  async getExpressList(@User(UserEnum.userId, UserInfoPipe) userId: string) {

    return await this.HttpServiceApi.getExpressList()
  }
  /* 获取运费模版自定义 */

  @Get('expressCustomList')

  async getExpressCustomList(@User(UserEnum.userId, UserInfoPipe) userId: string) {
    return await this.HttpServiceApi.getExressCustomTempate(1)
  }
  /* 提交 */
  @Post('submit')
  // @RequiresPermissions('system:goods:add')

  async submit(@Body() reqGoodsListByUrlDto: ReqGoodsListByUrlDto) {

    return await this.sysGoodsService.getGoodsInfo(reqGoodsListByUrlDto)

  }

  /////////////////////////////////////////////////////////////////////////


  /* 清除缓存 */
  @Delete('refreshCache')
  @Log({
    title: '参数设置',
    businessType: BusinessTypeEnum.clean,
  })
  async refreshCache() {
    await this.sysGoodsService.refreshCache();
  }

  /* 通过 configKey 查询参数(缓存查询) */
  @Get('/configKey/:configKey')
  @ApiDataResponse(typeEnum.string, GoodsCopy)
  async oneByconfigKey(@Param('configKey') configKey: number) {
    const sysConfig = await this.sysGoodsService.lazyFindByConfigKey(configKey);
    return DataObj.create(sysConfig);
  }

  /* 通过id查询参数 */
  @Get(':configId')
  @RequiresPermissions('system:goods:query')
  @ApiDataResponse(typeEnum.object, GoodsCopy)
  async one(@Param('configId') configId: number) {
    const sysConfig = await this.sysGoodsService.findById(configId);
    return DataObj.create(sysConfig);
  }

  /* 修改参数 */
  @RepeatSubmit()
  @Put()
  @Log({
    title: '参数设置',
    businessType: BusinessTypeEnum.update,
  })
  @RequiresPermissions('system:goods:edit')
  async updata(
    @Body() sysConfig: GoodsCopy,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    sysConfig.updateBy = userName;
    await this.sysGoodsService.addOrUpdate(sysConfig);
  }




}
