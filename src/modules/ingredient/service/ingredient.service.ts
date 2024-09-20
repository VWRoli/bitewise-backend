import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/entities';
import {
  CreateIngredientDto,
  IngredientResponseDto,
  UpdateIngredientDto,
} from 'src/modules/ingredient/dto';
import { Ingredient } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private repository: Repository<Ingredient>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(userId: number): Promise<IngredientResponseDto[]> {
    const ingredients = await this.repository.find({
      where: { user: { id: userId } },
    });

    return ingredients;
  }

  async createOne(data: CreateIngredientDto): Promise<IngredientResponseDto> {
    //check if user exists
    const user = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`No User with the provided id`);
    }

    const existingIngredient = await this.repository.findOne({
      where: {
        user: { id: user.id },
      },
    });

    if (existingIngredient) {
      throw new ConflictException(
        `You already have an ingredient with the same name currency.`,
      );
    }

    const ingredient = this.repository.create(data);

    return await this.repository.save(ingredient);
  }

  async updateOne(
    id: number,
    data: UpdateIngredientDto,
  ): Promise<IngredientResponseDto> {
    const currentIngredient = await this.repository.findOne({
      where: { id },
    });
    if (!currentIngredient) {
      throw new NotFoundException('No ingredient found with the provided id.');
    }

    return this.repository.save(data);
  }

  async deleteOne(id: number) {
    try {
      const currentIngredient = await this.repository.findOne({
        where: { id },
      });
      if (!currentIngredient) {
        throw new NotFoundException(
          'No ingredient found with the provided id.',
        );
      }

      await this.repository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
