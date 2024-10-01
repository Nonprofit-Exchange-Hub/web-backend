import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

import type { Theme } from '@mui/material/styles';

import SubHeader from '../components/Users/Inbox/SubHeader';
import TransactionThreadCard from '../components/Users/Inbox/TransactionThreadCard';
import { UserContext } from '../providers';
import routes from '../routes/routes';

import type { Message, Transaction } from '../types';
import { APP_API_BASE_URL } from '../configs';
import { fetchInbox } from '../FetchActions';
import TempChat from './TempChat';

const useStyles = makeStyles()((theme: Theme) => ({
  inboxWrapper: {
    maxWidth: '90%',
    margin: 'auto',
    marginBottom: '50px',
    textAlign: 'left',
  },
  sectionWrapper: {
    border: '1px solid lightgrey',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '5px',
    height: '100%',
    minHeight: '500px',
    position: 'relative',
  },
  sectionHeader: {
    margin: '5px',
  },
  messagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '200px',
    width: '100%',
  },
  threadsSection: {
    marginRight: '20px',
    maxWidth: '30%',
  },
  messageInputWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: '10px',
  },
  messageInputForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  messageInput: {
    width: '100%',
  },
  noThreadsMessage: {
    margin: 'auto',
    width: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  noThreadsMessagePiece: {
    marginTop: '10px',
  },
}));

// TODO: make the fetch find messages by transaction
// TODO: seed data so that messages appear without manually creating them

const fetchMessages = async (id: number): Promise<Message[]> => {
  const MESSAGES_API_URL = `${APP_API_BASE_URL}/transactions/${id}`;
  const res = await fetch(MESSAGES_API_URL);
  const data = await res.json();
  return data.messages.sort(
    (message1: Message, message2: Message) =>
      (new Date(message1.created_date) as any) - (new Date(message2.created_date) as any),
  );
};

// TODO use SubHeader component in Offer and Assets pages

// maybe call it SearchBar and have an optional leftContent prop?
function MessageInboxView(): JSX.Element {
  const { classes } = useStyles();
  const { user } = React.useContext(UserContext);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  // todo switch to custom hook
  React.useEffect(() => {
    if (user) {
      fetchInbox((transactions: Transaction[]) => {
        setSelectedTransaction(transactions[0]);
        setTransactions(transactions);
      }); // user.id
    }
  }, [user]);

  // todo switch to custom hook
  React.useEffect(() => {
    if (selectedTransaction) {
      (async function () {
        const messages = await fetchMessages(selectedTransaction.id);
        setMessages(messages);
      })();
    }
  }, [selectedTransaction]);

  const transactionCards = (
    <List>
      {transactions &&
        transactions.length &&
        transactions.map((t) => (
          <TransactionThreadCard
            isSelected={t.id === selectedTransaction?.id}
            onClick={(transaction: Transaction) => setSelectedTransaction(transaction)}
            transaction={t}
            user={user}
          />
        ))}
    </List>
  );

  const noTransactionsMessage = (
    <Box className={classes.noThreadsMessage}>
      <Typography className={classes.noThreadsMessagePiece}>Inbox empty</Typography>
      <Typography className={classes.noThreadsMessagePiece}>
        Support an organization by <Link to={routes.Assets.path}>contributing</Link>something they
        need
      </Typography>
      <Typography className={classes.noThreadsMessagePiece}>or</Typography>
      <Typography className={classes.noThreadsMessagePiece}>
        {/* update to prop to use routes once set up */}
        <Link to="/weDontHaveAPostRouteYet">Post</Link> a need
      </Typography>
    </Box>
  );

  const transactionList = (
    <div className={`${classes.sectionWrapper} ${classes.threadsSection}`}>
      {transactions.length && transactions.length > 0 ? transactionCards : noTransactionsMessage}
    </div>
  );

  if (!user) {
    return <Redirect to={routes.Home.path} />;
  } else {
    return (
      <>
        <SubHeader backTo={routes.Home.path} searchTo={routes.Inbox.path} />
        <Grid container className={classes.inboxWrapper} justifyContent="center">
          {transactionList}
          <Grid item className={classes.sectionWrapper} xs={12} sm={7}>
            {selectedTransaction && (
              <TempChat
                key={selectedTransaction.id}
                transaction={selectedTransaction}
                messages={messages || []}
                classes={classes}
                user={user}
              />
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default MessageInboxView;
