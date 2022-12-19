"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defineConfig_1 = require("./defineConfig");
exports.default = (0, defineConfig_1.defineConfig)({
    jwt: {
        secret: process.env.JWT_SECRET || '123456',
    },
    database: {
        type: 'mysql',
        host: process.env.MYSQL_HOST || '47.92.34.111',
        port: process.env.MYSQL_PORT || 3306,
        username: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_PASSWORD || '@Ahuosu',
        database: process.env.MYSQL_DATABASE || 'mei-mei',
        autoLoadModels: true,
        synchronize: true,
        logging: false,
    },
    redis: {
        config: {
            url: 'redis://:123456@47.92.34.111:6379/0',
        },
    },
    bullRedis: {
        host: '47.92.34.111',
        port: '6379',
        password: '123456',
    },
    uploadPath: '',
    isDemoEnvironment: false,
    apiUrl: 'https://openapi.kwaixiaodian.com',
    appSecret: 'r3ajqYlfHYH7lnbFB8d69A',
    appId: 'ks704250392931801929'
});
//# sourceMappingURL=config.production.js.map