// 16.1 获取六个平台最近一月/季度/年和所有时间销售总额占比

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_sales_amount_percent();

  res.statusCode = 200;

  res.json(data);
};
