import { FC, memo, useCallback } from 'react';
import {
  Box,
  Flex,
  Heading,
  Link,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MenuIconButton } from '../atoms/button/MenuIconButton';
import { MenuDrawer } from './MenuDrawer';
import { HiUserCircle } from 'react-icons/hi';
import { useAuthMethod } from '../../hooks/useAuthMethod';
import { useAuth } from '../../hooks/useAuth';

// 無名関数だとLinterで指摘される。
export const Header: FC = memo(function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signOut } = useAuthMethod();
  const { username } = useAuth();

  // react-router-dom v6以降は、useHistoryではなく、useNavigateで画面遷移を行う。
  const navigate = useNavigate();
  const onClickHome = useCallback(() => {
    navigate('/home');
  }, []);
  const onClickSetting = useCallback(() => {
    navigate('/home/setting');
  }, []);
  const onClickLocation = useCallback(() => {
    navigate('/home/location');
  }, []);

  const onClickEvent = useCallback(() => {
    navigate('/home/event');
  }, []);

  const onClickLogout = useCallback(() => {
    (async () => signOut())();
  }, []);

  return (
    <>
      <Flex as="nav" bg="teal.800" color="gray.50" align="center" justify="space-between" padding={{ base: 1, md: 2 }}>
        <Flex align="center" as="a" mr={8} _hover={{ cursor: 'pointer', opacity: 0.7 }} onClick={onClickHome}>
          <Heading as="h1" fontSize={{ base: 'md', md: 'lg' }}>
            Drive Backoffice
          </Heading>
        </Flex>
        <Flex fontSize="md" align="center" flexGrow={4} display={{ base: 'none', md: 'flex' }}>
          <Box pr={5} _hover={{ opacity: 0.7 }}>
            <Link onClick={onClickLocation}>Location</Link>
          </Box>
          <Box pr={5} _hover={{ opacity: 0.7 }}>
            <Link onClick={onClickEvent}>Event</Link>
          </Box>
          <Box _hover={{ opacity: 0.7 }}>
            <Link onClick={onClickSetting}>Setting</Link>
          </Box>
        </Flex>
        <Flex>
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              p={3}
              size="xs"
              rightIcon={<HiUserCircle />}
              _hover={{ opacity: 0.6 }}
              _expanded={{ opacity: 0.6, bg: 'teal.800' }}
            >
              {username}
            </MenuButton>
            <MenuList color="black" fontSize="sm" borderWidth={2} mt={2}>
              <MenuItem onClick={onClickLogout} _focus={{ bgColor: 'white' }} _hover={{ bgColor: 'teal.50' }}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickHome={onClickHome}
        onClickUserManagement={onClickLocation}
        onClickSetting={onClickSetting}
      />
    </>
  );
});
