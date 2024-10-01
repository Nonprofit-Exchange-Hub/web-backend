import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository, DeleteResult } from 'typeorm';

import { User } from '../acccount-manager/entities/user.entity';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesRepository.save({ ...createMessageDto });
  }

  async findAll(): Promise<Message[]> {
    return this.messagesRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    return this.messagesRepository.findOneBy({ id });
  }

  async findByUser(user_id: number): Promise<Message[]> {
    const messages = this.messagesRepository.find({
      where: {
        sending_user: { id: user_id },
      },
    });
    return messages;
  }

  async findByTransaction(transaction_id: number): Promise<Message[]> {
    const messages = this.messagesRepository.find({
      where: { transaction: { id: transaction_id } },
    });
    return messages;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    await this.messagesRepository.update(id, updateMessageDto);
    return this.messagesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.messagesRepository.delete(id);
  }
}
