import { FC, memo, useCallback } from 'react';
import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';

import { OtaSummary } from '../../../types/api/ota';
import { IconButton } from '../../atoms/button/IconButton';
// import { NewsDetailModal } from './NewsDetailModal';
import { StatusText } from '../../atoms/text/StatusText';

type Props = {
  otaSummaries: Array<OtaSummary>;
  getOtaSummaries: () => Promise<void>;
};

export const OtaSummaries: FC<Props> = memo(function OtaSummaries(props) {
  const { otaSummaries, getOtaSummaries } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headers = ['latest', 'name', 'type', 'version_number', 'version_name', 'original_version_number'];

  const onClickDetail = (news_id: string) => {
    console.log(news_id);
    onOpen();
  };

  const onCloseNewsDetail = () => {
    onClose();
    (async () => getOtaSummaries())();
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
              {otaSummaries.map((otaSummary, index) => (
                <Tr key={index}>
                  <Td key={`${index}-1`} borderWidth="1px" borderColor="gray.200" bg="white">
                    pub
                  </Td>
                  <Td key={`${index}-2`} borderWidth="1px" borderColor="gray.200" bg="white">
                    {otaSummary.name}
                  </Td>
                  <Td key={`${index}-3`} borderWidth="1px" borderColor="gray.200" bg="white">
                    {otaSummary.ota_type}
                  </Td>
                  <Td key={`${index}-4`} borderWidth="1px" borderColor="gray.200" bg="white">
                    {otaSummary.version_number}
                  </Td>
                  <Td key={`${index}-5`} borderWidth="1px" borderColor="gray.200" bg="white">
                    {otaSummary.version_name}
                  </Td>
                  <Td key={`${index}-6`} borderWidth="1px" borderColor="gray.200" bg="white">
                    {otaSummary.original_version_number}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {/*<NewsDetailModal newsDetail={dummy} isOpen={isOpen} onClose={onCloseNewsDetail} />*/}
    </>
  );
});
