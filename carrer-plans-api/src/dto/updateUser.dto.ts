import { IsEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmpty()
  @IsOptional()
  firstName?: string;

  @IsEmpty()
  @IsOptional()
  lastName?: string;

  @IsEmpty()
  @IsOptional()
  email?: string;

  @IsEmpty()
  @IsOptional()
  position?: string;
}
