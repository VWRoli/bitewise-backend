import { MealIngredient } from '../../meal/entities/meal-ingredient.entity';
import { User } from '../../auth/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { MealPlan } from '../../meal-plan/entities';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MealIngredient, (mealIngredient) => mealIngredient.meal, {
    cascade: true,
  })
  mealIngredients: MealIngredient[];

  @ManyToMany(() => MealPlan, (mealPlan) => mealPlan.meals)
  mealPlans: MealPlan[];

  @ManyToOne(() => User, (user) => user.meals)
  @JoinColumn()
  user: User;

  @RelationId((meal: Meal) => meal.user)
  userId: number;

  @CreateDateColumn()
  createTimeStamp: Date;

  @UpdateDateColumn()
  updateTimeStamp: Date;

  @DeleteDateColumn({ default: null })
  deleteTimeStamp: Date | null;
}
