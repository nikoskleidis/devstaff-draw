import type { NextApiRequest, NextApiResponse } from 'next';
import { Participant } from '@/src/types';
import { BASE_URL } from '@/src/constants';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Participant[] | {}>) {
  switch (_req.method) {
    case 'GET':
      // Retrieve all the participants
      const participantsResponse = await fetch(`${BASE_URL}/participants`);
      const participants = (await participantsResponse.json()) as Participant[];

      res.status(200).json(participants);
      return;
    case 'POST':
      // Create a new participant
      const newParticipant = {
        ...JSON.parse(_req.body),
        participationTime: new Date(),
        isWinner: false
      } as Omit<Participant, 'id'>;

      const newParticipantResponse = await fetch(`${BASE_URL}/participants`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newParticipant)
      });

      const newParticipantResult = await newParticipantResponse.json();

      res.status(200).json(newParticipantResult);
      return;
    default:
      res.status(405).json({});
  }
}
