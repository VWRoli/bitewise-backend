import { Ingredient } from '../ingredient/entities';
import { Meal } from './entities';
import { MealController } from './controller';
import { MealIngredient } from './entities';
import { MealService } from './service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal, MealIngredient, Ingredient]),
    UserModule,
  ],
  controllers: [MealController],
  providers: [MealService],
  exports: [MealService],
})
export class MealModule {}
