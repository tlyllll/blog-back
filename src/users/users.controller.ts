import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  async add(@Body() user) {
    return await this.usersService.create(user);
  }

  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.usersService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() user) {
    return await this.usersService.updateById(id, user);
  }

  @Delete('id')
  async remove(@Param('id') id) {
    return await this.usersService.remove(id);
  }
}
