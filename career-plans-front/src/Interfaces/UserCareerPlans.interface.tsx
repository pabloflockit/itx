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

export interface UserCareerPlanAutoComplete{
  id: string;
  label: string;
}


export interface CreateUserCareerPlanDto{
  user: string,
  careerPlan: string,
  userSkills: string[]
}
