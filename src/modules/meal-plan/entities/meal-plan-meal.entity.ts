import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meal } from '../../meal/entities';
import { MealPlan } from '../../meal-plan/entities';

@Entity()
export class MealPlanMeal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => MealPlan, (mealPlan) => mealPlan.mealPlanMeals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mealPlanId' })
  mealPlan: MealPlan;

  @ManyToOne(() => Meal, (meal) => meal.mealPlanMeals)
  @JoinColumn({ name: 'mealId' })
  meal: Meal;
}
