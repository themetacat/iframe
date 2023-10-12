import api from '../../lib/z_api';

export default async (req:any, res:any) => {
    const token = req.headers.authorization;
    const { 
      
        building_link,
     
    } = req.body;
    const data = await api.req_builder_del_self_building(
        token, 
        building_link,
         );

    res.statusCode = 200;

    res.json(data);
};
