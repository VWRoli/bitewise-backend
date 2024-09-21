import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities';
import { MealController } from './controller';
import { Meal } from './entities';
import { MealService } from './service';
import { MealIngredient } from './entities';
import { Ingredient } from '../ingredient/entities';
import { UserService } from '../user/service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User, MealIngredient, Ingredient])],
  controllers: [MealController],
  providers: [MealService, UserService],
})
export class MealModule {}
