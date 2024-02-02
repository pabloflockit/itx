import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSkill } from './schemas/user-skills.schema';
import { CreateUserSkillDto } from './models/createUserSkill.dto';
import { UpdateUserSkillDto } from './models/updateUserSkill.dto';

@Injectable()
export class UserSkillService {
  constructor(
    @InjectModel(UserSkill.name) private userSkillModel: Model<UserSkill>,
  ) {}

  async findAll(): Promise<UserSkill[]> {
    try {
      return await this.userSkillModel.find().populate('skill').exec();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async findOne(id: string): Promise<UserSkill> {
    try {
      return await this.userSkillModel.findById(id).populate('skill').exec();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async create(entity: CreateUserSkillDto): Promise<UserSkill> {
    try {
      const newEntity = new this.userSkillModel(entity);
      return await newEntity.save();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async update(id: string, user: UpdateUserSkillDto): Promise<UserSkill> {
    try {
      return await this.userSkillModel.findByIdAndUpdate(id, user, {
        new: true,
      });
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async delete(id: string): Promise<UserSkill> {
    try {
      return await this.userSkillModel.findByIdAndDelete(id);
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }
}
