"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerService = void 0;
const common_1 = require("@nestjs/common");
const systeminformation = require("systeminformation");
let ServerService = class ServerService {
    async getCpu() {
        const cup = await systeminformation.cpu();
        const currentLoad = await systeminformation.currentLoad();
        return {
            cpuNum: cup.cores,
            used: currentLoad.currentLoadUser.toFixed(2),
            sys: currentLoad.currentLoadSystem.toFixed(2),
            free: (100 -
                currentLoad.currentLoadUser -
                currentLoad.currentLoadSystem).toFixed(2),
        };
    }
    async getMem() {
        const mem = await systeminformation.mem();
        const total = (mem.total / (1024 * 1024 * 1024)).toFixed(2);
        const used = (mem.used / (1024 * 1024 * 1024)).toFixed(2);
        const free = (mem.free / (1024 * 1024 * 1024)).toFixed(2);
        const usage = (((mem.used / (1024 * 1024 * 1024)) * 100) /
            (mem.total / (1024 * 1024 * 1024))).toFixed(2);
        return {
            total,
            used,
            free,
            usage,
        };
    }
    async getSys() {
        const osInfo = await systeminformation.osInfo();
        const networkInterfaces = await systeminformation.networkInterfaces;
        const net = await networkInterfaces();
        return {
            computerName: osInfo.hostname,
            osName: osInfo.platform,
            computerIp: net[0].ip4,
            osArch: osInfo.arch,
        };
    }
    async getSysFiles() {
        const fsSize = await systeminformation.fsSize;
        const disk = await fsSize();
        const sysFilesArr = disk.map((item) => {
            const dirName = item.fs;
            const sysTypeName = item.type;
            const typeName = item.mount;
            const total = (item.size / (1024 * 1024 * 1024)).toFixed(2);
            const free = (item.size / (1024 * 1024 * 1024) -
                item.used / (1024 * 1024 * 1024)).toFixed(2);
            const used = (item.used / (1024 * 1024 * 1024)).toFixed(2);
            const usage = item.use.toFixed(2);
            return {
                dirName,
                sysTypeName,
                typeName,
                total,
                free,
                used,
                usage,
            };
        });
        return sysFilesArr;
    }
};
ServerService = __decorate([
    (0, common_1.Injectable)()
], ServerService);
exports.ServerService = ServerService;
//# sourceMappingURL=server.service.js.map