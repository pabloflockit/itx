import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Skill } from 'src/modules/skills/schemas/skill.schema';

export class CreateUserSkillDto {
  @IsInt()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  skill: Skill;
}
