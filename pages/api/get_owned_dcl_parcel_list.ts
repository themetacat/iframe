// 12.1 获取当前登录者 Decentraland 地块列表接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const data = await api.req_dcl_parcel_list(token);

  res.statusCode = 200;

  res.json(data);
};
