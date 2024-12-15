import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { MealPlanMeal } from './meal-plan-meal.entity';
import { User } from '../../user/entities';

@Entity()
export class MealPlan {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => MealPlanMeal, (mealPlanMeal) => mealPlanMeal.mealPlan, {
    cascade: true,
  })
  mealPlanMeals: MealPlanMeal[];

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.meals)
  @JoinColumn()
  user: User;

  @RelationId((mealPlan: MealPlan) => mealPlan.user)
  userId: number;

  @CreateDateColumn()
  createTimeStamp: Date;

  @UpdateDateColumn()
  updateTimeStamp: Date;

  @DeleteDateColumn({ default: null })
  deleteTimeStamp: Date | null;
}
