import { MealPlan } from '.';
import { stubUser } from '../../user/entities';

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
