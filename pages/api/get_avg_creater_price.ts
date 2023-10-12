import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_avg_creater_price();

  res.statusCode = 200;

  res.json(data);
};
