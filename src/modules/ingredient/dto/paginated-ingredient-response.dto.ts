import { ApiProperty } from '@nestjs/swagger';
import { IngredientResponseDto } from './response-ingredient.dto';

export class PaginatedIngredientDto {
  @ApiProperty({ type: [IngredientResponseDto] })
  data: IngredientResponseDto[];

  @ApiProperty()
  count: number;
}
