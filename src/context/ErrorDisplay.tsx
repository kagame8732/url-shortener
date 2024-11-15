import React, { useEffect } from 'react';
import { useError } from './ErrorContext';
import { Snackbar, Alert } from '@mui/material';

const ErrorDisplay: React.FC = () => {
  const { error, clearError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <Snackbar open={!!error} autoHideDuration={7000} onClose={clearError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorDisplay;
