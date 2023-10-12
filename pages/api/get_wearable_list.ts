import api from '../../lib/z_api';

export default async (req:any, res:any) => {
 
  const { page, count} = req.query;
  const data = await api.req_wearable_list(page, count);
  res.statusCode = 200;

  res.json(data);
};
