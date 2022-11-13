import { memo, FC } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickUserManagement: () => void;
  onClickSetting: () => void;
};

export const MenuDrawer: FC<Props> = memo(function MenuDrawer(props) {
  const { isOpen, onClose, onClickHome, onClickUserManagement, onClickSetting } = props;
  return (
    <Drawer placement="left" size="xs" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onClickHome}>
              To Top
            </Button>
            <Button w="100%" onClick={onClickUserManagement}>
              To User
            </Button>
            <Button w="100%" onClick={onClickSetting}>
              To Setting
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
