import { ChangeEvent, FC, memo, useState } from 'react';
import {
  HStack,
  Divider,
  IconButton,
  useDisclosure,
  VStack,
  Box,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { Header } from '../organisms/Header';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { DeviceAddModal } from '../organisms/device/DeviceAddModal';
import { DeviceDetail } from '../organisms/device/DeviceDetail';
import { useDeviceDetail } from '../../hooks/useDeviceDetail';

export const Device: FC = memo(function News() {
  const [imei, setImei] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deviceDetail, getDeviceDetail, isLoading } = useDeviceDetail();

  const onChangeImei = (e: ChangeEvent<HTMLInputElement>) => {
    setImei(e.target.value);
  };

  const onClickSearch = (imei: string) => {
    (async () => getDeviceDetail(imei))();
  };

  const onCloseDeviceAdd = () => {
    onClose();
    // (async () => getNewsSummaries())();
  };

  return (
    <>
      {/*<Header />*/}
      <VStack align={'left'} bgColor={'white'} borderRadius={'md'} shadow={'md'} m={4}>
        <HStack p={2} borderRadius={'md'} justify="space-between" alignItems="flex-end">
          <HStack width={'100%'} alignItems="flex-end">
            <FormControl width={'30%'} isRequired>
              <FormLabel fontSize="7px">IMEI</FormLabel>
              <Input
                placeholder="Enter IMEI"
                _placeholder={{ color: 'gray.300' }}
                required
                value={imei}
                onChange={onChangeImei}
              />
            </FormControl>
            <Box justifyContent="bottom">
              <PrimaryButton loading={isLoading} disable={!imei} onClick={() => onClickSearch(imei)}>
                Search
              </PrimaryButton>
              {/*<PrimaryButton>Search</PrimaryButton>*/}
            </Box>
            {/*<IconButton colorScheme="teal" aria-label="Call Segun" size="lg" icon={<PhoneIcon />} />*/}
          </HStack>
          <PrimaryButton onClick={onOpen}>Add Device</PrimaryButton>
        </HStack>
        <Divider />
        {deviceDetail ? <DeviceDetail deviceDetail={deviceDetail} /> : null}
      </VStack>
      <DeviceAddModal isOpen={isOpen} onClose={onCloseDeviceAdd} />
    </>
  );
});
