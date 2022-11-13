import { memo, FC } from 'react';
import { Box, Image, Stack, Text } from '@chakra-ui/react';

type Props = {
  id: number;
  imageUrl: string;
  userName: string;
  fullName: string;
  onClickUser: (id: number) => void;
};

export const UserCard: FC<Props> = memo(function UserCard(props) {
  const { id, imageUrl, userName, fullName, onClickUser } = props;
  return (
    <Box
      p={4}
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      onClick={() => onClickUser(id)}
      _hover={{ opacity: 0.8, cursor: 'pointer' }}
    >
      <Stack textAlign="center">
        <Image boxSize="160px" borderRadius="full" alt={userName} m="auto" src={imageUrl} />
        <Text fontSize="lg" fontWeight="bold">
          {userName}
        </Text>
        <Text fontSize="sm" color="gray">
          {fullName}
        </Text>
      </Stack>
    </Box>
  );
});
