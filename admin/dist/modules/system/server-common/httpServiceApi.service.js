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
exports.HttpServiceApi = void 0;
const common_1 = require("@nestjs/common");
const shared_service_1 = require("../../../shared/shared.service");
const ioredis_1 = require("@nestjs-modules/ioredis");
const http = require("http");
const fs = require("fs");
let HttpServiceApi = class HttpServiceApi {
    constructor(sharedService, redis) {
        this.sharedService = sharedService;
        this.redis = redis;
    }
    async getCategory() {
        const data = await this.sharedService.get({}, "open.item.category", "");
        return data.data;
    }
    async getExpressList() {
        const data = await this.sharedService.get({ offset: 1, limit: 20, searchUsed: false }, "open.logistics.express.template.list", "");
        return data.data;
    }
    async getConfig(categoryId) {
        const data = await this.sharedService.get({
            categoryId: categoryId,
        }, "open.item.category.config", "");
        return data.data;
    }
    async getCategoryPropVal(categoryId, propId) {
        const data = await this.sharedService.get({
            categoryId: categoryId,
            propId: propId,
            cursor: 0,
            limit: 10,
        }, "open.item.category.prop.value.search", "");
        return data.data;
    }
    async getgoodsDetail(itemId) {
        const data = await this.sharedService.get({
            kwaiItemId: itemId,
        }, "open.item.get", "");
        return data.data;
    }
    async uploadImg(imgList, type) {
        let handle = this.handleFiles("http://img.alicdn.com/imgextra/i2/2596264565/TB2onxRlVXXXXcDXpXXXXXXXXXX_!!2596264565.jpg");
        let binaryFiles = await handle.then((data) => {
            let file = data;
            const f = Buffer.from(file, "hex");
            return f;
        });
        console.log('------', binaryFiles);
        const promises = [];
        await this.sharedService
            .upload({
            imgUrl: "http://img.alicdn.com/imgextra/i2/2596264565/TB2onxRlVXXXXcDXpXXXXXXXXXX_!!2596264565.jpg",
            uploadType: type,
        }, binaryFiles, "open.item.image.upload")
            .then((res) => {
            console.log("----", res);
        })
            .catch((error) => {
            console.log(error);
        });
        return promises;
    }
    handleLocalFile(path) {
        fs.readFile(path, "binary", function (err, file) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                console.log("输出图片");
                const f = Buffer.from(file, "hex").toString('base64');
                console.log(f);
                return f;
            }
        });
    }
    handleFiles(url) {
        return new Promise((resolve, reject) => {
            http.get(url, (res) => {
                res.setEncoding("binary");
                let files = "";
                res
                    .on("data", (chunk) => {
                    files += chunk;
                })
                    .on("end", () => {
                    resolve(files);
                });
            });
        });
    }
};
HttpServiceApi = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [shared_service_1.SharedService, Object])
], HttpServiceApi);
exports.HttpServiceApi = HttpServiceApi;
//# sourceMappingURL=httpServiceApi.service.js.map