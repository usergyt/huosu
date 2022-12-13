/*
https://docs.nestjs.com/providers#services
*/

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { Between, FindOptionsWhere, Like, Not, Repository } from 'typeorm';
import { ReqAddGoodsDto, ReqGoodsListByUrlDto, ReqGoodsListDto } from './dto/req-sys-goods.dto';
import { SharedService } from 'src/shared/shared.service';
import { HttpServiceApi } from 'src/modules/system/server-common/httpServiceApi.service';

import { GoodsCopy } from './entities/sys-goods.entity';
import { SYSGOODS_KEY } from './sys-goods.contant';
import axios from 'axios'
import * as iconv from 'iconv-lite';
import { config } from 'process';
const http = require('http');
const url = require('url')

@Injectable()
export class SysGoodsService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly HttpServiceApi: HttpServiceApi,
    @InjectRepository(GoodsCopy)
    private readonly sysGoodsRepository: Repository<GoodsCopy>,
    @InjectRedis() private readonly redis: Redis,
  ) { }

  /* 新增或更改 */
  async addOrUpdate(ReqAddGoodsDto: ReqAddGoodsDto) {
    const goodsCopy = await this.findByGoodsKey(
      ReqAddGoodsDto.numIid,
      (ReqAddGoodsDto as GoodsCopy).goodsId,
    );

    if (goodsCopy) throw new ApiException('参数键值已存在，请更换');
    return await this.sysGoodsRepository.save(ReqAddGoodsDto);
  }
  /* 获取商品信息 */
  async getGoodsInfo(reqGoodsListByUrlDto: ReqGoodsListByUrlDto) {
    console.log(reqGoodsListByUrlDto)
    const urls = reqGoodsListByUrlDto.urls
    const goodsInfo = []

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i].trim()

      try {
        const obj = new URL(url)
        if (url.indexOf('taobao') != -1) {
          const info = await this.reqPlatform(obj.searchParams.get('id'))
          goodsInfo.push(info.item)
        }
      } catch (error) {
        throw new ApiException(`无效的地址：${url} 请修改后重试`);
      }

    }

    return this.saveGoodsInfo(goodsInfo, reqGoodsListByUrlDto)

  }
  /* 采集信息入库 */
  async saveGoodsInfo(arr: Array<any>, params: any) {
    let reqAddGoodsDtoList: Array<ReqAddGoodsDto> = arr

    const message = await this.sysGoodsRepository.insert(reqAddGoodsDtoList).catch((err) => {
      throw new ApiException(err);
    })
    return this.saveGoodsToplatform(arr, params)
    // return message
  }
  /* 商品铺货 */
  async saveGoodsToplatform(arr: Array<any>, params: any) {
    const goods = arr[0]
    let configData: any = {}
    let categoryPropVal = {}
    //获取类目配置
    await this.HttpServiceApi.getConfig(params.categoryId).then((res) => {
      console.log(res.data)
      configData = res.data
      // configData.refundRuleList 退款规则
    })
    //获取类目属性值  从淘宝props 匹配
    await this.HttpServiceApi.getCategoryPropVal(params.categoryId, configData.propConfigs[0].propId).then((res) => {
      console.log(res.data)
      categoryPropVal = res.data
      // configData.refundRuleList 退款规则
    })

    return { configData, categoryPropVal }
    // console.log('config-', configData)

    const token = await this.redis.get(`access_token:1478093654`);
    try {
      const data = await this.sharedService.post(
        {
          "title": goods.title,
          "relItemId": goods.num_iid,
          "categoryId": params.categoryId, //走接口
          // "categoryName": "垃圾袋",//可不传
          "purchaseLimit": false,//限购数量 true limitCount必穿
          // "limitCount": 2,
          "itemPropValues": [
            {
              "propAlias": "数量",//走接口
              "radioPropValue": {
                "propValueId": 16898200,
                "propValue": "181-280只"
              },
              "unitPropValueName": "",
              // "dateRange": {
              //   "endTimeTimestamp": 0,
              //   "startTimeTimestamp": 0
              // },
              // "datetimeTimestamp": 0,
              "propId": 2900,
              "propName": "数量",
              "checkBoxPropValuesList": [],
              "textPropValue": "",
              "unitPropValueId": 0,
              "imagePropValues": [],
              "inputType": 8,
              "sortNum": 0,
              "propType": 3
            },
            {
              "propAlias": "垃圾袋类型",
              "radioPropValue": {
                "propValueId": 14139976,
                "propValue": "卷装"
              },
              "unitPropValueName": "",
              // "dateRange": {
              //   "endTimeTimestamp": 0,
              //   "startTimeTimestamp": 0
              // },
              // "datetimeTimestamp": 0,
              "propId": 2676,
              "propName": "垃圾袋类型",
              "checkBoxPropValuesList": [],
              "textPropValue": "",
              "unitPropValueId": 0,
              "imagePropValues": [],
              "inputType": 8,
              "sortNum": 0,
              "propType": 3
            },
            {
              "propAlias": "单层厚度",
              "radioPropValue": {
                "propValueId": 14038022,
                "propValue": "其他"
              },
              "unitPropValueName": "",
              // "dateRange": {
              //   "endTimeTimestamp": 0,
              //   "startTimeTimestamp": 0
              // },
              // "datetimeTimestamp": 0,
              "propId": 2422,
              "propName": "单层厚度",
              "checkBoxPropValuesList": [],
              "textPropValue": "",
              "unitPropValueId": 0,
              "imagePropValues": [],
              "inputType": 8,
              "sortNum": 0,
              "propType": 3
            },
            {
              "propAlias": "品牌",
              "radioPropValue": {
                "propValueId": 64015,
                "propValue": "靓涤/Liangdi"
              },
              "unitPropValueName": "",
              "dateRange": {
                "endTimeTimestamp": 0,
                "startTimeTimestamp": 0
              },
              "datetimeTimestamp": 0,
              "propId": 102,
              "propName": "品牌",
              "checkBoxPropValuesList": [],
              "textPropValue": "",
              "unitPropValueId": 0,
              "imagePropValues": [],
              "inputType": 8,
              "sortNum": 2147483647,
              "propType": 2
            },
            {
              "propAlias": "尺码",
              "radioPropValue": {
                "propValueId": 48062595,
                "propValue": "60cm*80cm以上"
              },
              "unitPropValueName": "",
              "dateRange": {
                "endTimeTimestamp": 0,
                "startTimeTimestamp": 0
              },
              "datetimeTimestamp": 0,
              "propId": 6195,
              "propName": "尺码",
              "checkBoxPropValuesList": [
                {
                  "propValueId": 48062595,
                  "propValue": "60cm*80cm以上"
                }
              ],
              "textPropValue": "",
              "unitPropValueId": 0,
              "imagePropValues": [],
              "inputType": 8,
              "sortNum": 0,
              "propType": 2
            }
          ],

          "expressTemplateId": 17658204754,//运费模板id
          "imageUrls": [   //商品主图  item.item_imgs  需上传快手
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-89eb4839471942a9988af0a368bca5a5.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-12eee675c17648babe543caa458b2fd0.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-00cd8aceac844881bce63d94f4fd9f47.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-e4e568ed092f4138a943c58573f8b1f7.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-a28f1dcece9e4493b1819d6ff9710a70.jpg"
          ],
          "skuList": [
            {
              "reserveStock": 0,
              "kwaiItemId": 15283495425654,
              "isValid": 1,
              "skuSalePrice": 2990,
              "skuStock": 200,
              "specification": "8卷120只银钢袋双面特厚2.4一,加厚",
              "updateTime": 1668789408765,
              "volume": 0,
              // "mealDetail": {
              //   "mealGroup": [],
              //   "lowestPeopleNum": 0,
              //   "highestPeopleNum": 0,
              //   "mealGroupDTOList": []
              // },
              "createTime": 1668789408765,
              "relSkuId": 8463046,
              "packageCode": "",
              "imageUrl": "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-a8d64d803a774a2ab625880c0bff3f35.jpg",
              "kwaiSkuId": 45664236378654,
              "skuNick": "",
              "gtinCode": "",
              "skuProps": [
                {
                  "propValueGroupId": 0,
                  "isValid": 1,
                  "propId": 17524638360,
                  "propValueSortNum": 1,
                  "updateTime": 1668789408770,
                  "propName": "颜色分类",
                  "itemId": 15283495425654,
                  "propValueId": 17524638362,
                  "isMainProp": 1,
                  "createTime": 1668789408770,
                  "propVersion": 1,
                  "imageUrl": "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-a8d64d803a774a2ab625880c0bff3f35.jpg",
                  "propSortNum": 1,
                  "propValueName": "8卷120只银钢袋双面特厚2.4一",
                  "propValueRemarks": "",
                  "skuId": 45664236378654
                },
                {
                  "propValueGroupId": 0,
                  "isValid": 1,
                  "propId": 17524638364,
                  "propValueSortNum": 1,
                  "updateTime": 1668789408770,
                  "propName": "厚薄",
                  "itemId": 15283495425654,
                  "propValueId": 17524638368,
                  "isMainProp": 0,
                  "createTime": 1668789408770,
                  "propVersion": 1,
                  "imageUrl": "",
                  "propSortNum": 2,
                  "propValueName": "加厚",
                  "propValueRemarks": "",
                  "skuId": 45664236378654
                }
              ],
              "appkey": "ks661184720351368171"
            },
          ],

          details: goods.desc,
          detailImageUrls: [//在desc中
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-6e1633ae091f44cdab07a138903423ff.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-c3161ba50e5c4092a754aec5ffed4180.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-1b1ef86681a142bb824d4434c694af2c.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-32a819009aeb4b03a0758dcc4c9cf289.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-04d2a7b9f7ff4494831d0d04ecdec926.jpg",
            "https://u1-203.ecukwai.com/bs2/image-kwaishop-product/item-1478093654-de4e7c1abeb34659b32fd0a718e44d07.jpg",],
          // "stockPartner": false,
          "itemRemark": "商品备注",
          "serviceRule": {
            "certStartTime": 0,
            "orderPurchaseLimitType": 0,
            "deliveryMethod": "",
            "certMerchantCode": "",
            "customerInfo": {
              "customerInfoType": "",
              "customerCertificateType": []
            },
            "maxOrderCount": 0,
            "theDayOfDeliverGoodsTime": 0,
            "unavailableTimeRule": {
              "weeks": [],
              "holidays": [],
              "timeRanges": []
            },
            "minOrderCount": 0,
            "priceProtectDays": 0,
            "refundRule": "1",
            "servicePromise": {
              "freshRotRefund": false,
              "brokenRefund": false,
              "allergyRefund": false
            },
            "certExpireType": 0,
            "certExpDays": 0,
            "promiseDeliveryTime": 86400,
            "certEndTime": 0
          },
          // "saleTimeFlag": false,
          "timeOfSale": 0,
          // "payWay": 2,
          "multipleStock": false,
          "poiIds": [],
        },
        'open.item.new',
        token
        // 'ChFvYXV0aC5hY2Nlc3NUb2tlbhJAf_zqHbxm_7o0nygGQ3KbnPjSRidmmBGfzoICz7w_IB_nioVS-3hK5sI9aikLHkLnMyVcjH1CHio-1bpuD1vUoxoSFCYp94Z2QRWABEVIk3hMMaeCIiByGmesU85MdUsz3uEWYuz1iFzoJLLLxt4WCSqgEsnvCSgFMAE'
      )
      return data.data;

    } catch (error) {
      throw new ApiException(error);
    }
  }
  /*请求三方平台 */
  async reqPlatform(num_iid: string) {
    try {
      let { data } = await axios.get(
        // `https://api-gw.onebound.cn/taobao/item_get`,
        `http://localhost:1024/goods.json`,
        {
          responseType: 'arraybuffer',
          params: {
            key: 't3522825570',
            secret: '20221015',
            api_name: 'item_get',
            num_iid: num_iid,
            is_promotion: 1
          }
        },
      );
      return data = JSON.parse(iconv.decode(data, 'utf-8'));
    } catch (error) {
      throw new ApiException(error);
    }
  }
  /* 分页查询 */
  async list(
    reqGoodsListDto: ReqGoodsListDto,
  ): Promise<PaginatedDto<GoodsCopy>> {
    const where: FindOptionsWhere<GoodsCopy> = {};
    if (reqGoodsListDto.numIid) {
      where.numIid = Like(`%${reqGoodsListDto.numIid}%`);
    }


    if (reqGoodsListDto.params) {
      where.createTime = Between(
        reqGoodsListDto.params.beginTime,
        moment(reqGoodsListDto.params.endTime).add(1, 'day').format(),
      );
    }
    where.delFlag = '0'
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
      .set({ delFlag: '2' })
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
      GoodsValue = sysGoods ? sysGoods.title : '';
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
