import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../util/database'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {    
    const response = await db.query('SELECT NOW()')
    console.log(response);
    res.status(200).json({ name: 'pong' , time: response.rows[0].now })
  } catch (error) {
    console.log(error);
  }
}
