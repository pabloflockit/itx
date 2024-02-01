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
import { CareerPlansService } from './career-plans.service';
import { CareerPlan } from './schemas/career-plans.schema';
import { CreateCareerPlanDto } from './models/createCareerPlan.dto';
import { UpdateCareerPlanDto } from './models/updateCareerPlan.dto';

@Controller('careerplans')
export class CareerPlansController {
  constructor(private careerPlansService: CareerPlansService) {}

  @Get()
  async findAll(): Promise<CareerPlan[]> {
    return await this.careerPlansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CareerPlan> {
    const entity = await this.careerPlansService.findOne(id);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Post()
  async create(@Body() body: CreateCareerPlanDto): Promise<CareerPlan> {
    const entity = await this.careerPlansService.create(body);
    if (!entity) throw new BadRequestException('User not saved');
    return entity;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCareerPlanDto,
  ): Promise<CareerPlan> {
    const entity = await this.careerPlansService.update(id, body);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const entity = await this.careerPlansService.delete(id);
    if (!entity) throw new NotFoundException('User not found');
  }
}
