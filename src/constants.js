// root path to app

const INJECTION_DEV_MODE = true

export const ROOT_PATH =  INJECTION_DEV_MODE ? '/index.php/test/' : '/'

export const QUERY_SPLIT = INJECTION_DEV_MODE ? '/index.php/test/' : '.org/'

// path to individual rep page
export const REPS_PATH = `${ROOT_PATH}rep/`

// operation state within the US
export const US_STATE = 'ca'

// state center lat/lng
export const STATE_CENTER = [37.2719, -119.2702]

// state boundaries
export const STATE_BOUNDS = [[32.5343, -124.4096], [42.0095, -114.1308]]

export const MAP_PRECISION = 4

// amplify team base url
export const AMPLIFY_URL_BASE = `https://civictools.appspot-preview.com/api/v1/actions?teamId=-Kr2PPG5GTkR3oFfQ_Lq&state=${US_STATE}`

export const ACTION_TYPES = ['call' , 'flex']

// image sources
//export const CAP_PIC = 'https://nerdist.com/wp-content/uploads/2016/05/20160506_nerdistnews_capexclusive_1x1.jpg'
export const REP_PIC_PATH = 'https://s3-us-west-1.amazonaws.com/amplify-portraits/'


// actions display nums
// number of actions to show on initial actions display list load
export const ACTIONS_DISPLAY_LIMIT = 3
// number of additional actions to display on "load more" click
export const ACTIONS_DISPLAY_INCREMENT = 10

// potential url params to parse out of the url
export const PARAM_TYPES = [
  'lat',
  'lng',
  'actionId',
  'districtLower',
  'districtUpper'
]

// colors
export const COLORS = {
  TEXT: {
    BLUE: '#0071b9',
    RED: '#ff0000',
  },
  DISTRICT: {
  	UPPER: '#fbb040',
    LOWER: '#39b54a', 
  }

}

// consistent copy
export const DATA_FINE_PRINT = 'Address is only used to determine your districts. We do not store or retain any personal info.'

export const TEST_CUSTOM_ACTION = {
      "callPersonIds": null,
      "id": "-Ktl8MDnYmhFrVeyCeS9",
      "parentActionId": "-KtJNz7GMwj_fygB5FyG",
      "teamId": "-Kd27R2-vkjuWxHEQ23A",
      "state": "CA",
      "originalTeamId": "-Kd27R2-vkjuWxHEQ23A",
      "lastAuthorUid": "56sdEKWCArcVg4XuhaO9wK07qTg2",
      "orderId": 20860000,
      "type": "flex",
      "preTitle": "Urge Governor Brown to",
      "title": "support the current form of SB 54, which would make California a sanctuary state",
      "callPersonId": null,
      "callTargetType": null,
      "callPersonType": null,
      "callScriptMd": null,
      "callBackgroundMd": null,
      "flexBodyMd": "Sacramento Office: (916) 445-2841\n\n[Email Contact](https://govapps.gov.ca.gov/gov39mail/)\n\n#Script\n>Hello, my name is _____ and I am from ____________.   I am also a member of Indivisible SF.\n\n>I'm calling Governor Brown to ask him to withdraw his proposed amendments to SB 54. SB 54 is intended to shield California's immigrants from persecution by the Trump administration, and his amendments would undo critical components of the bill. I am particularly concerned that the amendments would direct California's prisons and jails to comply with unconstitutional immigration detainers. I'm asking the Governor to support SB 54 as written, not to weaken its protections for undocumented Californians.\n\n#Background\n[SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54), the California Values Act, prohibits state and local agencies from using resources to enforce actions of Immigration and Customs Enforcement (ICE). These resources will instead be used for their intended purpose, local law enforcement. California taxpayers should not have to pay to do the bidding of the federal government, especially when the federal government pursues policies counter to the values of California.\n\nGovernor Brown has [drafted amendments](https://theintercept.com/2017/08/28/jerry-brown-sb54-california-sanctuary-state-ice-prisons/) that would gut SB 54. \n\nHis changes would:\n\n- Expand the category of undocumented immigrants that can be handed over to ICE\n- Continue to let ICE agents access local jails and prisons, where they can question and detain immigrants\n- Play directly into Trump's anti-immigrant policies by creating a pathway for California's prisons and jails to detain immigrants for ICE. No jurisdiction currently enforces ICE holds because federal courts have found such detainers to be unconstitutional",
      "startTs": null,
      "endTs": null,
      "isEnabled": 1,
      "createdAt": "2017-09-05T23:33:09.000Z",
      "updatedAt": "2017-09-11T13:33:53.000Z"
    }