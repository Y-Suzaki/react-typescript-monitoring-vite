import { Text } from '@chakra-ui/react';

type Props = {
  status: number;
};

export const StatusText = (props: Props) => {
  const { status } = props;

  return status === 0 ? (
    <Text color="gray.500">before</Text>
  ) : status === 1 ? (
    <Text color="orange.500" as="b">
      publishing
    </Text>
  ) : (
    <Text color="gray.500">finished</Text>
  );
};
