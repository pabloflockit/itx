import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  position: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
