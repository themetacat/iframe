import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const token = req.headers.authorization;
  const { join_type, representative_links } = req.body;
  const data = await api.req_userBuilder_apply_become(token, join_type, representative_links);

  res.statusCode = 200;

  res.json(data);
};
