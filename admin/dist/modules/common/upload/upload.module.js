"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = exports.storage = void 0;
const upload_controller_1 = require("./upload.controller");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const moment = require("moment");
const multer = require("multer");
const MIMEType = require("whatwg-mimetype");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
function storage(uploadPath) {
    return multer.diskStorage({
        destination: async (req, file, cd) => {
            const currentDate = moment().format('YYYY-MM-DD');
            let path = '';
            if (uploadPath) {
                path = uploadPath + '/' + currentDate;
            }
            else {
                path = (0, path_1.join)(__dirname, `../../../../public/upload/${currentDate}`);
            }
            try {
                await fs.promises.stat(path);
            }
            catch (error) {
                await fs.promises.mkdir(path, { recursive: true });
            }
            req.query.fileName = '/upload/' + currentDate;
            cd(null, path);
        },
        filename: async (req, file, cd) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            let originalname = file.originalname;
            if (file.originalname.lastIndexOf('.') < 0) {
                const mimeType = new MIMEType(file.mimetype);
                const subtype = mimeType.subtype;
                originalname = file.originalname + '.' + subtype;
            }
            req.query.fileName =
                req.query.fileName + '/' + uniqueSuffix + '-' + originalname;
            cd(null, uniqueSuffix + '-' + originalname);
        },
    });
}
exports.storage = storage;
let UploadModule = class UploadModule {
};
UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    return {
                        storage: storage(configService.get('uploadPath')),
                        preservePath: false,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [platform_express_1.MulterModule],
    })
], UploadModule);
exports.UploadModule = UploadModule;
//# sourceMappingURL=upload.module.js.map