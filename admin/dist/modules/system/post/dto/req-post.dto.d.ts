import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Post } from '../entities/post.entity';
declare const ReqAddPostDto_base: import("@nestjs/common").Type<Omit<Post, "postId">>;
export declare class ReqAddPostDto extends ReqAddPostDto_base {
}
export declare class ReqPostListDto extends PaginationDto {
    postCode?: string;
    postName?: string;
    status?: string;
}
export {};
