// 6.27 获取 otherside 地块成交均价统计信息接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_otherside_avg_price();

  res.statusCode = 200;

  res.json(data);
};
