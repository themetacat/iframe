// 6.19 获取 NFTWorlds 地块成交总数量统计信息接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_ntfworlds_sold_total_stats();

  res.statusCode = 200;

  res.json(data);
};
