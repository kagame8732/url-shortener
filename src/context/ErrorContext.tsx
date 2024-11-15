import React, { createContext, useState, useContext, ReactNode } from 'react';

type ErrorContextType = {
  error: string | null;
  addError: (message: string) => void;
  clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

type ErrorProviderProps = {
  children: ReactNode;
};

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const addError = (message: string) => setError(message);
  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, addError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
