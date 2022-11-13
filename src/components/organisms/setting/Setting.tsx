import { FC, memo } from 'react';
import { Setting } from '../../../types/api/setting';
import { Box, Divider, HStack, Image, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';

type Props = {
  setting: Setting | null;
};

export const SettingList: FC<Props> = memo(function SettingList(props) {
  const { setting } = props;

  return (
    <Wrap p={{ base: 2, md: 4 }} spacing="20px">
      {Object.entries(setting || {}).map(([category, categoryValue]) => (
        <WrapItem key={category} mx="auto">
          <Box
            p={4}
            w="260px"
            // h="260px"
            bg="gray.50"
            borderRadius="10px"
            shadow="md"
            // _hover={{ opacity: 0.8, cursor: 'pointer' }}
          >
            <Stack textAlign="left">
              <Text fontSize="md" fontWeight="bold">
                {category}
              </Text>
              <Divider />
              {Object.entries(categoryValue).map(([key, value]) => (
                <HStack key={key}>
                  <Text width="50%">{key}</Text>
                  <Text>{value}</Text>
                </HStack>
              ))}
            </Stack>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  );
});
