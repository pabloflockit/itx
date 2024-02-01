import { Skill } from './Skill.interface';

export interface UserSkill {
  _id: string;
  status: number;
  skill: Skill;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type CreateUserSkillDto = Omit<
  UserSkill,
  '_id' | 'createdAt' | 'updatedAt' | '__v'
>;

export type UpdateUserSkillDto = Partial<CreateUserSkillDto>;
