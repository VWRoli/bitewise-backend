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
import {
  CreateMealPlanDto,
  MealPlanResponseDto,
  UpdateMealPlanDto,
} from '../dto';
import { MealPlanService } from '../service';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../auth/entities';
import { serializeMealPlan } from '../serializers';

@ApiTags('meal-plan')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('meal-plan')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Get(':mealPlanId')
  @ApiOkResponse({ type: MealPlanResponseDto })
  async getOneMealPlan(
    @Param('mealPlanId') mealPlanId: number,
    @CurrentUser() user: User,
  ) {
    const mealPlan = await this.mealPlanService.getOne(mealPlanId, user.id);
    return serializeMealPlan(mealPlan);
  }

  @Get()
  @ApiOkResponse({ type: [MealPlanResponseDto] })
  async getAllMealPlan(@CurrentUser() user: User) {
    const mealPlans = await this.mealPlanService.getAll(user.id);
    const serializedMealPlans = mealPlans.map((mealPlan) =>
      serializeMealPlan(mealPlan),
    );
    return serializedMealPlans;
  }

  @Post()
  @ApiOkResponse({ type: MealPlanResponseDto })
  async createMealPlan(@Body() dto: CreateMealPlanDto) {
    const mealPlan = await this.mealPlanService.createOne(dto);
    return serializeMealPlan(mealPlan);
  }

  @Patch(':mealPlanId')
  @ApiOkResponse({ type: MealPlanResponseDto })
  async updateMealPlan(
    @Param('mealPlanId') mealPlanId: number,
    @Body() body: UpdateMealPlanDto,
    @CurrentUser() user: User,
  ) {
    const mealPlan = await this.mealPlanService.updateOne(
      mealPlanId,
      body,
      user.id,
    );
    return serializeMealPlan(mealPlan);
  }

  @Delete(':mealPlanId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMealPlan(
    @Param('mealPlanId') mealPlanId: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    return this.mealPlanService.deleteOne(mealPlanId, user.id);
  }
}
