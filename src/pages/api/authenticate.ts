import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { password } = JSON.parse(req.body);

      if (password === '54321') {
        res.status(200).json({});
      } else {
        res.status(401).json({});
      }

      break;
    default:
      res.status(405).json({});
  }
}
