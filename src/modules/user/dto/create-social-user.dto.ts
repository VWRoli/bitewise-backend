import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSocialUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'email@bitewise.com', required: true })
  @Transform(({ value }) => value.trim())
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly googleId: string;
}
