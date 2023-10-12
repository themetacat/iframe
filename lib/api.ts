// https://www.metacat.world/api/v1/get_cv_parcel_list?page=2&count=50&query=&type=gallery
import * as qs from 'qs';
import FormData from 'form-data';
class API {
  private url: string;

  private key?: string;

  constructor(url: string, key?: string) {

    
    this.url = url;
    // this.url = 'http://8.130.23.16/api/v1';
    this.key = key;
  }

  public async getCVParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
    const url = `${this.url}/get_cv_parcel_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }
  
  public async getMonaParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_mona_space_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getOncyberParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_oncyber_space_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getProtoParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_protoworld_zone_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getRareParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_rarerooms_room_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getHyperfyParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_hyperfy_parcel_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getMozillaParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_mozilla_hubs_scene_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getArtifexParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_artifex_world_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getPlayerOneList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_playerone_space_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getNiftyIslandList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_niftyisland_island_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSubstrataList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_substrata_parcel_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getAriumParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_arium_space_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }
  
  public async getSpatialParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_spatial_space_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSandBoxParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count , query, type}, { addQueryPrefix: true });
    const url = `${this.url}/get_sandbox_parcel_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSomSpaceList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
    const url = `${this.url}/get_somniumspace_parcel_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

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


  public async getEventList(
    cursor:number ,
    count:number,
  ): Promise<any> {
    const search = qs.stringify({cursor,count}, { addQueryPrefix: true });
    const url = `${this.url}/get_cv_event_list${search}`;
    // const url = `https://api.metacat.world/api/v1/get_cv_event_list${search}`
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDclEventList(
    cursor:number ,
    count:number,
  ): Promise<any> {
    const search = qs.stringify({cursor,count}, { addQueryPrefix: true });
    const url = `${this.url}/get_dcl_event_list${search}`;
    // const url = `https://api.metacat.world/api/v1/get_cv_event_list${search}`
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSomEventList(
    cursor:number ,
    count:number,
  ): Promise<any> {
    const search = qs.stringify({cursor,count}, { addQueryPrefix: true });
    const url = `${this.url}/get_somniumspace_event_list${search}`;
    // const url = `https://api.metacat.world/api/v1/get_cv_event_list${search}`
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  

  public async getCVEventList(cursor: number, count: number): Promise<any> {
    const search = qs.stringify({ count, cursor }, { addQueryPrefix: true });
    const url = `${this.url}/get_cv_event_list${search}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDataHandle(pointers): Promise<any> {
  // const url = 'https://peer.decentraland.org/content/entities/active';
//       const headers = {
//   'authority': 'peer.decentraland.org',
//   'accept': '*/*',
//   'accept-language': 'zh-CN,zh;q=0.9,ko;q=0.8,en;q=0.7',
//   'content-type': 'application/json',
//   'origin': 'https://wearable-preview.decentraland.org',
//   'referer': 'https://wearable-preview.decentraland.org/',
//   'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
//   'sec-ch-ua-mobile': '?0',
//   'sec-ch-ua-platform': '"macOS"',
//   'sec-fetch-dest': 'empty',
//   'sec-fetch-mode': 'cors',
//   'sec-fetch-site': 'same-site',
//   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
//       };
//       const data  = pointers;
//       console.log(data,222,pointers);
      
//   //     fetch(url, {
//   //       method: 'POST',
//   //       headers: headers,
//   //       body: JSON.stringify(data),
//   //     })
//   //       .then(response => response.json())
//   //       .then(data => console.log(data,'数据'))
//   //       .catch(error => console.error('Error111111:', error));
//   const url = 'http://47.243.184.241/api/v1/get_dcl_wearable_content_entities'; // 替换为你的接口地址


//   fetch(url, {
//     method: 'POST',
//     // headers: {
//     //   'Content-Type': 'application/json'
//     // },
//     headers:headers,
//     body: JSON.stringify(pointers)
//   })
  
//     // .then(response => response.json())
//     .then(response => console.log(response.json()))
//     .then(data => {
//       // 处理响应数据
// // const dataq =data.data[0].content
// // let hashValue = null;

// // dataq.forEach(item => {
// //   if (item.file.includes('male/')) {
// //     hashValue = item.hash;
// //   }
// //   console.log(hashValue,66666);
  
// // });

// // console.log(hashValue); 
//       console.log(data,'数据1222');
//     })
//     .catch(error => {
//       console.error('Error:', error,'错误1');
//     });



const url = 'https://api.metacat.world/api/v1/get_dcl_wearable_content_entities';
// const proxy = '127.0.0.1:7890'; // 代理地址和端口号

const headers = {
    // 'authority': 'peer.decentraland.org',
    // 'accept': '*/*',
    // 'accept-language': 'zh-CN,zh;q=0.9,ko;q=0.8,en;q=0.7',
    'content-type': 'application/json',
    // 'origin': 'https://wearable-preview.decentraland.org',
    // 'referer': 'https://wearable-preview.decentraland.org/',
    // 'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
    // 'sec-ch-ua-mobile': '?0',
    // 'sec-ch-ua-platform': '"macOS"',
    // 'sec-fetch-dest': 'empty',
    // 'sec-fetch-mode': 'cors',
    // 'sec-fetch-site': 'same-site',
    // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
};

const data = pointers;
fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => console.log(data.data,'.............'))
.catch(error => console.error('Error:', error));
  }

//详情页列表页
  public async getBagsDetail(TBAAddress): Promise<any> {
    const search = qs.stringify({ TBAAddress}, { addQueryPrefix: true });
    const url = `https://polygon-mainnet.g.alchemy.com/nft/v2/6UJiv2Zs3C0EUTmYMoDBt7PSQCGMvCn2/getNFTs?pageKey=undefined&owner=${TBAAddress}&pageSize=100&withMetadata=true`;
    // const url = `https://polygon-mainnet.g.alchemy.com/nft/v2/6UJiv2Zs3C0EUTmYMoDBt7PSQCGMvCn2/getNFTs?pageKey=undefined&owner=0xc96b7C00cBA95ea3C0E10e21Ea4661d481204f5C&pageSize=100&withMetadata=true`;
    // const url = `https://polygon-mainnet.g.alchemy.com/nft/v2/6UJiv2Zs3C0EUTmYMoDBt7PSQCGMvCn2/getNFTs?pageKey=undefined&owner=0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e&pageSize=100&withMetadata=true`
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

//详情页TBA
  public async getBagsNum(tokenId): Promise<any> {
    const search = qs.stringify({ tokenId}, { addQueryPrefix: true });
    const url = `https://polygon-mainnet.g.alchemy.com/nft/v2/6UJiv2Zs3C0EUTmYMoDBt7PSQCGMvCn2/getNFTMetadata?contractAddress=0x7524194dfCf68820006891d5D5810065F233A0B8&tokenId=${tokenId}&refreshCache=false`;


    const res = await fetch(url);

    
    const json = await res.json();

    return json;
  }

  public async getModelInfo(token_id): Promise<any> {
    const search = qs.stringify({ token_id}, { addQueryPrefix: true });
    // const url = `https://api.metacat.world/api/v1/get_babylon_model_info?token_id=${token_id}`;
    const url = `http://47.243.184.241/api/v1/get_babylon_model_info?token_id=${token_id}`;


    const res = await fetch(url);

    
    const json = await res.json();

    return json;
  }

  public async rmBabylonModel(token: string,token_id): Promise<any> {
    const search = qs.stringify({ token_id}, { addQueryPrefix: false });
    const url = `https://api.metacat.world/api/v1/rm_babylon_model_info?token_id=${token_id}`;

    const res = await fetch(url, {
         method: 'get',
         headers: {
          Authorization: token,
         },
        });
    
    const json = await res.json();

    return json;
  }

    

  public async setModelInfo(token,costume): Promise<any> {
//     const search = qs.stringify({ costume}, { addQueryPrefix: false });
//     const url = `http://8.130.23.16/api/v1/set_babylon_model_info`;
// // const formData = new FormData() as any;
// // formData.append('costume',JSON.stringify({costume}))

// // const searchParams = new URLSearchParams(formData);
//     const res = await fetch(url, {
//       method: 'post',
//       mode:'cors',
//       headers: {
//         Authorization: token,
//         // 'Content-Type': 'application/json',
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//        },
//     body: JSON.stringify({ costume})

//       // body: search,
//     });

    

    
//     const json = await res.json();

//     return json;


const url = 'https://api.metacat.world/api/v1/set_babylon_model_info'; // 替换为你的接口地址

  const requestData = {
    costume
  };

  
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  
    .then(response => response.json())
    .then(data => {
      // 处理响应数据
      console.log(data,'数据');
    })
    .catch(error => {
      console.error('Error:', error,'cuowu');
    });
  }

//列表页
  public async getBagsList(address): Promise<any> {
    const search = qs.stringify({ address}, { addQueryPrefix: true });
    const url = `https://polygon-mainnet.g.alchemy.com/nft/v2/6UJiv2Zs3C0EUTmYMoDBt7PSQCGMvCn2/getNFTs?owner=${address}&contractAddresses[]=0x7524194dfCf68820006891d5D5810065F233A0B8&withMetadata=true&pageSize=48`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getAccount(tokenId): Promise<any> {
    const search = qs.stringify({ tokenId}, { addQueryPrefix: true });
    // const url = `https://polygon-mumbai.g.alchemy.com/nft/v2/6UJiv2Zs3C0EUTmYMoDBt7PSQCGMvCn2/getNFTMetadata?contractAddress=0x7524194dfCf68820006891d5D5810065F233A0B8&tokenId=${tokenId}&refreshCache=false`;
    const url = `https://polygon-mainnet.g.alchemy.com/nft/v3/0jIWuk4VdK14pDWrrwFoXaSShg_2tu32/refreshNftMetadata`;

    const res = await fetch(url, {
      method: 'post',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // },
      body: JSON.stringify({contractAddress: '0x7524194dfCf68820006891d5D5810065F233A0B8', tokenId: tokenId})
      // body: search,
    });
    const options = {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: JSON.stringify({contractAddress: '0x7524194dfCf68820006891d5D5810065F233A0B8', tokenId: '44'})
    };
    
    
    const json = await res.json();

    return json;
  }

  public async getDCLEventList(cursor: number, count: number): Promise<any> {
    const search = qs.stringify({ count, cursor }, { addQueryPrefix: true });
    const url = `${this.url}/get_dcl_event_list${search}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDCLParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
    const url = `${this.url}/get_dcl_parcel_list${search}`;
    // const url = `http://8.130.23.16/api/v1/get_dcl_parcel_list${search}`;
    

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCarouseList(): Promise<any> {
    const url = `${this.url}/get_carousel_list`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getTopicList(): Promise<any> {
    const url = `${this.url}/get_topic_list`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getTopicDetail(id: number): Promise<any> {
   
    const search = qs.stringify({ id }, { addQueryPrefix: true });
    const url = `${this.url}/get_topic_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();
    // console.log(url,55555);
   
    return json;
  }

  public async getNewBuildingDetail(id: number): Promise<any> {
    const search = qs.stringify({ id }, { addQueryPrefix: true });
    const url = `${this.url}/get_new_topic_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvTrafficMapLevelThree(): Promise<any> {
    const url = `${this.url}/get_cv_traffic_map_level_three`; // `${this.url}/get_cv_traffic_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvTrafficMapLevelOne(): Promise<any> {
    const url = `${this.url}/get_cv_traffic_map_level_one`; // `${this.url}/get_cv_traffic_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvTrafficMapLevelTwo(): Promise<any> {
    const url = `${this.url}/get_cv_traffic_map_level_two`; // `${this.url}/get_cv_traffic_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvPriceMapLevelThree(): Promise<any> {
    const url = `${this.url}/get_cv_price_map_level_three`; // `${this.url}/get_cv_traffic_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvPriceMapLevelOne(): Promise<any> {
    const url = `${this.url}/get_cv_price_map_level_one`; // `${this.url}/get_cv_traffic_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvPriceMapLevelTwo(): Promise<any> {
    const url = `${this.url}/get_cv_price_map_level_two`; // `${this.url}/get_cv_traffic_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvParcelDetail(id: number, map_type?: string, time_range?: string): Promise<any> {
    const search = qs.stringify({ id, map_type, time_range }, { addQueryPrefix: true });
    const url = `${this.url}/get_cv_parcel_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvSuburbs(): Promise<any> {
    const url = `${this.url}/get_cv_suburbs`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvIsland(): Promise<any> {
    const url = `${this.url}/get_cv_islands`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getBuilderList(page: number, count: number): Promise<any> {
    const search = qs.stringify({ page, count }, { addQueryPrefix: true });
    const url = `${this.url}/get_builder_list${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvParcelSoldTotalStats(): Promise<any> {
    const url = `${this.url}/get_cv_parcel_sold_total_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvTrafficStats(): Promise<any> {
    const url = `${this.url}/get_cv_traffic_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDecentralandStats(): Promise<any> {
    const url = `${this.url}/get_dcl_traffic_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvParcelAvgPriceStats(): Promise<any> {
    const url = `${this.url}/get_cv_parcel_avg_price_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getWorldsStats(): Promise<any> {
    const url = `${this.url}/get_worlds_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getWorldsStatsSale(): Promise<any> {
    // const url = `${this.url}/analytics/cur_data_compared_last_sum`;
    const url = `${this.url}/analytics/cur_data_compared_last_sum`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getWorldsAverageSale(): Promise<any> {
    // const url = `${this.url}/analytics/cur_data_compared_last_sum`;
    const url = `${this.url}/analytics/cur_data_compared_last_avg`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getWorldsNum(): Promise<any> {
    // const url = `${this.url}/analytics/cur_data_compared_last_sum`;
    const url = `${this.url}/analytics/cur_data_compared_last_sales`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvParcelSoldSumStats(): Promise<any> {
    const url = `${this.url}/get_cv_parcel_sold_sum_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvMintStats(): Promise<any> {
    const url = `${this.url}/get_cv_mint_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCvParcelOwnerStats(): Promise<any> {
    const url = `${this.url}/get_cv_parcel_owner_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSandboxOwnerStats(world: string): Promise<any> {
    const search = qs.stringify({ world }, { addQueryPrefix: true });
    const url = `${this.url}/get_worlds_owner_num${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getChartNftworlds(world: string): Promise<any> {
    const search = qs.stringify({ world }, { addQueryPrefix: true });
    const url = `${this.url}/get_worlds_owner_num${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getchartOtherside(world: string): Promise<any> {
    const search = qs.stringify({ world }, { addQueryPrefix: true });
    const url = `${this.url}/get_worlds_owner_num${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getchartWebb(world: string): Promise<any> {
    const search = qs.stringify({ world }, { addQueryPrefix: true });
    const url = `${this.url}/get_worlds_owner_num${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getchartSomniumSpace(world: string): Promise<any> {
    const search = qs.stringify({ world }, { addQueryPrefix: true });
    const url = `${this.url}/get_worlds_owner_num${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getVoxelsOwnerStats(): Promise<any> {
    const url = `${this.url}/get_cv_parcel_owner_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDclParcelAvgPriceStats(): Promise<any> {
    const url = `${this.url}/get_dcl_parcel_avg_price_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDclParcelSoldTotalStats(): Promise<any> {
    const url = `${this.url}/get_dcl_parcel_sold_total_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDclParcelSoldSumStats(): Promise<any> {
    const url = `${this.url}/get_dcl_parcel_sold_sum_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDclParcelOwnerStats(): Promise<any> {
    const url = `${this.url}/get_dcl_parcel_owner_stats`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getNonce(address: string): Promise<any> {
    const search = qs.stringify({ address }, { addQueryPrefix: true });
    const url = `${this.url}/user/get_nonce${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async loginSignature(address: string, signature: string): Promise<any> {
    const search = qs.stringify({ address, signature }, { addQueryPrefix: false });
    const url = `${this.url}/user/login_signature`;
    const res = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: search,
    });
    const json = await res.json();

    return json;
  }

  public async refreshToken(refreshToken: string): Promise<any> {
    const search = qs.stringify({ refresh_token: refreshToken }, { addQueryPrefix: true });
    const url = `${this.url}/user/refresh_token${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getBaseInfo(token: string): Promise<any> {
    const url = `${this.url}/user/get_base_info`;
    // const url = `http://8.130.23.16/api/v1/user/get_base_info`;
    const res = await fetch(url, {
      method: 'get',
      headers: {
        Authorization: token,
      },
    });
    const json = await res.json();

    return json;
  }


  public async updateBaseInfo(
    token: string,
    nickName: string,
    twitterName: string,
    websiteUrl: string,
    avatar: string,
    introduction: string,
    country: string,
  ): Promise<any> {
    const url = `${this.url}/user/update_base_info`;
    const search = qs.stringify(
      {
        nick_name: nickName,
        twitter_name: twitterName,
        website_url: websiteUrl,
        avatar,
        introduction,
        country,
      },
      { addQueryPrefix: false },
    );
    const res = await fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token,
      },
      body: search,
    });
    const json = await res.json();

    return json;
  }

  public async getParcelList(token: string): Promise<any> {
    const url = `${this.url}/user/get_parcel_list`;

    const res = await fetch(url, {
      method: 'get',
      headers: {
        Authorization: token,
      },
    });
    const json = await res.json();

    return json;
  }

  // 获取当前登陆者Cryptovoxels地块列表接口

  public async getParcelList2(token: string): Promise<any> {
    const url = `${this.url}/rent/get_owned_cv_parcel_list`;

    const res = await fetch(url, {
      method: 'get',
      headers: {
        Authorization: token,
      },
    });
    const json = await res.json();

    return json;
  }

  public async nickNameExit(nickName: string): Promise<any> {
    const search = qs.stringify({ nick_name: nickName }, { addQueryPrefix: true });
    const url = `${this.url}/user/is_nick_name_exist${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDecentralandMapLevelThreeData(): Promise<any> {
    const url = `${this.url}/get_dcl_price_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDclParcelDetail(landId: string, mapType = 'price'): Promise<any> {
    const search = qs.stringify({ land_id: landId, map_type: mapType }, { addQueryPrefix: true });
    const url = `${this.url}/get_dcl_parcel_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getOkxWearableList(): Promise<any> {
    const url = `${this.url}/wearable/get_okx_wearable_list`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getOkxWearableDetail(id: string): Promise<any> {
    const search = qs.stringify({ id }, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_okx_wearable_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDaoWearableList(): Promise<any> {
    const url = `${this.url}/wearable/get_dao_wearable_list`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDaoWearableDetail(id: string): Promise<any> {
    const search = qs.stringify({ id }, { addQueryPrefix: true });
    const url = `${this.url}/wearable/get_dao_wearable_detail${search}`;
    // const url1 = `http://8.130.23.16/api/v1/wearable/get_dao_wearable_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSandboxMapLevelThreeData(): Promise<any> {
    const url = `${this.url}/get_sandbox_price_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSandboxParcelDetail(tokenId: string): Promise<any> {
    const search = qs.stringify({ token_id: tokenId }, { addQueryPrefix: true });
    const url = `${this.url}/get_sandbox_parcel_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSomniumSpacePriceMapLevelThreeData(): Promise<any> {
    const url = `${this.url}/get_somniumspace_price_map_level_three`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getSomniumSpaceParcelDeatil(tokenId: string): Promise<any> {
    const search = qs.stringify({ token_id: tokenId }, { addQueryPrefix: true });
    const url = `${this.url}/get_somniumspace_parcel_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

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

  // 获取otherside价格热力图数据
  public async getDclTrafficMap() {
    const url = `${this.url}/get_dcl_traffic_map`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  public async getHeatMapInfo(): Promise<any> {
    const url = `${this.url}/home_page//get_heatmap_info`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  public async getTraffic(): Promise<any> {
    const url = `${this.url}/home_page/get_traffic`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  public async getBuildingsInfo(): Promise<any> {
    const url = `${this.url}/home_page/get_builings_info`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  public async getWearablesInfo(): Promise<any> {
    const url = `${this.url}/home_page/get_wearables_info`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  public async getFloorPrice(): Promise<any> {
    const url = `${this.url}/home_page/get_floor_price`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  public async getTzLandPriceMap(): Promise<any> {
    const url = `${this.url}/get_tz1and_price_map`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
  }

  public async getTzLandParcelDetail(tokenId: string): Promise<any> {
    const search = qs.stringify({ token_id: tokenId }, { addQueryPrefix: true });
    const url = `${this.url}/get_tz1and_parcel_detail${search}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }
}

// export default new API('https://api.metacat.world/api/v1');
export default new API('http://47.243.184.241/api/v1');
// export default new API('http://8.130.23.16/api/v1');
// http://8.130.23.16/
// https://api.metacat.world
