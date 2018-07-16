import {STATE_STRONG_MAP_BASE} from 'local_constants';
import JSONRequest from 'api/JSONRequest';

class Map {
  constructor(base_url = null) {
    this.base_url = new URL(base_url || STATE_STRONG_MAP_BASE);
  }

  getPathUrl(path) {
    return `${this.base_url}/${path}/`;
  }

  coordinatesToDistricts(lat, lng) {
    const billSearchParams = {
      lat: lat,
      lng: lng,
    };
    const request = new JSONRequest(this.base_url, billSearchParams);
    return request.send();
  }

  getDistrict(query) {
  }
  getDistrictBounday(query) {
  }
}

