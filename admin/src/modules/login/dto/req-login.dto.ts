/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-10-09 13:35:54
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-17 01:17:21
 * @FilePath: /huosu/admin/src/modules/login/dto/req-login.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IsString, IsOptional } from 'class-validator';

export class ReqLoginDto {
  /* uuid码 */
  @IsString()
  @IsOptional()
  uuid: string;


  /* 验证码code */
  @IsString()
  @IsOptional()
  code: string;

  /* 用户名 */
  @IsString()
  @IsOptional()
  username: string;

  /* 密码 */
  @IsString()
  @IsOptional()
  password: string;
}
