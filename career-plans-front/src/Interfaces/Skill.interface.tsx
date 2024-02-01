export interface Skill {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type CreateSkillDto = Omit<Skill,"_id" | "createdAt" | "updatedAt" | "__v">;

export type UpdateSkillDto = Partial<CreateSkillDto>;
