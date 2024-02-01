import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSkill, UserSkillSchema } from './schemas/user-skills.schema';
import { UserSkillController } from './user-skills.controller';
import { UserSkillService } from './user-skills.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSkill.name,
        schema: UserSkillSchema,
      },
    ]),
  ],
  controllers: [UserSkillController],
  providers: [UserSkillService],
})
export class UserSkillModule {}
