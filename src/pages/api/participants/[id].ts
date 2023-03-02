import { NextApiRequest, NextApiResponse } from 'next';
import { Participant } from '@/src/types';
import { BASE_URL } from '@/src/constants';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Participant[] | {}>) {
  switch (_req.method) {
    case 'DELETE':
      const { id } = _req.query;
      const removeParticipantResponse = await fetch(`${BASE_URL}/participants/${id}.json`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      const removeParticipantRes = await removeParticipantResponse.json();

      res.status(200).json(removeParticipantRes);
      return;
    default:
      res.status(405).json({});
  }
}
