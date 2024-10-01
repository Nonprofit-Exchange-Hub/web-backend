import { useEffect, useState } from 'react';
import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import Messages from './Messages';
import NewMessage from './NewMessage';
import { Box, Typography } from '@mui/material';
import { Message, Transaction, User } from '../types';

type TempChatProps = {
  classes: any;
  transaction: Transaction;
  messages: Message[] | [];
  user: User | null;
};
const TempChat = (props: TempChatProps) => {
  const { classes, transaction, messages, user } = props;
  const [socket, setSocket] = useState<any>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [showTypingGesture, setShowTypingGesture] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<string>('');

  useEffect(() => {
    const opts: Partial<ManagerOptions & SocketOptions> = {
      withCredentials: true,
    };
    const newSocket = io(`http://${window.location.hostname}:3002`, opts);

    newSocket.on('connect', () => {
      newSocket.emit('join', { transactionId: transaction.id });
      setConnected(true);
    });
    // to do - send org id if user is logged in as an organization

    setSocket(newSocket);
    newSocket.on(`message_${transaction.id}`, (res: any) => {
      console.log(res);
      setNewMessages((prev) => [...prev, res]);
    });

    newSocket.on('join', (res: any) => {
      console.log(res);
    });
    newSocket.on('disconnect', (res: any) => {
      setConnected(false);
    });

    newSocket.on('typing', (res: { name: string; isTyping: boolean }) => {
      setShowTypingGesture(res.isTyping);
      setUserTyping(res.name);
    });

    return () => newSocket.close() as any;
  }, [transaction]);

  const userOrg =
    user && user.organizations && user.organizations[0] && user.organizations[0].organization.id;
  const userIsClaimer = userOrg === transaction.claimer.id;
  const donaterIsOrg = !!transaction.donater_organization;

  let otherUserName = '';
  if (userIsClaimer) {
    // other user is claimer
    if (donaterIsOrg) {
      const otherUser = transaction.donater_organization && transaction.donater_organization;
      otherUserName = otherUser.name;
    } else {
      const otherUser = transaction.donater_user && transaction.donater_user;
      otherUserName = otherUser.firstName;
    }
  } else {
    // other user is claimer
    otherUserName = transaction.claimer && transaction.claimer.name;
  }

  return (
    <Box className={classes.messagesWrapper}>
      <Typography variant="h6" className={classes.sectionHeader}>
        Message with {otherUserName}
      </Typography>
      {socket ? (
        <div>
          <Messages
            socket={socket}
            messages={[...messages, ...newMessages]}
            transaction={transaction}
            user={user}
          />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
      <Box className={classes.messageInputWrapper}>
        {showTypingGesture && <p>... {userTyping} is typing</p>}
        {!connected ? 'Connecting to server...' : null}
        <NewMessage socket={socket} transactionId={transaction.id} classes={classes} />
      </Box>
    </Box>
  );
};

export default TempChat;
