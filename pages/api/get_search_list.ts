// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import api from '../../lib/api';
import api from '../../lib/test';

export default async (req:any, res:any) => {
  const {query,page,per_page,search_item,} = req.query;
  const data = await api.getSearchDetail(query,page,per_page,search_item,);
  

  res.statusCode = 200;

  res.json(data);
};
