import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateUserDto } from '../../auth/dto';
import { PersonalInformationDto } from './personal-information.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  readonly refreshToken?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Google ID of the user' })
  readonly googleId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PersonalInformationDto)
  @ApiProperty({ type: PersonalInformationDto })
  personalInformation?: PersonalInformationDto;
}
