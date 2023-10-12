import * as qs from 'qs';

// 设置单个或批量出租

export const req_parcels_rent_out = async (
  token: string,
  parcel_ids: string,
  is_built: string,
  price: string,
  start_at: string,
  end_at: string,
) => {
  const url = '/api/batch_list_cv_parcels';

  const search = qs.stringify(
    {
      parcel_ids,
      is_built,
      price,
      start_at,
      end_at,
    },
    { addQueryPrefix: false },
  );
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 设置批量或单个取消出租

export const req_parcels_cancel = async (token: string, parcel_ids: string) => {
  const search = qs.stringify({ parcel_ids }, { addQueryPrefix: false });
  const url = `/api/batch_cancel_listed_cv_parcels`;
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 设置单个或批量已出租

export const req_parcels_leased = async (token: string, parcel_ids: string) => {
  const search = qs.stringify({ parcel_ids }, { addQueryPrefix: false });
  const url = `/api/batch_lease_listed_cv_parcels`;
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 单个更新CV地块租赁

export const req_parcels_update = async (
  token: string,
  parcel_id: number,
  is_built?: string,
  price?: string,
  start_at?: number,
  end_at?: number,
) => {
  const url = '/api/update_cv_parcel';

  const search = qs.stringify(
    {
      parcel_id,
      is_built,
      price,
      start_at,
      end_at,
    },
    { addQueryPrefix: false },
  );
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 设置单个取消挂出

export const req_parcels_finish = async (token: string, id: number) => {
  const url = '/api/cv_parcel_fallback_to_listed_status';
  const search = qs.stringify({ parcel_id: id }, { addQueryPrefix: false });
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 8.6 获取 Cryptovoxels 岛屿列表接口
export const req_rent_islands = async () => {
  const url = '/api/get_cv_island_list';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 8.8 获取租赁市场 Cryptovoxels 地块列表接口
export const req_rent_cardList = async (
  page: number,
  count: number,
  island_ids: string,
  area_scope: string,
  height_scope: string,
  price_scope: string,
  built_status: string,
  sort_field: string,
  sort_type: string,
) => {
  const search = qs.stringify(
    {
      page,
      count,
      island_ids,
      area_scope,
      height_scope,
      price_scope,
      built_status,
      sort_field,
      sort_type,
    },
    { addQueryPrefix: true },
  );
  const url = `/api/get_listed_cv_parcels${search}`;

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = result.json();

  return json;
};


export const req_building_list = async (addr:string) => {
  const search = qs.stringify(
    {
      addr
    },
    { addQueryPrefix: true },
  );
  const url = `/api/get_owned_building_list${search}`;
  
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    // headers: {
    //   Authorization: token,
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
  });

  const json = await result.json();

  return json;
};

// 12.1 获取当前登录者 Decentraland 地块列表接口

export const req_dcl_parcel_list = async (token: string) => {
  const url = '/api/get_owned_dcl_parcel_list';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const json = await result.json();

  return json;
};

// 12.2 批量（单个）挂出 Decentraland 待租地块接口

export const req_dcl_batch_parcels = async (
  token: string,
  parcel_ids: string,
  is_built: string,
  price: number,
  start_at: number,
  end_at: number,
) => {
  const url = `/api/batch_list_dcl_parcels`;
  const search = qs.stringify(
    {
      parcel_ids,
      is_built,
      price,
      start_at,
      end_at,
    },
    { addQueryPrefix: false },
  );
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 12.3 批量（单个）取消已挂出 Decentraland 地块接口

export const req_dcl_cancel = async (token: string, parcel_ids: string) => {
  const url = `/api/batch_cancel_listed_dcl_parcels`;
  const search = qs.stringify({ parcel_ids });
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 12.4 批量（单个）更新已挂出 Decentraland 地块为租赁中接口

export const req_dcl_leased = async (token: string, parcel_ids: string) => {
  const url = `/api/batch_lease_listed_dcl_parcels`;
  const search = qs.stringify({ parcel_ids });
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 12.5 单个更新 Decentraland 地块租赁信息接口

export const req_dcl_update = async (
  token: string,
  parcel_id: string,
  is_built: string,
  price: number,
  start_at: number,
  end_at: number,
) => {
  const url = `/api/update_dcl_parcel`;
  const search = qs.stringify(
    {
      parcel_id,
      is_built,
      price,
      start_at,
      end_at,
    },
    { addQueryPrefix: false },
  );
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 12.6 单个更新租赁中 Decentraland 地块为已挂出状态接口

export const req_dcl_listed = async (token: string, parcel_id: string) => {
  const url = `/api/dcl_parcel_fallback_to_listed_status`;
  const search = qs.stringify({ parcel_id });
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

// 12.7 获取租赁市场 Decentraland 地块列表接口

export const req_dcl_List = async (
  page: number,
  count: number,
  size_scope: string,
  price_scope: string,
  built_status: string,
  sort_field: string,
  sort_type: string,
) => {
  const search = qs.stringify(
    {
      page,
      count,
      size_scope,
      price_scope,
      built_status,
      sort_field,
      sort_type,
    },
    { addQueryPrefix: true },
  );
  const url = `/api/get_listed_dcl_parcels${search}`;

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

//  6.12 获取 Sandbox 地块成交均价统计信息接口

export const req_sandbox_avg_price_stats = async () => {
  const url = '/api/get_sandbox_parcel_avg_price_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.13 获取 Sandbox 地块成交总数量统计信息接口

export const req_sandbox_sold_total_stats = async () => {
  const url = '/api/get_sandbox_parcel_sold_total_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.14 获取 Sandbox 地块销售总额统计信息接口

export const req_sandbox_sold_sun_stats = async () => {
  const url = '/api/get_sandbox_parcel_sold_sum_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.15 获取 SomniumSpace 地块成交均价统计信息接口

export const req_somniumspace__avg_price_stats = async () => {
  const url = '/api/get_somniumspace_parcel_avg_price_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.16 获取 SomniumSpace 地块成交总数量统计信息接口

export const req_somniumspace_sold_total_stats = async () => {
  const url = '/api/get_somniumspace_parcel_sold_total_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.17 获取 SomniumSpace 地块销售总额统计信息接口

export const req_somniumspace_sold_sum_stats = async () => {
  const url = '/api/get_somniumspace_parcel_sold_sum_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.18 获取 NFTWorlds 地块成交均价统计信息接口

export const req_ntfworlds_avg_price_stats = async () => {
  const url = '/api/get_nftworlds_parcel_avg_price_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.19 获取 NFTWorlds 地块成交总数量统计信息接口

export const req_ntfworlds_sold_total_stats = async () => {
  const url = '/api/get_nftworlds_parcel_sold_total_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.20 获取 NFTWorlds 地块销售总额统计信息接口

export const req_ntfworlds_sold_sum_stats = async () => {
  const url = '/api/get_nftworlds_parcel_sold_sum_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.21 获取 Webb 地块成交均价统计信息接口

export const req_webb_parcel_avg_price_stats = async () => {
  const url = '/api/get_webb_parcel_avg_price_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.22 获取 Webb 地块成交总数量统计信息接口

export const req_webb_sold_total_stats = async () => {
  const url = '/api/get_webb_parcel_sold_total_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.23 获取 Webb 地块销售总额统计信息接口

export const req_webb_sold_sum_stats = async () => {
  const url = '/api/get_webb_parcel_sold_sum_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 14.1 获取当前登录者 Cryptovoxels 地块每日流量总数接口

export const req_cv_parcel_traffic = async (token: string) => {
  const url = '/api/get_cv_parcel_traffic_daily_stats';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 14.2 获取当前登录者 Cryptovoxels 地块每日/每周/每月流量占比接口
export const req_cv_parcel_traffic_daily = async (token: string) => {
  const url = '/api/get_cv_parcel_traffic_percentage';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 14.3 获取当前登录者 Cryptovoxels 地块每日流量统计接口

export const req_cv_parcel_month_traffic_detail = async (token: string) => {
  const url = '/api/get_cv_parcel_traffic_detail';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 14.4 获取当前登录者 Cryptovoxels 地块id 列表接口

export const req_cv_parcel_id_list = async (token: string) => {
  const url = '/api/get_cv_parcel_id_list';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 14.5 获取当前登录者 Cryptovoxels 单个地块一段时间内的每日流量统计接口

export const req_cv_parcel_traffic_list = async (
  token: string,
  parcel_id: number,
  day_total: number,
) => {
  const search = qs.stringify({ parcel_id, day_total }, { addQueryPrefix: true });
  const url = `/api/get_cv_parcel_traffic_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 14.7 获取当前登录者 dece 单个地块一段时间内的每日流量统计接口

export const req_dece_parcel_traffic_list = async (
  token: string,
) => {
  const url = `/api/get_dece_parcel_traffix`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 14.8 获取当前登录者 dece 地块每日/每周/每月流量占比接口
export const req_deceData_parcel_traffic_daily = async (token: string) => {
  const url = '/api/get_deceData_parcel_traffic_per';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 14.9 获取当前登录者 Cryptovoxels 地块每日流量统计接口

export const req_dece_parcel_traffic = async (token: string) => {
  const url = '/api/get_decent_parcel_traffic_daily_stats';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 15.1 获取 Metaverse Learn 文章列表接口

export const req_learn_article_list = async (page: number, count: number, type: string) => {
  const search = qs.stringify({ page, count, type }, { addQueryPrefix: true });
  const url = `/api/get_article_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_learn_others_list = async (page: number, count: number, type: string) => {
  const search = qs.stringify({ page, count, type }, { addQueryPrefix: true });
  const url = `/api/get_others_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 15.2 获取 Metaverse Report 文章列表接口

export const req_learn_report_list = async (page: number, count: number, type: string) => {
  const search = qs.stringify({ page, count, type }, { addQueryPrefix: true });
  const url = `/api/get_metaverse_report_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 16.1 获取六个平台最近一月/季度/年和所有时间销售总额占比

export const req_sales_amount_percent = async () => {
  const url = '/api/get_sales_amount_percent';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 16.2 获取六个平台每 月/季度 平均价

export const req_avg_parcel_price = async () => {
  const url = '/api/get_avg_parcel_price';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_avg_creater_price = async () => {
  // const url = 'http://8.130.23.16/api/v1/get_all_worlds_floor_price';
  const url = 'https://api.metacat.world/api/v1/get_all_worlds_floor_price';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 16.3 获取六个平台每 月/季度/年 各个总量

export const req_sales_amount_stack = async () => {
  const url = '/api/get_sales_amount_stack';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_sales_rent_sum_price = async () => {
  const url = '/api/get_sales_sum_price';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_num_of_rent = async () => {
  const url = '/api/get_sales_num_of_rent';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 16.4 获取MetaIndex和ETH Price

export const req_metaindex_ethprice = async () => {
  const url = '/api/get_metaindex_ethprice';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 16.5 获取六个平台每 月/季度/年 各个销售总量

export const req_all_number_sales = async () => {
  const url = '/api/get_all_number_of_sales';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_user_logout = async (token) => {
  const url = '/api/logout';
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 6.27 获取 otherside 地块成交均价统计信息接口

export const req_otherside_avg_price = async () => {
  const url = '/api/get_otherside_avg_price_stats';
  const result = await fetch(url);

  const json = await result.json();

  return json;
};

// 6.28 获取 otherside 地块成交总数量统计信息接口

export const req_otherside_sales_num = async () => {
  const url = '/api/get_otherside_sales_num';
  const result = await fetch(url);

  const json = await result.json();

  return json;
};

// 6.29 获取 otherside 地块销售总额统计信息接口

export const req_otherside_sales_amount = async () => {
  const url = '/api/get_otherside_sales_amount';
  const result = await fetch(url);
  const json = await result.json();

  return json;
};

export const req_pfp_list = async () => {
  const search = qs.stringify({}, { addQueryPrefix: true });
  const url = `/api/get_pfp_wearable_list${search}`;

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_pfp_detail = async (id: string) => {
  const search = qs.stringify({ id }, { addQueryPrefix: true });
  const url = `/api/get_pfp_wearable_detail${search}`;

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_substrata_level_three = async () => {
  const url = '/api/get_substrata_price_map_level_three';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_substrata_detail = async (tokenId) => {
  const search = qs.stringify({ tokenId }, { addQueryPrefix: true });
  const url = `/api/get_substrata_parcel_detail${search}`;

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.30 获取 netvrk 地块成交均价统计信息接口

export const req_netvrk_avg_price = async () => {
  const url = 'api/get_netvrk_avg_price_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_aavegotchi_avg_price = async () => {
  const url = 'api/get_aavegotchi_avg_price_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_playerone_avg_price = async () => {
  const url = 'api/get_playerone_avg_price_stats';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.31 获取 netvrk 地块成交总数量统计信息接口

export const req_netvrk_sales_num = async () => {
  const url = '/api/get_netvrk_sales_num';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_aavegotchi_sales_num = async () => {
  const url = '/api/get_aavegotchi_sales_num';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_playerone_sales_num = async () => {
  const url = '/api/get_playerone_sales_num';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 6.32 获取 netvrk 地块销售总额统计信息接口

export const req_netvrk_sales_amount = async () => {
  const url = 'api/get_netvrk_sales_amount';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_aavegotchi_sales_amount = async () => {
  const url = 'api/get_aavegotchi_sales_amount';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_playerone_sales_amount = async () => {
  const url = 'api/get_playerone_sales_amount';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// export const req_send_email = async (email: string) => {
//   const url = `api/bind_send_email?email=${email}`
//   const result = await fetch(url, {
//     method: 'get',
//     mode: 'cors',
//   });
//   const json = await result.json();

//   return json;
// }

// 17.1 发送邮箱验证码

export const req_bind_send_email = async (email: string, token: string) => {
  const url = `../api/bind_send_email?email=${email}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 17.2 验证邮箱验证码以及绑定邮箱

export const req_bind_ver_email_code = async (code: string, token: string, join_type = null) => {
  let search = null;
  if (join_type) {
    search = qs.stringify({ code, join_type }, { addQueryPrefix: true });
  } else {
    search = qs.stringify({ code }, { addQueryPrefix: true });
  }
  const url = `../api/bind_ver_email_code${search}`;
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 17.3 更换邮箱之给旧邮箱发送验证码

export const req_modify_send_email = async (token: string) => {
  const url = `../api/modify_send_email`;

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 17.4 更换邮箱之对旧邮箱验证码验证

export const req_modify_old_email_ver_code = async (code: string, token: string) => {
  const search = qs.stringify({ code }, { addQueryPrefix: true });
  const url = `../api/modify_old_email_ver_code${search}`;
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

// 4.4 获取 builders 列表接口

export const req_buid_builders_list = async () => {
  const url = '/api/get_build_builders_list';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

export const req_buid_builders_buildingList = async () => {
  const url = '/api/get_build_builders_buildingList';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 9.7 获取 Wearable creator 数据接口

export const req_wearable_creators = async () => {
  const url = '/api/get_wearable_creators';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 4.2 获取 Topic 详情页信息接口

export const req_topic_detail = async (id: number, creator: string) => {
  let search = null;
  if (id) {
    search = qs.stringify({ id }, { addQueryPrefix: true });
  } else {
    search = qs.stringify({ creator }, { addQueryPrefix: true });
  }
  const url = `/api/get_topic_detail${search}`;

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 4.2 获取 Topic 详情页信息接口

export const req_newBuilding_detail = async (address: string) => {

  const search = qs.stringify({ address }, { addQueryPrefix: true });
  const url = `/api/get_newBuilding_detail${search}`;


  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

//

export const req_cv_top20_parcel = async () => {
  const url = '/api/get_cv_top20_parcel';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_space_buildings_list = async (page: number, count: number, query: string,
  type: string,) => {
  const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
  const url = `/api/get_cv_space_buildings${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_wearable_list = async (page: number, count: number,
  ) => {
  const search = qs.stringify({ page, count }, { addQueryPrefix: true });
  const url = `/api/get_wearable_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_wearableDcl_list = async (page: number, count: number,
  ) => {
  const search = qs.stringify({ page, count }, { addQueryPrefix: true });
  const url = `/api/get_wearableDcl_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_wearableMona_list = async (page: number, count: number,
  ) => {
  const search = qs.stringify({ page, count }, { addQueryPrefix: true });
  const url = `/api/get_wearableMona_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_detailWearableDcl_list = async (contract_address, item_id,
  ) => {
  const search = qs.stringify({ contract_address, item_id, }, { addQueryPrefix: true });
  const url = `/api/get_wearableDclDetail_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_detailWearableMona_list = async (creator_address,wearable_id,
  ) => {
  const search = qs.stringify({creator_address,  wearable_id, }, { addQueryPrefix: true });
  const url = `/api/get_wearableMonaDetail_list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_scence_list = async (page: number, count: number, query: string,
  type: string,) => {
  const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
  const url = `/api/get_dece_sence${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_space_list = async (page: number, count: number) => {
  const search = qs.stringify({ page, count }, { addQueryPrefix: true });
  const url = `/api/cs-space-list${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_dcl_top20_parcel = async () => {
  const url = '/api/get_dcl_top20_parcel';

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  const json = await result.json();

  return json;
};

// 7.9 申请成为 creator

export const req_user_apply_become = async (join_type: string, token: string) => {
  const search = qs.stringify({ join_type }, { addQueryPrefix: true });
  const url = `/api/user_apply_become${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

export const req_userBuilder_apply_become = async (token: string,join_type: string, representative_links: string ) => {
  
  const search = qs.stringify({ join_type, representative_links } ,{ addQueryPrefix: false });
  
  const url = `api/user_userBuilder_become`;
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};


export const req_user_add_or_edit_building = async ( token: string,
    operationType:string,
    building_name: string, 
    platform:string,
    building_link:string,
    building_desc:string,
    building_format:string,
    files_link_add:string,
    files_link_cover:string,
    files_link_del:string,
  )=> {
  
  const search = qs.stringify({   
    operationType,
    building_name, 
    platform,
    building_link,
    building_desc,
    building_format,
    files_link_add,
    files_link_cover,
    files_link_del} ,{ addQueryPrefix: false });
  
  const url = `api/user_add_or_edit_building`;
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

export const req_get_building_detail_info = async ( building_link)=> {
  
  const search = qs.stringify({   
    building_link:building_link
  } ,{ addQueryPrefix: true });
  
  const url = `api/user_building_detail_info${search}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });
  
  const json = await result.json();

  return json;
};


export const req_get_user_wearable = async (token: string) => {
  const url = '/api/get_user_wearable';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await result.json();

  return json;
};

export const req_set_wearable_show_status = async (
  token: string,
  wearable_id: string,
  show_status: number,
) => {
  const search = qs.stringify({ wearable_id, show_status }, { addQueryPrefix: false });
  const url = '/api/set_wearable_show_status';
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};

export const req_get_wearable_detail = async (id) => {
  const search = qs.stringify({ wearable_id: id }, { addQueryPrefix: true });
  const url = `/api/get_wearable_detail${search}`;

  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_all_country = async () => {
  const url = '/api/get_all_country';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};
export const req_platform = async () => {
  const url = '/api/get_platform';
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
  });

  const json = await result.json();

  return json;
};

export const req_builder_del_self_building = async (token: string,building_link: string) => {
  const search = qs.stringify({  building_link }, { addQueryPrefix: false });
  const url = `/api/builder_del_self_building`;
  const result = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await result.json();

  return json;
};
