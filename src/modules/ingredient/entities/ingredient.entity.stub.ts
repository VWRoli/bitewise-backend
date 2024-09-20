import { EUnit } from '../enum';
import { stubUser } from '../../auth/entities';
import { Ingredient } from '../entities';

export function stubIngredient(override: Partial<Ingredient> = {}): Ingredient {
  return {
    id: 1,
    name: 'Apple',
    protein: 0.3,
    totalFat: 0.2,
    saturatedFat: 0.03,
    totalCarbohydrates: 25,
    sugar: 19,
    dietaryFiber: 4.4,
    calories: 95,
    user: stubUser(),
    userId: 1,
    price: 15,
    unit: EUnit.HUNDRED_GRAMS,
    createTimeStamp: new Date(),
    updateTimeStamp: new Date(),
    deleteTimeStamp: null,
    ...override,
  };
}
