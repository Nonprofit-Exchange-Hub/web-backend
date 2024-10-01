import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TransactionStatus } from '../transaction-status.enum';
import { User } from '../../acccount-manager/entities/user.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.NEW_CLAIM,
  })
  status: TransactionStatus;

  @CreateDateColumn()
  created_date: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn()
  donater_user: User;

  @Column({ nullable: true })
  donaterUserId: number;

  @ManyToOne(() => Organization, (organization) => organization.donated_transactions)
  @JoinColumn()
  donater_organization?: Organization;

  @Column({ nullable: true })
  donaterOrganizationId: number;

  @ManyToOne(() => Asset, (asset) => asset.transactions, { eager: true })
  @JoinColumn()
  asset: Asset;

  @ManyToOne(() => Organization, (org) => org.claimed_transactions)
  @JoinColumn()
  claimer: Organization;

  @Column({ nullable: true }) // TODO: update seeder to always have claimerID
  claimerId: number;

  @OneToMany(() => Message, (message) => message.transaction)
  messages: Message[];
}
