import { CareerPlan } from './CareerPlans.interface';
import { User } from './User.interface';
import { UserSkill } from './UserSkill.interface';

export interface UserCareerPlan {
  _id: string;
  user: User;
  careerPlan: CareerPlan;
  userSkills: UserSkill[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type CreateUserCareerPlanDto = Omit<
  UserCareerPlan,
  '_id' | 'createdAt' | 'updatedAt' | '__v'
>;

export type UpdateUserCareerPlanDto = Partial<CreateUserCareerPlanDto>;
