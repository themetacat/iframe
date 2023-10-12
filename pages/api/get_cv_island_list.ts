// 8.6 获取 Cryptovoxels 岛屿列表接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_rent_islands();

  res.statusCode = 200;

  res.json(data);
};
