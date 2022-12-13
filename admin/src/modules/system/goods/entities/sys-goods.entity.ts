/*
 * @Author: guyatao guyatao@hashdata.cn
 * @Date: 2022-10-19 16:47:22
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-06 17:46:36
 * @FilePath: /huosu/admin/src/modules/system/goods/entities/sys-goods.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { isDecimal, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'goods_copy',
})
export class GoodsCopy extends BaseEntity {
    /* 参数主键 */
    @PrimaryGeneratedColumn({
        name: 'goods_id',
        comment: '复制主键',
    })
    @IsNumber()
    @Excel({
        name: '复制主键',
    })
    goodsId: number;

    /* 淘宝商品ID */
    @Column({
        name: 'num_iid',
        length: 50,
        default: '',
        comment: '商品名称ID',
    })
    @IsString()
    @IsOptional()
    @Excel({
        name: '商品名称ID',
    })
    numIid: string;

    /* 商品名称 */
    @Column({
        name: 'title',
        length: 100,
        default: '',
        comment: '商品名',
    })
    @Excel({
        name: '商品名',
    })
    @IsString()
    @IsOptional()
    title: string;

    /* 商品价格 */
    @Column({
        name: 'price',
        // length: 100,
        type: 'decimal',
        default: 0.00,
        comment: '价格',
    })
    @Excel({
        name: '价格',
    })
    @IsOptional()
    @IsString()
    price: string;

    /* 原价格 */
    @Column({
        name: 'orginal_price',
        // length: 100,
        type: 'decimal',
        default: 0.00,
        comment: '原价格',
    })
    @Excel({
        name: '原价格',
    })
    @IsOptional()
    @IsString()
    orginal_price: string;

    /* 店铺名称 */
    @Column({
        name: 'nick',
        length: 100,
        default: '',
        comment: '店铺名称',
    })
    @Excel({
        name: '店铺名称',
    })
    @IsString()
    @IsOptional()
    nick: string;

    /* 商品数量 */
    @Column({
        name: 'num',
        // length: 100,
        default: 0,
        comment: '商品数量',
    })
    @Excel({
        name: '商品数量',
    })
    @IsNumber()
    @IsOptional()
    num: number;


    /* 商品图片 */
    @Column({
        name: 'pic_url',
        length: 100,
        default: '',
        comment: '商品图片',
    })
    @Excel({
        name: '商品图片',
    })
    @IsString()
    @IsOptional()
    pic_url: string;

    /* cid */
    @Column({
        name: 'cid',
        length: 100,
        default: '',
        comment: 'cid',
    })
    @Excel({
        name: 'cid',
    })
    @IsString()
    @IsOptional()
    cid: string;

    @ApiHideProperty()
    @Column({
        name: 'del_flag',
        comment: '删除标志（0代表存在 2代表删除）',
        length: 1,
        default: '0',
        type: 'char',
    })
    delFlag: string;


}
