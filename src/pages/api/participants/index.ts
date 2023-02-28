import type { NextApiRequest, NextApiResponse } from 'next';
import { Participant } from '@/src/types';

export const BASE_URL = 'https://retoolapi.dev/Le1f7y';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Participant[]>) {
  if (_req.method === 'GET') {
    const result = await fetch(`${BASE_URL}/participants`);
    const participants = ((await result.json()) as Participant[]).filter(({ name }) => name);

    res.status(200).json(participants);
    return;
  } else if (_req.method === 'POST') {
    const result = await fetch(`${BASE_URL}/participants`, {
      method: 'POST',
      body: JSON.stringify(_req.body)
    });
    const newParticipantResult = await result.json();

    res.status(200).json(newParticipantResult);
    return;
  }
}
