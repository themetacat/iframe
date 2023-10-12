// 9.7 获取 Wearable creator 数据接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const { id, creator} = req.query;
  const data = await api.req_topic_detail(id, creator);

  res.statusCode = 200;

  res.json(data);
};
