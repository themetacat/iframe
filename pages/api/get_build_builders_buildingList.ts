// 4.4 获取 builders 列表接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_buid_builders_buildingList();

  res.statusCode = 200;

  res.json(data);
};
