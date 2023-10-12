import api from '../../lib/api';

export default async (req:any, res:any) => {
  const { tokenId } = req.query;
  const data = await api.getOtherSideParcelDetail(tokenId);

  res.statusCode = 200;

  res.json(data);
};
