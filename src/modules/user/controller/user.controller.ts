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
import { UserResponseDto } from 'src/modules/user/dto/user-response.dto';

@ApiTags('users')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  async getMe(@CurrentUser() currentUser: User): Promise<UserResponseDto> {
    const user = currentUser;
    delete user.refreshToken;
    return user;
  }

  @Patch('me')
  @ApiOkResponse({ type: UserResponseDto })
  async updateMe(
    @CurrentUser() currentUser: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
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
