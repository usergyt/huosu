/*
 * @Author: guyatao
 * @Date: 2021-12-08 17:14:57
 * @LastEditTime: 2022-12-19 22:28:58
 * @LastEditors: usergyt userguyatao@163.com
 * @Description: 公共方法
 *
 * @FilePath: /meimei-admin/src/shared/shared.service.ts
 
 */
import { ConsoleLogger, Injectable } from "@nestjs/common";
import * as CryptoJS from "crypto-js";
import { customAlphabet, nanoid } from "nanoid";
import { Request } from "express";
import axios from "axios";
import * as iconv from "iconv-lite";
import * as qs from "qs";
import { json } from "stream/consumers";
import { SharedService } from "src/shared/shared.service";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
const fs = require("fs");
const http = require("http");
@Injectable()
export class HttpServiceApi {
  constructor(
    private readonly sharedService: SharedService,

    @InjectRedis() private readonly redis: Redis
  ) { }
  //类目列表
  async getCategory() {
    const data = await this.sharedService.get({}, "open.item.category", "");

    return data.data;
  }
  //运费模版
  async getExpressList() {
    const data = await this.sharedService.get(
      { offset: 0, limit: 20, searchUsed: true },
      "open.logistics.express.template.list",
      ""
    );

    return data.data;
  }
  /* 获取类目相关配置 */
  async getConfig(categoryId: Number) {
    const data = await this.sharedService.get(
      {
        categoryId: categoryId,
        // propId: '6195',
        // cursor: 0,
        // limit: 10
      },
      "open.item.category.config",
      ""
    );

    return data.data;
  }
  /* 搜索类目属性值 */
  async getCategoryPropVal(categoryId: Number, propId: Number) {
    const data = await this.sharedService.get(
      {
        categoryId: categoryId,
        propId: propId,
        cursor: 0,
        limit: 10,
      },
      "open.item.category.prop.value.search",
      ""
    );

    return data.data;
  }

  /* 商品详情 */
  async getgoodsDetail(itemId: Number) {
    const data = await this.sharedService.get(
      {
        kwaiItemId: itemId,
      },
      "open.item.get",
      ""
    );

    return data.data;
  }

  toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }

  /* 上传图片 */
  async uploadImg(imgList: Array<string>, type: Number) {
    let thiz = this;
    http
      .get(
        "http://img.alicdn.com/imgextra/i4/2596264565/TB2p30elFXXXXXQXpXXXXXXXXXX_!!2596264565.jpg",
        function (res) {
          res.setEncoding("binary"); //二进制（binary）
          var re = "";
          res
            .on("data", function (data) {
              re += data;
              // collect the data chunks to the variable named "html"
            })
            .on("end", function () {
              var b = Buffer.from(re); //rrayBuffer转Buffer

              // var ab = new ArrayBuffer(b.length); //Buffer转ArrayBuffer

              thiz.sharedService
                .uploadImg(
                  {
                    imgUrl: imgList[0],
                    uploadType: type,
                  },
                  "open.item.image.upload",
                  b
                )
                .then((res) => {
                  console.log("----", res);
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        }
      )
      .on("error", function (e) {
        console.log("Got error: " + e.message);
      });

    return [];
  }

  /**
   * 更新商品详情图片
   */
  updateDetailImg(params: any) {
    return this.sharedService.post(params, "open.item.detail.images.update");
  }


  /* 自定义运费模版 */
  async getExressCustomTempate(type: Number) {
    const data = await this.sharedService.get(
      {
        type: type
      },
      "open.express.custom.tempate.list.query",
      ""
    );
    console.log(data)
    return data.data;
  }
}
