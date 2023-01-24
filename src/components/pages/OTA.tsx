import { FC, memo, useState } from 'react';
import { Divider, useDisclosure, VStack, Box } from '@chakra-ui/react';

import { Header } from '../organisms/Header';
import { NewsSummaries } from '../organisms/news/NewsSummaries';
import { useNewsSummaries } from '../../hooks/useNewsSummaries';
import { NewsAddModal } from '../organisms/news/NewsAddModal';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { LoadingSpinner } from '../atoms/spinner/LoadingSpinner';
import { NewsDetailModal } from '../organisms/news/NewsDetailModal';
import { OTAAddModal } from '../organisms/ota/OTAAddModal';

export const OTA: FC = memo(function News() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { newsSummaries, getNewsSummaries, isLoading } = useNewsSummaries();

  const onCloseNewsAdd = () => {
    onClose();
    (async () => getNewsSummaries())();
  };

  return (
    <>
      <Header />
      <VStack align={'left'} bgColor={'white'} borderRadius={'md'} shadow={'md'} m={4}>
        <Box mx={2} mt={2}>
          <PrimaryButton onClick={onOpen}>Upload</PrimaryButton>
        </Box>
        <Divider />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <NewsSummaries newsSummaries={newsSummaries} getNewsSummaries={getNewsSummaries} />
        )}
      </VStack>
      <OTAAddModal isOpen={isOpen} onClose={onCloseNewsAdd} />
    </>
  );
});
