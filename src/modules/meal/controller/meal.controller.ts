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

@ApiTags('meal')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get(':mealId')
  @ApiOkResponse({ type: MealResponseDto })
  getOneMeal(@Param('mealId') mealId: number) {
    return this.mealService.getOne(mealId);
  }

  @Get()
  @ApiOkResponse({ type: [MealResponseDto] })
  getAllMeal(@CurrentUser() user: User) {
    return this.mealService.getAll(user.id);
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
