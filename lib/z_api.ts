import * as qs from 'qs';

class API {
  private url: string;

  private key?: string;

  constructor(url: string, key?: string) {
    // this.url = 'http://8.130.23.16/api/v1';
    this.url = url;
    this.key = key;
  }

  public async req_scence_list(page: number, count: number, query: string,
    type: string,) {
    const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
    const url = `${this.url}/get_dcl_scenes${search}`;
    // const url = `http://8.130.23.16/api/v1/get_dcl_scenes${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  // 设置单个或批量出租

  public async req_parcels_rent_out(
    token: string,
    parcel_ids: string,
    is_built: string,
    price: string,
    start_at: number,
    end_at: number,
  ): Promise<any> {
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
    const url = `${this.url}/rent/batch_list_cv_parcels`;
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
  }

  // 设置批量或单个取消出租

  public async req_parcels_cancel(token: string, parcel_ids: string): Promise<any> {
    const search = qs.stringify({ parcel_ids }, { addQueryPrefix: false });
    const url = `${this.url}/rent/batch_cancel_listed_cv_parcels`;
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
  }

  // 设置单个或批量已出租

  public async req_parcels_leased(token: string, parcel_ids: string): Promise<any> {
    const search = qs.stringify({ parcel_ids }, { addQueryPrefix: false });
    const url = `${this.url}/rent/batch_lease_listed_cv_parcels`;
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
  }

  // 单个更新CV地块租赁

  public async req_parcels_update(
    token: string,
    parcel_id: number,
    is_built?: string,
    price?: string,
    start_at?: number,
    end_at?: number,
  ): Promise<any> {
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
    const url = `${this.url}/rent/update_cv_parcel`;
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
  }

  // 取消挂出
  public async req_parcels_finish(token: string, id: number): Promise<any> {
    const search = qs.stringify({ parcel_id: id }, { addQueryPrefix: false });
    const url = `${this.url}/rent/cv_parcel_fallback_to_listed_status`;
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
  }

  // 获取Cryptovoxels岛屿列表接口
  public async req_rent_islands(): Promise<any> {
    const url = `${this.url}/rent/get_cv_island_list`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 8.8 获取租赁市场 Cryptovoxels 地块列表接口
  public async req_rent_cardList(
    page: number,
    count: number,
    island_ids: string,
    area_scope: string,
    height_scope: string,
    price_scope: string,
    built_status: string,
    sort_field: string,
    sort_type: string,
  ): Promise<any> {
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
    const url = `${this.url}/rent/get_listed_cv_parcels${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_building_list(addr: string): Promise<any> {
    const search = qs.stringify(
      {
        addr
      },
      { addQueryPrefix: true },
    );
    const url = `${this.url}/building/get_builder_buildings${search}`;


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
  }

  // 12.1 获取当前登录者 Decentraland 地块列表接口

  public async req_dcl_parcel_list(token: string): Promise<any> {
    const url = `${this.url}/rent/get_owned_dcl_parcel_list`;
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
  }

  // 12.2 批量（单个）挂出 Decentraland 待租地块接口

  public async req_dcl_batch_parcels(
    token: string,
    parcel_ids: string,
    is_built: string,
    price: number,
    start_at: number,
    end_at: number,
  ): Promise<any> {
    const url = `${this.url}/rent/batch_list_dcl_parcels`;
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
  }

  // 12.3 批量（单个）取消已挂出 Decentraland 地块接口

  public async req_dcl_cancel(token: string, parcel_ids: string): Promise<any> {
    const url = `${this.url}/rent/batch_cancel_listed_dcl_parcels`;
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
  }

  // 12.4 批量（单个）更新已挂出 Decentraland 地块为租赁中接口

  public async req_dcl_leased(token: string, parcel_ids: string): Promise<any> {
    const url = `${this.url}/rent/batch_lease_listed_dcl_parcels`;
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
  }

  // 12.5 单个更新 Decentraland 地块租赁信息接口

  public async req_dcl_update(
    token: string,
    parcel_id: string,
    is_built: string,
    price: number,
    start_at: number,
    end_at: number,
  ): Promise<any> {
    const url = `${this.url}/rent/update_dcl_parcel`;
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
  }

  // 12.6 单个更新租赁中 Decentraland 地块为已挂出状态接口

  public async req_dcl_listed(token: string, parcel_id: string): Promise<any> {
    const url = `${this.url}/rent/dcl_parcel_fallback_to_listed_status`;
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
  }

  // 12.7 获取租赁市场 Decentraland 地块列表接口

  public async req_dcl_List(
    page: number,
    count: number,
    size_scope: string,
    price_scope: string,
    built_status: string,
    sort_field: string,
    sort_type: string,
  ): Promise<any> {
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
    const url = `${this.url}/rent/get_listed_dcl_parcels${search}`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.12 获取 Sandbox 地块成交均价统计信息接口

  public async req_sandbox_avg_price_stats(): Promise<any> {
    const url = `${this.url}/get_sandbox_parcel_avg_price_stats`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.13 获取 Sandbox 地块成交总数量统计信息接口

  public async req_sandbox_sold_total_stats(): Promise<any> {
    const url = `${this.url}/get_sandbox_parcel_sold_total_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.14 获取 Sandbox 地块销售总额统计信息接口

  public async req_sandbox_sold_sun_stats(): Promise<any> {
    const url = `${this.url}/get_sandbox_parcel_sold_sum_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.15 获取 SomniumSpace 地块成交均价统计信息接口

  public async req_somniumspace__avg_price_stats(): Promise<any> {
    const url = `${this.url}/get_somniumspace_parcel_avg_price_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.16 获取 SomniumSpace 地块成交总数量统计信息接口

  public async req_somniumspace_sold_total_stats(): Promise<any> {
    const url = `${this.url}/get_somniumspace_parcel_sold_total_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.17 获取 SomniumSpace 地块销售总额统计信息接口

  public async req_somniumspace_sold_sum_stats(): Promise<any> {
    const url = `${this.url}/get_somniumspace_parcel_sold_sum_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.18 获取 NFTWorlds 地块成交均价统计信息接口

  public async req_ntfworlds_avg_price_stats(): Promise<any> {
    const url = `${this.url}/get_nftworlds_parcel_avg_price_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.19 获取 NFTWorlds 地块成交总数量统计信息接口

  public async req_ntfworlds_sold_total_stats(): Promise<any> {
    const url = `${this.url}/get_nftworlds_parcel_sold_total_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.20 获取 NFTWorlds 地块销售总额统计信息接口

  public async req_ntfworlds_sold_sum_stats(): Promise<any> {
    const url = `${this.url}/get_nftworlds_parcel_sold_sum_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.21 获取 Webb 地块成交均价统计信息接口

  public async req_webb_parcel_avg_price_stats(): Promise<any> {
    const url = `${this.url}/get_webb_parcel_avg_price_stats`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.22 获取 Webb 地块成交总数量统计信息接口

  public async req_webb_sold_total_stats(): Promise<any> {
    const url = `${this.url}/get_webb_parcel_sold_total_stats`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.23 获取 Webb 地块销售总额统计信息接口

  public async req_webb_sold_sum_stats(): Promise<any> {
    const url = `${this.url}/get_webb_parcel_sold_sum_stats`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 14.1 获取当前登录者 Cryptovoxels 地块每日流量总数接口

  public async req_cv_parcel_traffic(token: string): Promise<any> {
    const url = `${this.url}/user/get_cv_parcel_traffic_daily_stats`;
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
  }

  // 14.2 获取当前登录者 Cryptovoxels 地块每日/每周/每月流量占比接口

  public async req_cv_parcel_traffic_daily(token): Promise<any> {
    const url = `${this.url}/user/get_cv_parcel_traffic_percentage`;
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
  }

  // 14.3 获取当前登录者 Cryptovoxels 地块每日流量统计接口

  public async req_cv_parcel_month_traffic_detail(token: string): Promise<any> {
    const url = `${this.url}/user/get_cv_parcel_traffic_detail`;
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
  }

  // 14.4 获取当前登录者 Cryptovoxels 地块id 列表接口

  public async req_cv_parcel_id_list(token: string): Promise<any> {
    const url = `${this.url}/user/get_cv_parcel_id_list`;
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
  }

  // 14.5 获取当前登录者 Cryptovoxels 单个地块一段时间内的每日流量统计接口

  public async req_cv_parcel_traffic_list(
    token: string,
    parcel_id: number,
    day_total: number,
  ): Promise<any> {
    const search = qs.stringify({ parcel_id, day_total }, { addQueryPrefix: true });
    const url = `${this.url}/user/get_cv_parcel_traffic_list${search}`;
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
  }

  // 14.7 获取当前登录者 dece 单个地块一段时间内的每日流量统计接口

  public async req_dece_parcel_traffic_list(
    token: string,
  ): Promise<any> {
    const url = `${this.url}/user/get_dcl_parcel_traffic_detail_info`;
   
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
  }

  // 14.8 获取当前登录者 dece 地块每日/每周/每月流量占比接口

  public async req_deceData_parcel_traffic_daily(token): Promise<any> {
    const url = `${this.url}/user/get_dcl_parcel_traffic_percentage`;
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
  }

  // 14.9  获取当前登录者 dece 地块每日流量总数接口

  public async req_dece_parcel_traffic(token: string): Promise<any> {
    const url = `${this.url}/user/get_dcl_parcel_traffic_daily_stats`;
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
  }

  // 15.1 获取 Metaverse Learn 文章列表接口

  public async req_learn_article_list(page: number, count: number, type: string): Promise<any> {
    const search = qs.stringify({ page, count, type }, { addQueryPrefix: true });
    const url = `${this.url}/learn/get_article_list${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_learn_others_list(page: number, count: number, type: string): Promise<any> {
    const search = qs.stringify({ page, count, type }, { addQueryPrefix: true });
    const url = `${this.url}/learn/get_others_list${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 15.2 获取 Metaverse Report 文章列表接口

  public async req_learn_report_list(page: number, count: number, type: string): Promise<any> {
    const search = qs.stringify({ page, count, type }, { addQueryPrefix: true });
    const url = `${this.url}/learn/get_metaverse_report_list${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 16.1 获取六个平台最近一月/季度/年和所有时间销售总额占比

  public async req_sales_amount_percent() {
    const url = `${this.url}/analytics/get_sales_amount_percent`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 16.2 获取六个平台每 月/季度 平均价

  public async req_avg_parcel_price() {
    const url = `${this.url}/analytics/get_avg_parcel_price`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_avg_creater_price() {
    const url = `${this.url}/get_all_worlds_floor_price`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 16.3 获取六个平台每 月/季度/年 各个总量

  public async req_sales_amount_stack() {
    const url = `${this.url}/analytics/get_sales_amount_stack`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_sales_rent_sum_price() {
    const url = `${this.url}/analytics/rent_sum_price`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_num_of_rent() {
    const url = `${this.url}/analytics/num_of_rent`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 16.4 获取MetaIndex和ETH Price

  public async req_metaindex_ethprice() {
    const url = `${this.url}/analytics/get_metaindex_ethprice`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 16.5 获取六个平台每 月/季度/年 各个销售总量

  public async req_all_number_sales() {
    const url = `${this.url}/analytics/get_all_number_of_sales`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // **7.3 用户登出接口 **

  public async req_user_logout(token) {
    const url = `${this.url}/user/logout`;
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
  }

  // 6.27 获取 otherside 地块成交均价统计信息接口

  public async req_otherside_avg_price() {
    const url = `${this.url}/get_otherside_avg_price_stats`;
    const result = await fetch(url);

    const json = await result.json();

    return json;
  }

  // 6.28 获取 otherside 地块成交总数量统计信息接口

  public async req_otherside_sales_num() {
    const url = `${this.url}/get_otherside_sales_num`;
    const result = await fetch(url);

    const json = await result.json();

    return json;
  }

  // 6.29 获取 otherside 地块销售总额统计信息接口

  public async req_otherside_sales_amount() {
    const url = `${this.url}/get_otherside_sales_amount`;

    const result = await fetch(url);

    const json = await result.json();

    return json;
  }

  public async req_pfp_list() {
    const search = qs.stringify({}, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_pfp_wearable_list${search}`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_pfp_detail(id: string) {
    const search = qs.stringify({ id }, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_pfp_wearable_detail${search}`;

    // const url1 = `http://8.130.23.16/api/v1/wearable/get_pfp_wearable_detail${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_substrata_level_three() {
    const url = `${this.url}/get_substrata_price_map_level_three`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_substrata_detail(tokenId: string) {
    const search = qs.stringify({ token_id: tokenId }, { addQueryPrefix: true });
    const url = `${this.url}/get_substrata_parcel_detail${search}`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.30 获取 netvrk 地块成交均价统计信息接口

  public async req_netvrk_avg_price() {
    const url = `${this.url}/get_netvrk_avg_price_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_aavegotchi_avg_price() {
    const url = `${this.url}/get_aavegotchi_avg_price_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_playerone_avg_price() {
    const url = `${this.url}/get_playerone_avg_price_stats`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.31 获取 netvrk 地块成交总数量统计信息接口

  public async req_netvrk_sales_num() {
    const url = `${this.url}/get_netvrk_sales_num`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_playerone_sales_num() {
    const url = `${this.url}/get_playerone_sales_num`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_aavegotchi_sales_num() {
    const url = `${this.url}/get_aavegotchi_sales_num`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 6.32 获取 netvrk 地块销售总额统计信息接口

  public async req_netvrk_sales_amount() {
    const url = `${this.url}/get_netvrk_sales_amount`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }
  
  public async req_aavegotchi_sales_amount() {
    const url = `${this.url}/get_aavegotchi_sales_amount`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }
  
  public async req_playerone_sales_amount() {
    const url = `${this.url}/get_playerone_sales_amount`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 17.1 发送邮箱验证码

  public async req_bind_send_email(email: string, token: string) {
    // const url = `http://8.130.23.16/api/v1/bind_send_email?email=${email}`;
    const url = `${this.url}/bind_send_email?email=${email}`;
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
  }

  // 17.2 验证邮箱验证码以及绑定邮箱

  public async req_bind_ver_email_code(code: string, token: string, join_type: string) {
    let search = null;
    if (join_type) {
      search = qs.stringify({ code, join_type }, { addQueryPrefix: true });
    } else {
      search = qs.stringify({ code }, { addQueryPrefix: true });
    }
    // const url = `http://8.130.23.16/api/v1/bind_ver_email_code${search}`;
    // const url = `${this.url}/bind_ver_email_code?email=${search}`;
    const url = `${this.url}/bind_ver_email_code${search}`;
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
  }

  // 17.3 更换邮箱之给旧邮箱发送验证码

  public async req_modify_send_email(token: string) {
    const url = `${this.url}/modify_send_email`;
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
  }

  // 17.4 更换邮箱之对旧邮箱验证码验证

  public async req_modify_old_email_ver_code(code: string, token: string) {
    const search = qs.stringify({ code }, { addQueryPrefix: true });
    const url = `${this.url}/modify_old_email_ver_code${search}`;
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
  }

  // 4.4 获取 builders 列表接口

  public async req_buid_builders_list() {
    // const url = `${this.url}/get_build_builders_list`
    const url = `${this.url}/get_build_builders_list`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_buid_builders_buildingList() {
    const url = `${this.url}/building/get_all_builders`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 9.7 获取 Wearable creator 数据接口
  public async req_wearable_creators() {
    const url = `${this.url}/wearable/get_wearable_creators`;
    // const url1 = 'http://8.130.23.16/api/v1/wearable/get_wearable_creators';
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 4.2 获取 Topic 详情页信息接口

  public async req_topic_detail(id: number, creator: string) {
    let search = null;
    if (id) {
      search = qs.stringify({ id }, { addQueryPrefix: true });
    } else {
      search = qs.stringify({ creator }, { addQueryPrefix: true });
    }
    const url = `${this.url}/get_topic_detail${search}`;
    // const url1 = `http://8.130.23.16/api/v1/get_topic_detail${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_newBuilding_detail(address: string) {
    const search = qs.stringify({ address }, { addQueryPrefix: true });
    const url = `${this.url}/get_new_topic_detail${search}`;
    // const url1 = `http://8.130.23.16/api/v1/get_topic_detail${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }




  public async req_cv_top20_parcel() {
    const url = `${this.url}/get_cv_top20_parcel`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  public async req_space_buildings_list(page: number, count: number, query: string,
    type: string,) {
    const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
    const url = `${this.url}/get_cv_space_buildings${search}`;
    // const url = `http://8.130.23.16/api/v1/get_cv_space_buildings${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  public async req_wearable_list(page: number, count: number,
    //  world: string,
  ) {
    const search = qs.stringify({ page, count }, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_wearable_list${search}`;
    // const url = `http://8.130.23.16/api/v1/get_cv_space_buildings${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  public async req_wearableDcl_list(page: number, count: number,
    //  world: string,
  ) {
    const search = qs.stringify({ page, count }, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_dcl_wearable_list${search}`;
    // const url = `http://8.130.23.16/api/v1/get_cv_space_buildings${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  public async req_wearableMona_list(page: number, count: number,
    //  world: string,
  ) {
    const search = qs.stringify({ page, count }, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_mona_wearable_list${search}`;
    // const url = `http://8.130.23.16/api/v1/get_cv_space_buildings${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  public async req_detailWearableDcl_list(contract_address, item_id,
  ) {
    const search = qs.stringify({ contract_address, item_id }, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_dcl_wearable_detail${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  public async req_detailWearableMona_list(creator_address, wearable_id,
  ) {
    const search = qs.stringify({ creator_address, wearable_id }, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_mona_wearable_detail${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }



  public async req_dcl_top20_parcel() {
    // const url = `http://8.130.23.16/api/v1/get_dcl_top20_parcel`;
    const url = `${this.url}/get_dcl_top20_parcel`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  // 7.9 申请成为 creator

  public async req_user_apply_become(join_type: string, token: string) {
    const search = qs.stringify({ join_type }, { addQueryPrefix: true });
    // const url = `http://8.130.23.16/api/v1/user/user_apply_become${search}`;
    const url = `${this.url}/user/user_apply_become${search}`;
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
  }

  public async req_userBuilder_apply_become(token: string, join_type: string, representative_links: string) {
    const search = qs.stringify({ join_type, representative_links }, { addQueryPrefix: false });
    
    // const url = `http://8.130.23.16/api/v1/user/user_apply_become${search}`;
    const url = `${this.url}/user/user_apply_become`;
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

  }


  public async req_user_add_or_edit_building(
    token: string,
    operation_type: string,
    building_name: string,
    platform: string,
    building_link: string,
    building_desc: string,
    building_format: string,
    files_link_add: string,
    files_link_cover: string,
    files_link_del: string,
  ) {
    const search = qs.stringify({
      operation_type,
      building_name,
      platform,
      building_link,
      building_desc,
      building_format,
      files_link_add,
      files_link_cover,
      files_link_del
    }, { addQueryPrefix: false });

    const url = `${this.url}/building/user_add_or_edit_building`;
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

  }

  public async req_get_building_detail_info(building_link) {

    const search = qs.stringify({building_link}, {addQueryPrefix: true });

    const url = `${this.url}/building/get_building_detail_info${search}`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',

    });
    const json = await result.json();
   
    
    return json;

  }



  public async req_get_user_wearable(token: string) {
    // const url = 'http://8.130.23.16/api/v1/wearable/get_user_wearable';
    const url = `${this.url}/wearable/get_user_wearable`;

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
  }

  public async req_set_wearable_show_status(
    token: string,
    wearable_id: string,
    show_status: number,
  ) {
    const search = qs.stringify({ wearable_id, show_status }, { addQueryPrefix: false });
    // const url = 'http://8.130.23.16/api/v1/wearable/set_wearable_show_status';
    const url = `${this.url}/wearable/set_wearable_show_status`;

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
  }

  public async req_builder_del_self_building(
    token: string, building_link: string
  ) {
    const search = qs.stringify({ building_link }, { addQueryPrefix: false });
    const url = `${this.url}/building/builder_del_self_building`;

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
  }

  public async req_get_wearable_detail(id) {
    const search = qs.stringify({ wearable_id: id }, { addQueryPrefix: true });
    // const url = `http://8.130.23.16/api/v1/wearable/get_wearable_detail${search}`;
    const url = `${this.url}/wearable/get_wearable_detail${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_all_country() {
    // const url = 'http://8.130.23.16/api/v1/user/get_all_country';
    const url = `${this.url}/user/get_all_country`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async req_platform() {
    // const url = 'http://8.130.23.16/api/v1/user/get_all_country';
    const url = `${this.url}/building/get_building_select_info`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }
}




// export default new API('https://api.metacat.world/api/v1');
export default new API('http://47.243.184.241/api/v1');
// http://8.130.23.16/api/v1
// https://api.metacat.world
