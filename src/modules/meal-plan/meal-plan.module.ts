import { Ingredient } from '../ingredient/entities';
import { MealModule } from 'src/modules/meal/meal.module';
import { MealPlan } from './entities';
import { MealPlanController } from './controller';
import { MealPlanService } from './service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MealPlan, Ingredient]),
    MealModule,
    UserModule,
  ],
  controllers: [MealPlanController],
  providers: [MealPlanService],
})
export class MealPlanModule {}
