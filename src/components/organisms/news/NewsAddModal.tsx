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
import * as yup from 'yup';
import { InferType } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SubmitButton } from '../../atoms/button/SubmitButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// Formバリデーションを定義
const regFormSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  publicationDate: yup.string().matches(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/),
  endDate: yup.string().matches(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/),
});
type RegFormSchema = InferType<typeof regFormSchema>;

export const NewsAddModal: FC<Props> = memo(function NewsAddModal(props) {
  const { isOpen, onClose } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegFormSchema>({
    defaultValues: {
      title: '',
      content: '',
    },
    resolver: yupResolver(regFormSchema),
  });
  const onSubmit: SubmitHandler<RegFormSchema> = (data) => console.log(data);
  const onCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} autoFocus={false} size={'lg'} motionPreset="slideInBottom">
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
                <SubmitButton>Register</SubmitButton>
              </Box>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
