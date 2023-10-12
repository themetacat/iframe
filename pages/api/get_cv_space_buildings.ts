import api from '../../lib/z_api';

export default async (req:any, res:any) => {
 
  const { page, count, query, type } = req.query;
  const data = await api.req_space_buildings_list(page, count, query, type);
  res.statusCode = 200;

  res.json(data);
};
