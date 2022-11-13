import { ChangeEvent, memo, useState, FC, useCallback } from 'react';
import { Box, Button, Divider, Flex, Heading, Input, InputGroup, Stack, InputRightElement } from '@chakra-ui/react';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useAuthMethod } from '../../hooks/useAuthMethod';

export const Login: FC = memo(function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuthMethod();

  const onClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = useCallback(async () => {
    console.log('login');
    const result = await signIn(username, password);
    console.log(result);
  }, [username, password]);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" width="md" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Drive Backoffice
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Input placeholder="Username" onChange={onChangeUsername} value={username} />
          <InputGroup>
            <Input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={onChangePassword}
              value={password}
            />
            <InputRightElement width="4.5rem" py={2}>
              <Button h="1.75rem" size="sm" onClick={onClickShowPassword}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <PrimaryButton loading={false} disable={false} onClick={login}>
            Login
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
