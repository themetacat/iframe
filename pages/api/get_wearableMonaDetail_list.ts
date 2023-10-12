import api from '../../lib/z_api';

export default async (req:any, res:any) => {
 
  const { creator_address, wearable_id,} = req.query;
  const data = await api.req_detailWearableMona_list( creator_address,wearable_id,);
  res.statusCode = 200;

  res.json(data);
};
