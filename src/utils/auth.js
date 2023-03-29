import Cookies from 'js-cookie'

export function getCookie (TokenKey) {
  return Cookies.get(TokenKey)
}

export function setCookie (TokenKey, value, time) {
  if (time) {
    return Cookies.set(TokenKey, value, { expires: new Date(new Date().getTime() + time) })
  } else {
    return Cookies.set(TokenKey, value)
  }
}

export function removeCookie (TokenKey) {
  return Cookies.remove(TokenKey)
}
