import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class IngredientQuantityDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID of the ingredient',
    required: true,
  })
  readonly ingredientId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    example: 100,
    description: 'Quantity of the ingredient in the meal',
    required: true,
  })
  readonly quantity: number;
}
