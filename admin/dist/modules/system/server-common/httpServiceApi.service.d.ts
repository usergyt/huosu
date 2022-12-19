import { SharedService } from "src/shared/shared.service";
import { Redis } from "@nestjs-modules/ioredis";
export declare class HttpServiceApi {
    private readonly sharedService;
    private readonly redis;
    constructor(sharedService: SharedService, redis: Redis);
    getCategory(): Promise<any>;
    getExpressList(): Promise<any>;
    getConfig(categoryId: Number): Promise<any>;
    getCategoryPropVal(categoryId: Number, propId: Number): Promise<any>;
    getgoodsDetail(itemId: Number): Promise<any>;
    uploadImg(imgList: Array<string>, type: Number): Promise<any[]>;
    handleLocalFile(path: any): void;
    handleFiles(url: any): Promise<unknown>;
}
