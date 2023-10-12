// 14.3 获取当前登录者 Cryptovoxels 地块每日流量统计接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const data = await api.req_cv_parcel_month_traffic_detail(token);

  res.statusCode = 200;

  res.json(data);
};
