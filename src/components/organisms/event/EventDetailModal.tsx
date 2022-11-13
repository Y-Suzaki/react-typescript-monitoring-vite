import { FC, memo } from 'react';
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { EventDetail } from '../../../types/api/event_detail';

type Props = {
  detail: EventDetail | null;
  isOpen: boolean;
  onClose: () => void;
};

export const EventDetailModal: FC<Props> = memo(function EventDetailModal(props) {
  const { detail, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} size={'lg'} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader>Event detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={2}>
            <HStack>
              <Text width={'40%'}>event_id</Text>
              <Text>{detail?.event_id}</Text>
            </HStack>
            <HStack>
              <Text width={'40%'}>date_time</Text>
              <Text>{detail?.date_time}</Text>
            </HStack>
            <HStack>
              <Text width={'40%'}>event_type</Text>
              <Text>{detail?.event_type}</Text>
            </HStack>
            <HStack>
              <Text width={'40%'}>lat</Text>
              <Text>{detail?.lat}</Text>
            </HStack>
            <HStack>
              <Text width={'40%'}>lng</Text>
              <Text>{detail?.lng}</Text>
            </HStack>
            <HStack>
              <Text width={'40%'}>azimuth</Text>
              <Text>{100}</Text>
            </HStack>
            <HStack>
              <Text width={'40%'}>speed</Text>
              <Text>{200}</Text>
            </HStack>
            <Divider />
            <HStack>
              <Text width={'40%'}>download_urls</Text>
              <VStack alignItems={'left'}>
                {Object.entries(detail?.download_urls || {}).map(([key, value]) => (
                  <Box key={key} _hover={{ opacity: 0.6 }}>
                    <Link color="blue.500" download href={value}>
                      {`${key} `}
                      <DownloadIcon />
                    </Link>
                  </Box>
                ))}
              </VStack>
            </HStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
