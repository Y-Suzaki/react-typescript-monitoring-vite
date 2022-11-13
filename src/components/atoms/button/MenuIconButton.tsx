import { FC, memo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

type Props = {
  onOpen: () => void;
};

export const MenuIconButton: FC<Props> = memo(function MenuIconButton(props) {
  const { onOpen } = props;
  return (
    <IconButton
      icon={<HamburgerIcon />}
      aria-label="menu-button"
      size="sm"
      variant="none"
      display={{ base: 'block', md: 'none' }}
      onClick={onOpen}
    />
  );
});
