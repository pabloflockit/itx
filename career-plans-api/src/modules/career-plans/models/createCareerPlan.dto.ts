import { IsNotEmpty, IsString } from 'class-validator';
import { Skill } from 'src/modules/skills/schemas/skill.schema';

export class CreateCareerPlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  skills: Skill[];
}
