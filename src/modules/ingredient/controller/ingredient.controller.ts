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
import { JwtGuard } from '../../auth/guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { IngredientService } from '../service';
import {
  CreateIngredientDto,
  IngredientResponseDto,
  UpdateIngredientDto,
} from '../dto';

@ApiTags('ingredient')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':userId')
  @ApiOkResponse({ type: [IngredientResponseDto] })
  getAllIngredient(@Param('userId') userId: number) {
    return this.ingredientService.getAll(userId);
  }
  @Post()
  @ApiOkResponse({ type: IngredientResponseDto })
  createIngredient(@Body() dto: CreateIngredientDto) {
    return this.ingredientService.createOne(dto);
  }

  @Patch(':ingredientId')
  @ApiOkResponse({ type: IngredientResponseDto })
  updateIngredient(
    @Param('ingredientId') ingredientId: number,
    @Body() body: UpdateIngredientDto,
  ) {
    return this.ingredientService.updateOne(ingredientId, body);
  }

  @Delete(':ingredientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteIngredient(@Param('ingredientId') ingredientId: number) {
    return this.ingredientService.deleteOne(ingredientId);
  }
}
