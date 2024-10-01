import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionsDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsRepository.save(createTransactionDto);
  }

  async getTransactions(getTransactionsDto: GetTransactionsDto): Promise<Transaction[]> {
    return this.transactionsRepository.find({ where: { ...getTransactionsDto } });
  }

  async find_by_user_with_latest_message(user_id: number): Promise<Transaction[]> {
    // get an "inbox" of latest messages, one per transaction ( use this for citizen accounts)

    return this.transactionsRepository
      .createQueryBuilder('transaction')
      .distinctOn(['transaction.id'])
      .leftJoinAndSelect('transaction.asset', 'asset')
      .leftJoinAndSelect('transaction.messages', 'message')
      .leftJoinAndSelect('transaction.donater_organization', 'donater_organization')
      .leftJoinAndSelect('transaction.claimer', 'claimer')
      .innerJoinAndSelect(
        'transaction.donater_user',
        'donater_user',
        'donater_user.id = :user_id',
        {
          user_id: user_id,
        },
      )
      .orderBy('transaction.id', 'DESC')
      .addOrderBy('message.created_date', 'DESC')
      .getMany();
  }

  async find_by_org_with_latest_message(org_id: number): Promise<Transaction[]> {
    // get an "inbox" of latest messages, one per transaction (use this for organization accounts)
    return this.transactionsRepository
      .createQueryBuilder('transaction')
      .distinctOn(['transaction.id'])
      .leftJoinAndSelect('transaction.asset', 'asset')
      .leftJoinAndSelect('transaction.messages', 'message')
      .leftJoinAndSelect('transaction.donater_user', 'donater_user')
      .leftJoinAndSelect(
        'transaction.donater_organization',
        'donaterOrganization',
        'donaterOrganization.id = :org_id',
        { org_id: org_id },
      )
      .leftJoinAndSelect('transaction.claimer', 'claimer', 'claimer.id = :claimer_id', {
        claimer_id: org_id,
      })
      .where('transaction.claimerId =:claimer_id', { claimer_id: org_id })
      .orWhere('transaction.donaterOrganizationId =:org_id', {
        org_id: org_id,
      })
      .orderBy('transaction.id', 'DESC')
      .addOrderBy('message.created_date', 'DESC')
      .getMany();
  }

  async getTransactionWithRelations(
    id: number,
    relations: any = {
      messages: true,
      donater_user: true,
      donater_organization: true,
      claimer: true,
    },
  ): Promise<Transaction> {
    const found = await this.transactionsRepository.findOne({
      relations: relations,
      where: { id: id },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const found = await this.transactionsRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async updateTransaction(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.getTransactionById(id);
    const newTransaction = await this.transactionsRepository.save({
      ...transaction,
      ...updateTransactionDto,
    });
    return newTransaction;
  }

  async deleteTransaction(id: number): Promise<void> {
    const transactionToDelete = await this.transactionsRepository.delete(id);
    if (transactionToDelete.affected === 0) {
      throw new NotFoundException();
    }
  }
}
