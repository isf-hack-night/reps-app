import {LOCATION_SEARCH_URL_BASE, DISTRICT_LOOKUP_URL_BASE} from 'local_constants';
import JSONRequest from 'api/JSONRequest';

class LocationSearchAPI {
  constructor(base_url = null, district_url = null) {
    this.base_url = new URL(base_url || LOCATION_SEARCH_URL_BASE);
    this.district_url = new URL(base_url || DISTRICT_LOOKUP_URL_BASE);
  }

  bboxFromBoundary(bounds) {
    var bbox = [[90, 180], [-90, -180]];
    for (let i in bounds) {
      for (let j in bounds[i]) {
        bbox[0][1] = Math.min(bounds[i][j][0], bbox[0][1]);
        bbox[0][0] = Math.min(bounds[i][j][1], bbox[0][0]);
        bbox[1][1] = Math.max(bounds[i][j][0], bbox[1][1]);
        bbox[1][0] = Math.max(bounds[i][j][1], bbox[1][0]);
      }
    }
    return bbox;
  }

  fetchDistrictsByLocation(latitude, longitude) {
    const districtFetchParams = {
      lat: latitude,
      lng: longitude,
    };
    const request = new JSONRequest(this.base_url, districtFetchParams);
    return request.send();
  }

  fetchDistrictById(districtId) {
    const districtFetchParams = {
      district: districtId,
    }
    const request = new JSONRequest(this.district_url, districtFetchParams);
    return request.send();
  }
}

export default LocationSearchAPI;
