import { Module } from '@nestjs/common';
import { PocChatService } from './poc-chat.service';
import { PocChatGateway } from './poc-chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocChat } from './entities/poc-chat.entity';
import { AcccountManagerModule } from '../acccount-manager/acccount-manager.module';
import { TransactionsService } from 'src/transactions/transactions.service';
import { MessagesService } from '../messages/messages.service';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Message } from '../messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PocChat]),
    AcccountManagerModule,
    TypeOrmModule.forFeature([Transaction]),
    TypeOrmModule.forFeature([Message]),
  ],
  providers: [
    PocChatGateway,
    PocChatService,
    AcccountManagerModule,
    TransactionsService,
    MessagesService,
  ],
})
export class PocChatModule {}
