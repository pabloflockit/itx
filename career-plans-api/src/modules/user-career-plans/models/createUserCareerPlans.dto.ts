import { IsNotEmpty } from 'class-validator';
import { CareerPlan } from 'src/modules/career-plans/schemas/career-plans.schema';
import { UserSkill } from 'src/modules/user-skills/schemas/user-skills.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export class CreateUserCareerPlanDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  careerPlan: CareerPlan;

  @IsNotEmpty()
  userSkills: UserSkill[];
}
