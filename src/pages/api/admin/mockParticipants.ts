import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL } from '@/src/constants';
import { Participant } from '@/src/types';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const randomMS = (min = 0, max = 1500) => Math.floor(Math.random() * (max - min)) + min;

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ success: boolean } | {}>) {
  switch (req.method) {
    case 'POST':
      // Create a new participant
      const mockedParticipants = Array.from(Array(50).keys()).map(
        (i): Omit<Participant, 'id'> => ({
          name: `test ${i} name`,
          email: `test${i}@devstaff.gr`,
          participationTime: new Date().toISOString(),
          isWinner: false
        })
      );

      for (const participant of mockedParticipants) {
        await fetch(`${BASE_URL}/participants.json`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({ ...participant, participationTime: new Date().toISOString() })
        });
        await sleep(randomMS());
      }

      res.status(200).json({ success: true });
      break;
    default:
      res.status(405).json({});
  }
}
