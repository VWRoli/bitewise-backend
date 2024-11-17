import { ApiProperty } from '@nestjs/swagger';
import { MealPlanResponseDto } from './response-meal-plan.dto';

export class PaginatedMealPlanResponseDto {
  @ApiProperty({ type: [MealPlanResponseDto] })
  data: MealPlanResponseDto[];

  @ApiProperty()
  count: number;
}
