import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities';
import { MealPlanController } from './controller';
import { MealPlan } from './entities';
import { MealPlanService } from './service';
import { UserService } from '../user/service';
import { Meal, MealIngredient } from '../meal/entities';
import { MealService } from '../meal/service';
import { Ingredient } from 'src/modules/ingredient/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MealPlan,
      Meal,
      User,
      Ingredient,
      MealIngredient,
    ]),
  ],
  controllers: [MealPlanController],
  providers: [MealPlanService, UserService, MealService],
})
export class MealPlanModule {}
