import OpenStatesAPI from './openstates'
let locOpenStates = new OpenStatesAPI.LocalOpenStates()
let districts = locOpenStates.getDistricts('ca')
let stateDistricts = new OpenStatesAPI.DistrictList(districts, 'ca', locOpenStates)
stateDistricts.preloadDistricts()

function connector () {
  const registry = []

  return {
    register,
    updatePoint
  }
  
  // function setMap (input) {
  //   map = input
  // }

  // function setDisplay (input) {
  //   updateDisplay = input
  // }

  function register (input) {
    registry.push(input)
  }

  function updatePoint (lat, lon) {
    let districtData = stateDistricts.findDistrictsForPoint(lat, lon)
    registry.forEach((func) => func(districtData, lat, lon))
    // if (map) {

    //   map.zoomDistrict(districtData, lat, lon)
    // }
    // if (updateDisplay) {
    //   updateDisplay(districtData)
    // }
    // console.log('map: ', map, 'display: ', updateDisplay, 'data: ', districtData)
  }
}

export default connector
