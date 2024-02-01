import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './schemas/skill.schema';
import { CreateSkillDto } from './models/createSkill.dto';
import { UpdateSkillDto } from './models/updateSkill.dto';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async findAll(): Promise<Skill[]> {
    try {
      return await this.skillModel.find();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async findOne(id: string): Promise<Skill> {
    try {
      return await this.skillModel.findById(id);
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async create(entity: CreateSkillDto): Promise<Skill> {
    try {
      const newEntity = new this.skillModel(entity);
      return await newEntity.save();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async update(id: string, user: UpdateSkillDto): Promise<Skill> {
    try {
      return await this.skillModel.findByIdAndUpdate(id, user, {
        new: true,
      });
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async delete(id: string): Promise<Skill> {
    try {
      return await this.skillModel.findByIdAndDelete(id);
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }
}
