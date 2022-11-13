import { Center, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

export const LoadingSpinner: FC = () => {
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  );
};
