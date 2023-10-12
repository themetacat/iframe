// 12.2 批量（单个）挂出 Decentraland 待租地块接口

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_ids, is_built, price, start_at, end_at } = req.body;
  const data = await api.req_dcl_batch_parcels(
    token,
    parcel_ids,
    is_built,
    price,
    start_at,
    end_at,
  );

  res.statusCode = 200;

  res.json(data);
};
