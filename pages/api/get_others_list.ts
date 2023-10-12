// 15.1 获取 Metaverse Learn 文章列表接口
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const { page, count, type } = req.query;
  const data = await api.req_learn_others_list(page, count, type);

  res.statusCode = 200;

  res.json(data);
};
