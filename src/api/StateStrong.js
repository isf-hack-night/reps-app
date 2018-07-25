import Legiscan from 'api/Legiscan';
import OpenStates from 'api/OpenStates';
import MapAPI from 'api/MapAPI';
import BillTracker from 'api/BillTracker';
import WPAPI from "wpapi";

class StateStrong {
  constructor() {
    this.legiscan = new Legiscan();
    this.openstates = new OpenStates();
    this.map = new MapAPI();
    this.billtracker = new BillTracker();
    this.wordPressAPIPromise = WPAPI.discover('https://dev.state-strong.org');
  }

  fetchBill(id) {
    // TODO: Flatten/extract all the data into a single class/object.
    // The caller shouldn't be required to know which api the data is nested under.
    let final_bill = {};
    const promises = [
      this.openstates.fetchBill(bill_name).then(bill => final_bill.open_states = bill),
      this.legiscan.fetchBillByName(bill_name).then(bill => final_bill.legiscan = bill),
      this.wordPressAPIPromise.fetchBill(bill_name).then(
        bill => Object.assign(final_bill, bill)
      ),
    ];

    return Promise.all(promises).then(() => final_bill);
  }

  // fetchAllBills() {
  //   return this.wordPressAPIPromise.then(
  //     api => api.legislation().get()
  //   ).then(
  //     legislation =>
  //     fetchTrackedBills().then(
  //     bill_names => Promise.all(
  //       bill_names.map(bill_name => this.fetchBill(bill_name))
  //     )
  //   );
  // }

  fetchUpperLowerDistrictBoundaries(latitude, longitude) {
    return this.map.fetchDistrictsByLocation(latitude, longitude).then(
      districts => Promise.all([
        this.openstates.fetchDistrictBoundary(districts.state_upper_boundary),
        this.openstates.fetchDistrictBoundary(districts.state_lower_boundary),
      ]).then(
        boundaries => ({
          upper: boundaries[0],
          lower: boundaries[1],
          legIdUpper: this.legIdFromSearchResult(districts.state_upper_legislators),
          legIdLower: this.legIdFromSearchResult(districts.state_lower_legislators),
        })
      )
    );
  }

  legIdFromSearchResult(result) {
    let legId = "";
    if (result && result.length > 0) {
      legId = result[0].id;
    }
    return legId;
  }

  fetchUpperLowerDistrictBoundariesByDistrictIds(upper, lower) {
    return Promise.all([
        this.openstates.fetchDistrictBoundaryByDistrictId(upper),
        this.openstates.fetchDistrictBoundaryByDistrictId(lower),
        this.openstates.fetchLegislatorByDistrictId(upper),
        this.openstates.fetchLegislatorByDistrictId(lower),
      ]).then(
        boundaries => ({
          upper: boundaries[0],
          lower: boundaries[1],
          legIdUpper: this.legIdFromSearchResult(boundaries[2]),
          legIdLower: this.legIdFromSearchResult(boundaries[3]),
        })
      )
  }
}

export default StateStrong;
