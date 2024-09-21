import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities';
import { IngredientController } from './controller';
import { Ingredient } from './entities';
import { IngredientService } from './service';
import { UserService } from '../user/service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, User])],
  controllers: [IngredientController],
  providers: [IngredientService, UserService],
})
export class IngredientModule {}
