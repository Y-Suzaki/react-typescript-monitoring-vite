import { FC, memo, useCallback } from 'react';
import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';

import { NewsSummary } from '../../../types/api/news';
import { IconButton } from '../../atoms/button/IconButton';
import { NewsDetailModal } from './NewsDetailModal';
import { StatusText } from '../../atoms/text/StatusText';

type Props = {
  newsSummaries: Array<NewsSummary>;
  getNewsSummaries: () => Promise<void>;
};

export const NewsSummaries: FC<Props> = memo(function NewsSummaries(props) {
  const { newsSummaries, getNewsSummaries } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headers = ['news id', 'title', 'status', ''];

  const onClickDetail = (news_id: string) => {
    console.log(news_id);
    onOpen();
  };

  const onCloseNewsDetail = () => {
    onClose();
    (async () => getNewsSummaries())();
  };

  const dummy = {
    news_id: 'c9951ab6-172b-19f5-e0c8-677c27d908af',
    title: 'title-000000000000000000000000001',
    content: 'content-000000000000000000000000001',
    publicationDate: 'date',
    endDate: 'date',
    status: 1,
  };

  return (
    <>
      <Box bgColor={'white'} p={2} borderRadius={'md'}>
        <TableContainer overflowX="auto" overflowY="auto">
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
              {newsSummaries.map((newsSummary, index) => (
                <Tr key={index}>
                  <Td key={`${index}-1`} borderWidth="1px" borderColor="gray.200" bg="white">
                    {newsSummary.news_id}
                  </Td>
                  <Td key={`${index}-2`} borderWidth="1px" borderColor="gray.200" bg="white">
                    {newsSummary.title}
                  </Td>
                  <Td key={`${index}-3`} borderWidth="1px" borderColor="gray.200" bg="white">
                    <StatusText status={newsSummary.status} />
                  </Td>
                  <Td key={`${index}-4`} borderWidth="1px" borderColor="gray.400" bg="white">
                    <IconButton onClick={() => onClickDetail(newsSummary.news_id)}>detail</IconButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <NewsDetailModal newsDetail={dummy} isOpen={isOpen} onClose={onCloseNewsDetail} />
    </>
  );
});
