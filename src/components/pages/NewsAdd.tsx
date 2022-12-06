import { FC, memo, SyntheticEvent } from 'react';
import { Header } from '../organisms/Header';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, ButtonGroup, Checkbox, FormLabel, Input, Select } from '@chakra-ui/react';

type FormData = {
  userName: string;
  zipcode?: string;
  isAgreed: boolean;
};

export const NewsAdd: FC = memo(function NewsAdd() {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      userName: '',
      isAgreed: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  const onReset = (e: SyntheticEvent) => {
    e.stopPropagation();
    reset();
  };

  return (
    <>
      <Header />
      <Box p={5} w="md" borderWidth="1px" borderRadius="lg" boxShadow="base">
        <p>sss</p>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <FormLabel htmlFor="userName" mt={2}>
            ユーザー名
          </FormLabel>
          <Input size="md" {...register('userName')} />

          <FormLabel htmlFor="zipcode" mt={4}>
            郵便番号
          </FormLabel>
          <Input size="md" maxLength={7} {...register('zipcode')} />

          <Checkbox {...register('isAgreed')} my={2}>
            規約に同意する
          </Checkbox>

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
      ;
    </>
  );
});
