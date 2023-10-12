// 6.15 获取 SomniumSpace 地块成交均价统计信息接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_somniumspace__avg_price_stats();

  res.statusCode = 200;

  res.json(data);
};
