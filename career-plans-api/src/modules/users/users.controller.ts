import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../users/models/createUser.dto';
import { UpdateUserDto } from '../users/models/updateUser.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const entity = await this.userService.findOne(id);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const entity = await this.userService.create(body);
    if (!entity) throw new BadRequestException('User not saved');
    return entity;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    const entity = await this.userService.update(id, body);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const entity = await this.userService.delete(id);
    if (!entity) throw new NotFoundException('User not found');
  }
}
