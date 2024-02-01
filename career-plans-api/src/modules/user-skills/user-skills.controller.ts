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
import { UserSkillService } from './user-skills.service';
import { UserSkill } from './schemas/user-skills.schema';
import { CreateUserSkillDto } from './models/createUserSkill.dto';
import { UpdateUserSkillDto } from './models/updateUserSkill.dto';

@Controller('userskills')
export class UserSkillController {
  constructor(private userSkillService: UserSkillService) {}

  @Get()
  async findAll(): Promise<UserSkill[]> {
    return await this.userSkillService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserSkill> {
    const entity = await this.userSkillService.findOne(id);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Post()
  async create(@Body() body: CreateUserSkillDto): Promise<UserSkill> {
    const entity = await this.userSkillService.create(body);
    if (!entity) throw new BadRequestException('User not saved');
    return entity;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserSkillDto,
  ): Promise<UserSkill> {
    const entity = await this.userSkillService.update(id, body);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const entity = await this.userSkillService.delete(id);
    if (!entity) throw new NotFoundException('User not found');
  }
}
