import api from '../../lib/api';

export default async (req:any, res:any) => {
  const data = await api.getSomniumSpacePriceMapLevelThreeData();

  res.statusCode = 200;

  res.json(data);
};
