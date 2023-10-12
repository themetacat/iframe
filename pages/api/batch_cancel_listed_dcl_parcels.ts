// 12.3 批量（单个）取消已挂出 Decentraland 地块接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_ids } = req.body;
  const data = await api.req_dcl_cancel(token, parcel_ids);

  res.statusCode = 200;

  res.json(data);
};
