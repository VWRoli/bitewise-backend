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

@ApiTags('meal-plan')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('meal-plan')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Get(':mealPlanId')
  @ApiOkResponse({ type: MealPlanResponseDto })
  getOneMealPlan(@Param('mealPlanId') mealPlanId: number) {
    return this.mealPlanService.getOne(mealPlanId);
  }

  @Get('/all/:userId')
  @ApiOkResponse({ type: [MealPlanResponseDto] })
  getAllMealPlan(@Param('userId') userId: number) {
    return this.mealPlanService.getAll(userId);
  }

  @Post()
  @ApiOkResponse({ type: MealPlanResponseDto })
  createMealPlan(@Body() dto: CreateMealPlanDto) {
    return this.mealPlanService.createOne(dto);
  }

  @Patch(':mealPlanId')
  @ApiOkResponse({ type: MealPlanResponseDto })
  updateMealPlan(
    @Param('mealPlanId') mealPlanId: number,
    @Body() body: UpdateMealPlanDto,
  ) {
    return this.mealPlanService.updateOne(mealPlanId, body);
  }

  @Delete(':mealPlanId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMealPlan(@Param('mealPlanId') mealPlanId: number) {
    return this.mealPlanService.deleteOne(mealPlanId);
  }
}
