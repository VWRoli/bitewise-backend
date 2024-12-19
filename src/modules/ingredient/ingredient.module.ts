import { Ingredient } from './entities';
import { IngredientController } from './controller';
import { IngredientService } from './service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient]), UserModule],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
