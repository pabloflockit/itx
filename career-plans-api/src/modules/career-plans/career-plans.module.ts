import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CareerPlan, CareerPlanSchema } from './schemas/career-plans.schema';
import { CareerPlansController } from './career-plans.controller';
import { CareerPlansService } from './career-plans.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CareerPlan.name,
        schema: CareerPlanSchema,
      },
    ]),
  ],
  controllers: [CareerPlansController],
  providers: [CareerPlansService],
})
export class CareerPlanModule {}
