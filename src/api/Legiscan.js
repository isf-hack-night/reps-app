import API_KEYS from 'KEYS';
import {LEGISCAN_URL_BASE} from 'local_constants';
import JSONRequest from 'api/JSONRequest';

class Legiscan {
  constructor(base_url = null, api_key = null, state = 'ca') {
    this.base_url = new URL(base_url || LEGISCAN_URL_BASE);
    this.api_key = api_key || API_KEYS.legiscan;
    this.state = state;
  }

  fetchBill(billId) {
    const billParams = {
      op: 'getBill',
      id: billId,
      key: this.api_key,
    };
    const request = new JSONRequest(this.base_url, billParams);
    return request.send().then(
      (json) => {
        if (!json.bill) {
          throw new Error(`Failed to fetch bill: ${billId}`);
        }
        return json.bill;
      }
    );
  }

  searchBill(billName) {
    const billSearchParams = {
      op: 'search',
      bill: billName,
      state: this.state,
      key: this.api_key,
    };
    const request = new JSONRequest(this.base_url, billSearchParams);
    return request.send().then(
      (json) => {
        if (json.searchresult.summary.count !== 1) {
          throw new Error(`Failed to search for bill: ${billName}`);
        }
        return json.searchresult[0];
      }
    );
  }

  billName2Id(billName) {
    return this.searchBill(billName).then((bill) => bill.bill_id);
  }
}

export default Legiscan;
