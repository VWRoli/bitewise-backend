import { Repository } from 'typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { MealPlan, stubMealPlan } from '../entities';
import { MealPlanController } from './meal-plan.controller';
import { MealPlanService } from '../service';
import { User } from '../../auth/entities';
import { UserService } from '../../user/service';
import { Ingredient } from '../../ingredient/entities';
import { serializeMealPlan } from '../serializers/meal-plan.serializer';
import { CreateMealPlanDto } from '../dto';
import { MealService } from '../../meal/service';
import { Meal, MealIngredient } from '../../meal/entities';

const mealPlanStub = stubMealPlan();
const mealPlanResponseStub = serializeMealPlan(mealPlanStub);
const mealPlanResponseStubs = [mealPlanResponseStub];

describe('MealPlanController', () => {
  let controller: MealPlanController;
  let service: MealPlanService;
  let repository: Repository<MealPlan>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ThrottlerModule.forRoot()],
      controllers: [MealPlanController],
      providers: [
        MealPlanService,
        UserService,
        MealService,
        {
          provide: getRepositoryToken(MealPlan),
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(Ingredient),
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(Meal),
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(MealIngredient),
          useValue: jest.fn(),
        },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: () => true }) // Mock the ThrottlerGuard
      .compile();

    service = moduleRef.get<MealPlanService>(MealPlanService);
    controller = moduleRef.get<MealPlanController>(MealPlanController);
    repository = moduleRef.get<Repository<MealPlan>>(
      getRepositoryToken(MealPlan),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMealPlans', () => {
    it('should return an array of mealPlans', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue(mealPlanResponseStubs);
      const result = await controller.getAllMealPlan(mealPlanStub.userId);

      expect(result).toEqual(mealPlanResponseStubs);
    });
  });

  describe('getOneMealPlan', () => {
    it('should return a mealPlan', async () => {
      jest.spyOn(service, 'getOne').mockResolvedValue(mealPlanResponseStub);
      const result = await controller.getOneMealPlan(mealPlanStub.userId);

      expect(result).toEqual(mealPlanResponseStub);
    });
  });

  describe('createMealPlan', () => {
    it('should create a new mealPlan', async () => {
      jest.spyOn(service, 'createOne').mockResolvedValue(mealPlanResponseStub);

      const newStub: CreateMealPlanDto = {
        ...mealPlanStub,
        mealIds: [1, 2],
      };
      const result = await controller.createMealPlan(newStub);

      expect(result).toEqual(mealPlanResponseStub);
    });
  });

  describe('updateMealPlan', () => {
    it('should update an existing mealPlan', async () => {
      jest.spyOn(service, 'updateOne').mockResolvedValue(mealPlanResponseStub);

      const newStub: CreateMealPlanDto = {
        ...mealPlanStub,
        mealIds: [2],
      };

      const result = await controller.updateMealPlan(mealPlanStub.id, newStub);

      expect(result).toEqual(mealPlanResponseStub);
    });
  });

  describe('deleteMealPlan', () => {
    it('should delete an existing mealPlan', async () => {
      jest.spyOn(service, 'deleteOne').mockResolvedValue(undefined);

      const result = await controller.deleteMealPlan(mealPlanStub.id);

      expect(result).toBeUndefined();
    });
  });
});
