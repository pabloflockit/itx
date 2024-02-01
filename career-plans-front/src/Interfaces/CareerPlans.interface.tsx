import { Skill } from "./Skill.interface";

export interface CareerPlan {
    _id:         string;
    name:        string;
    description: string;
    skills?:     Skill[];
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}

export interface CreateCareerPlanDto {
    name:        string;
    description: string;
    skills:      string[];
}

export type UpdateCareerPlanDto = Partial<CreateCareerPlanDto>;