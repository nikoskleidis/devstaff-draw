import styled from 'styled-components';
import { Anchor, Modal, Stack, Text } from '@mantine/core';
import Image from 'next/image';

type Props = {
  open: boolean;
  onClose: () => void;
};

const DrawUrlText = styled.text`
  font-weight: bold;
  font-size: 2rem;
  margin-top: 2rem
`;

const ShareDrawModal = ({ open, onClose }: Props) => {
  const drawUrlFull = 'https://devstaff.gr/draw';
  const drawUrl = 'devstaff.gr/draw';

  return (
    <>
      <Modal
        opened={open}
        onClose={onClose}
        centered
        title="Participate in the draw"
        radius={0}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <Stack align="center" spacing={16}>
          <Image
            src="/qrcode.webp"
            alt="QR code for sharing the DevStaff Draw website"
            width={370}
            height={370}
            priority
          />

          <Text size="xl" my="4" color="grey">OR</Text>

          <Anchor href={drawUrlFull} target="_blank" rel="noreferrer">
            <DrawUrlText>{drawUrl}</DrawUrlText>
          </Anchor>
        </Stack>
      </Modal>
    </>
  );
};

export default ShareDrawModal;
