import { IsOptional } from 'class-validator';
import { CareerPlan } from 'src/modules/career-plans/schemas/career-plans.schema';
import { UserSkill } from 'src/modules/user-skills/schemas/user-skills.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export class UpdateUserCareerPlanDto {
  @IsOptional()
  user: User;

  @IsOptional()
  careerPlan: CareerPlan;

  @IsOptional()
  userSkills: UserSkill[];
}
