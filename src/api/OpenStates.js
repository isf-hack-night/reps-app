import API_KEYS from 'KEYS';
import {OPEN_STATES_URL_BASE} from 'local_constants';
import JSONRequest from 'api/JSONRequest';

class OpenStates {
  constructor(base_url = null,
              api_key = null,
              state = 'ca',
              session = '20172018',) {
    this.base_url = new URL(base_url || OPEN_STATES_URL_BASE);
    this.api_key = api_key || API_KEYS.openStates;
    this.state = state;
    this.session = session
  }

  getPathUrl(path) {
    return `${this.base_url}/${path}/`;
  }

  getPathUrlStripped(path) {
    return `${this.base_url}/${path}`;
  }

  searchBills(query) {
    const billSearchParams = {
      q: query,
      state: this.state,
      apikey: this.api_key,
      search_window: `session:${this.session}`
    };
    const request = new JSONRequest(this.getPathUrl('bills'), billSearchParams);
    return request.send();
  }

  getAllBillsCurrentTerm(page) {
    const billSearchParams = {
      state: this.state,
      apikey: this.api_key,
      search_window: `session:${this.session}`,
      page: page,
      per_page: 100 
    };
    const request = new JSONRequest(this.getPathUrl('bills'), billSearchParams);
    return request.send();
  }

  fetchBill(bill_id) {
    const bill_fetch_params = {
      apikey: this.api_key,
    };
    const bill_detail_path = `bills/${bill_id}`;
    const request = new JSONRequest(this.getPathUrl(bill_detail_path), bill_fetch_params);
    return request.send();
  }

  fetchLegislatorByDistrictId(district_id) {
    let pieces = district_id.split('-');
    const legislator_search_params = {
      apikey: this.api_key,
      state: pieces[0],
      chamber: pieces[1],
      district: pieces[2],
    };
    const request = new JSONRequest(this.getPathUrl('legislators'), legislator_search_params);
  }

  boundaryIdToDistrictId(boundary_id) {
    let pieces = boundary_id.split('/');
    let state = pieces[2].split(':');
    let district = pieces[3].split(':');
    let chamber = district[0].charAt(3) == 'u' ? 'upper' : 'lower';
    return `${state[1]}-${chamber}-${district[1]}`;

  }

  districtIdToBoundaryId(district_id) {
    let pieces = district_id.split('-');
    return `ocd-division/country:us/state:${pieces[0]}/sld${pieces[1][0]}:${pieces[2]}`;
  }

  fetchDistrictBoundaryByDistrictId(district_id) {
    return this.fetchDistrictBoundary(this.districtIdToBoundaryId(district_id));
  }

  fetchDistrictBoundary(boundary_id) {
    const boundary_path = `districts/boundary/${boundary_id}`;
    const request = new JSONRequest(this.getPathUrlStripped(boundary_path), null);
    return request.send();
  }
}


export default OpenStates;
