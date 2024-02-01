import { IsOptional } from 'class-validator';
import { Skill } from 'src/modules/skills/schemas/skill.schema';

export class UpdateUserSkillDto {
  @IsOptional()
  status: number;

  @IsOptional()
  skill: Skill;
}
