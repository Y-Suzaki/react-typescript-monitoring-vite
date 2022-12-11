import { memo, ReactNode, FC } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  disable?: boolean;
  loading?: boolean;
};

export const SubmitButton: FC<Props> = memo(function SubmitButton(props) {
  const { children, disable = false, loading = false } = props;
  return (
    <Button
      bg="teal.500"
      color="white"
      type={'submit'}
      _hover={{ opacity: 0.7 }}
      isLoading={loading}
      disabled={disable || loading}
    >
      {children}
    </Button>
  );
});
