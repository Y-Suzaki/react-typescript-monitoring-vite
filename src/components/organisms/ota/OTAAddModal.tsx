import { ChangeEvent, FC, memo, useRef, useState } from 'react';
import {
  Badge,
  Button,
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
  Select,
  Text,
  HStack,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SubmitButton } from '../../atoms/button/SubmitButton';
import { otaFormSchema, OTAFormType } from './OTAAddForm';
import { FileUpload } from '../../atoms/input/FileUpload';
import { FiFile } from 'react-icons/all';
import { Icon } from '@chakra-ui/icons';
import { useOTAAdd } from '../../../hooks/useOTAAdd';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OTAAddModal: FC<Props> = memo(function NewsAddModal(props) {
  const { isOpen, onClose } = props;
  const [uploadFileName, setUploadFileName] = useState('');
  const [shouldOldVersion, setShouldOldVersion] = useState(false);
  const { addOTA, isLoading, isError } = useOTAAdd();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<OTAFormType>({
    defaultValues: {
      otaType: 'apk',
      name: 'test',
      versionNumber: undefined,
      versionName: undefined,
      uploadFile: undefined,
    },
    resolver: yupResolver(otaFormSchema),
  });
  const onSubmit: SubmitHandler<OTAFormType> = (data) => {
    (async () => {
      await addOTA(data);
      if (!isError) {
        reset();
        setUploadFileName('');
      }
    })();
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileName(e.target.files[0].name);
    } else {
      setUploadFileName('');
    }
  };

  const onChangeOtaType = (onChange: any, value: string) => {
    setShouldOldVersion(value === 'image');
    onChange(value);
  };

  const onCloseModal = () => {
    setUploadFileName('');
    setShouldOldVersion(false);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} autoFocus={false} size={'xl'} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader textAlign={'center'}>Upload APK / Diff Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={8}>
          <VStack align={'left'} bgColor={'white'}>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              {/* Error時はisInvalid属性も必要。 */}
              <FormControl width={'100%'} mb={6} isInvalid={errors.otaType !== undefined}>
                <Controller
                  name="otaType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup onChange={(e) => onChangeOtaType(onChange, e)} value={value} defaultValue="apk">
                      <HStack>
                        <Radio size={'sm'} value="apk">
                          APK
                        </Radio>
                        <Radio size={'sm'} value="image">
                          Diff Image
                        </Radio>
                      </HStack>
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <FormControl width={'100%'} mb={8} isInvalid={errors.name !== undefined}>
                <FormLabel htmlFor="name" fontSize="sm">
                  Name
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    req
                  </Badge>
                </FormLabel>
                <Select size="sm" borderRadius={'md'} {...register('name')}>
                  <option>test</option>
                </Select>
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <HStack spacing={3} alignItems={'start'}>
                <Box w={'48%'}>
                  <FormControl width={'100%'} mb={8} isInvalid={errors.versionNumber != undefined}>
                    <FormLabel htmlFor="versionNumber" fontSize="sm">
                      Version Number
                      <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                        req
                      </Badge>
                    </FormLabel>
                    <Input size="sm" borderRadius={'md'} {...register('versionNumber')} />
                    <FormErrorMessage>{errors.versionNumber?.message}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box w={'48%'}>
                  <FormControl width={'100%'} mb={8} isInvalid={errors.versionName != undefined}>
                    <FormLabel htmlFor="versionName" fontSize="sm">
                      Version Name
                      <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                        req
                      </Badge>
                    </FormLabel>
                    <Input size="sm" borderRadius={'md'} {...register('versionName')} />
                    <FormErrorMessage>{errors.versionName?.message}</FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>

              {shouldOldVersion ? (
                <HStack spacing={8} alignItems={'start'}>
                  <Box w={'48%'}>
                    <FormControl width={'100%'} mb={8} isInvalid={errors.originalVersionNumber != undefined}>
                      <FormLabel htmlFor="originalVersionNumber" fontSize="sm">
                        Original Version Number
                        <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                          req
                        </Badge>
                      </FormLabel>
                      <Input size="sm" borderRadius={'md'} {...register('originalVersionNumber')} />
                      <FormErrorMessage>{errors.originalVersionNumber?.message}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </HStack>
              ) : null}

              <FormControl width={'100%'} mb={8} isInvalid={errors.uploadFile != undefined}>
                <FormLabel htmlFor="uploadFile" fontSize="sm">
                  Add File
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    req
                  </Badge>
                </FormLabel>
                <HStack>
                  <FileUpload
                    register={register('uploadFile')}
                    onSelectFile={onSelectFile}
                    width={'40%'}
                    multiple={false}
                  >
                    <Button size="sm" w={'100%'} colorScheme="teal" variant="outline" leftIcon={<Icon as={FiFile} />}>
                      Select File.
                    </Button>
                  </FileUpload>
                  {uploadFileName ? <Text>{uploadFileName}</Text> : null}
                </HStack>
                <FormErrorMessage>{errors.uploadFile?.message?.toString()}</FormErrorMessage>
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
