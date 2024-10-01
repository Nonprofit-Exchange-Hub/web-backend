import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityMetadata, Repository } from 'typeorm';

import { seedUserOrganization, seedUsers } from '../database/seeding/seed-data';
import { seedAssets } from '../database/seeding/seed-data';
import { seedCategories } from '../database/seeding/seed-data';
import { seedMessages } from '../database/seeding/seed-data';
import { seedOrganizations } from '../database/seeding/seed-data';
import { seedTransactions } from '../database/seeding/seed-data';
import { User } from '../acccount-manager/entities/user.entity';
import { Asset } from '../assets/entities/asset.entity';
import { Message } from '../messages/entities/message.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { UserOrganization } from '../user-org/entities/user-org.entity';
import { AssetsService } from '../assets/assets.service';
import { CategoriesService } from '../categories/categories.service';
import { MessagesService } from '../messages/messages.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { TransactionsService } from '../transactions/transactions.service';
import { UserOrganizationsService } from '../user-org/user-org.service';
import { TransactionStatus } from '../transactions/transaction-status.enum';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { Category } from '../categories/entities/category.entity';
import { UsersService } from '../acccount-manager/user.service';

export interface SeedAssetsResult {
  assets: Asset[];
  users: User[];
}
export interface SeedCategoriesResult extends SeedAssetsResult {
  categories: Category[];
}
export interface SeedOrganizationsResult extends SeedCategoriesResult {
  organizations: Organization[];
}
export interface SeedMessagesResult extends SeedOrganizationsResult {
  messages: Message[];
}
export interface SeedTransactionsResult extends SeedMessagesResult {
  transactions: Transaction[];
}
export interface SeedUserOrgResult extends SeedTransactionsResult {
  userOrgs: UserOrganization[];
}

@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UsersService,
    private readonly assetService: AssetsService,
    private readonly categoryService: CategoriesService,
    private readonly organizationService: OrganizationsService,
    private readonly messageService: MessagesService,
    private readonly transactionService: TransactionsService,
    private readonly userorgService: UserOrganizationsService,
    private readonly connx: DataSource,
  ) {}

  /**
   * Seeds demo users if they don't exist
   */

  public async seedUsersAsync(): Promise<User[]> {
    Logger.log('starting to seed users', SeederService.name);

    const users = seedUsers();
    const newUsers = [];
    for (const user of users) {
      Logger.log('starting to seed a user', SeederService.name);
      Logger.log(user);
      const exists = await this.userService.userEmailExists(user.email);
      if (!exists) {
        Logger.log('Seeding Users', SeederService.name);
        const createdUser = await this.userService.create(user).catch((err) => Logger.log(err));
        newUsers.push(createdUser);
      }
    }
    return newUsers;
  }

  public async seedAssetsAsync(newUsers): Promise<SeedAssetsResult> {
    Logger.log('starting to seed the assets', SeederService.name);

    const assets = seedAssets();
    const newAssets = [];
    for (let i = 0; i < assets.length; i += 1) {
      const asset = assets[i];
      Logger.log('Seeding an Asset', SeederService.name);
      const userToAssign = i % 2 !== 0 ? newUsers[0] : newUsers[1];
      const createdAsset = await this.assetService
        .create(asset, userToAssign)
        .catch((err) => Logger.log(err));
      newAssets.push(createdAsset);
    }
    Logger.log('at end of seeding the assets', SeederService.name);
    return { assets: newAssets, users: newUsers };
  }

  public async seedCategoriesAsync(
    seedAssetsResult: SeedAssetsResult,
  ): Promise<SeedCategoriesResult> {
    Logger.log('starting to seed the categories', SeederService.name);

    const categories = seedCategories();
    const newCategories = [];
    for (const category of categories) {
      Logger.log('Seeding Categories', SeederService.name);
      await this.categoryService.create(category).catch((err) => Logger.log(err));
      newCategories.push(category);
    }
    Logger.log('at end of seeding the categories', SeederService.name);
    return {
      ...seedAssetsResult,
      categories: newCategories,
    };
  }

  public async seedOrganizationsAsync(
    seedCategoriesResult: SeedCategoriesResult,
  ): Promise<SeedOrganizationsResult> {
    Logger.log('starting to seed organizations', SeederService.name);

    const organizations = seedOrganizations();
    const newOrganizations = [];
    for (const organization of organizations) {
      Logger.log('Seeding Organization', SeederService.name);
      await this.organizationService.create(organization).catch((err) => Logger.log(err));
      newOrganizations.push(organization);
    }
    Logger.log('at end of seeding the organizations', SeederService.name);
    return {
      ...seedCategoriesResult,
      organizations: newOrganizations,
    };
  }

  public async seedMessagesAsync(
    seedOrganizationsResult: SeedOrganizationsResult,
  ): Promise<SeedMessagesResult> {
    const transaction: CreateTransactionDto = {
      donater_user: seedOrganizationsResult.users[0],
      status: TransactionStatus.IN_PROGRESS,
      asset: seedOrganizationsResult.assets[0],
      donater_organization: seedOrganizationsResult.organizations[0],
      recipient: seedOrganizationsResult.organizations[1],
    };

    Logger.log('starting to seed the messages', SeederService.name);

    const rawInsertedTransaction: void | Transaction = await this.transactionService
      .createTransaction(transaction)
      .catch((err) => Logger.log(err));

    const messages: CreateMessageDto[] = seedMessages();
    const newMessages = [];

    let insertedTransaction;

    if (rawInsertedTransaction) {
      insertedTransaction = rawInsertedTransaction;
    } else {
      throw Error('newly created Transaction is void.');
    }

    Logger.log('Seeding a message', SeederService.name);
    for (const message of messages) {
      message.transaction = insertedTransaction;
      message.sending_user = transaction.donater_user;
      await this.messageService.create(message).catch((err) => Logger.log(err));
      newMessages.push(message);
    }
    Logger.log('at end of seeding the messages', SeederService.name);
    return {
      ...seedOrganizationsResult,
      messages: newMessages,
    };
  }

  public async seedTransactionsAsync(
    seedMessagesResult: SeedMessagesResult,
  ): Promise<SeedTransactionsResult> {
    Logger.log('starting to seed the transactions', SeederService.name);

    const transactions: CreateTransactionDto[] = seedTransactions();
    const newTransactions = [];
    for (const transaction of transactions) {
      Logger.log('seeding a transaction', SeederService.name);
      transaction.donater_organization = seedMessagesResult.organizations[0];
      transaction.donater_user = seedMessagesResult.users[0];
      transaction.recipient = seedMessagesResult.organizations[1];
      transaction.asset = seedMessagesResult.assets[0];
      await this.transactionService.createTransaction(transaction).catch((err) => Logger.log(err));
    }
    Logger.log('at end of seeding the transactions', SeederService.name);
    return {
      ...seedMessagesResult,
      transactions: newTransactions,
    };
  }

  public async seedUserOrgAsync(
    seedTransactionsResult: SeedTransactionsResult,
  ): Promise<SeedUserOrgResult> {
    Logger.log('Seeding UserOrganizations', SeederService.name);

    const userOrgs = seedUserOrganization();
    const newUserOrgs = [];
    for (const userOrg of userOrgs) {
      Logger.log('Seeding UserOrg', SeederService.name);
      userOrg.organization = seedTransactionsResult.organizations[0];
      userOrg.user = seedTransactionsResult.users[0];
      await this.userorgService.create(userOrg).catch((err) => Logger.log(err));
    }
    Logger.log('End of seeding UserOrganizations', SeederService.name);
    return {
      ...seedTransactionsResult,
      userOrgs: newUserOrgs,
    };
  }

  /**
   * removes all data in DB in a cascading style
   */

  public async truncateFromAllTables(): Promise<void> {
    Logger.log('Truncating all tables in cascade', SeederService.name);
    const entities: EntityMetadata[] = this.connx.entityMetadatas;
    for (const entity of entities) {
      const repository: Repository<unknown> = this.connx.getRepository(entity.name);
      await repository.query(`TRUNCATE ${entity.tableName} CASCADE;`);
    }
    Logger.log('Done truncating', SeederService.name);
  }
}
