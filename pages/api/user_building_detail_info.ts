import api from '../../lib/z_api';

export default async (req:any, res:any) => {
    // const token = req.headers.authorization;
    const {building_link} = req.query;
    const data = await api.req_get_building_detail_info(building_link);

    res.statusCode = 200;

    res.json(data);
};





  