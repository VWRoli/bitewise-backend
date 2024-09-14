import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from 'src/modules/ingredient/dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}
