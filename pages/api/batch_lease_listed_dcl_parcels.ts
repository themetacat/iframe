// 12.4 批量（单个）更新已挂出 Decentraland 地块为租赁中接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_ids } = req.body;
  const data = await api.req_dcl_leased(token, parcel_ids);

  res.statusCode = 200;

  res.json(data);
};
