import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PersonalInformation {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'john_doe' })
  @Column({ unique: false, nullable: true, default: '' })
  userName?: string;

  @ApiProperty({ example: 'John' })
  @Column({ nullable: true, default: '' })
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @Column({ nullable: true, default: '' })
  lastName?: string;

  @ApiProperty({ example: '+1234567890' })
  @Column({ nullable: true, default: '' })
  phone?: string;

  @ApiProperty({ example: '1990-01-01' })
  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string;
}
