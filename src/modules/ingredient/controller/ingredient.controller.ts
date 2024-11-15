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
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../auth/entities';

@ApiTags('ingredient')
@UseGuards(JwtGuard, ThrottlerGuard)
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  @ApiOkResponse({ type: [IngredientResponseDto] })
  getAllIngredient(@CurrentUser() user: User) {
    return this.ingredientService.getAll(user.id);
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
    @CurrentUser() user: User,
  ) {
    return this.ingredientService.updateOne(ingredientId, body, user.id);
  }

  @Delete(':ingredientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteIngredient(
    @Param('ingredientId') ingredientId: number,
    @CurrentUser() user: User,
  ) {
    return this.ingredientService.deleteOne(ingredientId, user.id);
  }
}
