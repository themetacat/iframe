// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '../../lib/api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const costume = req.headers;
  // const { tokenId} = res.body;
  // console.log(res,7777);
  // const costume = req.body.costume;
  const data = await api.setModelInfo(token,req.body.costume);

  res.statusCode = 200;

  res.json(data);
};




