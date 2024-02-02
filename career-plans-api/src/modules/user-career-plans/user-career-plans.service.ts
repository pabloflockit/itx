import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCareerPlan } from './schemas/user-career-plans.schema';
import { UpdateUserCareerPlanDto } from './models/updateUserCareerPlans.dto';
import { CreateUserCareerPlanDto } from './models/createUserCareerPlans.dto';

@Injectable()
export class UserCareerPlansService {
  constructor(
    @InjectModel(UserCareerPlan.name)
    private careerPlansModel: Model<UserCareerPlan>,
  ) {}

  async findAll(): Promise<UserCareerPlan[]> {
    try {
      return await this.careerPlansModel
        .find()
        .populate('user')
        .populate({ path: 'careerPlan', populate: { path: 'skills' } })
        .populate({ path: 'userSkills', populate: { path: 'skill' } })
        .exec();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async findOne(id: string): Promise<UserCareerPlan> {
    try {
      return await this.careerPlansModel
        .findById(id)
        .populate('user')
        .populate({ path: 'careerPlan', populate: { path: 'skills' } })
        .populate({ path: 'userSkills', populate: { path: 'skill' } })
        .exec();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async create(entity: CreateUserCareerPlanDto): Promise<UserCareerPlan> {
    try {
      const newEntity = new this.careerPlansModel(entity);
      const res = await newEntity.save()
      return await this.findOne(res._id.toString());
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async update(
    id: string,
    user: UpdateUserCareerPlanDto,
  ): Promise<UserCareerPlan> {
    try {
      return await this.careerPlansModel.findByIdAndUpdate(id, user, {
        new: true,
      });
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async delete(id: string): Promise<UserCareerPlan> {
    try {
      return await this.careerPlansModel.findByIdAndDelete(id);
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }
}
