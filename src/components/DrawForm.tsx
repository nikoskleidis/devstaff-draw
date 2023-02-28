import { ActionIcon, Box, Button, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';

type Props = {
  onSubmit: (count: number) => void;
};

const DrawForm = ({ onSubmit }: Props) => {
  const [counter, setCounter] = useState(2);

  return (
    <Stack
      sx={theme => ({
        backgroundColor: theme.colors.gray[2],
        padding: theme.spacing.md,
        borderRadius: theme.radius.md
      })}
    >
      <Group>
        <ActionIcon onClick={() => setCounter(prev => prev - 1)}>
          <Text size="xl" weight="bold">
            -
          </Text>
        </ActionIcon>
        <Text size="lg" weight="bold">
          {counter}
        </Text>
        <ActionIcon onClick={() => setCounter(prev => prev + 1)}>
          <Text size="xl" weight="bold">
            +
          </Text>
        </ActionIcon>
      </Group>

      <Button onClick={() => onSubmit(counter)}>Draw</Button>
    </Stack>
  );
};

export default DrawForm;
