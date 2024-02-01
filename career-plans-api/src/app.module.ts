import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { Helper } from './helpers/helper';
import { SkillsModule } from './modules/skills/skill.module';
import { CareerPlanModule } from './modules/career-plans/career-plans.module';
import { UserSkillModule } from './modules/user-skills/user-skills.module';
import { UserCareerPlanModule } from './modules/user-career-plans/user-career-plans.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: Helper.URL,
        dbName: Helper.DBNAME,
        user: Helper.USER,
        pass: Helper.PASS,
      }),
      inject: [],
    }),
    UsersModule,
    CareerPlanModule,
    SkillsModule,
    UserSkillModule,
    UserCareerPlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
