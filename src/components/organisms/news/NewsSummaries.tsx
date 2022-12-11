import { FC, memo } from 'react';
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';

import { NewsSummary } from '../../../types/api/news';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { NewsAddModal } from './NewsAddModal';

type Props = {
  newsSummaries: Array<NewsSummary>;
};

export const NewsSummaries: FC<Props> = memo(function NewsSummaries(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClick = () => {
    console.log('OnClick');
    onOpen();
  };

  return (
    <Box bgColor={'white'} p={2} borderRadius={'md'}>
      <PrimaryButton onClick={onClick}>Add News</PrimaryButton>
      <NewsAddModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
});
