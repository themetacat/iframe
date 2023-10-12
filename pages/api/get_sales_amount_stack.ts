// 16.3 获取六个平台每 月/季度/年 各个总量

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_sales_amount_stack();

  res.statusCode = 200;

  res.json(data);
};
