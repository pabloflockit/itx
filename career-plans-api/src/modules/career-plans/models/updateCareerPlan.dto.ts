import { IsOptional } from 'class-validator';
import { Skill } from 'src/modules/skills/schemas/skill.schema';

export class UpdateCareerPlanDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  skills: Skill[];
}
