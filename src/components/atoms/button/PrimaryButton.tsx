import { memo, ReactNode, FC } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  disable?: boolean;
  loading?: boolean;
};

export const PrimaryButton: FC<Props> = memo(function PrimaryButton(props) {
  const { children, onClick, disable = false, loading = false } = props;
  return (
    <Button
      bg="teal.500"
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
