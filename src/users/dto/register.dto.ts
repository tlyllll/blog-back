import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
// import { regMobileCN } from 'src/utils/regex.util';

export class RegisterDTO {
  @ApiProperty({
    description: 'phone number',
    example: '15958834387',
  })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly phone: string;

  @ApiProperty({
    description: 'email',
    example: 'sldkjf@qq.com',
  })
  @IsNotEmpty({ message: '请输入邮箱' })
  readonly email: string;

  @ApiProperty({
    description: 'password',
    example: 'xxxxx',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;

  @ApiProperty({
    description: 'nickname',
    example: 'ncc',
  })
  @IsNotEmpty({ message: '请输入邮箱' })
  @IsString({ message: '名字必须是 String 类型' })
  readonly nickname: string;
}
