import { MealIngredientResponseDto, MealResponseDto } from '../dto';
import { Meal } from '../entities/meal.entity';
import { MealIngredient } from '../entities';

export function serializeMeal(meal: Meal): MealResponseDto {
  return {
    id: meal.id,
    name: meal.name,
    ingredients: meal.mealIngredients.map((mealIngredient) =>
      serializeMealIngredient(mealIngredient),
    ),
  };
}

export function serializeMealIngredient(
  mealIngredient: MealIngredient,
): MealIngredientResponseDto {
  return {
    id: mealIngredient.id,
    ingredientId: mealIngredient.ingredient.id,
    ingredientName: mealIngredient.ingredient.name,
    quantity: mealIngredient.quantity,
  };
}
