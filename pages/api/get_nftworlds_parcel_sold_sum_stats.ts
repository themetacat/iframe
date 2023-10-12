// 6.20 获取 NFTWorlds 地块销售总额统计信息接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_ntfworlds_sold_sum_stats();

  res.statusCode = 200;

  res.json(data);
};
