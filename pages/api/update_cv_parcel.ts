// 设置单个或批量出租

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_id, is_built, price, start_at, end_at } = req.body;
  const data = await api.req_parcels_update(token, parcel_id, is_built, price, start_at, end_at);

  res.statusCode = 200;

  res.json(data);
};
