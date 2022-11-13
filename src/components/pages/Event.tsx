import { FC, memo } from 'react';
import { Divider, VStack } from '@chakra-ui/react';
import { Header } from '../organisms/Header';
import { useSetting } from '../../hooks/useSetting';
import { SearchBox } from '../organisms/SearchBox';
import { SettingList } from '../organisms/setting/Setting';
import { SearchDayBox } from '../organisms/SearchDayBox';
import { useEventSummary } from '../../hooks/useEventSummary';
import { EventSummaries } from '../organisms/event/EventSummaries';

// 無名関数だとLinterで指摘される。
export const Event: FC = memo(function Event() {
  const { getEventSummaries, eventSummaries, isLoading } = useEventSummary();

  const onClickSearch = (imei: string, day: string) => {
    console.log(`onClickSearch ${imei} ${day}`);
    getEventSummaries(imei, day);
  };

  return (
    <>
      <Header />
      <VStack align={'left'} bgColor={'white'} borderRadius={'md'} shadow={'md'} m={4}>
        <SearchDayBox isLoading={isLoading} onClickSearch={onClickSearch} />
        <Divider />
        {eventSummaries ? <EventSummaries eventSummaries={eventSummaries} /> : null}
      </VStack>
    </>
  );
});
