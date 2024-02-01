import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCareerPlansService } from './user-career-plans.service';
import { UserCareerPlansController } from './user-career-plans.controller';
import {
  UserCareerPlan,
  UserCareerPlansSchema,
} from './schemas/user-career-plans.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserCareerPlan.name,
        schema: UserCareerPlansSchema,
      },
    ]),
  ],
  controllers: [UserCareerPlansController],
  providers: [UserCareerPlansService],
})
export class UserCareerPlanModule {}
