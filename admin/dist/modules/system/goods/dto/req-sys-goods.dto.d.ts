import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { GoodsCopy } from '../entities/sys-goods.entity';
declare const ReqAddGoodsDto_base: import("@nestjs/common").Type<Omit<GoodsCopy, "goodsId">>;
export declare class ReqAddGoodsDto extends ReqAddGoodsDto_base {
}
export declare class ReqGoodsListDto extends PaginationDto {
    numIid?: string;
    delFlag?: string;
    params: ParamsDto;
}
export declare class ReqGoodsListByUrlDto {
    urls?: Array<string>;
    categoryId?: number;
}
export {};
