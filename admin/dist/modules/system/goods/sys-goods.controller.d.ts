import { DataObj } from "src/common/class/data-obj.class";
import { ExcelService } from "src/modules/common/excel/excel.service";
import { ReqAddGoodsDto, ReqGoodsListDto, ReqGoodsListByUrlDto } from "./dto/req-sys-goods.dto";
import { GoodsCopy } from "./entities/sys-goods.entity";
import { SysGoodsService } from "./sys-goods.service";
import { HttpServiceApi } from "src/modules/system/server-common/httpServiceApi.service";
export declare class SysGoodsController {
    private readonly sysGoodsService;
    private readonly excelService;
    private readonly HttpServiceApi;
    constructor(sysGoodsService: SysGoodsService, excelService: ExcelService, HttpServiceApi: HttpServiceApi);
    add(reqAddGoodsDto: ReqAddGoodsDto, userName: string): Promise<void>;
    collectList(reqGoodsListByUrlDto: ReqGoodsListByUrlDto): Promise<any>;
    list(reqGoodsListDto: ReqGoodsListDto): Promise<DataObj<import("../../../common/dto/paginated.dto").PaginatedDto<GoodsCopy>>>;
    delete(goods_id: string): Promise<void>;
    getCategory(): Promise<any>;
    getExpressList(userId: string): Promise<any>;
    submit(reqGoodsListByUrlDto: ReqGoodsListByUrlDto): Promise<any>;
    refreshCache(): Promise<void>;
    oneByconfigKey(configKey: number): Promise<DataObj<string>>;
    one(configId: number): Promise<DataObj<GoodsCopy>>;
    updata(sysConfig: GoodsCopy, userName: string): Promise<void>;
}
