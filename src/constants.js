// root path to app
export const ROOT_PATH = '/index.php/test/'
// path to individual rep page
export const REPS_PATH = `${ROOT_PATH}rep/`

// operation state within the US
export const US_STATE = 'ca'

// amplify team base url
export const AMPLIFY_URL_BASE = `https://civictools.appspot-preview.com/api/v1/actions?teamId=-Kr2PPG5GTkR3oFfQ_Lq&state=${US_STATE}`

// image sources
export const CAP_PIC = 'https://nerdist.com/wp-content/uploads/2016/05/20160506_nerdistnews_capexclusive_1x1.jpg'

// actions display nums
// number of actions to show on initial actions display list load
export const ACTIONS_DISPLAY_LIMIT = 3
// number of additional actions to display on "load more" click
export const ACTIONS_DISPLAY_INCREMENT = 10

// potential url params to parse out of the url
export const PARAM_TYPES = [
  'lat',
  'lng',
  'districtLower',
  'districtUpper'
]
