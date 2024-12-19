import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Ingredient } from '../../ingredient/entities';
import { IsEmail } from 'class-validator';
import { Meal } from '../../meal/entities';
import { PersonalInformation } from './personal-information.entity';
import { SocialProfiles } from 'src/modules/user/entities/social-profiles.entity';

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

  @OneToOne(() => PersonalInformation, { cascade: false, eager: true })
  @JoinColumn()
  personalInformation: PersonalInformation;

  @OneToOne(() => SocialProfiles, { cascade: false, eager: true })
  @JoinColumn()
  socialProfiles: SocialProfiles;

  @Column({ nullable: true })
  hash: string;

  @Column({ nullable: true })
  googleId: string;

  @CreateDateColumn()
  createTimeStamp: Date;

  @UpdateDateColumn()
  updateTimeStamp: Date;

  @DeleteDateColumn({ default: null })
  deleteTimeStamp: Date | null;
}
