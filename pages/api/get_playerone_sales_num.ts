// 6.31 获取 netvrk 地块成交总数量统计信息接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_playerone_sales_num();

  res.statusCode = 200;

  res.json(data);
};
