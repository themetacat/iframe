// 14.2 获取当前登录者 Cryptovoxels 地块每日/每周/每月流量占比接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const data = await api.req_cv_parcel_traffic_daily(token);

  res.statusCode = 200;

  res.json(data);
};
