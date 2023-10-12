// 14.5 获取当前登录者 Cryptovoxels 单个地块一段时间内的每日流量统计接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { parcel_id, day_total } = req.query;

  const data = await api.req_cv_parcel_traffic_list(token, parcel_id, day_total);

  res.statusCode = 200;

  res.json(data);
};
