"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResAuthRoleDto = exports.ResHasRoleDto = exports.ResUserInfoDto = exports.ResUserDto = void 0;
const openapi = require("@nestjs/swagger");
const role_entity_1 = require("../../role/entities/role.entity");
const user_entity_1 = require("../entities/user.entity");
class ResUserDto extends user_entity_1.User {
    static _OPENAPI_METADATA_FACTORY() {
        return { deptId: { required: true, type: () => Number, description: "\u5C97\u4F4DId" }, postIds: { required: true, type: () => [Number], description: "\u5C97\u4F4DId\u6570\u7EC4" }, roleIds: { required: true, type: () => [Number], description: "\u89D2\u8272Id\u6570\u7EC4" } };
    }
}
exports.ResUserDto = ResUserDto;
class ResUserInfoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: false, type: () => require("./res-user.dto").ResUserDto, description: "\u7528\u6237\u4FE1\u606F" }, postIds: { required: false, type: () => [Number], description: "\u7528\u6237\u7684\u5C97\u4F4Did\u6570\u7EC4" }, roleIds: { required: false, type: () => [Number], description: "\u7528\u6237\u7684\u89D2\u8272Id\u6570\u7EC4" }, posts: { required: true, type: () => [require("../../post/entities/post.entity").Post], description: "\u4E0B\u62C9\u5C97\u4F4D\u6570\u7EC4" }, roles: { required: true, type: () => [require("../../role/entities/role.entity").Role], description: "\u4E0B\u62C9\u89D2\u8272\u6570\u7EC4" } };
    }
}
exports.ResUserInfoDto = ResUserInfoDto;
class ResHasRoleDto extends role_entity_1.Role {
    static _OPENAPI_METADATA_FACTORY() {
        return { flag: { required: true, type: () => Boolean, description: "\u7528\u6237\u662F\u5426\u6709\u8BE5\u89D2\u8272" } };
    }
}
exports.ResHasRoleDto = ResHasRoleDto;
class ResAuthRoleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roles: { required: true, type: () => [require("./res-user.dto").ResHasRoleDto] }, user: { required: true, type: () => require("../entities/user.entity").User } };
    }
}
exports.ResAuthRoleDto = ResAuthRoleDto;
//# sourceMappingURL=res-user.dto.js.map