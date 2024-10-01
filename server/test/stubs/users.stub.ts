import { Message } from '../../src/messages/entities/message.entity';
import { Asset } from '../../src/assets/entities/asset.entity';
import { CreateUserDto } from '../../src/acccount-manager/dto/create-user.dto';
import { User } from '../../src/acccount-manager/entities/user.entity';
import { Transaction } from '../../src/transactions/entities/transaction.entity';
import { UserOrganization } from '../../src/user-org/entities/user-org.entity';

export const userEntityStub = (
  assets?: Asset[],
  sentMessages?: Message[],
  transactions?: Transaction[],
  organizations?: UserOrganization[],
  receivedMessages?: Message[],

): User => {
  return {
    id: 234545,
    firstName: 'fakeUser',
    last_name: 'John',
    email: 'Doe',
    password: 'Secret1234$',
    city: 'Seattle',
    state: 'WA',
    zip_code: '98101',
    assets: assets,
    transactions,
    receivedMessages,
    sentMessages,
    organizations,
    email_verified: true,
    email_notification_opt_out: false,
  };
};

export const userCreateDtoStub = (): CreateUserDto => {
  return {
    firstName: 'jakeUser',
    last_name: 'fakeLast',
    email: 'fakeUser@test.com',
    password: 'Secret1234$',
  };
};
