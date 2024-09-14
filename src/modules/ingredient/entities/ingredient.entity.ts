import { User } from 'src/modules/auth/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
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
