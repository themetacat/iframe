// 16.2 获取六个平台每 月/季度 平均价

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_avg_parcel_price();

  res.statusCode = 200;

  res.json(data);
};
