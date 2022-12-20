/*
https://docs.nestjs.com/providers#services
*/

import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { ConsoleLogger, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { PaginatedDto } from "src/common/dto/paginated.dto";
import { ApiException } from "src/common/exceptions/api.exception";
import { Between, FindOptionsWhere, Like, Not, Repository } from "typeorm";
import {
  ReqAddGoodsDto,
  ReqGoodsListByUrlDto,
  ReqGoodsListDto,
} from "./dto/req-sys-goods.dto";
import { SharedService } from "src/shared/shared.service";
import { HttpServiceApi } from "src/modules/system/server-common/httpServiceApi.service";

import { GoodsCopy } from "./entities/sys-goods.entity";
import { SYSGOODS_KEY } from "./sys-goods.contant";
import axios from "axios";
import * as iconv from "iconv-lite";
import { config } from "process";
const http = require("http");
const url = require("url");

@Injectable()
export class SysGoodsService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly HttpServiceApi: HttpServiceApi,
    @InjectRepository(GoodsCopy)
    private readonly sysGoodsRepository: Repository<GoodsCopy>,
    @InjectRedis() private readonly redis: Redis
  ) {}

  /* 新增或更改 */
  async addOrUpdate(ReqAddGoodsDto: ReqAddGoodsDto) {
    const goodsCopy = await this.findByGoodsKey(
      ReqAddGoodsDto.numIid,
      (ReqAddGoodsDto as GoodsCopy).goodsId
    );

    if (goodsCopy) throw new ApiException("参数键值已存在，请更换");
    return await this.sysGoodsRepository.save(ReqAddGoodsDto);
  }
  /* 获取商品信息 */
  async getGoodsInfo(reqGoodsListByUrlDto: ReqGoodsListByUrlDto) {
    const urls = reqGoodsListByUrlDto.urls;
    const goodsInfo = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i].trim();

      try {
        const obj = new URL(url);
        if (url.indexOf("taobao") != -1) {
          const info = await this.reqPlatform(obj.searchParams.get("id"));
          goodsInfo.push(info.item);
        }
      } catch (error) {
        console.log(error);
        throw new ApiException(`无效的地址：${url} 请修改后重试`);
      }
    }

    return this.saveGoodsInfo(goodsInfo, reqGoodsListByUrlDto);
  }
  /* 采集信息入库 */
  async saveGoodsInfo(arr: Array<any>, params: any) {
    // const message = await this.sysGoodsRepository.insert(reqAddGoodsDtoList).catch((err) => {
    //   throw new ApiException(err);
    // })
    this.saveGoodsToplatform(arr, params);
    return { code: 200, msg: "采集中" };
  }

  /* 商品铺货 */
  async saveGoodsToplatform(arr: Array<any>, params: any) {
    let configData: any = {};
    let refundRule = params.refundRule; //退款规则
    //获取类目配置
    await this.HttpServiceApi.getConfig(params.categoryId).then((res) => {
      configData = res.data;
      // let ruleList = configData.categoryConfig.refundRuleList
      // if (!ruleList.includes(refundRule)) {
      //   refundRule = ruleList[0]//默认第一个
      // }
      // configData.refundRuleList 退款规则
    });
    for (let m = 0; m < arr.length; m++) {
      let goods = arr[m];
      let itemPropValues = [];
      //获取类目属性值  从淘宝props 匹配
      try {
        for (let i = 0; i < configData.propConfigs.length; i++) {
          if (!configData.propConfigs[i].required) {
            continue; //不是必填 跳出
          }
          let item: any = {
            propAlias: configData.propConfigs[i].propName,
            radioPropValue: {
              // "propValueId": categoryPropVal[k].propValueId,
              // "propValue": categoryPropVal[k].propValue
            },
            unitPropValueName: "",
            dateRange: {
              endTimeTimestamp: 0,
              startTimeTimestamp: 0,
            },
            datetimeTimestamp: 0,
            propId: configData.propConfigs[i].propId,
            propName: configData.propConfigs[i].propName,
            checkBoxPropValuesList: [],
            textPropValue: "",
            // "unitPropValueId": 0,
            // "imagePropValues": [],
            // "inputType": 8,
            sortNum: configData.propConfigs[i].sortNum,
            // "propType": 2
          };
          await this.HttpServiceApi.getCategoryPropVal(
            params.categoryId,
            configData.propConfigs[i].propId
          ).then((res) => {
            // categoryPropVal.push({ propName: configData.propConfigs[i].propName, ...res.data })
            let categoryPropVal = res.data.propValues;
            for (let j = 0; j < goods.props.length; j++) {
              //从抓取的数据中获取属性值   判断类型是否存在
              if (
                goods.props[j].name.indexOf(
                  configData.propConfigs[i].propName
                ) != -1
              ) {
                //循环从api获取类型值

                for (let k = 0; k < categoryPropVal.length; k++) {
                  if (
                    goods.props[j].value.indexOf(
                      categoryPropVal[k].propValue
                    ) != -1
                  ) {
                    item.radioPropValue.propValueId =
                      categoryPropVal[k].propValueId;
                    item.radioPropValue.propValue =
                      categoryPropVal[k].propValue;
                    item.checkBoxPropValuesList = [
                      {
                        propValueId: categoryPropVal[k].propValueId,
                        propValue: categoryPropVal[k].propValue,
                      },
                    ];
                    break; //跳出循环
                  }
                }
              }
            }
            //如果匹配不到 赋值一个
            if (!item.radioPropValue.propValueId && categoryPropVal[0]) {
              item.radioPropValue.propValueId = categoryPropVal[0].propValueId;
              item.radioPropValue.propValue = categoryPropVal[0].propValue;
              item.checkBoxPropValuesList = [
                {
                  propValueId: categoryPropVal[0].propValueId,
                  propValue: categoryPropVal[0].propValue,
                },
              ];
            }
            itemPropValues.push(item);
          });
        }

        const imgUrl = this.sharedService.addImgPrefix(goods.item_imgs);
        // const detailImg = await this.HttpServiceApi.uploadImg(imgUrl, 2) //上传外部转内部图片
        let reqData: any = {
          title: goods.title.substring(0, 30),
          relItemId: goods.num_iid, //new Date().getTime()
          categoryId: params.categoryId, //走接口
          categoryName: goods.brand, //可不传
          purchaseLimit: false, //限购数量 true limitCount必穿
          // "limitCount": 2,
          itemPropValues: itemPropValues,
          expressTemplateId: params.expressId, //运费模板id
          imageUrls: imgUrl, //商品主图  item.item_imgs
          skuList: this.sharedService.packageSku(
            goods.skus.sku,
            goods.props_img,
            params.computedPrice,
            goods.stock
          ),

          details: goods.title,
          detailImageUrls: [], // 获取desc_img 目前是空的
          // "stockPartner": false,
          itemRemark: "商品备注",
          serviceRule: {
            certStartTime: 0,
            orderPurchaseLimitType: 0,
            deliveryMethod: "",
            certMerchantCode: "",
            customerInfo: {
              customerInfoType: "",
              customerCertificateType: [],
            },
            maxOrderCount: 0,
            theDayOfDeliverGoodsTime: 0,
            immediatelyOnOfflineFlag: params.immediatelyOnOfflineFlag,
            unavailableTimeRule: {
              weeks: [],
              holidays: [],
              timeRanges: [],
            },
            minOrderCount: 0,
            priceProtectDays: 0,
            refundRule: refundRule,
            servicePromise: {
              freshRotRefund: false,
              brokenRefund: false,
              allergyRefund: false,
            },
            certExpireType: 0,
            certExpDays: 0,
            certEndTime: 0,
          },
          // "saleTimeFlag": false,
          timeOfSale: 0,
          // "payWay": 2,
          multipleStock: false,
          poiIds: [],
        };
        if (params.deliveryTime !== 0) {
          reqData.serviceRule.promiseDeliveryTime = params.deliveryTime;
        } else if (params.time !== 0) {
          reqData.serviceRule.deliverGoodsInteralTime = params.time;
        }

        const data = await this.sharedService.post(reqData, "open.item.new");
        goods.message = data.data.error_msg;
        if (data.data.result === 1) {
          //上架快手成功
          /*更新商品详情图片 */
          this.HttpServiceApi.updateDetailImg({
            kwaiItemId: data.data.data.kwaiItemId,
            detailImageUrls: imgUrl,
          });
        } else {
          console.log(data.data);
        }
        /*采集商品记录入库 */
        // let reqAddGoodsDtoList: Array<ReqAddGoodsDto> = arr;  如果是list可使用insert批量
        let reqAddGoodsDto: ReqAddGoodsDto = goods;
        this.sysGoodsRepository.save(reqAddGoodsDto).catch((err) => {
          // throw new ApiException(err);
        });
      } catch (error) {
        throw new ApiException(error);
      }
    }
  }
  /*请求三方平台 */
  async reqPlatform(num_iid: string) {
    try {
      let { data } = await axios.get(
        // `https://api-gw.onebound.cn/taobao/item_get`,
        `http://localhost:1024/goods.json`,
        {
          responseType: "arraybuffer",
          params: {
            key: "t3522825570",
            secret: "20221015",
            api_name: "item_get",
            num_iid: num_iid,
            is_promotion: 1,
          },
        }
      );
      return (data = JSON.parse(iconv.decode(data, "utf-8")));
    } catch (error) {
      throw new ApiException(error);
    }
  }
  /* 分页查询 */
  async list(
    reqGoodsListDto: ReqGoodsListDto
  ): Promise<PaginatedDto<GoodsCopy>> {
    const where: FindOptionsWhere<GoodsCopy> = {};
    if (reqGoodsListDto.numIid) {
      where.numIid = Like(`%${reqGoodsListDto.numIid}%`);
    }

    if (reqGoodsListDto.params) {
      where.createTime = Between(
        reqGoodsListDto.params.beginTime,
        moment(reqGoodsListDto.params.endTime).add(1, "day").format()
      );
    }
    where.delFlag = "0";
    const result = await this.sysGoodsRepository.findAndCount({
      where,
      skip: reqGoodsListDto.skip,
      take: reqGoodsListDto.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* 通过id查询 */
  async findById(goodsId: number) {
    return await this.sysGoodsRepository.findOneBy({ goodsId });
  }
  /* 根据ID删除-修改状态 */
  async delete(goodsId: number[] | string[]) {
    return this.sysGoodsRepository
      .createQueryBuilder()
      .update()
      .set({ delFlag: "2" })
      .where({
        goodsId,
      })
      .execute();
  }

  /* 通过id数组删除-物理删除 */
  async deleteReal(goods_id: number[] | string[]) {
    return await this.sysGoodsRepository.delete(goods_id);
  }

  /* 通过字参数键名查询 */
  async findByGoodsKey(numIid: string, goodsId?: number) {
    const where: FindOptionsWhere<GoodsCopy> = { numIid };
    if (goodsId) {
      where.goodsId = Not(goodsId);
    }
    return await this.sysGoodsRepository.findOne({ where });
  }

  /* 通过参数键名 懒查询参数值,并缓存进入redis  */
  async lazyFindByConfigKey(goodsId: number) {
    let GoodsValue = await this.redis.get(`${SYSGOODS_KEY}:${goodsId}`);
    if (GoodsValue) {
      return GoodsValue;
    } else {
      const sysGoods = await this.sysGoodsRepository.findOneBy({ goodsId });
      GoodsValue = sysGoods ? sysGoods.title : "";
      await this.redis.set(`${SYSGOODS_KEY}:${goodsId}`, GoodsValue);
      return GoodsValue;
    }
  }

  /* 清除缓存数据 */
  async refreshCache() {
    const keyArr = await this.redis.keys(`${SYSGOODS_KEY}:*`);
    if (keyArr && keyArr.length) {
      await this.redis.del(keyArr);
    }
  }
}
