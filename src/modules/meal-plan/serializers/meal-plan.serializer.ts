import { MealPlan } from '../entities/meal-plan.entity';
import { MealResponseDto } from '../../meal/dto';
import { serializeMeal } from '../../meal/serializers';

export function serializeMealPlan(mealPlan: MealPlan): {
  id: number;
  meals: MealResponseDto[];
} {
  return {
    id: mealPlan?.id,
    meals:
      mealPlan?.mealPlanMeals?.map((mealPlanMeal) =>
        serializeMeal(mealPlanMeal.meal),
      ) || [],
  };
}
