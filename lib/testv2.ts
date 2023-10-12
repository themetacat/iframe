import * as qs from 'qs';

class API {
  private url: string;

  private key?: string;

  constructor(url: string, key?: string) {
    this.url = url;
    this.key = key;
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
}

export default new API('http://8.130.23.16/api/v1');
