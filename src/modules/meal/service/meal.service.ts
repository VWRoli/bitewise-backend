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
import { In, Repository } from 'typeorm';
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
    @InjectRepository(MealIngredient)
    private mealIngredientRepository: Repository<MealIngredient>,
    private readonly userService: UserService,
  ) {}

  async getOne(mealId: number): Promise<MealResponseDto> {
    const meal = await this.repository.findOne({
      where: { id: mealId },
      relations: ['mealIngredients'],
    });

    if (!meal) {
      throw new NotFoundException(`No meal found with the provided ID.`);
    }

    return serializeMeal(meal);
  }

  async getAll(userId: number): Promise<MealResponseDto[]> {
    const meals = await this.repository.find({
      where: { user: { id: userId } },
      relations: ['mealIngredients'],
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

    for (const mealIngredientDto of data.mealIngredients) {
      await this.addMealIngredient(meal, mealIngredientDto);
    }

    const savedMeal = await this.repository.save(meal);

    return serializeMeal(savedMeal);
  }

  async updateOne(id: number, data: UpdateMealDto): Promise<MealResponseDto> {
    const currentMeal = await this.getCurrentMeal(id);

    const updatedMeal: Meal = {
      ...currentMeal,
      ...data,
      mealIngredients: [],
    };

    const existingMealIngredients = await this.mealIngredientRepository.find({
      where: { meal: { id: currentMeal.id } },
    });

    for (const mealIngredient of existingMealIngredients) {
      await this.mealIngredientRepository.remove(mealIngredient);
    }

    for (const mealIngredientDto of data.mealIngredients) {
      await this.addMealIngredient(updatedMeal, mealIngredientDto);
    }

    const savedMeal = await this.repository.save(updatedMeal);

    return serializeMeal(savedMeal);
  }

  async deleteOne(id: number) {
    try {
      await this.getCurrentMeal(id);

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

  async getCurrentMeal(id: number) {
    const currentMeal = await this.repository.findOne({
      where: { id },
      relations: ['mealIngredients'],
    });
    if (!currentMeal) {
      throw new NotFoundException('No meal found with the provided id.');
    }

    return currentMeal;
  }

  async findMealsByIds(userId: number, ids: number[]): Promise<Meal[]> {
    const meals = await this.repository.find({
      where: {
        id: In(ids),
        user: { id: userId },
      },
      relations: ['mealIngredients', 'mealIngredients.ingredient'],
    });

    if (meals?.length !== ids?.length) {
      const foundIds = meals?.map((meal) => meal.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Meals with the following IDs were not found or do not belong to the user: ${notFoundIds.join(', ')}`,
      );
    }

    return meals;
  }
}
