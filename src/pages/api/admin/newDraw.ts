import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL } from '@/src/constants';
import { fetchParticipants } from '@/src/pages/api/participants';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ success: boolean } | {}>) {
  switch (req.method) {
    case 'POST':
      const participants = await fetchParticipants();

      await Promise.all(
        participants.map(({ id }) =>
          fetch(`${BASE_URL}/participants/${id}.json`, {
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
      res.status(405).json({});
  }
}
