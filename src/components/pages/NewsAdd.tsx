import { FC, memo, SyntheticEvent } from 'react';
import { Header } from '../organisms/Header';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import type { InferType } from 'yup';

type FormData = {
  userName: string;
  zipcode?: string;
  isAgreed: boolean;
};

// Formバリデーションを定義
const regFormSchema = yup.object({
  userName: yup.string().required('必須項目です'),
  zipcode: yup.string().max(7).matches(/\d{7}/, '7桁の数字で入力してください'),
  isAgreed: yup.boolean().oneOf([true], '同意が必要です').required(),
});

type RegFormSchema = InferType<typeof regFormSchema>;

export const NewsAdd: FC = memo(function NewsAdd() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegFormSchema>({
    defaultValues: {
      userName: '',
      isAgreed: false,
    },
    resolver: yupResolver(regFormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  const onReset = (e: SyntheticEvent) => {
    e.stopPropagation();
    reset();
  };

  return (
    <>
      <Header />
      <VStack align={'left'} bgColor={'white'} borderRadius={'md'} shadow={'md'} m={4}>
        <Box p={5}>
          <p>sss</p>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            {/* Error時はisInvalid属性も必要。 */}
            <FormControl width={'40%'} isInvalid={errors.userName !== undefined} isRequired>
              <FormLabel htmlFor="userName" mt={2}>
                ユーザー名
              </FormLabel>
              <Input size="md" {...register('userName')} />
              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl width={'40%'} isInvalid={errors.zipcode !== undefined}>
              <FormLabel htmlFor="zipcode" mt={4}>
                郵便番号
              </FormLabel>
              <Input size="md" maxLength={7} {...register('zipcode')} />
              <FormErrorMessage>{errors.zipcode?.message}</FormErrorMessage>
            </FormControl>

            <FormControl width={'40%'} isInvalid={errors.isAgreed !== undefined}>
              <Checkbox {...register('isAgreed')} my={2}>
                規約に同意する
              </Checkbox>
              <FormErrorMessage>{errors.isAgreed?.message}</FormErrorMessage>
            </FormControl>

            <ButtonGroup my={3} w="xs">
              <Button w="30%" colorScheme="orange" variant="solid" onClick={onReset}>
                リセット
              </Button>

              <Button w="70%" colorScheme="blue" variant="solid" type="submit">
                送信
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </VStack>
      ;
    </>
  );
});
