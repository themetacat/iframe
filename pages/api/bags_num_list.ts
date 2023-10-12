// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '../../lib/api';

export default async (req:any, res:any) => {
  const { tokenId} = req.query;
  
  const data = await api.getBagsNum(req.query.tokenId);

  res.statusCode = 200;

  res.json(data);
};
