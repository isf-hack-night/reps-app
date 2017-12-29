import {PARAM_TYPES, QUERY_SPLIT} from './local_constants';

function parseQuery () {
  const url = window.location.href;
  const queryParams = url.split(QUERY_SPLIT)[1];
  const paramData = getParamData(queryParams);
  return paramData
}

function getParamData (params) {
  let paramsObj;
  const paramsArr = params.match(/(\?|\&)([^=]+)\=([^&]+)/g);
  if (paramsArr && paramsArr.length) {
    paramsObj = paramsArr.reduce((memo, param) => {
      PARAM_TYPES.forEach((type) => {
        if (param.indexOf(type) > -1) {
          memo[type] = param.split(`${type}=`)[1]
        }
      });
      return memo
    }, {})
  }
  return paramsObj
}

function buildQuery (paramsObj) {
  const queryParams = Object.keys(paramsObj).map((key, index) => {
    const firstChar = index === 0 ? '?' : '&';
    return `${firstChar}${key}=${paramsObj[key]}`
  });

  return [''].concat(queryParams).join('')
}

const queryAPI = {
  parse: parseQuery,
  build: buildQuery
};

export default queryAPI
