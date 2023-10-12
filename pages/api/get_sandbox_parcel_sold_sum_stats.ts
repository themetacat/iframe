// 6.14 获取 Sandbox 地块销售总额统计信息接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_sandbox_sold_sun_stats();

  res.statusCode = 200;

  res.json(data);
};
