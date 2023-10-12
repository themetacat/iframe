// 14.4 获取当前登录者 Cryptovoxels 地块id 列表接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const data = await api.req_cv_parcel_id_list(token);

  res.statusCode = 200;

  res.json(data);
};
