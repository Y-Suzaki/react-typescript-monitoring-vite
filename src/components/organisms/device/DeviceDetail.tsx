import { FC, memo } from 'react';
import { DeviceDetail as _DeviceDetail } from '../../../types/api/device';
import { Box, Divider, HStack, Image, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';

type Props = {
  deviceDetail: _DeviceDetail;
};

export const DeviceDetail: FC<Props> = memo(function DeviceDetail(props) {
  const { deviceDetail } = props;
  return (
    <Wrap p={{ base: 2, md: 4 }} spacing="20px">
      <WrapItem mx="auto">
        <Box
          p={4}
          w="sm"
          // h="260px"
          bg="gray.50"
          borderRadius="10px"
          shadow="md"
          // _hover={{ opacity: 0.8, cursor: 'pointer' }}
        >
          <Stack textAlign="left">
            {Object.entries(deviceDetail).map(([key, value]) => (
              <HStack key={key}>
                <Text width="50%">{key}</Text>
                <Text>{value}</Text>
              </HStack>
            ))}
          </Stack>
        </Box>
      </WrapItem>
    </Wrap>
  );
});
