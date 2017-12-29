import {
  LOCAL_OPEN_STATES_URL_BASE,
  OPEN_STATES_URL_BASE
} from 'local_constants';

function LocalOpenStates() {
	this.openStatesURL = LOCAL_OPEN_STATES_URL_BASE;
	this.api_key = 'local';
	this.is_local = true;
}

LocalOpenStates.prototype.makeUrl = function(method) {
	return this.openStatesURL + '/' + method + '.json';
}

LocalOpenStates.prototype.callApi = function (url) {
	var xhr = new XMLHttpRequest;
	xhr.open('GET', url, false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

LocalOpenStates.prototype.getDistricts = function (state, chamber) {
	var method = chamber || 'all_districts';
	return this.callApi(this.makeUrl(method));
}

LocalOpenStates.prototype.getDistrictsByParams = function (US_STATE, params) {
	if (!params) {
		return this.getDistricts(US_STATE)
	}

	var { districtLower, districtUpper } = params
	var lowerDistrictData = districtLower ? [this.getDistricts(US_STATE, districtLower)] : []
	var upperDistrictData = districtUpper ? [this.getDistricts(US_STATE, districtUpper)] : []
	return lowerDistrictData.concat(upperDistrictData)
}

LocalOpenStates.prototype.getDistrictBoundary = function (boundary_id) {
	var method = boundary_id;
	return this.callApi(this.makeUrl(method));
}

function OpenStates(api_key) {
	this.openStatesURL = OPEN_STATES_URL_BASE;
	this.api_key = '' + api_key;
	this.is_local = false;
}

OpenStates.prototype.makeUrl = function(method) {
	return this.openStatesURL + '/' + method + '/';
}

OpenStates.prototype.callApi = function (url) {
	var xhr = new XMLHttpRequest;
	xhr.open('GET', url, false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

OpenStates.prototype.getDistricts = function (state, chamber) {
	var method = 'districts/' + state;
	if (chamber) {
		method += '/' + chamber;
	}
	return this.callApi(this.makeUrl(method));
}

OpenStates.prototype.getDistrictBoundary = function (boundary_id) {
	var method = 'districts/boundary/' + boundary_id;
	return this.callApi(this.makeUrl(method));
}

function District(json, open_states) {
	this.abbr = json.abbr;
	this.boundary_id = json.boundary_id;
	this.chamber = json.chamber;
	this.id = json.id;
	this.legislators = json.legislators;
	this.num_seats = json.num_seats;
	this.boundary = null;
	this.name = json.name;
  this.open_states = open_states;
}

District.prototype.getBoundary = function() {
	if (!this.boundary) {
		var json = null;
		if (!this.open_states.is_local) {
			json = this.open_states.getDistrictBoundary(this.boundary_id);
		} else {
			json = this.open_states.getDistrictBoundary(this.id);
		}
		if (json) {
			this.boundary = this;
			this.bbox = json.bbox;
			this.region = json.region;
			this.shape = json.shape;
		}
	}
	return this.boundary;
}

District.prototype.surroundsPointApprox = function(lat, lon) {
	var boundary = this.getBoundary();
	if (boundary == null) return false;
	var bbox = boundary.bbox;
	return lat >= bbox[0][0] && lon >= bbox[0][1] && lat <= bbox[1][0] && lon <= bbox[1][1];
}

// Ray-casting algorithm ported from C from 
// https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
// by W Randolph Franklin
function pointInPolygon(points, lat, lon) {
	var i = 0, j = points.length - 1;
	var c = false;
	for (; i < points.length; j = i++) {
		if (((points[i][1] > lat) != (points[j][1] > lat)) &&
        (lon < (points[j][0] - points[i][0]) * (lat - points[i][1]) / (points[j][1] - points[i][1]) + points[i][0]) ) {
			c = !c;
		}
	}
	return c;
}

District.prototype.surroundsPointExact = function(lat, lon) {
	var boundary = this.getBoundary();
	if (boundary == null) return false;
	var donut = [];
	for (var shape in boundary.shape) {
		donut = boundary.shape[shape];
		if (pointInPolygon(donut[0], lat, lon)) {
			if (donut.length == 2) {
				return !pointInPolygon(donut[1], lat, lon);
			}
			return true;
		}
	}
	return false;
}

function DistrictPopulator (districtList) {
	this.districtList = districtList;
	this.currentDistrict = 0;
}

DistrictPopulator.prototype.populate = function (cb) {
	if (this.currentDistrict < this.districtList.num_districts) {
		var district_id = this.districtList.district_ids[this.currentDistrict];
		this.districtList.districts[district_id].getBoundary();
		this.currentDistrict++;
		var that = this;
		var call = function() { that.populate(cb); };
		var timeout = this.districtList.open_states.is_local ? 1 : 100;
		setTimeout(call, timeout);
	} else {
		cb();
	}
}

function DistrictList(json, state, open_states) {
	var district;
	this.upper_districts = [];
	this.lower_districts = [];
	this.state = state;
	this.num_districts = json.length;
	this.districts = {};
	this.district_ids = [];
  this.open_states = open_states;
	for (var i in json) {
		district = new District(json[i], this.open_states);
		this.districts[district.id] = district;
		this.district_ids.push(district.id);
		var district_num = parseInt(district.name);
		if (district.chamber == 'upper') {
			this.upper_districts[district_num - 1] = district;
		} else if (district.chamber == 'lower') {
			this.lower_districts[district_num - 1] = district;
		}
	}
	this.populated = false;
	this.populator = new DistrictPopulator(this);
}

DistrictList.prototype.getLowerDistrict = function (i) {
	return this.lower_districts[i - 1].getBoundary();
}

DistrictList.prototype.getUpperDistrict = function (i) {

	return this.upper_districts[i - 1].getBoundary();
}

DistrictList.prototype.findNearbyDistricts = function (lat, lon) {
    var nearby = []
		var district = null
  	for (var d in this.districts) {
    district = this.districts[d]
		if (district.surroundsPointApprox(lat, lon)) {
			nearby.push(district)
		}
	}
	return nearby;
}

DistrictList.prototype.findExactDistrictsInList = function (possibleDistricts, lat, lon) {
	var district;
	var upper = null;
	var lower = null;
	for (var d in possibleDistricts) {
		district = possibleDistricts[d];
		if (!lower && district.chamber == 'lower' && district.surroundsPointExact(lat, lon)) {
			lower = district;
		} else if (!upper && district.chamber == 'upper' && district.surroundsPointExact(lat, lon)) {
			upper = district;
		}
	}
	return {upper: upper, lower: lower};
}

DistrictList.prototype.findDistrictsForPoint = function(lat, lon) {
	return this.findExactDistrictsInList(this.findNearbyDistricts(lat, lon), lat, lon);
}

DistrictList.prototype.findDistrictsFromIDs = function(upperID, lowerID) {

	return { upper: this.getUpperDistrict( upperID.split('-')[2] ), 
             lower: this.getLowerDistrict( lowerID.split('-')[2])
            };
}


              

DistrictList.prototype.preloadDistricts = function (cb) {
	if (!this.populated) {
		this.populated = true;
		this.populator.populate(cb);
	}
}

DistrictList.prototype.createDistrictId = function (state, chamber, number) {
	return state + '-' + chamber + '-' + number;
}

DistrictList.prototype.getDistrict = function (chamber, number) {
	return this.districts[this.createDistrictId(this.state, this.chamber, this.number)];
}

const OpenStatesAPI = {
  LocalOpenStates,
  OpenStates,
  District,
  DistrictPopulator,
  DistrictList
}

export default OpenStatesAPI
