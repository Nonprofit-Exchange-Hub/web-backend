import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { UserOrganization } from '../../user-org/entities/user-org.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  last_name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'text', nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  state: string;

  @Column({ type: 'text', nullable: true })
  zip_code: string;

  @Column({ type: 'bool', default: false })
  email_notification_opt_out: boolean;

  @Column({ type: 'bool', default: false })
  email_verified: boolean;

  @OneToMany(() => Asset, (asset) => asset.poster)
  assets: Asset[];

  @OneToMany(() => Transaction, (transaction) => transaction.donater_user)
  transactions: Transaction[];

  @OneToMany(() => Message, (message) => message.sending_user)
  sentMessages: Message[];

  @OneToMany(() => UserOrganization, (user_org) => user_org.user, { eager: true })
  organizations: UserOrganization[];

  @Column({ type: 'text', nullable: true })
  profile_image_url?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  interests?: { names: string[] };
}
