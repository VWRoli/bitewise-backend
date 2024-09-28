import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategy';
import { TokenService } from '../token/services/token.service';
import { UserService } from '../user/service';

@Module({
  imports: [TypeOrmModule.forFeature([]), JwtModule.register({})],
  controllers: [],
  providers: [TokenService, JwtStrategy, UserService],
  exports: [TokenService],
})
export class TokenModule {}
