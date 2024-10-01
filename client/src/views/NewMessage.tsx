import { SendOutlined } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

const NewMessage = ({ socket, transactionId, classes }: any) => {
  const [value, setValue] = useState('');
  const submitForm = (e: any) => {
    e.preventDefault();
    if (socket.connected) {
      socket.emit('message', { text: value, transactionId: transactionId, fromClaimer: false });
      setValue('');
    }
  };

  const handleOnChange = (e: any): void => {
    setValue(e.currentTarget.value);
  };

  const handleOnFocus = (): void => {
    if (socket) {
      socket.emit('typing', { isTyping: true });
    }
  };

  const handleBlur = (e: any): void => {
    socket.emit('typing', { isTyping: false });
  };

  return (
    <form onSubmit={submitForm} className={classes.messageInputForm}>
      <TextField
        className={classes.messageInput}
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={handleOnChange}
        onBlur={handleBlur}
        onFocus={handleOnFocus}
      />
      <IconButton aria-label="send message" type="submit" size="large">
        <SendOutlined />
      </IconButton>
    </form>
  );
};

export default NewMessage;
