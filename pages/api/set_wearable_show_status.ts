import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { wearable_id, show_status } = req.body;
  const data = await api.req_set_wearable_show_status(token, wearable_id, show_status);

  res.statusCode = 200;

  res.json(data);
};
