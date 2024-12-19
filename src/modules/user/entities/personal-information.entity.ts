import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonalInformation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: false, nullable: true, default: '' })
  userName?: string;

  @Column({ nullable: true, default: '' })
  firstName?: string;

  @Column({ nullable: true, default: '' })
  lastName?: string;

  @Column({ nullable: true, default: '' })
  phoneNumber?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string;
}
