// 12.6 单个更新租赁中 Decentraland 地块为已挂出状态接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_id } = req.body;
  const data = await api.req_dcl_listed(token, parcel_id);

  res.statusCode = 200;

  res.json(data);
};
