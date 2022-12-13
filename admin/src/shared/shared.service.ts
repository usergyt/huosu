/*
 * @Author: guyatao
 * @Date: 2021-12-08 17:14:57
 * @LastEditTime: 2022-12-12 21:06:26
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 公共方法
 *
 * @FilePath: /meimei-admin/src/shared/shared.service.ts
 
 */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';
import { Request } from 'express';
import axios from 'axios';
import * as iconv from 'iconv-lite';
import * as qs from 'qs';
import { json } from 'stream/consumers';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class SharedService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) { }
  /**
   * 构造树型结构数据
   */
  public handleTree(
    data: any[],
    id?: string,
    parentId?: string,
    children?: string,
  ) {
    const config = {
      id: id || 'id',
      parentId: parentId || 'parentId',
      childrenList: children || 'children',
    };

    const childrenListMap = {};
    const nodeIds = {};
    const tree = [];

    for (const d of data) {
      const parentId = d[config.parentId];
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = [];
      }
      nodeIds[d[config.id]] = d;
      childrenListMap[parentId].push(d);
    }

    for (const d of data) {
      const parentId = d[config.parentId];
      if (nodeIds[parentId] == null) {
        tree.push(d);
      }
    }

    for (const t of tree) {
      adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
      if (childrenListMap[o[config.id]] !== null) {
        o[config.childrenList] = childrenListMap[o[config.id]];
      }
      if (o[config.childrenList]) {
        for (const c of o[config.childrenList]) {
          adaptToChildrenList(c);
        }
      }
    }
    return tree;
  }

  /* 获取请求IP */
  getReqIP(req: Request): string {
    return (
      // 判断是否有反向代理 IP
      (
        (req.headers['x-forwarded-for'] as string) ||
        // 判断后端的 socket 的 IP
        req.socket.remoteAddress ||
        ''
      ).replace('::ffff:', '')
    );
  }

  /* 判断IP是不是内网 */
  IsLAN(ip: string) {
    ip.toLowerCase();
    if (ip == 'localhost') return true;
    let a_ip = 0;
    if (ip == '') return false;
    const aNum = ip.split('.');
    if (aNum.length != 4) return false;
    a_ip += parseInt(aNum[0]) << 24;
    a_ip += parseInt(aNum[1]) << 16;
    a_ip += parseInt(aNum[2]) << 8;
    a_ip += parseInt(aNum[3]) << 0;
    a_ip = (a_ip >> 16) & 0xffff;
    return (
      a_ip >> 8 == 0x7f ||
      a_ip >> 8 == 0xa ||
      a_ip == 0xc0a8 ||
      (a_ip >= 0xac10 && a_ip <= 0xac1f)
    );
  }

  /* 通过ip获取地理位置 */
  async getLocation(ip: string) {
    if (this.IsLAN(ip)) return '内网IP';
    try {
      let { data } = await axios.get(
        `http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
        { responseType: 'arraybuffer' },
      );
      data = JSON.parse(iconv.decode(data, 'gbk'));
      return data.pro + ' ' + data.city;
    } catch (error) {
      return '未知';
    }
  }

  /**
   * @description: AES加密
   * @param {string} msg
   * @param {string} secret
   * @return {*}
   */
  aesEncrypt(msg: string, secret: string): string {
    return CryptoJS.AES.encrypt(msg, secret).toString();
  }

  /**
   * @description: AES解密
   * @param {string} encrypted
   * @param {string} secret
   * @return {*}
   */
  aesDecrypt(encrypted: string, secret: string): string {
    return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
  }

  /**
   * @description: md5加密
   * @param {string} msg
   * @return {*}
   */
  md5(msg: string): string {
    return CryptoJS.MD5(msg).toString();
  }

  /**
   * @description: 生成一个UUID
   * @param {*}
   * @return {*}
   */
  generateUUID(): string {
    return nanoid();
  }

  /**
   * @description: 生成随机数
   * @param {number} length
   * @param {*} placeholder
   * @return {*}
   */
  generateRandomValue(
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  ): string {
    const customNanoid = customAlphabet(placeholder, length);
    return customNanoid();
  }
  /**
   * axios post公用请求
   * @param url 
   * @param param 
   * @param method 
   * @returns 
   */
  async post(
    params: any,
    method: string,
    access_token: string
  ): Promise<any> {
    try {
      // const token = access_token ? access_token : await this.redis.get(`access_token:1478093654`);
      const token = 'ChFvYXV0aC5hY2Nlc3NUb2tlbhJgaFZB1KxF0fTyd4NYX0yK2hhZNey_a5bZIOjLwLAW34L7N9G5DPD9lYEpvRJOYMV8A6it_l8gCnkV4C889uG04nTpvvQvSBcnWPzr5_2AyWDwnRo7RDuyE_KR0yGuyLoAGhJeYh3ez_1OmqcJLgWXKJeQiGEiIBk4HIJ3Y6xLMSB5kq4hiPmt2HyrIicOdEEjoWejkUDlKAUwAQ'

      const date = new Date()
      const p: any = {
        access_token: token,
        appkey: 'ks704250392931801929',
        method: method,
        param: params,
        // param: { "title": "黑色T恤", "relItemId": 16231231243212, "categoryId": 1003, "categoryName": "男女装", "imageUrls": ["http://www.baidu.com/1.jpg", "http://www.baidu.com/2.jpg"], "skuList": [{ "relSkuId": 3703660508488, "skuStock": 10, "skuSalePrice": 1200, "skuNick": "TS9988", "skuProps": [{ "propName": "颜色", "propValueName": "红色", "imageUrl": "http://kuaishou.com/file/a.jpeg", "isMainProp": 1, "propValueGroupId": 0, "propVersion": 1 }], "skuCertificate": { "condition": "9成新", "purchasingChannels": "国行", "batteryEfficiency": "80-90%", "mainBoard": "无维修", "batteryCondition": "原装电池", "screenCondition": "第三方屏幕", "shellCollision": "明显", "reportUrl": "https://m.paipai.com/ppinspect/activeReport", "qualityInspectionNo": "852180", "sn": "353************625", "shellScratch": "明显", "shellPaint": "明显", "deviceSystem": "无越狱/无Root" }, "skuMarketPrice": 1299, "goodsId": "M13213124", "gtinCode": "12345670", "mealDetail": { "mealGroupDTOList": [{ "title": "荤菜", "mealContentDTOList": [{ "title": "萝卜汤", "count": 4, "price": 100 }], "fromNum": 2, "selectNum": 1 }], "lowestPeopleNum": 1, "highestPeopleNum": 2, "remark": "备注" } }], "itemVideoId": 1231212, "purchaseLimit": true, "limitCount": 99, "itemPropValues": [{ "propId": 123213, "radioPropValue": { "propValueId": 4718388, "propValue": "海贼王" }, "checkBoxPropValuesList": [{ "propValueId": 4718388, "propValue": "海贼王" }], "textPropValue": "测试", "datetimeTimestamp": 1577808000000, "dateRange": { "startTimeTimestamp": 1632423413, "endTimeTimestamp": 1643243211 }, "sortNum": 12, "imagePropValues": ["http://kuaishou.com/a.jpg", "http://kuaishou.com/b.jpg"], "propName": "男装风格1", "propAlias": "男装", "inputType": 1, "propType": 1, "unitPropValueId": 1, "unitPropValueName": "ml" }], "details": "商品详情。0+<+长度+<=+1000", "detailImageUrls": ["http://www.baidu.com/1.jpg", "http://www.baidu.com/2.jpg"], "stockPartner": false, "itemRemark": "商品备注", "serviceRule": { "refundRule": "1", "deliverGoodsInteralTime": 345600, "promiseDeliveryTime": 172800, "immediatelyOnOfflineFlag": 0, "deliveryMethod": "logistics：物流配送（默认）", "servicePromise": { "freshRotRefund": true, "brokenRefund": true, "allergyRefund": true }, "unavailableTimeRule": { "weeks": [1, 2], "holidays": [1, 2], "timeRanges": [{ "startTime": 1640078945111, "endTime": 1640078945111 }] }, "certMerchantCode": "merchant", "certExpireType": 1, "certStartTime": 1640078945111, "certEndTime": 1640078945111, "certExpDays": 11, "orderPurchaseLimitType": 1, "minOrderCount": 2, "maxOrderCount": 3, "customerInfo": { "customerInfoType": "1", "customerCertificateType": [1] }, "priceProtectDays": 7 }, "expressTemplateId": 0, "saleTimeFlag": false, "timeOfSale": 1631001896457, "payWay": 2, "multipleStock": false, "poiIds": [111, 231], "whiteBaseImageUrl": "\"http://www.baidu.com/1.jpg\"", "transparentImageUrl": "\"http://www.baidu.com/1.png\"", "shortTitle": "商品短标题", "sellingPoint": "商品卖点", "instructions": "使用说明" },
        signMethod: 'MD5',
        timestamp: 1669195151155,
        version: 1,
        signSecret: '0b2229d81ae32c3d5f60535d4011c25e',
      }

      p.sign = this.md5(this.objectToQuery(p))
      // p.sign = this.md5(qs.stringify(p))
      // p.param = encodeURIComponent(JSON.stringify(p.param))
      let data = await axios({
        method: 'post',
        // headers: { 'content-type': 'application/x-www-form-urlencoded', 'Accept': 'application/json;charset=UTF-8' },
        data: this.objectToQuery(p),
        responseType: 'json',
        url: 'https://openapi.kwaixiaodian.com/' + method.split('.').join('/')
      }).catch(err => {
        console.log(err)
      })
      return data
    } catch (error) {
      return error;
    }
  }
  /**
  * axios get公用请求
  * @param url
  * @param param
  * @param method
  * @returns
  */
  async get(
    params: any,
    method: string,
    access_token: string
  ): Promise<any> {
    try {

      // const token = access_token ? access_token : await this.redis.get(`access_token:1478093654`);
      const token = 'ChFvYXV0aC5hY2Nlc3NUb2tlbhJgaFZB1KxF0fTyd4NYX0yK2hhZNey_a5bZIOjLwLAW34L7N9G5DPD9lYEpvRJOYMV8A6it_l8gCnkV4C889uG04nTpvvQvSBcnWPzr5_2AyWDwnRo7RDuyE_KR0yGuyLoAGhJeYh3ez_1OmqcJLgWXKJeQiGEiIBk4HIJ3Y6xLMSB5kq4hiPmt2HyrIicOdEEjoWejkUDlKAUwAQ'
      const date = new Date()
      const p: any = {
        access_token: token,
        appkey: 'ks704250392931801929',
        method: method,
        param: params,
        signMethod: 'MD5',
        timestamp: date.getTime(),
        version: 1,
        signSecret: '0b2229d81ae32c3d5f60535d4011c25e'
      }
      p.sign = this.md5(this.objectToQuery(p))
      let data = await axios['get'](
        'https://openapi.kwaixiaodian.com/' + method.split('.').join('/'),
        {
          responseType: 'json',
          params: p
        },
      );

      return data
    } catch (error) {
      return error;
    }
  }
  /**
   * 授权
   * @param url 
   * @param params 
   * @param method 
   * @returns 
   */
  async author(
    url: string,
    params: any,
  ): Promise<any> {
    try {
      let p = {
        app_id: 'ks704250392931801929',
        grant_type: 'code',
        code: params.code,
        app_secret: 'r3ajqYlfHYH7lnbFB8d69A'
      }

      let { data } = await axios['get'](
        url,
        {
          responseType: 'json',
          params: p
        },
      );
      return data
    } catch (error) {
      console.log(error)
      return error;
    }
  }
  /**
   * 对象转url参数格式
   * @param obj 
   * @returns 
   */
  objectToQuery(obj) {
    let str = ''
    for (let key in obj) {
      let val = obj[key]
      if (key == 'param') {
        val = JSON.stringify(val)
      }
      str = str + `${key}=${val}&`
    }
    return str.substring(0, str.length - 1)
  }
}
