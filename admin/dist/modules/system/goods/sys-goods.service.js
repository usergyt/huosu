"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysGoodsService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const typeorm_2 = require("typeorm");
const shared_service_1 = require("../../../shared/shared.service");
const httpServiceApi_service_1 = require("../server-common/httpServiceApi.service");
const sys_goods_entity_1 = require("./entities/sys-goods.entity");
const sys_goods_contant_1 = require("./sys-goods.contant");
const axios_1 = require("axios");
const iconv = require("iconv-lite");
const http = require("http");
const url = require("url");
let SysGoodsService = class SysGoodsService {
    constructor(sharedService, HttpServiceApi, sysGoodsRepository, redis) {
        this.sharedService = sharedService;
        this.HttpServiceApi = HttpServiceApi;
        this.sysGoodsRepository = sysGoodsRepository;
        this.redis = redis;
    }
    async addOrUpdate(ReqAddGoodsDto) {
        const goodsCopy = await this.findByGoodsKey(ReqAddGoodsDto.numIid, ReqAddGoodsDto.goodsId);
        if (goodsCopy)
            throw new api_exception_1.ApiException("参数键值已存在，请更换");
        return await this.sysGoodsRepository.save(ReqAddGoodsDto);
    }
    async getGoodsInfo(reqGoodsListByUrlDto) {
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
            }
            catch (error) {
                console.log(error);
                throw new api_exception_1.ApiException(`无效的地址：${url} 请修改后重试`);
            }
        }
        return this.saveGoodsInfo(goodsInfo, reqGoodsListByUrlDto);
    }
    async saveGoodsInfo(arr, params) {
        let reqAddGoodsDtoList = arr;
        return this.saveGoodsToplatform(arr, params);
    }
    async saveGoodsToplatform(arr, params) {
        const goods = arr[0];
        let configData = {};
        let itemPropValues = [];
        await this.HttpServiceApi.getConfig(params.categoryId).then((res) => {
            configData = res.data;
        });
        try {
            for (let i = 0; i < configData.propConfigs.length; i++) {
                if (!configData.propConfigs[i].required) {
                    continue;
                }
                let item = {
                    propAlias: configData.propConfigs[i].propName,
                    radioPropValue: {},
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
                    sortNum: configData.propConfigs[i].sortNum,
                };
                await this.HttpServiceApi.getCategoryPropVal(params.categoryId, configData.propConfigs[i].propId).then((res) => {
                    let categoryPropVal = res.data.propValues;
                    for (let j = 0; j < goods.props.length; j++) {
                        if (goods.props[j].name.indexOf(configData.propConfigs[i].propName) !=
                            -1) {
                            for (let k = 0; k < categoryPropVal.length; k++) {
                                if (goods.props[j].value.indexOf(categoryPropVal[k].propValue) !=
                                    -1) {
                                    item.radioPropValue.propValueId =
                                        categoryPropVal[k].propValueId;
                                    item.radioPropValue.propValue = categoryPropVal[k].propValue;
                                    item.checkBoxPropValuesList = [
                                        {
                                            propValueId: categoryPropVal[k].propValueId,
                                            propValue: categoryPropVal[k].propValue,
                                        },
                                    ];
                                    break;
                                }
                            }
                        }
                    }
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
        }
        catch (error) {
            console.log(error);
            throw new api_exception_1.ApiException(error);
        }
        try {
            const data = await this.sharedService.post({
                title: goods.title.substring(0, 30),
                relItemId: goods.num_iid,
                categoryId: params.categoryId,
                categoryName: goods.brand,
                purchaseLimit: false,
                itemPropValues: itemPropValues,
                expressTemplateId: 17658204754,
                imageUrls: this.sharedService.addImgPrefix(goods.item_imgs),
                skuList: this.sharedService.packageSku(goods.skus.sku, goods.props_img),
                details: '',
                detailImageUrls: this.sharedService.addImgPrefix(goods.props_img),
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
                    unavailableTimeRule: {
                        weeks: [],
                        holidays: [],
                        timeRanges: [],
                    },
                    minOrderCount: 0,
                    priceProtectDays: 0,
                    refundRule: "1",
                    servicePromise: {
                        freshRotRefund: false,
                        brokenRefund: false,
                        allergyRefund: false,
                    },
                    certExpireType: 0,
                    certExpDays: 0,
                    promiseDeliveryTime: 86400,
                    certEndTime: 0,
                },
                timeOfSale: 0,
                multipleStock: false,
                poiIds: [],
            }, "open.item.new");
            return data.data;
        }
        catch (error) {
            throw new api_exception_1.ApiException(error);
        }
    }
    async reqPlatform(num_iid) {
        try {
            let { data } = await axios_1.default.get(`http://localhost/goods.json`, {
                responseType: "arraybuffer",
                params: {
                    key: "t3522825570",
                    secret: "20221015",
                    api_name: "item_get",
                    num_iid: num_iid,
                    is_promotion: 1,
                },
            });
            return (data = JSON.parse(iconv.decode(data, "utf-8")));
        }
        catch (error) {
            throw new api_exception_1.ApiException(error);
        }
    }
    async list(reqGoodsListDto) {
        this.HttpServiceApi.uploadImg(['https://img.alicdn.com/imgextra/i2/1700742561/TB2HABziS8YBeNkSnb4XXaevFXa_!!1700742561.jpg'], 2);
        const where = {};
        if (reqGoodsListDto.numIid) {
            where.numIid = (0, typeorm_2.Like)(`%${reqGoodsListDto.numIid}%`);
        }
        if (reqGoodsListDto.params) {
            where.createTime = (0, typeorm_2.Between)(reqGoodsListDto.params.beginTime, moment(reqGoodsListDto.params.endTime).add(1, "day").format());
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
    async findById(goodsId) {
        return await this.sysGoodsRepository.findOneBy({ goodsId });
    }
    async delete(goodsId) {
        return this.sysGoodsRepository
            .createQueryBuilder()
            .update()
            .set({ delFlag: "2" })
            .where({
            goodsId,
        })
            .execute();
    }
    async deleteReal(goods_id) {
        return await this.sysGoodsRepository.delete(goods_id);
    }
    async findByGoodsKey(numIid, goodsId) {
        const where = { numIid };
        if (goodsId) {
            where.goodsId = (0, typeorm_2.Not)(goodsId);
        }
        return await this.sysGoodsRepository.findOne({ where });
    }
    async lazyFindByConfigKey(goodsId) {
        let GoodsValue = await this.redis.get(`${sys_goods_contant_1.SYSGOODS_KEY}:${goodsId}`);
        if (GoodsValue) {
            return GoodsValue;
        }
        else {
            const sysGoods = await this.sysGoodsRepository.findOneBy({ goodsId });
            GoodsValue = sysGoods ? sysGoods.title : "";
            await this.redis.set(`${sys_goods_contant_1.SYSGOODS_KEY}:${goodsId}`, GoodsValue);
            return GoodsValue;
        }
    }
    async refreshCache() {
        const keyArr = await this.redis.keys(`${sys_goods_contant_1.SYSGOODS_KEY}:*`);
        if (keyArr && keyArr.length) {
            await this.redis.del(keyArr);
        }
    }
};
SysGoodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(sys_goods_entity_1.GoodsCopy)),
    __param(3, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [shared_service_1.SharedService,
        httpServiceApi_service_1.HttpServiceApi,
        typeorm_2.Repository, Object])
], SysGoodsService);
exports.SysGoodsService = SysGoodsService;
//# sourceMappingURL=sys-goods.service.js.map