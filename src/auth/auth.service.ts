import { LoginInfoDTO } from './../users/dto/loginInfo.dto';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { encryptPassword } from 'src/utils/cryptogram';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findOneById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async validateUser(username: string, passport: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    const currentHashPassword = encryptPassword(passport, user.salt);
    if (currentHashPassword !== user.password) {
      throw new BadRequestException('密码不正确！');
    }
    return user;
  }

  async login(user: LoginInfoDTO) {
    console.log('3-处理jwt签证');
    const result = await this.validateUser(user.username, user.password);
    const payload = {
      id: result.id,
      phone: result.phone,
      email: result.email,
    };
    return {
      message: 'Login success',
      data: {
        phone: result.phone,
        nickname: result.nickname,
        email: result.email,
        id: result.id,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string) {
    if (token) {
      const jwt = token.replace('Bearer', '');
      const id = this.jwtService.verify(jwt);
      return id;
    }
    throw new BadRequestException('token不存在！');
  }
}
