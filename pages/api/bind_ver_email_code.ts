// 17.2 验证邮箱验证码以及绑定邮箱
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const { code, join_type } = req.query;
  const token = req.headers.authorization;
  const data = await api.req_bind_ver_email_code(code, token, join_type);

  res.statusCode = 200;

  res.json(data);
};
