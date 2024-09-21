import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMealDto,
  IngredientQuantityDto,
  MealResponseDto,
  UpdateMealDto,
} from '../dto';
import { Meal, MealIngredient } from '../entities';
import { Repository } from 'typeorm';
import { Ingredient } from '../../ingredient/entities';
import { UserService } from '../../user/service';
import { serializeMeal } from '../serializers/meal.serializer';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private repository: Repository<Meal>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    private readonly userService: UserService,
  ) {}

  async getOne(userId: number): Promise<MealResponseDto> {
    const meal = await this.repository.findOne({
      where: { user: { id: userId } },
    });
    return serializeMeal(meal);
  }

  async getAll(userId: number): Promise<MealResponseDto[]> {
    console.log(userId);
    const meals = await this.repository.find({
      where: { user: { id: userId } },
    });

    const serializedMeals = meals.map((meal) => serializeMeal(meal));
    return serializedMeals;
  }

  async createOne(data: CreateMealDto): Promise<MealResponseDto> {
    const user = await this.userService.validateUser(data.userId);

    await this.checkIfMealExists(data);

    const meal = this.repository.create({
      name: data.name,
      user: user,
      mealIngredients: [],
    });

    for (const mealIngredientDto of data.ingredients) {
      await this.addMealIngredient(meal, mealIngredientDto);
    }

    const savedMeal = await this.repository.save(meal);

    return serializeMeal(savedMeal);
  }

  async updateOne(id: number, data: UpdateMealDto): Promise<MealResponseDto> {
    const currentMeal = await this.repository.findOne({
      where: { id },
    });
    if (!currentMeal) {
      throw new NotFoundException('No meal found with the provided id.');
    }

    const savedMeal = await this.repository.save(data);

    // Serialize the response
    const mealResponse: MealResponseDto = {
      id: savedMeal.id,
      name: savedMeal.name,
      ingredients: savedMeal.mealIngredients.map((mi) => ({
        id: mi.id,
        ingredientId: mi.ingredient.id,
        ingredientName: mi.ingredient.name,
        quantity: mi.quantity,
      })),
    };

    return mealResponse;
  }

  async deleteOne(id: number) {
    try {
      const currentMeal = await this.repository.findOne({
        where: { id },
      });
      if (!currentMeal) {
        throw new NotFoundException('No meal found with the provided id.');
      }

      await this.repository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async checkIfMealExists(data: CreateMealDto) {
    const existingMeal = await this.repository.findOne({
      where: {
        name: data.name,
        user: { id: data.userId },
      },
    });

    if (existingMeal) {
      throw new ConflictException(
        `You already have a meal with the same name.`,
      );
    }
    return existingMeal;
  }

  async addMealIngredient(
    meal: Meal,
    mealIngredientDto: IngredientQuantityDto,
  ): Promise<void> {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id: mealIngredientDto.ingredientId },
    });

    if (!ingredient) {
      throw new NotFoundException(
        `Ingredient with id ${mealIngredientDto.ingredientId} not found`,
      );
    }

    const mealIngredient = new MealIngredient();
    mealIngredient.meal = meal;
    mealIngredient.ingredient = ingredient;
    mealIngredient.quantity = mealIngredientDto.quantity;

    meal.mealIngredients.push(mealIngredient);
  }
}
