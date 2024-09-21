import { MealIngredient } from '../../meal/entities/meal-ingredient.entity';
import { User } from '../../auth/entities';
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
