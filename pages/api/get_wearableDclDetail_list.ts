import api from '../../lib/z_api';

export default async (req:any, res:any) => {
 
  const { contract_address, item_id,} = req.query;
  const data = await api.req_detailWearableDcl_list(contract_address, item_id,);
  res.statusCode = 200;

  res.json(data);
};
