import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi';
import {
  Box,
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Heading,
  IconButton,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import PageTitle from '../../components/PageTitle/PageTitle';
import { trpc } from '../../utils/trpc';

const UsersScreen: React.FC = () => {
  const { data } = trpc.user.list.useQuery();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
      <PageTitle title="Usuários">
        <IconButton aria-label="Adicionar" size="sm" colorScheme="green" icon={<HiPlus />} />
      </PageTitle>
      <Box padding={4}>
        <Card>
          <Stack spacing={2} py={3} divider={<StackDivider />}>
            {data?.map(user => (
              <Box key={user.id} px={3} cursor="pointer" onClick={() => onOpen()}>
                <Heading noOfLines={1} size="sm">
                  {user.name}
                </Heading>
                <Text fontSize="sm" noOfLines={1}>
                  Usuário: {user.username}
                </Text>
              </Box>
            ))}
          </Stack>
        </Card>
      </Box>

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Stack>
              <Button leftIcon={<HiPencil />} colorScheme="blue">
                Editar
              </Button>
              <Button leftIcon={<HiTrash />} colorScheme="red">
                Excluir
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default UsersScreen;
