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

@ApiTags('meal')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  // @Get()
  // @ApiOkResponse({ type: MealResponseDto })
  // getOneMeal(@Param('userId') userId: number) {
  //   return this.mealService.getOne(userId);
  // }

  @Get('/all/:userId')
  @ApiOkResponse({ type: [MealResponseDto] })
  getAllMeal(@Param('userId') userId: number) {
    return this.mealService.getAll(userId);
  }

  @Post()
  @ApiOkResponse({ type: MealResponseDto })
  createMeal(@Body() dto: CreateMealDto) {
    return this.mealService.createOne(dto);
  }

  @Patch(':mealId')
  @ApiOkResponse({ type: MealResponseDto })
  updateMeal(@Param('mealId') mealId: number, @Body() body: UpdateMealDto) {
    return this.mealService.updateOne(mealId, body);
  }

  @Delete(':mealId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMeal(@Param('mealId') mealId: number) {
    return this.mealService.deleteOne(mealId);
  }
}
