import { Redis } from "@nestjs-modules/ioredis";
import { PaginatedDto } from "src/common/dto/paginated.dto";
import { Repository } from "typeorm";
import { ReqAddGoodsDto, ReqGoodsListByUrlDto, ReqGoodsListDto } from "./dto/req-sys-goods.dto";
import { SharedService } from "src/shared/shared.service";
import { HttpServiceApi } from "src/modules/system/server-common/httpServiceApi.service";
import { GoodsCopy } from "./entities/sys-goods.entity";
export declare class SysGoodsService {
    private readonly sharedService;
    private readonly HttpServiceApi;
    private readonly sysGoodsRepository;
    private readonly redis;
    constructor(sharedService: SharedService, HttpServiceApi: HttpServiceApi, sysGoodsRepository: Repository<GoodsCopy>, redis: Redis);
    addOrUpdate(ReqAddGoodsDto: ReqAddGoodsDto): Promise<ReqAddGoodsDto & GoodsCopy>;
    getGoodsInfo(reqGoodsListByUrlDto: ReqGoodsListByUrlDto): Promise<any>;
    saveGoodsInfo(arr: Array<any>, params: any): Promise<any>;
    saveGoodsToplatform(arr: Array<any>, params: any): Promise<any>;
    reqPlatform(num_iid: string): Promise<any>;
    list(reqGoodsListDto: ReqGoodsListDto): Promise<PaginatedDto<GoodsCopy>>;
    findById(goodsId: number): Promise<GoodsCopy>;
    delete(goodsId: number[] | string[]): Promise<import("typeorm").UpdateResult>;
    deleteReal(goods_id: number[] | string[]): Promise<import("typeorm").DeleteResult>;
    findByGoodsKey(numIid: string, goodsId?: number): Promise<GoodsCopy>;
    lazyFindByConfigKey(goodsId: number): Promise<string>;
    refreshCache(): Promise<void>;
}
