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

@ApiTags('meal-plan')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('meal-plan')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Get(':mealPlanId')
  @ApiOkResponse({ type: MealPlanResponseDto })
  getOneMealPlan(
    @Param('mealPlanId') mealPlanId: number,
    @CurrentUser() user: User,
  ) {
    return this.mealPlanService.getOne(mealPlanId, user.id);
  }

  @Get()
  @ApiOkResponse({ type: [MealPlanResponseDto] })
  getAllMealPlan(@CurrentUser() user: User) {
    return this.mealPlanService.getAll(user.id);
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
    @CurrentUser() user: User,
  ) {
    return this.mealPlanService.updateOne(mealPlanId, body, user.id);
  }

  @Delete(':mealPlanId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMealPlan(
    @Param('mealPlanId') mealPlanId: number,
    @CurrentUser() user: User,
  ) {
    return this.mealPlanService.deleteOne(mealPlanId, user.id);
  }
}
