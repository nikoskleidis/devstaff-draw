import type { NextApiRequest, NextApiResponse } from 'next';
import { Participant } from '@/src/types';
import { BASE_URL } from '@/src/constants';

export const fetchParticipants = async () => {
  const participantsResponse = await fetch(`${BASE_URL}/participants.json`);
  const participantsObj = (await participantsResponse.json()) as Record<string, Participant> | null;
  if (!participantsObj) {
    return [];
  }

  return Object.keys(participantsObj).map(key => ({
    ...participantsObj[key],
    id: key
  }));
};

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Participant[] | {}>) {
  switch (_req.method) {
    case 'GET': {
      // Retrieve all the participants
      const participants = await fetchParticipants();
      res.status(200).json(participants);
      return;
    }
    case 'POST': {
      const participants = await fetchParticipants();

      if (participants.some(participant => participant.email === JSON.parse(_req.body).email)) {
        return res.status(400).json({ message: 'Participant already exists' });
      }

      // Create a new participant
      const newParticipant = {
        ...JSON.parse(_req.body),
        participationTime: new Date(),
        isWinner: false
      } as Omit<Participant, 'id'>;

      const newParticipantResponse = await fetch(`${BASE_URL}/participants.json`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newParticipant)
      });

      const newParticipantResult = await newParticipantResponse.json();

      res.status(200).json(newParticipantResult);
      return;
    }
    default:
      res.status(405).json({});
  }
}
