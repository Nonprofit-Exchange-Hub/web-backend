import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import type { Transaction, User } from '../../../types';
import { ListItemButton } from '@mui/material';

function TransactionThreadCard({
  isSelected,
  onClick,
  transaction,
  user,
}: {
  isSelected: boolean;
  onClick: (transaction: Transaction) => void;
  transaction: Transaction;
  user?: User | null;
}): JSX.Element {
  const message = transaction.messages[0];
  const renderMessage = () => {
    if (message) {
      return (
        <React.Fragment>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {message.sendingUserId === (user && user.id) ? ' Me: ' : ''}
          </Typography>
          {message.text}
        </React.Fragment>
      );
    }
  };
  const userOrg =
    user && user.organizations && user.organizations[0] && user.organizations[0].organization.id;
  const userIsClaimer = userOrg === transaction.claimer.id;
  const isCurrentUser =
    (userOrg && message && message.sendingOrgId === userOrg) ||
    (user && message && message.sendingUserId === user.id);
  const donaterIsOrg = !!transaction.donater_organization;

  let otherUserName = '';
  let otherUserImage = '' as string | undefined;
  if (userIsClaimer) {
    // other user is claimer
    if (donaterIsOrg) {
      const otherUser = transaction.donater_organization && transaction.donater_organization;
      otherUserName = otherUser.name;
    } else {
      const otherUser = transaction.donater_user && transaction.donater_user;
      otherUserName = otherUser.firstName;
      otherUserImage = otherUser.profile_image_url;
    }
  } else {
    // other user is claimer
    otherUserName = transaction.claimer && transaction.claimer.name;
    otherUserImage = transaction.claimer && transaction.claimer.image_url;
  }

  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        selected={isSelected}
        onClick={() => onClick(transaction)}
      >
        <ListItemAvatar>
          {otherUserImage && <Avatar alt={otherUserName} src={otherUserImage} />}
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography variant="subtitle2">
                {message ? (isCurrentUser ? 'To : ' : 'From: ') : ''}
                {otherUserName}
              </Typography>
              <Typography variant="subtitle2">{`Topic: ${transaction.asset.title}`}</Typography>
            </>
          }
          secondary={renderMessage()}
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default TransactionThreadCard;
