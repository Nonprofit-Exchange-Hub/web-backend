import * as React from 'react';
import { makeStyles } from 'tss-react/mui';

import type { Theme } from '@mui/material/styles';

import { Typography } from '@mui/material';
import { Button } from '@mui/base';

const useStyles = makeStyles()((theme: Theme) => ({
  currentUserMessage: {
    alignSelf: 'flex-end',
    border: '1px solid lightgrey',
    borderRadius: '10px',
    padding: '5px',
    maxWidth: '70%',
    marginLeft: '30%',
    background: 'rgba(196, 196, 196, 0.3)',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    background: 'lightblue',
    border: '1px solid lightgrey',
    borderRadius: '10px',
    padding: '5px',
    maxWidth: '70%',
  },
}));

function MessageCard({
  text,
  senderName,
  isCurrentUser,
  dateString,
  messageReadCallback,
}: {
  senderName: string;
  text: string;
  isCurrentUser: boolean;
  dateString: string;
  messageReadCallback: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  const { classes } = useStyles();
  return (
    <div className={isCurrentUser ? classes.currentUserMessage : classes.otherUserMessage}>
      <Typography variant="subtitle2" color="text.primary">
        {text}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {dateString}
      </Typography>
      <Button onClick={messageReadCallback}> Read </Button>
    </div>
  );
}

export default MessageCard;
