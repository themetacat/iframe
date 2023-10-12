// 6.18 获取 NFTWorlds 地块成交均价统计信息接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_ntfworlds_avg_price_stats();

  res.statusCode = 200;

  res.json(data);
};
