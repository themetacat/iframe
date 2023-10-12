// 16.5 获取六个平台每 月/季度/年 各个销售总量
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_all_number_sales();

  res.statusCode = 200;

  res.json(data);
};
