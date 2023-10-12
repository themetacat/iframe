// **7.3 用户登出接口 **

import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const data = await api.req_user_logout(token);

  res.statusCode = 200;

  res.json(data);
};
