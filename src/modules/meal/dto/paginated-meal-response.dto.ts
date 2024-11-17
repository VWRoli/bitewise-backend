import { ApiProperty } from '@nestjs/swagger';
import { MealResponseDto } from 'src/modules/meal/dto/response-meal.dto';

export class PaginatedMealResponseDto {
  @ApiProperty({ type: [MealResponseDto] })
  data: MealResponseDto[];

  @ApiProperty()
  count: number;
}
