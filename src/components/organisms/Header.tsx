/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
} from '@chakra-ui/react';

import { TriangleDownIcon } from '@chakra-ui/icons';

import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { MdOutlineSecurityUpdate } from 'react-icons/md';
import { useAuthMethod } from '../../hooks/useAuthMethod';
import { useAuth } from '../../hooks/useAuth';
import { useUserSettingContext } from '../../hooks/useUserSettingContext';
import { getAwsEnvs } from '../../helper/viteEnv';
import { useMessage } from '../../hooks/useMessage';

// 無名関数だとLinterで指摘される。
export const Header: FC = memo(function Header() {
  const { signOut } = useAuthMethod();
  const { showMessage } = useMessage();
  const { username, allowedServices } = useAuth();
  const { awsEnv, setAwsEnv } = useUserSettingContext();

  const awsEnvs = getAwsEnvs();

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

  const onClickNewsAdd = useCallback(() => {
    navigate('/home/news');
  }, []);

  const onClickDevice = useCallback(() => {
    navigate('/home/device');
  }, []);

  const onClickOTA = useCallback(() => {
    navigate('/home/ota');
  }, []);

  const onClickAwsEnv = useCallback((awsEnv: string) => {
    showMessage({ title: `Change AWS environment to ${awsEnv}.`, status: 'info' });
    setAwsEnv(awsEnv);
  }, []);

  const onClickLogout = useCallback(() => {
    (async () => signOut())();
  }, []);

  return (
    <>
      <Flex
        as="nav"
        bg={awsEnv === 'Production' ? 'pink.800' : 'gray.700'}
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 1, md: 2 }}
      >
        {/*<Flex as="nav" bg="gray.700" color="gray.50" align="center" justify="space-between" padding={{ base: 1, md: 2 }}>*/}
        <Flex align="center" as="a" mr={8} _hover={{ cursor: 'pointer', opacity: 0.7 }} onClick={onClickHome}>
          <Heading as="h1" fontSize={{ base: 'md', md: 'md' }}>
            Drive Backoffice
          </Heading>
        </Flex>
        <Flex fontSize="sm" align="center" flexGrow={4} display={{ base: 'none', md: 'flex' }}>
          {allowedServices.includes('location') ? (
            <Box pr={5} _hover={{ opacity: 0.7 }}>
              <Link onClick={onClickLocation}>Location</Link>
            </Box>
          ) : null}
          {/*<Box pr={5} _hover={{ opacity: 0.7 }}>*/}
          {/*  <Link onClick={onClickEvent}>Event</Link>*/}
          {/*</Box>*/}
          {/*<Box pr={5} _hover={{ opacity: 0.7 }}>*/}
          {/*  <Link onClick={onClickSetting}>Setting</Link>*/}
          {/*</Box>*/}
          <Box pr={5} _hover={{ opacity: 0.7 }}>
            <Link onClick={onClickNewsAdd}>
              <HStack>
                <Icon as={FiMail} />
                <Text>News</Text>
              </HStack>
            </Link>
          </Box>
          {/*<Box pr={5} _hover={{ opacity: 0.7 }}>*/}
          {/*  <Link onClick={onClickDevice}>Device</Link>*/}
          {/*</Box>*/}
          <Box pr={8} _hover={{ opacity: 0.7 }}>
            <Link onClick={onClickOTA}>
              <HStack>
                <Icon as={MdOutlineSecurityUpdate} />
                <Text>OTA</Text>
              </HStack>
            </Link>
          </Box>
        </Flex>
        <Flex fontSize="sm" align="center" gap={5}>
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              py={3}
              px={4}
              size="xs"
              rightIcon={<TriangleDownIcon />}
              _hover={{ opacity: 0.6 }}
              _expanded={{ opacity: 0.6, bg: 'gray.500' }}
            >
              {awsEnv}
            </MenuButton>
            <MenuList color="black" fontSize="sm" borderWidth={2} mt={2} px={0} py={1}>
              {awsEnvs.map((env: string) => (
                <MenuItem
                  key={env}
                  onClick={() => onClickAwsEnv(env)}
                  _focus={{ bgColor: 'white' }}
                  _hover={{ bgColor: 'gray.100' }}
                >
                  {env}
                </MenuItem>
              ))}
            </MenuList>

            {/*<MenuList color="black" fontSize="sm" borderWidth={2} mt={2} px={0} py={1}>*/}
            {/*  <MenuItem*/}
            {/*    onClick={() => onClickAwsEnv('Staging')}*/}
            {/*    _focus={{ bgColor: 'white' }}*/}
            {/*    _hover={{ bgColor: 'orange.100' }}*/}
            {/*  >*/}
            {/*    Staging*/}
            {/*  </MenuItem>*/}
            {/*  <MenuItem*/}
            {/*    onClick={() => onClickAwsEnv('Production')}*/}
            {/*    _focus={{ bgColor: 'white' }}*/}
            {/*    _hover={{ bgColor: 'orange.100' }}*/}
            {/*  >*/}
            {/*    Production*/}
            {/*  </MenuItem>*/}
            {/*</MenuList>*/}
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              py={3}
              px={4}
              size="xs"
              rightIcon={<FaUserCircle />}
              _hover={{ opacity: 0.6 }}
              _expanded={{ opacity: 0.6, bg: 'teal.800' }}
            >
              {username}
            </MenuButton>
            <MenuList color="black" fontSize="sm" borderWidth={2} mt={2} px={0} py={1}>
              <MenuItem onClick={onClickLogout} _focus={{ bgColor: 'white' }} _hover={{ bgColor: 'gray.100' }}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
});
