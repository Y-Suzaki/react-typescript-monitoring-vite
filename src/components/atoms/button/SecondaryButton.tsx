import { memo, ReactNode, FC, SyntheticEvent } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  onClick: (e: SyntheticEvent) => void;
  disable?: boolean;
  loading?: boolean;
};

export const SecondaryButton: FC<Props> = memo(function SecondaryButton(props) {
  const { children, onClick, disable = false, loading = false } = props;
  return (
    <Button
      bg="orange.400"
      color="white"
      _hover={{ opacity: 0.7 }}
      onClick={onClick}
      isLoading={loading}
      disabled={disable || loading}
    >
      {children}
    </Button>
  );
});
