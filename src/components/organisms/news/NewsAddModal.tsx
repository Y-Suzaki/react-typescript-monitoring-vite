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
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SubmitButton } from '../../atoms/button/SubmitButton';
import { useNews } from '../../../hooks/useNews';
import { getCurrentDate } from '../../../helper/DateFormatter';
import { regFormSchema, RegFormSchema } from './NewsAddForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewsAddModal: FC<Props> = memo(function NewsAddModal(props) {
  const { isOpen, onClose } = props;
  const { addNews, isLoading, isError } = useNews();
  const initDay = getCurrentDate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegFormSchema>({
    defaultValues: {
      title: '',
      content: '',
      publicationDate: initDay,
    },
    resolver: yupResolver(regFormSchema),
  });
  const onSubmit: SubmitHandler<RegFormSchema> = (data) => {
    (async () => {
      await addNews(data);
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
        <ModalHeader>Add News</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={8}>
          <VStack align={'left'} bgColor={'white'}>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              {/* Error時はisInvalid属性も必要。 */}
              <FormControl width={'100%'} isInvalid={errors.title !== undefined}>
                <FormLabel htmlFor="title" mt={2}>
                  Title
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    required
                  </Badge>
                </FormLabel>
                <Input size="md" {...register('title')} />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>

              <FormControl width={'100%'} isInvalid={errors.content !== undefined}>
                <FormLabel htmlFor="content" mt={4}>
                  Content
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    required
                  </Badge>
                </FormLabel>
                <Textarea size="md" {...register('content')} />
                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
              </FormControl>

              <FormControl width={'100%'} isInvalid={errors.publicationDate !== undefined}>
                <FormLabel htmlFor="publicationDate" mt={2}>
                  Publication Date (yyyy-MM-dd HH:mm )
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    required
                  </Badge>
                </FormLabel>
                <Input size="md" {...register('publicationDate')} />
                <FormErrorMessage>{errors.publicationDate?.message}</FormErrorMessage>
              </FormControl>

              <FormControl width={'100%'} isInvalid={errors.endDate !== undefined}>
                <FormLabel htmlFor="endDate" mt={2}>
                  End Date (yyyy-MM-dd HH:mm )
                </FormLabel>
                <Input size="md" {...register('endDate')} />
                <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
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
