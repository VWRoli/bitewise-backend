import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../service';
import { JwtGuard } from '../../auth/guard';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../auth/entities';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('users')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMe(@CurrentUser() user: User) {
    return this.userService.deleteOne(user.id);
  }
}
