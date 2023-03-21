import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
// import { regMobileCN } from 'src/utils/regex.util';

export class LoginInfoDTO {
  @ApiProperty({
    description: 'loginId',
  })
  @IsNotEmpty({ message: '请输入手机号或邮箱' })
  readonly username: string;

  @ApiProperty({
    description: 'password',
    example: 'xxxxx',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
