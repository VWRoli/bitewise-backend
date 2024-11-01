import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/service';
import { MealPlan, MealPlanMeal } from '../entities';
import {
  CreateMealPlanDto,
  MealPlanResponseDto,
  UpdateMealPlanDto,
} from '../dto';
import { MealService } from '../../meal/service';
import { serializeMealPlan } from '../serializers/meal-plan.serializer';
import { MEAL_PLAN_RELATIONS } from '../constants';

@Injectable()
export class MealPlanService {
  constructor(
    @InjectRepository(MealPlan)
    private repository: Repository<MealPlan>,
    private readonly userService: UserService,
    private readonly mealService: MealService,
  ) {}

  async getOne(mealPlanId: number) {
    const mealPlan = await this.repository.findOne({
      where: { id: mealPlanId },
      relations: MEAL_PLAN_RELATIONS,
    });
    if (!mealPlan) {
      throw new NotFoundException(`No meal plan found with the provided ID.`);
    }
    return serializeMealPlan(mealPlan);
  }

  async getAll(userId: number): Promise<MealPlanResponseDto[]> {
    const mealPlans = await this.repository.find({
      where: { user: { id: userId } },
      relations: MEAL_PLAN_RELATIONS,
    });
    const serializedMealPlans = mealPlans.map((mealPlan) =>
      serializeMealPlan(mealPlan),
    );
    return serializedMealPlans;
  }

  async createOne(data: CreateMealPlanDto): Promise<MealPlanResponseDto> {
    const user = await this.userService.validateUser(data.userId);

    const meals = await this.mealService.findMealsByIds(user.id, data.mealIds);
    const mealPlan = this.repository.create({
      name: data.name,
      user: user,
    });

    mealPlan.mealPlanMeals = data.mealIds.map((mealId) => {
      const meal = meals.find((m) => m.id === mealId);
      if (!meal) {
        throw new NotFoundException(`Meal with ID ${mealId} not found.`);
      }
      const mealPlanMeal = new MealPlanMeal();
      mealPlanMeal.mealPlan = mealPlan;
      mealPlanMeal.meal = meal;
      return mealPlanMeal;
    });

    const savedMealPlan = await this.repository.save(mealPlan);

    return serializeMealPlan(savedMealPlan);
  }

  async updateOne(id: number, data: UpdateMealPlanDto) {
    const currentMealPlan = await this.getCurrentMealPlan(id);

    const user = await this.userService.validateUser(data.userId);

    const meals = await this.mealService.findMealsByIds(user.id, data.mealIds);

    const mealPlanMeals = meals.map((meal) => {
      const mealPlanMeal = new MealPlanMeal();
      mealPlanMeal.mealPlan = currentMealPlan;
      mealPlanMeal.meal = meal;
      return mealPlanMeal;
    });
    const updatedMealPlan: MealPlan = {
      ...currentMealPlan,
      ...data,
      mealPlanMeals,
    };

    const savedMealPlan = await this.repository.save(updatedMealPlan);

    return serializeMealPlan(savedMealPlan);
  }

  async deleteOne(id: number) {
    try {
      await this.getCurrentMealPlan(id);
      await this.repository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentMealPlan(id: number) {
    const currentMealPlan = await this.repository.findOne({
      where: { id },
    });
    if (!currentMealPlan) {
      throw new NotFoundException('No meal plan found with the provided id.');
    }

    return currentMealPlan;
  }
}
