import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonalInformation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: false, nullable: true })
  userName?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string;
}
