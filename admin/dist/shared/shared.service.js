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
exports.SharedService = void 0;
const common_1 = require("@nestjs/common");
const CryptoJS = require("crypto-js");
const nanoid_1 = require("nanoid");
const axios_1 = require("axios");
const iconv = require("iconv-lite");
const ioredis_1 = require("@nestjs-modules/ioredis");
let SharedService = class SharedService {
    constructor(redis) {
        this.redis = redis;
    }
    handleTree(data, id, parentId, children) {
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
    getReqIP(req) {
        return ((req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            "").replace("::ffff:", ""));
    }
    IsLAN(ip) {
        ip.toLowerCase();
        if (ip == "localhost")
            return true;
        let a_ip = 0;
        if (ip == "")
            return false;
        const aNum = ip.split(".");
        if (aNum.length != 4)
            return false;
        a_ip += parseInt(aNum[0]) << 24;
        a_ip += parseInt(aNum[1]) << 16;
        a_ip += parseInt(aNum[2]) << 8;
        a_ip += parseInt(aNum[3]) << 0;
        a_ip = (a_ip >> 16) & 0xffff;
        return (a_ip >> 8 == 0x7f ||
            a_ip >> 8 == 0xa ||
            a_ip == 0xc0a8 ||
            (a_ip >= 0xac10 && a_ip <= 0xac1f));
    }
    async getLocation(ip) {
        if (this.IsLAN(ip))
            return "内网IP";
        try {
            let { data } = await axios_1.default.get(`http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`, { responseType: "arraybuffer" });
            data = JSON.parse(iconv.decode(data, "gbk"));
            return data.pro + " " + data.city;
        }
        catch (error) {
            return "未知";
        }
    }
    aesEncrypt(msg, secret) {
        return CryptoJS.AES.encrypt(msg, secret).toString();
    }
    aesDecrypt(encrypted, secret) {
        return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    }
    md5(msg) {
        return CryptoJS.MD5(msg).toString();
    }
    generateUUID() {
        return (0, nanoid_1.nanoid)();
    }
    generateRandomValue(length, placeholder = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM") {
        const customNanoid = (0, nanoid_1.customAlphabet)(placeholder, length);
        return customNanoid();
    }
    addImgPrefix(arr) {
        try {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]["url"].indexOf("http:") == -1) {
                    arr[i] = `http:${arr[i]["url"]}`;
                }
            }
            return arr;
        }
        catch (error) {
            console.log(error);
        }
    }
    packageSku(arr, imgSkuList) {
        let skuList = [];
        const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
        try {
            for (let i = 0; i < arr.length; i++) {
                let item = {};
                item.relSkuId = arr[i]["sku_id"];
                item.skuStock = arr[i]["quantity"];
                item.skuSalePrice = parseInt(arr[i]["price"]) * 100;
                item.gtinCode = "";
                item.skuNick = "";
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
                        propName: propObj[0],
                        propValueName: propObj[1].replace("+", "").replace("+", ""),
                        imageUrl: skuImg,
                        isMainProp: 1,
                        propValueGroupId: 0,
                        propVersion: 1,
                    }
                ];
                skuList.push(item);
            }
        }
        catch (error) {
            console.log(error);
        }
        console.log(JSON.stringify(skuList));
        return skuList;
    }
    async upload(params, imgBytes, method) {
        try {
            const token = "ChFvYXV0aC5hY2Nlc3NUb2tlbhJA7ADte07KMnBhSC6g1tO3ag-wQG95rLNAbpKNzxqTe-z0LVDUy-UyjdC05zVi27Ws8vorno1OuCPw8GuFyczMyxoSUcgwHseiTAmInJ2Ui8m8uJObIiCZCX7vbUdE0rrCM9f8f2dt-oErAUbG2aNtt2ujVghz0ygFMAE";
            const date = new Date();
            const p = {
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
            let data = await (0, axios_1.default)({
                method: "post",
                headers: { 'content-type': 'multipart/form-data;charset=utf-8' },
                data: this.objectToQuery(p),
                responseType: "json",
                url: "https://openapi.kwaixiaodian.com/" + method.split(".").join("/"),
            }).catch((err) => {
                console.log(err);
            });
            return data;
        }
        catch (error) {
            return error;
        }
    }
    async post(params, method, contentType = 'application/x-www-form-urlencoded') {
        try {
            const token = "ChFvYXV0aC5hY2Nlc3NUb2tlbhJA7ADte07KMnBhSC6g1tO3ag-wQG95rLNAbpKNzxqTe-z0LVDUy-UyjdC05zVi27Ws8vorno1OuCPw8GuFyczMyxoSUcgwHseiTAmInJ2Ui8m8uJObIiCZCX7vbUdE0rrCM9f8f2dt-oErAUbG2aNtt2ujVghz0ygFMAE";
            const date = new Date();
            const p = {
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
            let data = await (0, axios_1.default)({
                method: "post",
                headers: { 'content-type': contentType },
                data: this.objectToQuery(p),
                responseType: "json",
                url: "https://openapi.kwaixiaodian.com/" + method.split(".").join("/"),
            }).catch((err) => {
                console.log(err);
            });
            return data;
        }
        catch (error) {
            return error;
        }
    }
    async get(params, method, access_token) {
        try {
            const token = "ChFvYXV0aC5hY2Nlc3NUb2tlbhJA7ADte07KMnBhSC6g1tO3ag-wQG95rLNAbpKNzxqTe-z0LVDUy-UyjdC05zVi27Ws8vorno1OuCPw8GuFyczMyxoSUcgwHseiTAmInJ2Ui8m8uJObIiCZCX7vbUdE0rrCM9f8f2dt-oErAUbG2aNtt2ujVghz0ygFMAE";
            const date = new Date();
            const p = {
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
            let data = await axios_1.default["get"]("https://openapi.kwaixiaodian.com/" + method.split(".").join("/"), {
                responseType: "json",
                params: p,
            });
            return data;
        }
        catch (error) {
            return error;
        }
    }
    async author(url, params) {
        try {
            let p = {
                app_id: "ks704250392931801929",
                grant_type: "code",
                code: params.code,
                app_secret: "r3ajqYlfHYH7lnbFB8d69A",
            };
            let { data } = await axios_1.default["get"](url, {
                responseType: "json",
                params: p,
            });
            return data;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    objectToQuery(obj) {
        let str = "";
        for (let key in obj) {
            let val = obj[key];
            if (key == "param") {
                val = JSON.stringify(val);
            }
            str = str + `${key}=${val}&`;
        }
        return str.substring(0, str.length - 1);
    }
};
SharedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [Object])
], SharedService);
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map