import request from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

import { API_ENDPOINT } from '@/constants/pokemon';

const cache = new Map();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  try {
    const document = query.q as string;
    const variables = JSON.parse(query.v as string);

    const cachedResponse = cache.get(`${document}#${query.v}`);
    if (cachedResponse) {
      res.status(200).json(cachedResponse);
      return;
    }

    const data = await request(API_ENDPOINT, document, variables);
    cache.set(`${document}#${query.v}`, data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))));
  }
}
