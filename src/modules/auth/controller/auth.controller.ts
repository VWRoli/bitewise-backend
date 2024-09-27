import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';

@UseGuards(ThrottlerGuard)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: CreateUserDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: LoginUserDto, @Res() res: Response) {
    return this.authService.signIn(dto, res);
  }
}
