import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service';
import { JwtGuard } from '../../auth/guard';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../entities';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UpdateUserDto } from '../dto';

@ApiTags('users')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @ApiOkResponse({ type: User })
  getMe(@CurrentUser() currentUser: User) {
    const user = currentUser;
    delete user.refreshToken;
    return user;
  }

  @Patch('me')
  @ApiOkResponse({ type: User })
  async updateMe(
    @CurrentUser() currentUser: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(currentUser.id, updateUserDto);
    delete user.refreshToken;
    delete user.hash;
    return user;
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMe(@CurrentUser() user: User) {
    return this.userService.deleteOne(user.id);
  }
}
