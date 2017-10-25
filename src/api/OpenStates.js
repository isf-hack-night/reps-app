import API_KEYS from 'keys';
import OPEN_STATES_URL from 'constants';

class OpenStates {
  constructor(base_url = null, api_key = null) {
    this.base_url = new URL(base_url || OPEN_STATES_URL);
    this.api_key = api_key || API_KEYS.openStates;
  }

  makeUrl(path, params = null) {
    let url = `${this.base_url}/${path}/?apikey=${this.api_key}`;
    if (params) {
      const paramStrings = [];
      Object.entries(params).forEach(([key, value]) => paramStrings.push(`${key}=${value}`));
      url = `${url}&${paramStrings.join('&')}`;
    }
    return url;
  }

  fetchData(path, params = null) {
    const url = this.makeUrl(path, params);
    var xhr = new XMLHttpRequest;
    xhr.open('GET', url, false);
    xhr.send();
    return JSON.parse(xhr.responseText);
  }
}

export default OpenStates;
