import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}
  async create(post: Partial<UsersEntity>): Promise<UsersEntity> {
    const { email, phone, nickname, password } = post;
    if (!email || !phone || !nickname || !password) {
      throw new HttpException('有空值' + ' ', 401);
    }
    const user = await this.usersRepository.findOne({ where: { phone } });
    if (user) {
      throw new HttpException('用户已存在', 401);
    }
    const newUser: UsersEntity = new UsersEntity();
    newUser.nickname = nickname;
    newUser.phone = phone;
    newUser.email = email;
    const salt = makeSalt();
    newUser.salt = salt;
    const hashPassword = encryptPassword(password, salt);
    newUser.password = hashPassword;
    await this.usersRepository.save(newUser);
    return await this.usersRepository.findOne({ where: { phone } });
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

  async findOneByUserName(username) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.salt')
      .addSelect('users.password')
      .where('users.phone = :loginId or users.email = :loginId', {
        loginId: username,
      })
      .getOne();
    if (!user) {
      throw new BadRequestException('用户名不正确！' + username);
    }
    console.log('user ====== ' + JSON.stringify(user));
    return user;
  }
}
