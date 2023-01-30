import React, { createContext, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

interface IDrawerContext {
  close: () => void;
  open: () => void;
  isOpen: boolean;
}

const DrawerContext = createContext({} as IDrawerContext);

export const DrawerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <DrawerContext.Provider
      value={{
        close: onClose,
        open: onOpen,
        isOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export default function useDrawer(): IDrawerContext {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('Must use DrawerProvider to access drawer context');
  }

  return context;
}
