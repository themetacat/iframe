// 8.8 获取租赁市场 Cryptovoxels 地块列表接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const {
    page,
    count,
    island_ids,
    area_scope,
    height_scope,
    price_scope,
    built_status,
    sort_field,
    sort_type,
  } = req.body;

  const data = await api.req_rent_cardList(
    page,
    count,
    island_ids,
    area_scope,
    height_scope,
    price_scope,
    built_status,
    sort_field,
    sort_type,
  );

  res.statusCode = 200;

  res.json(data);
};
