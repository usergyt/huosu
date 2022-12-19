import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
export declare class Post extends BaseEntity {
    postId: number;
    postCode: string;
    postName: string;
    postSort: number;
    status: string;
    users: User[];
}
