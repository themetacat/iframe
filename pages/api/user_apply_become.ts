// 7.9 申请成为 creator
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const { join_type } = req.query;
  const token = req.headers.authorization;
  const data = await api.req_user_apply_become(join_type, token);

  res.statusCode = 200;

  res.json(data);
};
