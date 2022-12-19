import { StreamableFile } from '@nestjs/common';
import { ReqAddPostDto, ReqPostListDto } from './dto/req-post.dto';
import { PostService } from './post.service';
import { Post as SysPost } from './entities/post.entity';
import { DataObj } from 'src/common/class/data-obj.class';
import { ExcelService } from 'src/modules/common/excel/excel.service';
export declare class PostController {
    private readonly postService;
    private readonly excelService;
    constructor(postService: PostService, excelService: ExcelService);
    add(reqAddPostDto: ReqAddPostDto, userName: string): Promise<void>;
    list(reqPostListDto: ReqPostListDto): Promise<import("../../../common/dto/paginated.dto").PaginatedDto<SysPost>>;
    one(postId: number): Promise<DataObj<SysPost>>;
    update(post: SysPost, userName: string): Promise<void>;
    delete(postIds: string): Promise<void>;
    export(reqPostListDto: ReqPostListDto): Promise<StreamableFile>;
}
