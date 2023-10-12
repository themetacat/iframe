// 9.7 获取 Wearable creator 数据接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_wearable_creators();

  res.statusCode = 200;

  res.json(data);
};
