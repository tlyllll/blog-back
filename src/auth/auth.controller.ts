import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginInfoDTO } from './../users/dto/loginInfo.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Logger,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('授权模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginInfoDTO })
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginBody: LoginInfoDTO) {
    console.log('2-请求登录', loginBody);
    try {
      Logger.log('login start');
      return await this.authService.login(loginBody);
    } catch (e) {
      throw new HttpException('登录失败', 400);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('is_login')
  async isLogin() {
    try {
      return true;
    } catch (e) {
      throw new HttpException('未登录', 403);
    }
  }
}
