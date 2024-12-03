import { IsString } from 'class-validator';
import { CreateUserDto } from '../../auth/dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly refreshToken?: string;

  @IsString()
  readonly googleId?: string;
}
