import { stubIngredient } from '../../ingredient/entities';
import { stubUser } from '../../auth/entities';
import { Meal, MealIngredient } from '../entities';
import { MealPlan } from '../../meal-plan/entities';

export function stubMeal(): Meal {
  return {
    id: 1,
    name: 'Fruit Salad',
    mealIngredients: [stubMealIngredient()],
    mealPlans: [{ id: 1 } as MealPlan],
    user: stubUser(),
    userId: stubUser().id,
    createTimeStamp: new Date(),
    updateTimeStamp: new Date(),
    deleteTimeStamp: null,
  };
}

export function stubMealIngredient(): MealIngredient {
  return {
    id: 1,
    meal: { id: 1 } as Meal,
    ingredient: stubIngredient(),
    quantity: 5,
  };
}
