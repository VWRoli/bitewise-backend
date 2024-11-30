import { IsEmail } from 'class-validator';
import { Ingredient } from '../../ingredient/entities';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Meal } from '../../meal/entities';
import { EAuthProvider } from '../enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsEmail()
  @Column()
  email: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.user)
  ingredients: Ingredient[];

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @Column({ default: null })
  refreshToken: string | null;

  @Column({ nullable: true })
  hash: string;

  @Column({
    type: 'enum',
    enum: EAuthProvider,
    enumName: 'EAuthProvider',
    default: EAuthProvider.PASSWORD,
  })
  provider: string;

  @Column({ nullable: true })
  providerId: string;

  @CreateDateColumn()
  createTimeStamp: Date;

  @UpdateDateColumn()
  updateTimeStamp: Date;

  @DeleteDateColumn({ default: null })
  deleteTimeStamp: Date | null;
}
