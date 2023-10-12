import * as qs from 'qs';

class API {
  private url: string;

  private key?: string;

  constructor(url: string, key?: string) {
    this.url = url;
    this.key = key;
  }

  // 设置单个或批量出租

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

  // 9.7 获取 Wearable creator 数据接口
  public async req_wearable_creators() {
    const url = `${this.url}/wearable/get_wearable_creators`;

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
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 获取otherside价格热力图数据
  public async getOtherSidePriceMap() {
    const url = `${this.url}/get_otherside_price_map`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async getOtherSideParcelDetail(tokenId: string): Promise<any> {
    const search = qs.stringify({ token_id: tokenId }, { addQueryPrefix: true });
    const url = `${this.url}/get_otherside_parcel_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }


  // 14.7 获取当前登录者 dece 单个地块一段时间内的每日流量统计接口

  public async req_dece_parcel_traffic_list(
    token: string,
  ): Promise<any> {
    // const url = `http://8.130.23.16/api/v1/user/get_dcl_parcel_traffic_detail_info`;
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
    // const url = `http://8.130.23.16/api/v1/user/get_dcl_parcel_traffic_percentage`;
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

  // 14.9 获取当前登录者 Cryptovoxels 地块每日流量总数接口

  public async req_dece_parcel_traffic(token: string): Promise<any> {
    // const url = `http://8.130.23.16/api/v1/user/get_dcl_parcel_traffic_daily_stats`;
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

  public async req_scence_list(page: number, count: number,query: string,
    type: string,) {
      const search = qs.stringify({ page, count, query, type }, {  addQueryPrefix: true });
    const url = `${this.url}/get_dcl_scenes${search}`;
    // const url = `http://8.130.23.16/api/v1/get_dcl_scenes${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });

    const json = await result.json();

    return json;
  }

  public async getSearchDetail(
    query,
    page:number,
    per_page:number,
    search_item:string,
  ): Promise<any> {
    const search = qs.stringify({query,page,per_page,search_item,}, { addQueryPrefix: true });
    const url = `${this.url}/the_search${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

}





export default new API('http://8.130.23.16/api/v1');
