import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { User } from '../entities';
import { UserResponseDto } from '../dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<UserResponseDto> | Promise<Observable<UserResponseDto>> {
    return next.handle().pipe(map((user) => plainToInstance(User, user)));
  }
}
