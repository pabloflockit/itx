import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CareerPlan } from './schemas/career-plans.schema';
import { CreateCareerPlanDto } from './models/createCareerPlan.dto';
import { UpdateCareerPlanDto } from './models/updateCareerPlan.dto';

@Injectable()
export class CareerPlansService {
  constructor(
    @InjectModel(CareerPlan.name) private careerPlansModel: Model<CareerPlan>,
  ) {}

  async findAll(): Promise<CareerPlan[]> {
    try {
      return await this.careerPlansModel.find().populate('skills').exec();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async findOne(id: string): Promise<CareerPlan> {
    try {
      return await this.careerPlansModel.findById(id).populate('skills').exec();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async create(entity: CreateCareerPlanDto): Promise<CareerPlan> {
    try {
      const newEntity = new this.careerPlansModel(entity);
      return (await newEntity.save()).populate('skills');
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async update(id: string, user: UpdateCareerPlanDto): Promise<CareerPlan> {
    try {
      return await this.careerPlansModel
        .findByIdAndUpdate(id, user, {
          new: true,
        })
        .populate('skills')
        .exec();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async delete(id: string): Promise<CareerPlan> {
    try {
      return await this.careerPlansModel.findByIdAndDelete(id);
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }
}
