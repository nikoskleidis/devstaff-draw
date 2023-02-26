import { Participant } from '@/src/types';

export const getParticipants = async (): Promise<Participant[]> => {
  const res = await fetch('api/participants');
  return res.json();
};

type NewParticipant = {
  email: string;
  name: string;
  participation_time: string;
};

export const registerNewParticipant = async (participant: NewParticipant): Promise<Response> => {
  const res = await fetch('api/participants', {
    method: 'POST',
    body: JSON.stringify(participant)
  });

  return res.json();
};
