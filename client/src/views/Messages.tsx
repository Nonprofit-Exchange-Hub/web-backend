import React from 'react';
import { Message, Transaction } from '../types';
import MessageCard from '../components/Users/Inbox/MessageCard';
import { patchRequest, updateMessage } from '../FetchActions';

function Messages({ messages, transaction, user }: any) {
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString('en-US');
  };

  const getSenderName = (transaction: Transaction, message: Message) => {
    if (message.sendingOrgId) {
      if (message.sendingOrgId === transaction.claimer?.id) {
        return transaction.claimer.name;
      } else if (message.sendingOrgId === transaction.donater_organization?.id) {
        return transaction.donater_organization.name;
      } else {
        return '';
      }
    } else if (message.sendingUserId === (user && user.id)) {
      return user.firstName;
    } else {
      return transaction.donater_user?.firstName;
    }
  };

  return (
    <div className="message-list">
      {messages.map((message: Message) => {
        const markMessageRead: React.MouseEventHandler<HTMLButtonElement> = (event) =>
          updateMessage(
            message,
            () => {},
            () => {
              console.log('error');
            },
          );
        return (
          <MessageCard
            messageReadCallback={markMessageRead}
            senderName={getSenderName(transaction, message)}
            text={message.text}
            dateString={formatDate(message.created_date)}
            isCurrentUser={message.sendingUserId === (user && user.id)}
          />
        );
      })}
    </div>
  );
}

export default Messages;
