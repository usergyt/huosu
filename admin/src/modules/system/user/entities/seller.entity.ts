import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { ExcelTypeEnum } from 'src/modules/common/excel/excel.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class Seller extends BaseEntity {

  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '主键',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: 'id',
    type: ExcelTypeEnum.EXPORT,
  })
  id: number;

  /* 商户名称 */
  @Column({
    name: 'name',
    comment: '商户名称',
    length: 30,
  })
  @IsString()
  @Excel({
    name: '商户名称',
  })
  name: string;

  /* 性别 */
  @Column({
    name: 'sex',
    comment: '性别',
    length: 30,
  })
  @IsString()
  @Excel({
    name: '性别',
  })
  sex: string;


  /* 头像地址 */
  @Column({
    comment: '头像地址',
    length: 200,
    default: '',
  })
  @IsOptional()
  @IsString()
  head?: string;

  /* 高清头像 */
  @Column({
    comment: '高清头像',
    length: 200,
    default: '',
  })
  @IsOptional()
  @IsString()
  bigHead?: string;

  /* 商户ID*/
  @Column({
    name: 'seller_Id',
    comment: '商户ID',
    length: 100,
  })
  @IsString()
  @Excel({
    name: '商户ID',
  })
  sellerId: string;

  /* 商户唯一标识*/
  @Column({
    name: 'open_Id',
    comment: '商户唯一标识',
    length: 100,
  })
  @IsString()
  @Excel({
    name: '商户唯一标识',
  })
  openId: string;

  /* 子账号id*/
  @Column({
    name: 'staff_Id',
    comment: '子账号id',
    default: null
  })
  @IsOptional()
  @IsString()
  @Excel({
    name: '商户唯一标识',
  })
  staffId: string;

  /* 商户状态*/
  @Column({
    name: 'state',
    comment: '商户状态',
    length: 10,
    default: '0'
  })
  @IsString()
  @Excel({
    name: '商户状态',
  })
  state: string;

}
