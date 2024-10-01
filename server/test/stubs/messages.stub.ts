import { Message } from '../../src/messages/entities/message.entity';
import { User } from '../../src/acccount-manager/entities/user.entity';
import { Transaction } from '../../src/transactions/entities/transaction.entity';

export const messageStub = (user?: User, transaction?: Transaction): Message => {
  return {
    id: 1,
    text: 'fakeMessage',
    created_date: new Date(2021, 11, 6),
    sending_user: user || new User(),
    sending_org: null,
    transaction: transaction || new Transaction(),
    sendingOrgId: null,
    sendingUserId: null,
  };
};
