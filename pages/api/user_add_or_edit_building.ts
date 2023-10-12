import api from '../../lib/z_api';

export default async (req:any, res:any) => {
    const token = req.headers.authorization;
    const { 
        operationType,
        building_name, 
        platform,
        building_link,
        building_desc,
        building_format,
        files_link_add,
        files_link_cover,
        files_link_del
    } = req.body;
    const data = await api.req_user_add_or_edit_building(
        token, 
        operationType,
        building_name, 
        platform,
        building_link,
        building_desc,
        building_format,
        files_link_add,
        files_link_cover,
        files_link_del
         );

    res.statusCode = 200;

    res.json(data);
};
