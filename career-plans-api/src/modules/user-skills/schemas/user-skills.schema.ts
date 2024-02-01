import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class UserSkill {
  @Prop({ required: true })
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' })
  skill: mongoose.Types.ObjectId;
}

export const UserSkillSchema = SchemaFactory.createForClass(UserSkill);
