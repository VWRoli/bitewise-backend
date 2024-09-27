import { stubUser } from '../../auth/entities';
import { MealPlan } from '.';
import { stubMeal } from '../../meal/entities';

export function stubMealPlan(): MealPlan {
  return {
    id: 1,
    meals: [stubMeal()],
    user: stubUser(),
    userId: stubUser().id,
    createTimeStamp: new Date(),
    updateTimeStamp: new Date(),
    deleteTimeStamp: null,
  };
}
