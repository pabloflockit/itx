import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/modules/users/models/createUser.dto';
import { UpdateUserDto } from 'src/modules/users/models/updateUser.dto';
import { User } from 'src/modules/users/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    try {
      return await this.userModel.find();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async create(createUser: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUser);
      return await newUser.save();
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async update(id: string, user: UpdateUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }

  async delete(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (err) {
      throw new BadRequestException(`Se produjo un error: ${err}`);
    }
  }
}
