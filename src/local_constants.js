// root path to app
export const ROOT_REACT_ELEMENT = 'reps_app_root';

const INJECTION_DEV_MODE = true;
const DEV_SITE_MODE = true;

const INJECTION_TEST_PAGE_PATH = DEV_SITE_MODE ? '/test' : '/index.php/test';

export const ROOT_PATH = INJECTION_DEV_MODE ? INJECTION_TEST_PAGE_PATH : '/';

export const QUERY_SPLIT = INJECTION_DEV_MODE ? INJECTION_TEST_PAGE_PATH : '.org/';

// operation state within the US
export const US_STATE = 'ca';

// state center lat/lng
export const STATE_CENTER = [37.2719, -119.2702];

// state boundaries
export const STATE_BOUNDS = [[32.528832, -124.482003], [42.009517, -114.131211]];

export const STATE_BOUNDS_PADDING = 0;

// amplify team base url
export const AMPLIFY_URL_BASE = `https://civictools.appspot-preview.com/api/v1/actions?teamId=-Kr2PPG5GTkR3oFfQ_Lq&state=${US_STATE}`;

// Open states url base
export const OPEN_STATES_URL_BASE = 'https://api.state-strong.org/open-states/api/v1';

// Legiscan url base
export const LEGISCAN_URL_BASE = 'https://api.legiscan.com';

// Map url base
export const MAP_URL_BASE = 'https://api.state-strong.org/civic-key/front-page';

// Location search url base
export const LOCATION_SEARCH_URL_BASE = 'https://api.state-strong.org/civic-key/front-page';

// District lookup url base
export const DISTRICT_LOOKUP_URL_BASE = 'https://api.state-strong.org/civic-key/district-lookup';


export const ACTION_TYPES = ['call', 'flex'];

// image sources
//export const CAP_PIC = 'https://nerdist.com/wp-content/uploads/2016/05/20160506_nerdistnews_capexclusive_1x1.jpg'
export const REP_PIC_PATH = 'https://s3-us-west-1.amazonaws.com/amplify-portraits/';

// actions display nums
// number of actions to show on initial actions display list load
export const ACTIONS_DISPLAY_LIMIT = 3;
// number of additional actions to display on "load more" click
export const ACTIONS_DISPLAY_INCREMENT = 10;

// potential url params to parse out of the url
export const PARAM_TYPES = [
  'lat',
  'lng',
  'actionId',
  'districtLower',
  'districtUpper',
  'legIdUpper',
  'legIdLower',
];

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
};

// consistent copy

export const DATA_FINE_PRINT = 'Address is used only to determine your districts. We do not store or retain any personal info.';


