import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class PersonalInformationDto {
  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    type: String,
  })
  @IsOptional()
  @IsString()
  dateOfBirth?: string;
}
