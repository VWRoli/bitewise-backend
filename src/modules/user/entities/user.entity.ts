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

import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../../ingredient/entities';
import { IsEmail } from 'class-validator';
import { Meal } from '../../meal/entities';
import { PersonalInformation } from './personal-information.entity';

@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @Column()
  email: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.user)
  ingredients: Ingredient[];

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @Column({ default: null })
  refreshToken: string | null;

  @ApiProperty({ type: () => PersonalInformation })
  @OneToOne(() => PersonalInformation, { cascade: false, eager: true })
  @JoinColumn()
  personalInformation: PersonalInformation;

  @Column({ nullable: true })
  hash: string;

  @ApiProperty({ example: null, nullable: true })
  @Column({ nullable: true })
  googleId: string;

  @ApiProperty({ example: '2023-10-01T00:00:00.000Z' })
  @CreateDateColumn()
  createTimeStamp: Date;

  @ApiProperty({ example: '2023-10-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updateTimeStamp: Date;

  @ApiProperty({ example: null, nullable: true })
  @DeleteDateColumn({ default: null })
  deleteTimeStamp: Date | null;
}
