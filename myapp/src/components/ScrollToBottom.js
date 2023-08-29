import React from 'react';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const ScrollToBottomButton = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Button variant="contained" color="primary" onClick={scrollToBottom} sx={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      minWidth: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ArrowDownwardIcon />
    </Button>
  );
};

export default ScrollToBottomButton;
