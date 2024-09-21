import { EUnit } from '../enum';
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
import { MealIngredient } from '../../meal/entities';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  protein: number;

  @Column()
  totalFat: number;

  @Column()
  saturatedFat: number;

  @Column()
  totalCarbohydrates: number;

  @Column()
  sugar: number;

  @Column()
  dietaryFiber: number;

  @Column()
  calories: number;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: EUnit, enumName: 'EUnit' })
  unit: EUnit;

  @OneToMany(
    () => MealIngredient,
    (mealIngredient) => mealIngredient.ingredient,
  )
  mealIngredients: MealIngredient[];

  @ManyToOne(() => User, (user) => user.ingredients)
  @JoinColumn()
  user: User;

  @RelationId((ingredient: Ingredient) => ingredient.user)
  userId: number;

  @CreateDateColumn()
  createTimeStamp: Date;

  @UpdateDateColumn()
  updateTimeStamp: Date;

  @DeleteDateColumn({ default: null })
  deleteTimeStamp: Date | null;
}
