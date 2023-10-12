// 16.4 获取MetaIndex和ETH Price
import api from '../../lib/z_api';

export default async (req:any, res:any) => {
  const data = await api.req_metaindex_ethprice();

  res.statusCode = 200;

  res.json(data);
};
