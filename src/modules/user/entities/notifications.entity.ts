import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotificationSettings {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, default: '' })
  defaultEmailAddress?: string;

  @Column({ nullable: true, default: false })
  communicationEmail?: boolean;

  @Column({ nullable: true, default: false })
  marketingEmail?: boolean;

  @Column({ nullable: true, default: true })
  securityEmail?: boolean;
}
