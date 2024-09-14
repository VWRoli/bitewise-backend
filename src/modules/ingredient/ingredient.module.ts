import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/auth/entities';
import { IngredientController } from 'src/modules/ingredient/controller';
import { Ingredient } from 'src/modules/ingredient/entities';
import { IngredientService } from 'src/modules/ingredient/service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, User])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
