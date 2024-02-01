import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class CareerPlan {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }])
  skills: mongoose.Types.ObjectId[];
}

export const CareerPlanSchema = SchemaFactory.createForClass(CareerPlan);
