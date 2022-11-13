import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { ChangeEvent, FC, memo, useState } from 'react';
import { PrimaryButton } from '../atoms/button/PrimaryButton';

type Props = {
  isLoading: boolean;
  onClickSearch: (imei: string, day: string) => void;
};

// 無名関数だとLinterで指摘される。
export const SearchDayBox: FC<Props> = memo(function SearchDayBox(props) {
  const { isLoading, onClickSearch } = props;
  const today = new Date();
  const initDay = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
  const [imei, setImei] = useState('');
  const [day, setDay] = useState(initDay);

  const onChangeImei = (e: ChangeEvent<HTMLInputElement>) => {
    setImei(e.target.value);
  };

  const onChangeDay = (e: ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
  };

  const available = imei && day;

  return (
    <HStack p={2} borderRadius={'md'} alignItems="flex-end">
      <FormControl width={'25%'} isRequired>
        <FormLabel fontSize="7px">IMEI</FormLabel>
        <Input
          placeholder="Enter IMEI"
          _placeholder={{ color: 'gray.300' }}
          required
          value={imei}
          onChange={onChangeImei}
        />
      </FormControl>
      <FormControl width={'25%'} isRequired>
        <FormLabel fontSize="7px">Day (UTC YYYY-MM-DD)</FormLabel>
        <Input
          placeholder="Enter day."
          _placeholder={{ color: 'gray.300' }}
          required
          value={day}
          onChange={onChangeDay}
        />
      </FormControl>
      <Box justifyContent="bottom">
        <PrimaryButton loading={isLoading} disable={!available} onClick={() => onClickSearch(imei, day)}>
          Search
        </PrimaryButton>
      </Box>
    </HStack>
  );
});
