import {
  Badge,
  Box,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { SubmitButton } from '../../atoms/button/SubmitButton';
import { FC, memo } from 'react';
import { NewsDetail } from '../../../types/api/news';
import { SubmitHandler, useForm } from 'react-hook-form';
import { regFormSchema, RegFormSchema } from './NewsAddForm';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SecondaryButton } from '../../atoms/button/SecondaryButton';
import { StatusText } from '../../atoms/text/StatusText';

type Props = {
  newsDetail: NewsDetail;
  isOpen: boolean;
  onClose: () => void;
};

export const NewsDetailModal: FC<Props> = memo(function NewsDetailModal(props: Props) {
  const { newsDetail, isOpen, onClose } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegFormSchema>({
    defaultValues: {
      title: newsDetail.title,
      content: newsDetail.content,
      publicationDate: newsDetail.publicationDate,
      endDate: newsDetail.endDate,
    },
    resolver: yupResolver(regFormSchema),
  });

  const onSubmit: SubmitHandler<RegFormSchema> = (data) => {
    (async () => {
      console.log('SubmitHandler');
      // await addNews(data);
      // !isError && reset();
    })();
  };

  const onDelete = () => {
    console.log('Delete.');
  };

  const onCloseModal = () => {
    onClose();
  };

  console.log(`News Detail Dialog. ${newsDetail}`);

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} autoFocus={false} size={'xl'} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader>News Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={8}>
          <VStack align={'left'} bgColor={'white'}>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <FormControl width={'100%'} mb={4}>
                <FormLabel htmlFor="title">NewsId</FormLabel>
                <Text ml={1}>{newsDetail.news_id}</Text>
              </FormControl>
              <FormControl width={'100%'} mb={4}>
                <FormLabel htmlFor="title">Status</FormLabel>
                <StatusText status={newsDetail.status} />
              </FormControl>
              {/* Error時はisInvalid属性も必要。 */}
              <FormControl width={'100%'} mb={4} isInvalid={errors.title !== undefined}>
                <FormLabel htmlFor="title">
                  Title
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    required
                  </Badge>
                </FormLabel>
                <Input size="md" {...register('title')} />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl width={'100%'} mb={4} isInvalid={errors.content !== undefined}>
                <FormLabel htmlFor="content">
                  Content
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    required
                  </Badge>
                </FormLabel>
                <Textarea size="md" {...register('content')} />
                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
              </FormControl>
              <FormControl width={'100%'} mb={4} isInvalid={errors.publicationDate !== undefined}>
                <FormLabel htmlFor="publicationDate">
                  Publication Date
                  <Badge fontSize="0.2em" variant="outline" colorScheme="red" borderRadius={'5px'} ml={'12px'}>
                    required
                  </Badge>
                </FormLabel>
                <Input size="md" {...register('publicationDate')} />
                <FormHelperText>Format: yyyy-MM-dd HH:mm (JST)</FormHelperText>
                <FormErrorMessage>{errors.publicationDate?.message}</FormErrorMessage>
              </FormControl>
              <FormControl width={'100%'} mb={6} isInvalid={errors.endDate !== undefined}>
                <FormLabel htmlFor="endDate">End Date</FormLabel>
                <Input size="md" {...register('endDate')} />
                <FormHelperText>Format: yyyy-MM-dd HH:mm (JST)</FormHelperText>
                <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
              </FormControl>{' '}
              <HStack justify={'space-between'}>
                <SubmitButton isLoading={false}>Update</SubmitButton>
                <SecondaryButton isLoading={false} onClick={onDelete}>
                  Delete
                </SecondaryButton>
              </HStack>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
