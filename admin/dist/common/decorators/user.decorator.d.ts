export declare enum UserEnum {
    'sellerId' = "sellerId",
    'userId' = "userId",
    'userName' = "userName",
    'nickName' = "nickName",
    'deptId' = "deptId",
    'deptName' = "deptName"
}
export declare enum SellerEnum {
    'sellerId' = "sellerId",
    'name' = "name"
}
export declare const User: (...dataOrPipes: (UserEnum | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export declare const Seller: (...dataOrPipes: (SellerEnum | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
