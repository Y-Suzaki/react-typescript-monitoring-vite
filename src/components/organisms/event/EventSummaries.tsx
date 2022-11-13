import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { EventSummary } from '../../../types/api/event';
import { IconButton } from '../../atoms/button/IconButton';
import { EventDetailModal } from './EventDetailModal';
import { useEventDetail } from '../../../hooks/useEventDetail';

type Props = {
  eventSummaries: Array<EventSummary>;
};

export const EventSummaries: FC<Props> = memo(function EventSummaries(props) {
  const { eventSummaries } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getEventDetail, eventDetail, isLoading } = useEventDetail();

  const headers = ['date_time', 'event_type', 'lat', 'lng', ''];

  const onClickDetail = (event_id: number) => {
    console.log(`ID: ${event_id}`);
    getEventDetail(event_id, onOpen);
  };

  return (
    <Box bgColor={'white'} p={2} borderRadius={'md'}>
      <TableContainer overflowX="unset" overflowY="unset">
        <Table variant="simple" size="sm">
          <Thead position="sticky" top={-1} zIndex="docked">
            <Tr bg="gray.100">
              {headers.map((header) => (
                <Th key={header} borderWidth="1px" borderColor="gray.200" p={2}>
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {eventSummaries.map((eventSummary, index) => (
              <Tr key={index}>
                <Td key={eventSummary.date_time} borderWidth="1px" borderColor="gray.200" bg="white">
                  {eventSummary.date_time}
                </Td>
                <Td key={eventSummary.event_type} borderWidth="1px" borderColor="gray.200" bg="white">
                  {eventSummary.event_type}
                </Td>
                <Td key={eventSummary.lat} borderWidth="1px" borderColor="gray.200" bg="white">
                  {eventSummary.lat}
                </Td>
                <Td key={eventSummary.lng} borderWidth="1px" borderColor="gray.200" bg="white">
                  {eventSummary.lng}
                </Td>
                <Td key={eventSummary.event_id} borderWidth="1px" borderColor="gray.200" bg="white">
                  <IconButton onClick={() => onClickDetail(eventSummary.event_id)}>detail</IconButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <EventDetailModal detail={eventDetail} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
});
