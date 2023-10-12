// 设置批量或单个取消出租

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_ids } = req.body;
  const data = await api.req_parcels_cancel(token, parcel_ids);

  res.statusCode = 200;

  res.json(data);
};
