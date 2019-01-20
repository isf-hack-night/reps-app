import Legiscan from 'api/Legiscan';
import OpenStates from 'api/OpenStates';
import MapAPI from 'api/MapAPI';
import LocationSearchAPI from 'api/LocationSearchAPI'
import BillTracker from 'api/BillTracker';
import WPAPI from "wpapi";

class StateStrong {
  constructor() {
    this.legiscan = new Legiscan();
    this.openstates = new OpenStates();
    this.locationSearch = new LocationSearchAPI();
    this.billtracker = new BillTracker();
    this.wordPressAPIPromise = WPAPI.discover('/');
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

  fetchUpperLowerDistrictBoundariesByLocation(latitude, longitude) {
    return this.locationSearch.fetchDistrictsByLocation(latitude, longitude).then(
      districts => (this.parseOutDistrict(districts))
    );
  }

  legIdFromSearchResult(result) {
    let legId = "";
    if (result && result.length > 0) {
      legId = result[0].id;
    }
    return legId;
  }

  parseOutDistrictFromLookupById(result) {
    var district = {};
    for (let dIdx in result.divisions) {
      var division = result.divisions[dIdx];
      if (division.government == 'State') {
        var districtId = this.openstates.boundaryIdToDistrictId(division.id);
        district.chamber = division.type;
        district.bbox = this.locationSearch.bboxFromBoundary(division.boundary);
        district.shape = division.boundary.map(x => [x]); 
        district.id = districtId;
        district.ocd_id = division.id;
        district.leg_id = division.legislators[0].id;
      }
    }
    return district;
  }

  parseOutDistrictsFromLookupById(upperResult, lowerResult) {
    var districtData = { upper: this.parseOutDistrictFromLookupById(upperResult), lower: this.parseOutDistrictFromLookupById(lowerResult) };
    districtData.legIdLower = districtData.lower.leg_id;
    districtData.legIdUpper = districtData.upper.leg_id;
    return districtData;
  }

  parseOutDistrictFromLegislator(district, legislator, boundary) {
    district.legislator = legislator;
    var districtId = this.openstates.boundaryIdToDistrictId(legislator.division_id);
    district.id = districtId;
    // For some reason the boundary files Wayne has are not
    // full polygons. They do not have cutouts/donuts.
    district.bbox = [[boundary.box.miny, boundary.box.minx], [boundary.box.maxy, boundary.box.maxx]];
    district.shape = boundary.rings.map(x => [x]); 
  }

  parseOutDistrict(districts) {
    var districtData = { upper: {}, lower: {} };
    if (districts.state_lower_legislators != null && districts.state_lower_legislators.length > 0) {
      var lowerLegislator = districts.state_lower_legislators[0];
      districtData.legIdLower = lowerLegislator.id;
      this.parseOutDistrictFromLegislator(districtData.lower, lowerLegislator, districts.state_lower_boundary);
      districtData.lower.chamber = "lower";
    }
    if (districts.state_upper_legislators != null && districts.state_upper_legislators.length > 0) {
      var upperLegislator = districts.state_upper_legislators[0];
      districtData.legIdUpper = upperLegislator.id;
      this.parseOutDistrictFromLegislator(districtData.upper, upperLegislator, districts.state_upper_boundary);
      districtData.upper.chamber = "upper";
    }
    return districtData;
  }

  parseOutDistrictOldLocationSearch(districts) {
    var districtData = { upper: {}, lower: {} };
    for (let dIdx in districts.divisions) {
      var division = districts.divisions[dIdx];
      if (division.government == 'State') {
        console.log(division);
        var districtId = this.openstates.boundaryIdToDistrictId(division.id);
        var district = null;
        if (districtId.includes('upper')) {
          district = districtData.upper;
          districtData.legIdUpper = division.legislators[0].id;
          district.chamber = 'upper';
        } else {
          district = districtData.lower;
          districtData.legIdLower = division.legislators[0].id;
          district.chamber = 'lower';
        }
        district.id = districtId;
        district.bbox = this.locationSearch.bboxFromBoundary(division.boundary);
        // For some reason the boundary files Wayne has are not
        // full polygons. They do not have cutouts/donuts.
        district.shape = division.boundary.map(x => [x]); 
      }
    }
    return districtData;
  }

  fetchUpperLowerDistrictBoundariesByDistrictIds(upper, lower) {
    return Promise.all([
        this.locationSearch.fetchDistrictById(upper),
        this.locationSearch.fetchDistrictById(lower),
      ]).then(
        boundaries => (this.parseOutDistrictsFromLookupById(boundaries[0], boundaries[1]))
      );
  }
}

export default StateStrong;
