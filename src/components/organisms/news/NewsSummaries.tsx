import { FC, memo } from 'react';
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';

import { NewsSummary } from '../../../types/api/news';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { NewsAddModal } from './NewsAddModal';
import { IconButton } from '../../atoms/button/IconButton';

const newsSummaries = [
  {
    news_id: 'c9951ab6-172b-19f5-e0c8-677c27d908af',
    title: 'test-01 お知らせです。',
    content: 'test content-01\nお知らせです。\n気をつけてください。',
    publicationDate: '2022-12-20T01:01:01Z',
    endDate: '2023-12-20T01:01:01',
  },
  {
    news_id: '115532ef-5e6b-6af5-d9ec-c040a26e18c7',
    title: 'test-02',
    content: 'test content-02\nお知らせです。\n気をつけてください。',
    publicationDate: '2022-12-20T01:01:01Z',
    endDate: '2023-12-20T01:01:01',
  },
  {
    news_id: '9f114f57-9ea7-2e27-576f-c0113c9daa63',
    title: 'test-03',
    content: 'test content-03\nお知らせです。\n気をつけてください。',
    publicationDate: '2022-12-20T01:01:01Z',
    endDate: '2023-12-20T01:01:01',
  },
  {
    news_id: '8330c7df-06b5-ce18-7b9e-b28ab2a5dbfe',
    title: 'test-04',
    content: 'test content-04\nお知らせです。\n気をつけてください。',
    publicationDate: '2022-12-20T01:01:01Z',
    endDate: '2023-12-20T01:01:01',
  },
];

type Props = {
  newsSummaries: Array<NewsSummary>;
};

export const NewsSummaries: FC<Props> = memo(function NewsSummaries(props) {
  const { newsSummaries } = props;
  const headers = ['news_id', 'title', 'publicationDate', ''];

  const onClickDetail = (news_id: string) => {
    console.log(news_id);
  };

  return (
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
                  {newsSummary.publicationDate}
                </Td>
                <Td key={`${index}-4`} borderWidth="1px" borderColor="gray.200" bg="white">
                  <IconButton onClick={() => onClickDetail(newsSummary.news_id)}>detail</IconButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
});
