import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL } from '@/src/constants';
import { Participant } from '@/src/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ success: boolean }>) {
  switch (req.method) {
    case 'POST':
      const result = await fetch(`${BASE_URL}/participants`);
      const participants = (await result.json()) as Participant[];

      await Promise.all(
        participants.map(({ id }) =>
          fetch(`${BASE_URL}/participants/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          })
        )
      );
      res.status(200).json({ success: true });
      break;
    default:
      res.status(405).end();
  }
}
