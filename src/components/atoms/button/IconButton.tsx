import { FC, memo, ReactNode } from 'react';
import { Button } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export const IconButton: FC<Props> = memo(function IconButton(props) {
  const { children, onClick } = props;
  return (
    <Button leftIcon={<InfoIcon />} size="sm" colorScheme="teal" variant="outline" onClick={onClick}>
      {children}
    </Button>
  );
});
