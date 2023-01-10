import { FC, memo } from 'react';
import {
  Badge,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SubmitButton } from '../../atoms/button/SubmitButton';
import { useDeviceAdd } from '../../../hooks/useDeviceAdd';
import { deviceFormSchema, DeviceFormType } from './DeviceAddForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DeviceAddModal: FC<Props> = memo(function NewsAddModal(props) {
  const { isOpen, onClose } = props;
  const { addDevice, isLoading, isError } = useDeviceAdd();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeviceFormType>({
    defaultValues: {
      imei: '',
      serialNo: '',
    },
    resolver: yupResolver(deviceFormSchema),
  });
  const onSubmit: SubmitHandler<DeviceFormType> = (data) => {
    (async () => {
      await addDevice(data);
      !isError && reset();
    })();
  };

  const onCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} autoFocus={false} size={'xl'} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader>Add Device</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={8}>
          <VStack align={'left'} bgColor={'white'}>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              {/* Error時はisInvalid属性も必要。 */}
              <FormControl width={'100%'} mb={6} isInvalid={errors.imei !== undefined}>
                <FormLabel htmlFor="imei" fontSize="sm">
                  Title
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    required
                  </Badge>
                </FormLabel>
                <Input size="sm" {...register('imei')} />
                <FormErrorMessage>{errors.imei?.message}</FormErrorMessage>
              </FormControl>

              <FormControl width={'100%'} mb={8} isInvalid={errors.serialNo != undefined}>
                <FormLabel htmlFor="serialNo" fontSize="sm">
                  Serial No
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    required
                  </Badge>
                </FormLabel>
                <Input size="sm" {...register('serialNo')} />
                <FormErrorMessage>{errors.serialNo?.message}</FormErrorMessage>
              </FormControl>
              <Box width={'50%'} textAlign={'left'} mt={'24px'}>
                <SubmitButton isLoading={isLoading}>Register</SubmitButton>
              </Box>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
