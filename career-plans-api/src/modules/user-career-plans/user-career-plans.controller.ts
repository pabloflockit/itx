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
import { UserCareerPlan } from './schemas/user-career-plans.schema';
import { UserCareerPlansService } from './user-career-plans.service';
import { CreateUserCareerPlanDto } from './models/createUserCareerPlans.dto';
import { UpdateUserCareerPlanDto } from './models/updateUserCareerPlans.dto';

@Controller('usercareerplans')
export class UserCareerPlansController {
  constructor(private userCareerPlansService: UserCareerPlansService) {}

  @Get()
  async findAll(): Promise<UserCareerPlan[]> {
    return await this.userCareerPlansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserCareerPlan> {
    const entity = await this.userCareerPlansService.findOne(id);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Post()
  async create(@Body() body: CreateUserCareerPlanDto): Promise<UserCareerPlan> {
    const entity = await this.userCareerPlansService.create(body);
    if (!entity) throw new BadRequestException('User not saved');
    return entity;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserCareerPlanDto,
  ): Promise<UserCareerPlan> {
    const entity = await this.userCareerPlansService.update(id, body);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const entity = await this.userCareerPlansService.delete(id);
    if (!entity) throw new NotFoundException('User not found');
  }
}
