import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_all_country();

  res.statusCode = 200;

  res.json(data);
};
