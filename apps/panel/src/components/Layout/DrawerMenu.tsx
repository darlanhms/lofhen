import { Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import useDrawer from '../../hooks/useDrawer';
import { Sidebar } from './Sidebar';

const DrawerMenu: React.FC = () => {
  const { isOpen, close } = useDrawer();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={close}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <Sidebar />
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
