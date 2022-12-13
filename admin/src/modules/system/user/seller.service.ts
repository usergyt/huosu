
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { USER_VERSION_KEY } from 'src/common/contants/redis.contant';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';
import { Between, FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import {
  ReqAddSellerDto,
  ReqUpdataSelfDto,
  ReqUpdateSellerDto,
} from './dto/req-seller.dto';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>,
    private readonly sharedService: SharedService,
    @InjectRedis() private readonly redis: Redis,
  ) { }

  /* 根据sellerId 获取商家信息 */
  async sellerAllInfo(sellerId: string) {
    const seller = await this.sellerRepository
      .createQueryBuilder('seller')
      .select('seller.sellerId')
      .addSelect('seller.name')
      .addSelect('seller.sex')
      .addSelect('seller.head')
      .addSelect('seller.bigHead')
      // .leftJoinAndSelect('seller.staffId', 'staff') 
      .where({
        sellerId: sellerId
      })
      .getOne();
    return seller;
  }



  /* 通过用户名获取用户,排除删除的 */
  async findOneBySellerId(sellerId: string) {
    return await this.sellerRepository.findOne({
      select: ['sellerId', 'name', 'sex', 'head', 'bigHead', 'staffId'],
      where: {
        sellerId: sellerId,
      },
    });
  }






  /* 新增用户 */
  async addSeller(reqAddSellerDto: ReqAddSellerDto) {


    await this.sellerRepository.save(reqAddSellerDto);
  }

  /* 编辑用户 */
  async updateSeller(reqUpdateSellerDto: ReqUpdateSellerDto) {

    await this.sellerRepository.save(reqUpdateSellerDto);
    if (
      await this.redis.get(`${USER_VERSION_KEY}:${reqUpdateSellerDto.sellerId}`)
    ) {
      await this.redis.set(`${USER_VERSION_KEY}:${reqUpdateSellerDto.sellerId}`, 2); //调整密码版本，强制用户重新登录
    }
  }

  /* 删除用户 */
  async delete(sellerId: string, sellerIdOper: string) {
    return await this.sellerRepository
      .createQueryBuilder()
      .update()
      .set({
        updateBy: sellerId,
        state: '2',
      })
      .where({
        userId: sellerId,
      })
      .execute();
  }

  /* id查询用户 */
  async findById(sellerId: string) {
    return await this.sellerRepository.findOneBy({ sellerId });
  }




  /* 改变用户状态 */
  async changeStatus(sellerId: string, state: string, updateBy: string) {
    return await this.sellerRepository
      .createQueryBuilder()
      .update()
      .set({ state, updateBy })
      .where({ sellerId })
      .execute();
  }

  /* 更新自己的用户信息 */
  async updataProfile(reqUpdataSelfDto: ReqUpdataSelfDto, sellerId: string) {
    return await this.sellerRepository
      .createQueryBuilder()
      .update()
      .set(reqUpdataSelfDto)
      .where({ sellerId })
      .execute();
  }



}
