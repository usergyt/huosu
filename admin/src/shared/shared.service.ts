/*
 * @Author: guyatao
 * @Date: 2021-12-08 17:14:57
 * @LastEditTime: 2022-12-18 21:56:20
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 公共方法
 *
 * @FilePath: /meimei-admin/src/shared/shared.service.ts
 
 */
import { ConsoleLogger, Injectable } from "@nestjs/common";
import * as CryptoJS from "crypto-js";
import { customAlphabet, nanoid } from "nanoid";
import { Request, urlencoded } from "express";
import axios from "axios";
import * as iconv from "iconv-lite";
import * as qs from "qs";
import { json } from "stream/consumers";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
var cheerio = require('cheerio')
var FormData = require('form-data');

@Injectable()
export class SharedService {
  constructor(@InjectRedis() private readonly redis: Redis) { }
  /**
   * 构造树型结构数据
   */
  public handleTree(
    data: any[],
    id?: string,
    parentId?: string,
    children?: string
  ) {
    const config = {
      id: id || "id",
      parentId: parentId || "parentId",
      childrenList: children || "children",
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
        (req.headers["x-forwarded-for"] as string) ||
        // 判断后端的 socket 的 IP
        req.socket.remoteAddress ||
        ""
      ).replace("::ffff:", "")
    );
  }

  /* 判断IP是不是内网 */
  IsLAN(ip: string) {
    ip.toLowerCase();
    if (ip == "localhost") return true;
    let a_ip = 0;
    if (ip == "") return false;
    const aNum = ip.split(".");
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
    if (this.IsLAN(ip)) return "内网IP";
    try {
      let { data } = await axios.get(
        `http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
        { responseType: "arraybuffer" }
      );
      data = JSON.parse(iconv.decode(data, "gbk"));
      return data.pro + " " + data.city;
    } catch (error) {
      return "未知";
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
    placeholder = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  ): string {
    const customNanoid = customAlphabet(placeholder, length);
    return customNanoid();
  }

  /**
   * @description: 图片添加http前缀
   * @param {number} length
   * @param {*} placeholder
   * @return {*}
   */
  addImgPrefix(arr: Array<string>): Array<string> {
    try {
      for (let i = 0; i < arr.length; i++) {

        if (arr[i]["url"].indexOf("http:") == -1) {
          arr[i] = `http:${arr[i]["url"]}`;
        }
      }
      return arr;
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 解析html
   * @param html 
   * @returns 
   */
  analysisHtml(html: string): Array<string> {
    try {
      const $ = cheerio.load(html);
      const img = $('img')
      console.log(img)
      return img;
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * @description: 图片添加http前缀
   * @param {number} length
   * @param {*} placeholder
   * @return {*}
   */
  packageSku(arr: Array<string>, imgSkuList: Array<string>): Array<string> {
    let skuList = [];
    const pattern =
      /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;

    try {
      for (let i = 0; i < arr.length; i++) {
        let item: any = {};
        item.relSkuId = Number(arr[i]["sku_id"]);
        item.skuStock = Number(arr[i]["quantity"]);
        item.skuSalePrice = parseInt(arr[i]["price"]) * 100;
        item.gtinCode = "";
        item.skuNick = ""; //sku编码，分仓商品必传

        let propObj = arr[i]["properties_name"]
          .split(arr[i]["properties"] + ":")[1]
          .split(":");
        let skuImg = "";

        if (imgSkuList) {
          skuImg = imgSkuList[arr[i]["properties"]]
            ? "http:" + imgSkuList[arr[i]["properties"]]
            : "";
        }

        item.skuProps = [
          {
            propName: propObj[0], //规格名称
            propValueName: propObj[1].replace("+", "").replace("+", ""), //规格值名称
            imageUrl: skuImg, //图片url, 如果是主属性图片必传
            isMainProp: 1, //1是 0 否 ，是否是主属性，主属性标记为关联sku规格图片
            propValueGroupId: 0, //规格值分组id
            propVersion: 1, //销售属性版本 自定义1，使用类目模板传2
          }
        ];

        skuList.push(item);
      }
    } catch (error) {
      console.log(error);
    }
     return skuList;
  }

  /**
   * axios post公用请求
   * @param url
   * @param param
   * @param method
   * @returns
   */
  async uploadImg(params: any, method: string, imgBytes): Promise<any> {
    try {
      // const token = access_token ? access_token : await this.redis.get(`access_token:1478093654`);
      const token =
        "ChFvYXV0aC5hY2Nlc3NUb2tlbhJAMyi9ZLYsV21AObllo0Ag8tSMBEVn4dZmbFKZs1691AT4gQ3AVZV6-JV55ktc12l1GLBFfxJDGeYbIEjS_S2p-BoS8dsD42CUQrG4hOifcpo8vBuxIiDm-I7RZkmjGGnFHsDhnPVrFX8xhLzfjoyd1SZbdBhG7CgFMAE";

      const date = new Date();
      const p: any = {
        access_token: token,
        appkey: "ks704250392931801929",
        method: method,
        param: params,
        signMethod: "MD5",
        timestamp: date.getTime(),
        version: 1,
        signSecret: "0b2229d81ae32c3d5f60535d4011c25e",
        imgBytes: imgBytes
      };
      p.sign = this.md5(this.objectToQuery(p));
      const d = this.fileParams({ ...p, imgBytes })
      console.log(d)
      // p.sign = this.md5(qs.stringify(p))
      // p.param = encodeURIComponent(JSON.stringify(p.param))
      let data = await axios({
        method: "post",
        headers: { 'content-type': 'multipart/form-data;charset=utf-8' },
        data: d,
        responseType: "json",
        url: "https://openapi.kwaixiaodian.com/" + method.split(".").join("/"),
      }).catch((err) => {
        // console.log(err);
      });
      return data;
    } catch (error) {
      return error;
    }
  }


  /**
   * axios post公用请求
   * @param url
   * @param param
   * @param method
   * @returns
   */
  async post(params: any, method: string): Promise<any> {
    try {
      // const token = access_token ? access_token : await this.redis.get(`access_token:1478093654`);
      const token =
        "ChFvYXV0aC5hY2Nlc3NUb2tlbhJAMyi9ZLYsV21AObllo0Ag8tSMBEVn4dZmbFKZs1691AT4gQ3AVZV6-JV55ktc12l1GLBFfxJDGeYbIEjS_S2p-BoS8dsD42CUQrG4hOifcpo8vBuxIiDm-I7RZkmjGGnFHsDhnPVrFX8xhLzfjoyd1SZbdBhG7CgFMAE";

      const date = new Date();
      const p: any = {
        access_token: token,
        appkey: "ks704250392931801929",
        method: method,
        param: params,
        signMethod: "MD5",
        timestamp: date.getTime(),
        version: 1,
        signSecret: "0b2229d81ae32c3d5f60535d4011c25e",
      };
      p.sign = this.md5(this.objectToQuery(p));
      // p.sign = this.md5(qs.stringify(p))
      // p.param = encodeURIComponent(JSON.stringify(p.param))
      let data = await axios({
        method: "post",
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Accept': 'application/json;charset=UTF-8' },
        data: this.objectToQuery(p),
        responseType: "json",
        url: "https://openapi.kwaixiaodian.com/" + method.split(".").join("/"),
      }).catch((err) => {
        console.log(err);
      });
      return data;
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
  async get(params: any, method: string, access_token: string): Promise<any> {
    try {
      // const token = access_token ? access_token : await this.redis.get(`access_token:1478093654`);
      const token =
        "ChFvYXV0aC5hY2Nlc3NUb2tlbhJAMyi9ZLYsV21AObllo0Ag8tSMBEVn4dZmbFKZs1691AT4gQ3AVZV6-JV55ktc12l1GLBFfxJDGeYbIEjS_S2p-BoS8dsD42CUQrG4hOifcpo8vBuxIiDm-I7RZkmjGGnFHsDhnPVrFX8xhLzfjoyd1SZbdBhG7CgFMAE";
      const date = new Date();
      const p: any = {
        access_token: token,
        appkey: "ks704250392931801929",
        method: method,
        param: params,
        signMethod: "MD5",
        timestamp: date.getTime(),
        version: 1,
        signSecret: "0b2229d81ae32c3d5f60535d4011c25e",
      };
      p.sign = this.md5(this.objectToQuery(p));
      let data = await axios["get"](
        "https://openapi.kwaixiaodian.com/" + method.split(".").join("/"),
        {
          responseType: "json",
          params: p,
        }
      );

      return data;
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
  async author(url: string, params: any): Promise<any> {
    try {
      let p = {
        app_id: "ks704250392931801929",
        grant_type: "code",
        code: params.code,
        app_secret: "r3ajqYlfHYH7lnbFB8d69A",
      };

      let { data } = await axios["get"](url, {
        responseType: "json",
        params: p,
      });
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  /**
   * 对象转url参数格式
   * @param obj
   * @returns
   */
  objectToQuery(obj) {
    let str = "";
    for (let key in obj) {
      let val = obj[key];
      if (key == "param") {
        val = JSON.stringify(val);
      }
      // if (key == 'imgBytes') {
      //   const hexArr = Array.prototype.map.call(
      //     new Uint8Array(val),
      //     function (bit) {
      //       return ('00' + bit.toString(16)).slice(-2)
      //     }
      //   )
      //   val = hexArr.join('')
      // }

      str = str + `${key}=${val}&`;
    }
    return str.substring(0, str.length - 1);
  }
  fileParams(params) {
    try {
      const formData = new FormData();
      if (params) {
        Object.keys(params).forEach((key) => {
          if (!params) return;
          const value = params[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              formData.append(`${key}[]`, item);
            });
            return;
          }
          if (key == "param") {
            let val = JSON.stringify(params[key]);
            formData.append(key, val);
            return
          }
          if (key == "imgBytes") {
            return
          }
          formData.append(key, params[key]);
        });
      }

      formData.append(params.name || 'file', params.imgBytes, params.filename || 'file.png');
      return formData
    } catch (error) {
      console.log(error)
    }

  }
}
