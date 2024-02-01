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
import { Skill } from './schemas/skill.schema';
import { CreateSkillDto } from './models/createSkill.dto';
import { UpdateSkillDto } from './models/updateSkill.dto';
import { SkillsService } from './skill.service';

@Controller('skills')
export class SkillController {
  constructor(private skillsService: SkillsService) {}

  @Get()
  async findAll(): Promise<Skill[]> {
    return await this.skillsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Skill> {
    const entity = await this.skillsService.findOne(id);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Post()
  async create(@Body() body: CreateSkillDto): Promise<Skill> {
    const entity = await this.skillsService.create(body);
    if (!entity) throw new BadRequestException('User not saved');
    return entity;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateSkillDto,
  ): Promise<Skill> {
    const entity = await this.skillsService.update(id, body);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const entity = await this.skillsService.delete(id);
    if (!entity) throw new NotFoundException('User not found');
  }
}
