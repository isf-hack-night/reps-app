import {AMPLIFY_URL_BASE} from './local_constants';

function amplify () {
  return {
    get
  };

  function get (districtLower, districtUpper) {
    const numLower = districtLower.match(/\d+/g)[0];
    const numUpper = districtUpper.match(/\d+/g)[0];
    const url = `${AMPLIFY_URL_BASE}&stateSenateDistrict=${numUpper}&stateHouseDistrict=${numLower}`;
    return window.jQuery.get(url)
  }
}

export default amplify
