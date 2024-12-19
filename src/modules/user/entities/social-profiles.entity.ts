import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocialProfiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: '' })
  facebook: string;

  @Column({ nullable: true, default: '' })
  twitter: string;

  @Column({ nullable: true, default: '' })
  instagram: string;

  @Column({ nullable: true, default: '' })
  linkedin: string;
}
