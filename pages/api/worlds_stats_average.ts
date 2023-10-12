import api from '../../lib/api';

export default async (req:any, res:any) => {
  const data = await api.getWorldsAverageSale();

  res.statusCode = 200;

  res.json(data);
};
