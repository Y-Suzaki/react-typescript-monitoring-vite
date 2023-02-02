import { FC, memo, useState } from 'react';
import { Divider, useDisclosure, VStack, Box } from '@chakra-ui/react';

import { Header } from '../organisms/Header';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { LoadingSpinner } from '../atoms/spinner/LoadingSpinner';
import { OtaAddModal } from '../organisms/ota/OtaAddModal';
import { useOtaSummaries } from '../../hooks/useOtaSummaries';
import { OtaSummaries } from '../organisms/ota/OtaSummaries';

export const Ota: FC = memo(function News() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getOtaSummaries, otaSummaries, isLoading } = useOtaSummaries();
  // const { newsSummaries, getNewsSummaries, isLoading } = useNewsSummaries();

  const onCloseNewsAdd = () => {
    onClose();
    (async () => getOtaSummaries())();
  };

  return (
    <>
      {/*<Header />*/}
      <VStack align={'left'} bgColor={'white'} borderRadius={'md'} shadow={'md'} m={4}>
        <Box mx={2} mt={2}>
          <PrimaryButton onClick={onOpen}>Upload</PrimaryButton>
        </Box>
        <Divider />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <OtaSummaries otaSummaries={otaSummaries} getOtaSummaries={getOtaSummaries} />
        )}
      </VStack>
      <OtaAddModal isOpen={isOpen} onClose={onCloseNewsAdd} />
    </>
  );
});
