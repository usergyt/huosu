import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository } from 'typeorm';
import { ReqAddPostDto, ReqPostListDto } from './dto/req-post.dto';
import { Post } from './entities/post.entity';
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    findByPostCode(postCode: string): Promise<Post>;
    addOrUpdate(reqAddPostDto: ReqAddPostDto): Promise<void>;
    list(reqPostListDto: ReqPostListDto): Promise<PaginatedDto<Post>>;
    findById(postId: number): Promise<Post>;
    delete(postIdArr: number[] | string[]): Promise<import("typeorm").DeleteResult>;
    listByIdArr(idArr: number[]): Promise<Post[]>;
}
