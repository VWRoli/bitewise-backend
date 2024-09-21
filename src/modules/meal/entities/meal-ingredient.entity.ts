import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Meal } from './meal.entity';
import { Ingredient } from '../../ingredient/entities';

@Entity()
export class MealIngredient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Meal, (meal) => meal.mealIngredients)
  @JoinColumn({ name: 'mealId' })
  meal: Meal;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.mealIngredients)
  @JoinColumn({ name: 'ingredientId' })
  ingredient: Ingredient;

  @Column()
  quantity: number;
}
