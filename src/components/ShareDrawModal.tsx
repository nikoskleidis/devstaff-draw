import { Anchor, Modal, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ShareDrawModal = ({ open, onClose }: Props) => {
  const drawUrl = 'devstaff.gr/draw';

  return (
    <>
      <Modal
        opened={open}
        onClose={onClose}
        centered
        title="Participate to the draw"
        radius={0}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <Stack align="center" spacing={16}>
          <Image
            src="/qrcode.webp"
            alt="QR code for sharing the DevStaff Draw website"
            width={350}
            height={350}
            priority
          />

          <Text size="xl" my="4" color="grey">
            OR
          </Text>

          <Anchor href="https://devstaff.gr/draw" target="_blank" rel="noreferrer">
            <Text size="xl">{drawUrl}</Text>
          </Anchor>
        </Stack>
      </Modal>
    </>
  );
};

export default ShareDrawModal;
