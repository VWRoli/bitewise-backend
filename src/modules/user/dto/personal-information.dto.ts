import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PersonalInformationDto {
  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    type: String,
    example: '1990-01-01',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    value ? new Date(value).toISOString().split('T')[0] : value,
  )
  dateOfBirth?: string;
}
