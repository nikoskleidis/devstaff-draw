import { NewParticipant, Participant } from '@/src/types';

export const getParticipants = async (): Promise<Participant[]> => {
  const res = await fetch('api/participants');
  return res.json();
};

export const registerNewParticipant = async (participant: NewParticipant): Promise<Response> => {
  const res = await fetch('api/participants', {
    method: 'POST',
    body: JSON.stringify(participant)
  });

  return res.json();
};

export const draw = async (count: number): Promise<number[]> => {
  const res = await fetch(`api/participants/draw?count=${count}`, { method: 'POST' });
  return res.json();
};
