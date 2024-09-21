import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateIngredientDto,
  IngredientResponseDto,
  UpdateIngredientDto,
} from '../dto';
import { Ingredient } from '../entities';
import { Repository } from 'typeorm';
import { UserService } from '../../user/service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private repository: Repository<Ingredient>,
    private readonly userService: UserService,
  ) {}

  async getAll(userId: number): Promise<IngredientResponseDto[]> {
    const ingredients = await this.repository.find({
      where: { user: { id: userId } },
    });

    return ingredients;
  }

  async createOne(data: CreateIngredientDto): Promise<IngredientResponseDto> {
    const user = await this.userService.validateUser(data.userId);

    await this.checkIfIngredientExists(data);

    const ingredient = this.repository.create({ ...data, user });

    const savedIngredient = await this.repository.save(ingredient);

    return plainToClass(IngredientResponseDto, savedIngredient);
  }

  async updateOne(
    id: number,
    data: UpdateIngredientDto,
  ): Promise<IngredientResponseDto> {
    const currentIngredient = await this.getCurrentIngredient(id);

    const updatedIngredient = {
      ...currentIngredient,
      ...data,
    };

    return this.repository.save(updatedIngredient);
  }

  async deleteOne(id: number) {
    try {
      await this.getCurrentIngredient(id);

      await this.repository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async checkIfIngredientExists(data: CreateIngredientDto) {
    const existingIngredient = await this.repository.findOne({
      where: {
        name: data.name,
        user: { id: data.userId },
      },
    });

    if (existingIngredient) {
      throw new ConflictException(
        `You already have a meal with the same name.`,
      );
    }
    return existingIngredient;
  }

  async getCurrentIngredient(id: number) {
    const currentIngredient = await this.repository.findOne({
      where: { id },
    });
    if (!currentIngredient) {
      throw new NotFoundException('No ingredient found with the provided id.');
    }

    return currentIngredient;
  }
}
