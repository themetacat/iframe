// 6.17 获取 SomniumSpace 地块销售总额统计信息接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_somniumspace_sold_sum_stats();

  res.statusCode = 200;

  res.json(data);
};
