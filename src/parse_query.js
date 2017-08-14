import { ROOT_PATH, PARAM_TYPES } from './constants'

function parseQuery () {
  const url = window.location.href
  const queryParams = url.split(ROOT_PATH)[1]
  const paramData = getParamData(queryParams)
  return paramData
}

function getParamData (params) {
  let paramsObj
  const paramsArr = params.match(/(\?|\&)([^=]+)\=([^&]+)/g)
  if (paramsArr && paramsArr.length) {
    paramsObj = paramsArr.reduce((memo, param) => {
      PARAM_TYPES.forEach((type) => {
        if (param.indexOf(type) > -1) {
          memo[type] = param.split(`${type}=`)[1]
        }
      })
      return memo
    }, {})
  }
  return paramsObj
}

export default parseQuery
