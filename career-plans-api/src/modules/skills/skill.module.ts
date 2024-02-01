import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './schemas/skill.schema';
import { SkillsService } from './skill.service';
import { SkillController } from './skill.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Skill.name,
        schema: SkillSchema,
      },
    ]),
  ],
  controllers: [SkillController],
  providers: [SkillsService],
})
export class SkillsModule {}
