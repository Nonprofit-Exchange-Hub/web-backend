import { IsNotEmpty, IsOptional } from 'class-validator';

import { CreateMessageDto } from './create-message.dto';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/acccount-manager/entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

export class ReturnMessageDto extends CreateMessageDto {
  id: number

  text: string

  read: boolean

  @IsNotEmpty()
  transaction: Transaction;

  @IsOptional()
  sending_user: User;

  @IsOptional()
  sending_org?: Organization;
  
}
