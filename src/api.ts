import { Participant } from '@/src/types';

export const getParticipants = async (): Promise<Participant[]> => {
  const res = await fetch('api/participants');
  return res.json();
};
