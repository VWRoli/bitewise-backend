import { IsBoolean, IsEmail, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class NotificationSettingsDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The default email address for notifications',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  defaultEmailAddress?: string;

  @ApiProperty({
    example: true,
    description: 'Flag to receive communication emails',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  communicationEmail?: boolean;

  @ApiProperty({
    example: true,
    description: 'Flag to receive marketing emails',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  marketingEmail?: boolean;

  @ApiProperty({
    example: true,
    description: 'Flag to receive security emails',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  securityEmail?: boolean;
}
