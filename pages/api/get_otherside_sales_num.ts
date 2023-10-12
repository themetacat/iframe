// 6.28 获取 otherside 地块成交总数量统计信息接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_otherside_sales_num();

  res.statusCode = 200;

  res.json(data);
};
