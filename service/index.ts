import * as qs from 'qs';

export const getCVEventList = async (cursor: number, count: number) => {
  const search = qs.stringify({ count, cursor }, { addQueryPrefix: true });
  const url = `/api/cv-event-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getDataHandle = async (pointers) => {
  const url = 'https://api.metacat.world/api/v1/get_dcl_wearable_content_entities';
const headers = {
    'content-type': 'application/json',
};
const data = {pointers};
// fetch(url, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(pointers),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error1111:', error));
try {
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(pointers),
  });

  const jsonData = await response.json();
  return jsonData.data;
} catch (error) {
  console.error('Error:', error);
  throw error;
}
};

export const getBagsDetail = async (TBAAddress) => {
  const search = qs.stringify({ TBAAddress }, { addQueryPrefix: true });
  
  const url = `/api/bags_detail_list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getBagsNum = async (tokenId) => {
  const search = qs.stringify({ tokenId }, { addQueryPrefix: true });
  const url = `/api/bags_num_list${search}`;

  const res = await fetch(url);
  
  const json = await res.json();

  return json;
};

export const getModelInfo = async (token_id) => {
  const search = qs.stringify({ token_id }, { addQueryPrefix: true });
  const url = `/api/get_model_info${search}`;

  const res = await fetch(url);
  
  const json = await res.json();

  return json;
};

export const rmBabylonModel = async (token,token_id) => {
  const search = qs.stringify({ token_id }, { addQueryPrefix: true });
  const url = `/api/rm_babylon_model${search}`;

  const res = await fetch(url, {
    method: 'get',
    headers: {
      Authorization: token,
    },
  });
  const json = await res.json();

  return json;
};


export const setModelInfo = async (token,costume) => {
  // const search = qs.stringify({costume}, { addQueryPrefix: false });
  // const url = `/api/set_model_info`;
  // // const formData = new FormData();
  // console.log(search);
  
  // // formData.append('costume',JSON.stringify({costume}))
  // const res = await fetch(url, {
  //   method: 'post',
  //   headers: {
  //     Authorization: token,
  //     // 'Content-Type': 'application/json',
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify({ costume})
   
  //   // body: search
  // });

  // console.log(costume,666);
  
  // const json = await res.json();

  // return json;


  // const url = '/api/set_model_info'; // 替换为你的接口地址
  const url = 'https://api.metacat.world/api/v1/set_babylon_model_info'; // 替换为你的接口地址

  const requestData = {
    costume
  };
  // console.log(costume,55555555555);
  
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
      console.log(data,);
    })
    .catch(error => {
      console.error('Error:', error,);
    });

};

export const getAccount = async (tokenId) => {
  const search = qs.stringify({ tokenId }, { addQueryPrefix: true });
  const url = `/api/bags_account${search}`;

  const res = await fetch(url, {
    method: 'post',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    body: JSON.stringify({contractAddress: '0x7524194dfCf68820006891d5D5810065F233A0B8', tokenId: tokenId})
    // body: search,
  });
  
  const json = await res.json();

  return json;
};

export const getBagsList = async (address) => {
  const search = qs.stringify({ address }, { addQueryPrefix: true });
  const url = `/api/bags_list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getCVParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
  const url = `/api/cv-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getMonaParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/mona-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getOncyberParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/oncyber-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getProtoParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/prooto-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getRareParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/rare-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getHyperfyParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/hyperfy-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getMozillaParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/mozilla-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getArtifexParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/artifex-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getPlayerOneList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/playerOne-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getNiftyIslandList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/niftyIsland-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getSubstrataList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/substrata-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getAriumParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/arium-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getSpatialParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/spatial-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getSandBoxParcelList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type}, { addQueryPrefix: true });
  const url = `/api/sandBox-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getSomSpaceList = async (page: number, count: number, query: string, type: string) => {
  const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
  const url = `/api/som_space_list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getSearchDetail = async ( query,
  page:number,
  per_page:number,
  search_item:string,) => {
  const search = qs.stringify({query,page,per_page,search_item,}, { addQueryPrefix: true });
  // const url = `/api/get_search_list${search}`;
  const url = `/api/get_search_list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getEventList = async (  
  cursor:number ,
  count:number,) => {
  const search = qs.stringify({cursor,count}, { addQueryPrefix: true });
  const url = `/api/get_event_list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getDclEventList = async (  
  cursor:number ,
  count:number,) => {
  const search = qs.stringify({cursor,count}, { addQueryPrefix: true });
  const url = `/api/get_dcl_event_list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getSomEventList = async (  
  cursor:number ,
  count:number,) => {
  const search = qs.stringify({cursor,count}, { addQueryPrefix: true });
  const url = `/api/get_som_event_list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getDCLEventList = async (cursor: number, count: number) => {
  const search = qs.stringify({ count, cursor }, { addQueryPrefix: true });
  const url = `/api/dcl-event-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getDCLParcelList = async (
  page: number,
  count: number,
  query: string,
  type: string,
) => {
  const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
  const url = `/api/dcl-parcel-list${search}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getCarouseList = async () => {
  const url = `/api/carousel`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getTopicList = async () => {
  const url = `/api/topic-list`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getTopicDetail = async (id: number) => {
  const search = qs.stringify({ id }, { addQueryPrefix: true });
  const url = `/api/topic_detail${search}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvTrafficMapLevelThree = async () => {
  const url = `https://api.metacat.world/api/v1/get_cv_traffic_map_level_three`; // /api/cv_traffic_map_level_three;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvTrafficMapLevelOne = async () => {
  const url = `https://api.metacat.world/api/v1/get_cv_traffic_map_level_one`; // /api/cv_traffic_map_level_three;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvTrafficMapLevelTwo = async () => {
  const url = `https://api.metacat.world/api/v1/get_cv_traffic_map_level_two`; // /api/cv_traffic_map_level_three;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvPriceMapLevelThree = async () => {
  const url = `https://api.metacat.world/api/v1/get_cv_price_map_level_three`; // /api/cv_traffic_map_level_three;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvPriceMapLevelOne = async () => {
  const url = `https://api.metacat.world/api/v1/get_cv_price_map_level_one`; // /api/cv_traffic_map_level_three;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvPriceMapLevelTwo = async () => {
  const url = `https://api.metacat.world/api/v1/get_cv_price_map_level_two`; // /api/cv_traffic_map_level_three;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvParcelDetail = async (id: number, map_type?: string, time_range?: string) => {
  const search = qs.stringify({ id, map_type, time_range }, { addQueryPrefix: true });
  const url = `/api/cv_parcel_detail${search}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvIsland = async () => {
  const url = `/api/cv_islands`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvSuburbs = async () => {
  const url = `/api/cv_suburbs`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getBuilderList = async (page: number, count: number) => {
  const search = qs.stringify({ page, count }, { addQueryPrefix: true });

  const url = `/api/builder_list${search}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvParcelSoldTotalStats = async () => {
  const url = `/api/cv_parcel_sold_total_stats`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvTrafficStats = async () => {
  const url = `/api/cv_traffic_stats`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getDecentralandStats = async () => {
  const url = `/api/cv_decent_stats`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvParcelAvgPriceStats = async () => {
  const url = `/api/cv_parcel_avg_price_stats`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getWorldsStats = async () => {
  const url = `/api/worlds_stats`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getWorldsStatsSale = async () => {
  const url = `/api/worlds_stats_scale`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getWorldsAverageSale = async () => {
  const url = `/api/worlds_stats_average`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getWorldsNum = async () => {
  const url = `/api/worlds_stats_num`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvParcelSoldSumStats = async () => {
  const url = `/api/cv_parcel_sold_sum_stats`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvMintStats = async () => {
  const url = `/api/cv_mint_stats`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getCvParcelOwnerStats = async () => {
  const url = `/api/cv_parcel_owner_stats`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

//   // Individual下Sandbox接口

export const getSandboxOwnerStats = async (world?: string) => {
  const params = qs.stringify({ world }, { addQueryPrefix: true });
  const url = `/api/cv_sandbox_stats${params}`;
  const res = await fetch(url);
  const json = await res.json();
  // console.log(json);
  return json;
};
export const getChartNftworlds = async (world?: string) => {
  const params = qs.stringify({ world }, { addQueryPrefix: true });
  const url = `/api/cv_chartNftworlds_stats${params}`;
  const res = await fetch(url);
  const json = await res.json();
  // console.log(json);
  return json;
};
export const getchartOtherside = async (world?: string) => {
  const params = qs.stringify({ world }, { addQueryPrefix: true });
  const url = `/api/cv_getchartOtherside_stats${params}`;
  const res = await fetch(url);
  const json = await res.json();
  // console.log(json);
  return json;
};
export const getchartSomniumSpace = async (world?: string) => {
  const params = qs.stringify({ world }, { addQueryPrefix: true });
  const url = `/api/cv_getchartSomniumSpace_stats${params}`;
  const res = await fetch(url);
  const json = await res.json();
  // console.log(json);
  return json;
};
export const getchartWebb = async (world?: string) => {
  const params = qs.stringify({ world }, { addQueryPrefix: true });
  const url = `/api/cv_getChartcv_getchartWebb_stats${params}`;
  const res = await fetch(url);
  const json = await res.json();
  // console.log(json);
  return json;
};

export const getDclParcelAvgPriceStats = async () => {
  const url = `/api/dcl_parcel_avg_price_stats`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getDclParcelSoldTotalStats = async () => {
  const url = `/api/dcl_parcel_sold_total_stats`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getDclParcelSoldSumStats = async () => {
  const url = `/api/dcl_parcel_sold_sum_stats`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getDclParcelOwnerStats = async () => {
  const url = `/api/dcl_parcel_owner_stats`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getNonce = async (address: string) => {
  const search = qs.stringify({ address }, { addQueryPrefix: true });
  const url = `/api/nonce${search}`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const loginSignature = async (address: string, signature: string) => {
  const search = qs.stringify({ address, signature }, { addQueryPrefix: false });
  const url = `/api/login_signature`;
  const res = await fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: search,
  });
  const json = await res.json();

  return json;
};

export const refreshToken = async (reToken: string) => {
  const search = qs.stringify({ refreshToken: reToken }, { addQueryPrefix: true });
  const url = `/api/refresh_token${search}`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
};

export const getBaseInfo = async (token: string) => {
  const url = `/api/base_info`;
  const res = await fetch(url, {
    method: 'get',
    headers: {
      Authorization: token,
    },
  });
  const json = await res.json();

  return json;
};


export const updateBaseInfo = async (
  token: string,
  nickName: string,
  twitterName: string,
  websiteUrl: string,
  avatar: string,
  introduction: string,
  country: string,
) => {
  const url = `/api/update_base_info`;
  const search = qs.stringify(
    { nickName, twitterName, websiteUrl, avatar, introduction, country },
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
};

export const getParcelList = async (token: string) => {
  const url = `/api/parcel_list`;
  const res = await fetch(url, {
    method: 'post',
    headers: {
      Authorization: token,
    },
  });
  const json = await res.json();
  return json;
};
// 获取当前登陆者Cryptovoxels地块列表接口
export const getParcelList2 = async (token: string) => {
  const url = `/api/owned_cv_parcel_list`;
  const res = await fetch(url, {
    method: 'get',
    headers: {
      Authorization: token,
    },
  });
  const json = await res.json();
  return json;
};

export const nickNameExist = async (nickName: string) => {
  const search = qs.stringify({ nickName }, { addQueryPrefix: true });
  const url = `/api/nick_name_exist${search}`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getDecentralandMapLevelThreeData = async () => {
  const url = `https://api.metacat.world/api/v1/get_dcl_price_map_level_three`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getDclParcelDetail = async (landId: string, mapType = 'price') => {
  const search = qs.stringify({ landId, mapType }, { addQueryPrefix: true });
  const url = `/api/dcl_parcel_detail${search}`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getOkxWearableList = async () => {
  const url = `/api/okx_wearable_list`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getOkxWearableDetail = async (id: string) => {
  const search = qs.stringify({ id }, { addQueryPrefix: true });
  const url = `/api/okx_wearable_detail${search}`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getDaoWearableList = async () => {
  const url = `/api/dao_wearable_list`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getDaoWearableDetail = async (id: string) => {
  const search = qs.stringify({ id }, { addQueryPrefix: true });
  const url = `/api/dao_wearable_detail${search}`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getSandboxMapLevelThreeData = async () => {
  const url = `https://api.metacat.world/api/v1/get_sandbox_price_map_level_three`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getSandboxParcelDetail = async (tokenId: string) => {
  const search = qs.stringify({ tokenId }, { addQueryPrefix: true });
  const url = `/api/sandbox_parcel_detail${search}`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getSomniumSpacePriceMapLevelThreeData = async () => {
  const url = `https://api.metacat.world/api/v1/get_somniumspace_price_map_level_three`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getSomniumSpaceParcelDeatil = async (tokenId: string) => {
  const search = qs.stringify({ tokenId }, { addQueryPrefix: true });
  const url = `/api/somniumspace_parcel_detail${search}`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getOtherSidePriceMap = async () => {
  const url = `https://api.metacat.world/api/v1/get_otherside_price_map`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getOtherSideParcelDetail = async (tokenId: string) => {
  const search = qs.stringify({ tokenId }, { addQueryPrefix: true });
  const url = `/api/otherside_parcel_detail${search}`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getDclTrafficMap = async () => {
  const url = `https://api.metacat.world/api/v1/get_dcl_traffic_map`;
  const res = await fetch(url);

  const json = await res.json();
  return json;
};

export const getTzLandPriceMap = async () => {
  const url = `/api/get_tz1and_price_map`;
  const result = await fetch(url);
  const json = await result.json();

  return json;
};

export const getTzLandParcelDetail = async (tokenId: string) => {
  const search = qs.stringify({ tokenId }, { addQueryPrefix: true });
  const url = `/api/get_tz1and_parcel_detail${search}`;
  const res = await fetch(url);
  const json = await res.json();

  return json;
};
