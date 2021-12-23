import { UserOrganization } from '../../user_org/entities/user_org.entitiy';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  website: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('text')
  city: string;

  @Column('text')
  state: string;

  @Column({ type: 'int', unique: true })
  ein: number;

  @Column('int')
  tax_exempt_id: number;

  @OneToMany(() => UserOrganization, (user_org) => user_org.organization)
  user_organizations: UserOrganization[];
}
