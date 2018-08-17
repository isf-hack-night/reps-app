import WPAPI from "wpapi";

const TRACKED_BILLS = {
  'SB 562': {
    bill_name: 'SB 562',
    summary:'CA single payer healthcare',
    support: true,
    flow: 7,
  },
  'SB 50': {
    bill_name: 'SB 50',
    summary: 'Establishes a statewide policy of discouraging transfer of federal public lands in California to third parties',
    support: true,
    flow: 7,
  },
  'AB 450': {
    bill_name: 'AB 450',
    summary: 'Protects against ICE in workplace',
    support: true,
    flow: 7,
  },
  'AB 699': {
    bill_name: 'AB 699',
    summary: 'Protects against ICE in schools',
    support: true,
    flow: 7,
  },
  'SB 54': {
    bill_name: 'SB 54',
    summary: 'California Values Act: makes California a sanctuary state',
    support: true,
    flow: 7,
  },
  'AB 41': {
    bill_name: 'AB 41',
    summary: 'Speeds up DNA testing in rape cases',
    support: true,
    flow: 7,
  },
};

class BillTracker {
  constructor(url='/') {
    this.apiPromise = WPAPI.discover(url);
  }

  fetchTrackedBills() {
    return Promise.resolve(Object.keys(this.tracked_bills));
  }

  fetchBill(bill_name) {
    return Promise.resolve(this.tracked_bills[bill_name]);
  }
}

export default BillTracker;
