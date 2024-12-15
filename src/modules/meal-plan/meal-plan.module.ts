import { Meal, MealIngredient } from '../meal/entities';
import { PersonalInformation, User } from '../user/entities';
import { PersonalInformationService, UserService } from '../user/service';

import { Ingredient } from '../ingredient/entities';
import { MealPlan } from './entities';
import { MealPlanController } from './controller';
import { MealPlanService } from './service';
import { MealService } from '../meal/service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MealPlan,
      Meal,
      User,
      Ingredient,
      MealIngredient,
      PersonalInformation,
    ]),
  ],
  controllers: [MealPlanController],
  providers: [
    MealPlanService,
    UserService,
    MealService,
    PersonalInformationService,
  ],
})
export class MealPlanModule {}
