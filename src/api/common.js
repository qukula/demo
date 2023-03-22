import request from './index'
function requestMethod (data, url, method = 'get') {
  const type = method === 'get' ? 'params' : 'data'
  return request({
    url,
    method,
    [type]: data
  })
}
export default requestMethod
