// 设置单个或批量已出租

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_ids } = req.body;
  const data = await api.req_parcels_leased(token, parcel_ids);

  res.statusCode = 200;

  res.json(data);
};
