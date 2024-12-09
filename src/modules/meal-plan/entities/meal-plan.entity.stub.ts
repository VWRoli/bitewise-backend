import { stubUser } from '../../auth/entities';
import { MealPlan } from '.';

export function stubMealPlan(): MealPlan {
  return {
    id: 1,
    mealPlanMeals: [],
    user: stubUser(),
    name: 'Breakfast Meal Plan',
    userId: stubUser().id,
    createTimeStamp: new Date(),
    updateTimeStamp: new Date(),
    deleteTimeStamp: null,
  };
}
