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
  Stack,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import type { InferType } from 'yup';
import { SubmitButton } from '../atoms/button/SubmitButton';
import { NewsSummaries } from '../organisms/news/NewsSummaries';

// Formバリデーションを定義
const regFormSchema = yup.object({
  userName: yup.string().required('必須項目です'),
  zipcode: yup.string().max(7).matches(/\d{7}/, '7桁の数字で入力してください'),
  isAgreed: yup.boolean().oneOf([true], '同意が必要です').required(),
});

type RegFormSchema = InferType<typeof regFormSchema>;

const newsSummaries = [
  {
    news_id: '001',
    title: 'test-01',
    content: 'test content-01',
  },
  {
    news_id: '002',
    title: 'test-02',
    content: 'test content-02',
  },
];

export const News: FC = memo(function NewsAdd() {
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

  const onSubmit: SubmitHandler<RegFormSchema> = (data) => console.log(data);
  const onReset = (e: SyntheticEvent) => {
    e.stopPropagation();
    reset();
  };

  return (
    <>
      <Header />
      <NewsSummaries newsSummaries={newsSummaries} />
    </>
  );
});
