import { ApiProperty } from '@nestjs/swagger';
import { MealResponseDto } from '../../meal/dto';

export class MealPlanResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the meal plan',
  })
  id: number;

  @ApiProperty({
    description: 'Array of meals associated with the meal plan',
    type: [MealResponseDto],
  })
  meals: MealResponseDto[];
}
