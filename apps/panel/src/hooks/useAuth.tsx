import React, { createContext, useContext, useEffect } from 'react';
import { DefaultErrorShape } from '@trpc/server';
import { z } from 'zod';
import { RouterOutput, trpc } from '../utils/trpc';

interface IAuthContext {
  user?: RouterOutput['user']['current'];
  isFetching: boolean;
  error?: DefaultErrorShape | null;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    data: user,
    isFetching,
    error,
  } = trpc.user.current.useQuery(undefined, {
    onError(err) {
      if (err.shape?.data.code === 'UNAUTHORIZED') {
        localStorage.removeItem('accessToken');
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isFetching,
        error: error?.shape,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Must use AuthProvider to access auth context');
  }

  return context;
}
