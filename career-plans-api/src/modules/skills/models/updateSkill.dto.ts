import { IsOptional } from 'class-validator';

export class UpdateSkillDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
}
