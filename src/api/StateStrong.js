import Legiscan from 'api/Legiscan';
import OpenStates from 'api/OpenStates';
import MapAPI from 'api/MapAPI';
import BillTracker from 'api/BillTracker';

class StateStrong {
  constructor() {
    this.legiscan = new Legiscan();
    this.openstates = new OpenStates();
    this.map = new MapAPI();
    this.billtracker = new BillTracker();
  }

  fetchBill(bill_name) {
    // TODO: Flatten/extract all the data into a single class/object.
    // The caller shouldn't be required to know which api the data is nested under.
    let final_bill = {};
    const promises = [
      this.openstates.fetchBill(bill_name).then(bill => final_bill.open_states = bill),
      this.legiscan.fetchBillByName(bill_name).then(bill => final_bill.legiscan = bill),
      this.billtracker.fetchBill(bill_name).then(
        bill => Object.assign(final_bill, bill)
      ),
    ];

    return Promise.all(promises).then(() => final_bill);
  }

  fetchAllBills() {
    return this.billtracker.fetchTrackedBills().then(
      bill_names => Promise.all(
        bill_names.map(bill_name => this.fetchBill(bill_name))
      )
    );
  }

  fetchUpperLowerDistrictBoundaries(latitude, longitude) {
    return this.map.fetchDistrictsByLocation(latitude, longitude).then(
      districts => Promise.all([
        this.openstates.fetchDistrictBoundary(districts.state_upper_boundary),
        this.openstates.fetchDistrictBoundary(districts.state_lower_boundary),
      ]).then(
        boundaries => ({
          upper: boundaries[0],
          lower: boundaries[1],
        })
      )
    );
  }
}


export default StateStrong;
