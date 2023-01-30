import React, { createContext, useContext, useState } from 'react';

interface IDrawerContext {
  close: () => void;
  open: () => void;
  isOpen: boolean;
}

const DrawerContext = createContext({} as IDrawerContext);

export const DrawerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  return (
    <DrawerContext.Provider
      value={{
        close,
        open,
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
