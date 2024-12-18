import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { CreateSocialUserDto, UpdateUserDto } from '../dto';
import { PersonalInformationService } from './personal-information.service';
import { SocialProfilesService } from './social-profiles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly personalInformationService: PersonalInformationService,
    private readonly socialProfilesService: SocialProfilesService,
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

    let updatedUser = await this.createOrUpdatePersonalInformation(
      data,
      currentUser,
    );
    updatedUser = await this.createOrUpdateSocialProfiles(data, currentUser);

    Object.assign(updatedUser, data);

    const savedUser = await this.repository.save(updatedUser);

    return savedUser;
  }

  private async createOrUpdatePersonalInformation(
    data: UpdateUserDto,
    currentUser: User,
  ) {
    const user: User = currentUser;

    if (data.personalInformation) {
      if (user.personalInformation && user.personalInformation.id) {
        await this.personalInformationService.updateOne(
          user.personalInformation.id,
          data.personalInformation,
        );
      } else {
        const newPersonalInformation =
          await this.personalInformationService.createOne(
            data.personalInformation,
          );

        user.personalInformation = newPersonalInformation;
      }
    }
    return user;
  }

  private async createOrUpdateSocialProfiles(
    data: UpdateUserDto,
    currentUser: User,
  ) {
    const user: User = currentUser;

    if (data.socialProfiles) {
      if (user.socialProfiles && user.socialProfiles.id) {
        await this.socialProfilesService.updateOne(
          user.socialProfiles.id,
          data.socialProfiles,
        );
      } else {
        const newSocialProfiles = await this.socialProfilesService.createOne(
          data.socialProfiles,
        );

        user.socialProfiles = newSocialProfiles;
      }
    }
    return user;
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

  async findByEmail(email: string) {
    const user = this.repository.findOne({ where: { email } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findById(id: number) {
    const user = this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async createUser(user: CreateSocialUserDto) {
    return this.repository.save(user);
  }
}
