import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateUserDto } from '../../auth/dto';
import { PersonalInformationDto } from './personal-information.dto';
import { SocialProfilesDto } from './social-profiles.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  readonly refreshToken?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Google ID of the user' })
  readonly googleId?: string;

  @IsString()
  @IsOptional()
  hash?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PersonalInformationDto)
  @ApiProperty({ type: PersonalInformationDto })
  personalInformation?: PersonalInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialProfilesDto)
  @ApiProperty({ type: SocialProfilesDto })
  socialProfiles?: SocialProfilesDto;
}
