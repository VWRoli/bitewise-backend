import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'email@bitewise.com', required: true })
  @Transform(({ value }) => value.trim())
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({ example: 'StrongPassword1', required: true })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Match('password', {
    message: 'Passwords do not match',
  })
  @ApiProperty({ example: 'StrongPassword1', required: true })
  readonly confirmPassword: string;
}
