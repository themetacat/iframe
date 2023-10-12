// 17.3 更换邮箱之给旧邮箱发送验证码
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const { code } = req.query;
  const token = req.headers.authorization;
  const data = await api.req_modify_old_email_ver_code(code, token);

  res.statusCode = 200;

  res.json(data);
};
