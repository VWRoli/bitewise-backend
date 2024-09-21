import { stubIngredient } from 'src/modules/ingredient/entities';
import { stubUser } from '../../auth/entities';
import { Meal } from '../entities';

export function stubMeal(): Meal {
  return {
    id: 1,
    name: 'Fruit Salad',
    mealIngredients: [],
    user: stubUser(),
    userId: stubUser().id,
    createTimeStamp: new Date(),
    updateTimeStamp: new Date(),
    deleteTimeStamp: null,
  };
}
