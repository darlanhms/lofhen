import { IconType } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiUser } from 'react-icons/hi';
import { Box, Center, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import banner from '../../assets/images/banner.png';

interface SidebarItemProps {
  name: string;
  Icon: IconType;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ name, link, Icon }) => {
  const { pathname } = useLocation();

  const active = pathname === link;

  return (
    <Link to={link}>
      <ListItem
        as={Center}
        justifyContent="flex-start"
        px={7}
        py={2.5}
        lineHeight="1px"
        color="gray.600"
        position="relative"
        {...(active && {
          fontWeight: 'bold',
        })}
      >
        <ListIcon
          as={Icon}
          mr={4}
          fontSize="xl"
          {...(active && {
            color: 'orange.400',
          })}
        />
        <Text>{name}</Text>

        {active && (
          <Box
            bg="orange.400"
            position="absolute"
            right="0"
            top="2px"
            height="35px"
            width="4px"
            borderRadius="5px"
          />
        )}
      </ListItem>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <Box>
      <Box borderBottomWidth="1px" borderColor="gray.200" mb={4} py={1}>
        <Center>
          <img src={banner} width={70} />
        </Center>
      </Box>

      <Box p={0}>
        <List>
          <SidebarItem link="/dashboard" name="Início" Icon={HiHome} />
          <SidebarItem link="/dashboard/users" name="Usuários" Icon={HiUser} />
        </List>
      </Box>
    </Box>
  );
};
