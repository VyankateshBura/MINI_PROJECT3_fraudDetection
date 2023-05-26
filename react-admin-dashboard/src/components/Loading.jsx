import React from 'react';
import { CircularProgress, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';

const LoadingContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}));

const LoadingMessage = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Loading = ({ message = 'Loading...' }) => {
  const theme = useTheme();
  

  return (
    <LoadingContainer>
      <CircularProgress color={theme.palette.primary[400]} size={80} thickness={4} />
      <LoadingMessage variant="body1">
        {message}
      </LoadingMessage>
    </LoadingContainer>
  );
};

export default Loading;
