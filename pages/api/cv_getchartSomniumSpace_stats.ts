import api from '../../lib/api';

export default async (req:any, res:any) => {
const { world} = req.query;
const data = await api.getchartSomniumSpace(world);
  res.statusCode = 200;
  res.json(data); 
};
