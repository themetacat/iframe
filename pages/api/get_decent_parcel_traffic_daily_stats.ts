// 14.1 获取当前登录者 Cryptovoxels 地块每日流量总数接口
import api from '../../lib/z_api';
// import api from '../../lib/test';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const data = await api.req_dece_parcel_traffic(token);

  res.statusCode = 200;

  res.json(data);
};
