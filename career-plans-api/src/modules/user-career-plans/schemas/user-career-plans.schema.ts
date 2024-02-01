import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CareerPlan } from 'src/modules/career-plans/schemas/career-plans.schema';
import { User } from 'src/modules/users/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class UserCareerPlan {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CareerPlan',
  })
  careerPlan: CareerPlan;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'UserSkill' }])
  userSkills: mongoose.Types.ObjectId[];
}

export const UserCareerPlansSchema =
  SchemaFactory.createForClass(UserCareerPlan);
