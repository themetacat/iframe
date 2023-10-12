import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const { wearable_id } = req.query;
  const data = await api.req_get_wearable_detail(wearable_id);

  res.statusCode = 200;

  res.json(data);
};
