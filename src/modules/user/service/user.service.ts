import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/entities';
import { UpdateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async deleteOne(id: number) {
    try {
      const user = await this.repository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('No user found with the provided id.');
      }

      await this.repository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const currentUser = await this.repository.findOne({
      where: {
        id,
      },
    });

    const updatedUser = {
      ...currentUser,
      ...data,
    };

    const savedUser = this.repository.save(updatedUser);
    return savedUser;
  }

  async validateUser(userId: number) {
    const user = await this.repository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`No User with the provided id`);
    }

    return user;
  }
}
