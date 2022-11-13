import { FormControl, FormLabel, HStack, Input, Box } from '@chakra-ui/react';
import { ChangeEvent, FC, memo, useState } from 'react';
import { PrimaryButton } from '../atoms/button/PrimaryButton';

type Props = {
  isLoading: boolean;
  onClickSearch: (imei: string) => void;
};

// 無名関数だとLinterで指摘される。
export const SearchBox: FC<Props> = memo(function SearchBox(props) {
  const { isLoading, onClickSearch } = props;
  const [imei, setImei] = useState('');

  const onChangeImei = (e: ChangeEvent<HTMLInputElement>) => {
    setImei(e.target.value);
  };

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
      <Box justifyContent="bottom">
        <PrimaryButton loading={isLoading} onClick={() => onClickSearch(imei)}>
          Search
        </PrimaryButton>
      </Box>
    </HStack>
  );
});
