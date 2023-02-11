import type { NextApiRequest, NextApiResponse } from 'next';
import { Participant } from '@/types';

const BASE_URL = 'https://retoolapi.dev/Le1f7y';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Participant[]>) {
  if (_req.method === 'GET') {
    const result = await fetch(`${BASE_URL}/participants`);
    const participants = await result.json();

    res.status(200).json(participants);
    return;
  } else if (_req.method === 'POST') {
    // TODO perform the request in order to generate a new participant
  }
}
