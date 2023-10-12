// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '../../lib/api';

export default async (req:any, res:any) => {
  const { address, signature } = req.body;
  const data = await api.loginSignature(address, signature);

  res.statusCode = 200;

  res.json(data);
};
