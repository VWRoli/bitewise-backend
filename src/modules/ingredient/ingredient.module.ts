import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities';
import { IngredientController } from './controller';
import { Ingredient } from './entities';
import { IngredientService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, User])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
