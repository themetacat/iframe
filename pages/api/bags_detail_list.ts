// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '../../lib/api';

export default async (req:any, res:any) => {
  const { cursor, count ,TBAAddress} = req.query;
  const data = await api.getBagsDetail(TBAAddress);
  res.statusCode = 200;

  res.json(data);
};
