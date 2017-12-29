import {MAP_URL_BASE} from 'local_constants';
import JSONRequest from 'api/JSONRequest';

class MapAPI {
  constructor(base_url = null) {
    this.base_url = new URL(base_url || MAP_URL_BASE);
  }

  fetchDistrictsByLocation(latitude, longitude) {
    const districtFetchParams = {
      lat: latitude,
      lng: longitude,
    };
    const request = new JSONRequest(this.base_url, districtFetchParams);
    return request.send();
  }
}


export default MapAPI;
