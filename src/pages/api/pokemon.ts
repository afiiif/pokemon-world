import request from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

import { API_ENDPOINT } from '@/api/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  try {
    const document = query.q as string;
    const variables = JSON.parse(query.v as string);
    const data = await request(API_ENDPOINT, document, variables);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))));
  }
}
