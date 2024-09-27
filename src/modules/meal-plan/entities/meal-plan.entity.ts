import { User } from '../../auth/entities';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Meal } from '../../meal/entities';

@Entity()
export class MealPlan {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToMany(() => Meal, (meal) => meal.mealPlans, {
    cascade: true,
  })
  @JoinTable({
    name: 'meal_plan_meals',
    joinColumn: {
      name: 'mealPlanId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'mealId',
      referencedColumnName: 'id',
    },
  })
  meals: Meal[];

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
