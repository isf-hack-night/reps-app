import API_KEYS from 'KEYS';
import {OPEN_STATES_URL_BASE} from 'local_constants';
import JSONRequest from 'api/JSONRequest';

class OpenStates {
  constructor(base_url = null, api_key = null, state = 'ca') {
    this.base_url = new URL(base_url || OPEN_STATES_URL_BASE);
    this.api_key = api_key || API_KEYS.openStates;
    this.state = state;
  }

  getPathUrl(path) {
    return `${this.base_url}/${path}/`;
  }

  searchBills(query) {
    const billSearchParams = {
      q: query,
      state: this.state,
      apikey: this.api_key,
    };
    const request = new JSONRequest(this.getPathUrl('bills'), billSearchParams);
    return request.send();
  }
}

export default OpenStates;
