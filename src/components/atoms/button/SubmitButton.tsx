import { memo, ReactNode, FC } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  disable?: boolean;
  isLoading?: boolean;
};

export const SubmitButton: FC<Props> = memo(function SubmitButton(props) {
  const { children, disable = false, isLoading = false } = props;
  return (
    <Button
      bg="teal.500"
      color="white"
      type={'submit'}
      _hover={{ opacity: 0.7 }}
      isLoading={isLoading}
      disabled={disable || isLoading}
    >
      {children}
    </Button>
  );
});
