import { IngredientService } from './index';
import { Ingredient, stubIngredient } from '../entities';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../auth/entities';
import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';

const ingredientStub = stubIngredient();
const ingredientStubs = [ingredientStub];

describe('IngredientService', () => {
  let service: IngredientService;
  let repository: Repository<Ingredient>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IngredientService,
        {
          provide: getRepositoryToken(Ingredient),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();
    service = moduleRef.get<IngredientService>(IngredientService);
    repository = moduleRef.get<Repository<Ingredient>>(
      getRepositoryToken(Ingredient),
    );
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all ingredients for a given user', async () => {
      const userId = ingredientStub.userId;
      jest.spyOn(repository, 'find').mockResolvedValue(ingredientStubs);

      const result = await service.getAll(userId);

      expect(result).toEqual(ingredientStubs);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should return an empty array if no ingredients are found for the wrong user', async () => {
      const wrongUserId = 123;
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.getAll(wrongUserId);

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledWith({
        where: { user: { id: wrongUserId } },
      });
    });
  });

  describe('createOne', () => {
    it('should create a new ingredient', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(ingredientStub.user);
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(ingredientStub);
      jest.spyOn(repository, 'create').mockReturnValue(ingredientStub);
      jest.spyOn(repository, 'save').mockResolvedValue(ingredientStub);

      const result = await service.createOne(ingredientStub);

      expect(result).toEqual(ingredientStub);
      expect(repository.save).toHaveBeenCalledWith(ingredientStub);
    });

    it('should throw a NotFoundException if user does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.createOne(ingredientStub)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw a ConflictException if budget with the same name already exists', async () => {
      const user = ingredientStub.user;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(repository, 'findOne').mockResolvedValue(ingredientStub);

      await expect(service.createOne(ingredientStub)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('deleteOne', () => {
    it('should delete an existing ingredient', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(ingredientStub);
      jest.spyOn(repository, 'softDelete').mockResolvedValue(undefined);

      await service.deleteOne(ingredientStub.id);

      expect(repository.softDelete).toHaveBeenCalledWith(ingredientStub.id);
    });

    it('should throw a NotFoundException if ingredient does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.deleteOne(ingredientStub.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
