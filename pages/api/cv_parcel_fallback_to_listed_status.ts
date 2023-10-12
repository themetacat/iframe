// 设置单个或批量已出租

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_id } = req.body;
  const data = await api.req_parcels_finish(token, parcel_id);

  res.statusCode = 200;

  res.json(data);
};
