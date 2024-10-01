import { Organization } from '../../organizations/entities/organization.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../acccount-manager/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { IsOptional } from 'class-validator';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_date: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn()
  sending_user: User;

  @Column({ nullable: true })
  sendingUserId: number;

  @ManyToOne(() => Organization, (org) => org.messages)
  @JoinColumn()
  sending_org?: Organization;

  @Column({ nullable: true })
  sendingOrgId: number;

  @Column()
  read: boolean

  @ManyToOne(() => Transaction, (transaction) => transaction.messages)
  @JoinColumn()
  transaction: Transaction;

}
