import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtGuard } from '../../auth/guard';
import { CreateMealDto, MealResponseDto, UpdateMealDto } from '../dto';
import { MealService } from '../service';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../auth/entities';
import { serializeMeal } from '../../meal/serializers';

@ApiTags('meal')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get(':mealId')
  @ApiOkResponse({ type: MealResponseDto })
  async getOneMeal(
    @CurrentUser() user: User,
    @Param('mealId') mealId: number,
  ): Promise<MealResponseDto> {
    const meal = await this.mealService.getOne(mealId, user.id);
    return serializeMeal(meal);
  }

  @Get()
  @ApiOkResponse({ type: [MealResponseDto] })
  async getAllMeal(@CurrentUser() user: User): Promise<MealResponseDto[]> {
    const meals = await this.mealService.getAll(user.id);
    const serializedMeals = meals.map((meal) => serializeMeal(meal));
    return serializedMeals;
  }

  @Post()
  @ApiOkResponse({ type: MealResponseDto })
  async createMeal(@Body() dto: CreateMealDto): Promise<MealResponseDto> {
    const meal = await this.mealService.createOne(dto);
    return serializeMeal(meal);
  }

  @Patch(':mealId')
  @ApiOkResponse({ type: MealResponseDto })
  async updateMeal(
    @CurrentUser() user: User,
    @Param('mealId') mealId: number,
    @Body() body: UpdateMealDto,
  ): Promise<MealResponseDto> {
    const meal = await this.mealService.updateOne(mealId, body, user.id);
    return serializeMeal(meal);
  }

  @Delete(':mealId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMeal(
    @CurrentUser() user: User,
    @Param('mealId') mealId: number,
  ): Promise<void> {
    return this.mealService.deleteOne(mealId, user.id);
  }
}
