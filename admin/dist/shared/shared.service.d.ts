import { Request } from "express";
import { Redis } from "@nestjs-modules/ioredis";
export declare class SharedService {
    private readonly redis;
    constructor(redis: Redis);
    handleTree(data: any[], id?: string, parentId?: string, children?: string): any[];
    getReqIP(req: Request): string;
    IsLAN(ip: string): boolean;
    getLocation(ip: string): Promise<string>;
    aesEncrypt(msg: string, secret: string): string;
    aesDecrypt(encrypted: string, secret: string): string;
    md5(msg: string): string;
    generateUUID(): string;
    generateRandomValue(length: number, placeholder?: string): string;
    addImgPrefix(arr: Array<string>): Array<string>;
    packageSku(arr: Array<string>, imgSkuList: Array<string>): Array<string>;
    upload(params: any, imgBytes: any, method: string): Promise<any>;
    post(params: any, method: string, contentType?: string): Promise<any>;
    get(params: any, method: string, access_token: string): Promise<any>;
    author(url: string, params: any): Promise<any>;
    objectToQuery(obj: any): string;
}
