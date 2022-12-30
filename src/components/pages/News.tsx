import { FC, memo } from 'react';
import { Divider, useDisclosure, VStack, Box } from '@chakra-ui/react';

import { Header } from '../organisms/Header';
import { NewsSummaries } from '../organisms/news/NewsSummaries';
import { useNewsSummaries } from '../../hooks/useNewsSummaries';
import { NewsAddModal } from '../organisms/news/NewsAddModal';
import { PrimaryButton } from '../atoms/button/PrimaryButton';

export const News: FC = memo(function News() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { newsSummaries, isLoading } = useNewsSummaries();
  const onClick = () => {
    console.log('OnClick');
    onOpen();
  };

  return (
    <>
      <Header />
      <VStack align={'left'} bgColor={'white'} borderRadius={'md'} shadow={'md'} m={4}>
        <Box mx={2} mt={2}>
          <PrimaryButton onClick={onClick}>Add News</PrimaryButton>
        </Box>
        <Divider />
        <NewsSummaries newsSummaries={newsSummaries} />
      </VStack>
      <NewsAddModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
