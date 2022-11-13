import { FC, memo } from 'react';
import { Divider, VStack } from '@chakra-ui/react';
import { Header } from '../organisms/Header';
import { useSetting } from '../../hooks/useSetting';
import { SearchBox } from '../organisms/SearchBox';
import { SettingList } from '../organisms/setting/Setting';

// 無名関数だとLinterで指摘される。
export const Setting: FC = memo(function Setting() {
  const { getSetting, setting, isLoading } = useSetting();

  const onClickSearch = (imei: string) => {
    console.log(`onClickSearch ${imei}`);
    getSetting(imei);
  };

  return (
    <>
      <Header />
      <VStack align={'left'} bgColor={'white'} borderRadius={'md'} shadow={'md'} m={4}>
        <SearchBox isLoading={isLoading} onClickSearch={onClickSearch} />
        <Divider />
        {setting ? <SettingList setting={setting} /> : null}
      </VStack>
    </>
  );
});
