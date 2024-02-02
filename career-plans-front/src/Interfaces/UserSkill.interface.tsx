import { Skill } from './Skill.interface';

export interface UserSkill {
  _id: string;
  status: number;
  skill: Skill;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CreateUserSkillDto {
  skill: string;
  status: number;
}

export type UpdateUserSkillDto = Partial<CreateUserSkillDto>;
