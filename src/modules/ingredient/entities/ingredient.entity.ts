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

import { EUnit } from '../enum';
import { MealIngredient } from '../../meal/entities';
import { User } from '../../user/entities';
import { decimalTransformer } from '../../../common/transformers';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    transformer: decimalTransformer,
  })
  protein: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    transformer: decimalTransformer,
  })
  totalFat: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    transformer: decimalTransformer,
  })
  saturatedFat: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    transformer: decimalTransformer,
  })
  totalCarbohydrates: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    transformer: decimalTransformer,
  })
  sugar: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    transformer: decimalTransformer,
  })
  dietaryFiber: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    transformer: decimalTransformer,
  })
  calories: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
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
