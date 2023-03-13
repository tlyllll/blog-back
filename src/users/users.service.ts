import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}
  async create(post: Partial<UsersEntity>): Promise<UsersEntity> {
    const { name, password } = post;
    if (!name || !password) {
      throw new HttpException(JSON.stringify(post) + ' ', 401);
    }
    const user = await this.usersRepository.findOne({ where: { name } });
    if (user) {
      throw new HttpException('用户已存在', 401);
    }
    return await this.usersRepository.save(post);
  }
  async findAll() {
    return this.usersRepository.find();
  }

  async findById(id): Promise<UsersEntity> {
    return this.usersRepository.findOne({ where: id });
  }

  async updateById(id, user): Promise<UsersEntity> {
    const existUser = await this.usersRepository.findOne({ where: id });
    if (!existUser) {
      throw new HttpException(`此用户不存在`, 401);
    }
    const updateUser = this.usersRepository.merge(existUser, user);
    return this.usersRepository.save(updateUser);
  }

  async remove(id) {
    const existUser = await this.usersRepository.findOne(id);
    if (!existUser) {
      throw new HttpException(`此用户不存在`, 401);
    }
    return this.usersRepository.remove(existUser);
  }
}
