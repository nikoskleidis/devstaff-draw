import styled from 'styled-components';
import { motion } from 'framer-motion';
import { stringToHSL } from '@/src/utils';

export const StyledList = styled(motion.ol).attrs({
  variants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  initial: 'hidden',
  animate: 'show'
})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

export const StyledListItem = styled(motion.li).attrs({
  layout: true,
  transition: {
    layout: {
      duration: 0.3
    }
  },
  variants: {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
})<{ $participantName: string }>`
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  background-color: ${({ $participantName }) => stringToHSL($participantName)};
`;
