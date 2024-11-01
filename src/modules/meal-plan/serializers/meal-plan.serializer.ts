import { MealPlan } from '../entities/meal-plan.entity';
import { serializeMeal } from '../../meal/serializers';
import { MealPlanResponseDto } from 'src/modules/meal-plan/dto';

export function serializeMealPlan(mealPlan: MealPlan): MealPlanResponseDto {
  return {
    id: mealPlan?.id,
    name: mealPlan?.name,
    meals:
      mealPlan?.mealPlanMeals?.map((mealPlanMeal) =>
        serializeMeal(mealPlanMeal.meal),
      ) || [],
  };
}
