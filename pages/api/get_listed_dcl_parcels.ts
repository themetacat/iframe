// 12.7 获取租赁市场 Decentraland 地块列表接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const { page, count, size_scope, price_scope, built_status, sort_field, sort_type } = req.body;
  const data = await api.req_dcl_List(
    page,
    count,
    size_scope,
    price_scope,
    built_status,
    sort_field,
    sort_type,
  );

  res.statusCode = 200;

  res.json(data);
};
