// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '../../lib/api';

export default async (req:any, res:any) => {
  const { nickName, twitterName, websiteUrl, avatar, introduction, country } = req.body;
  const token = req.headers.authorization;
  const data = await api.updateBaseInfo(
    token,
    nickName,
    twitterName,
    websiteUrl,
    avatar,
    introduction,
    country,
  );

  res.statusCode = 200;

  res.json(data);
};
