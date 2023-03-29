
import { getCookie, setCookie, removeCookie } from './auth'
class Token {
  constructor (tokenKey, refreshKey) {
    this.tokenKey = tokenKey
    this.refreshKey = refreshKey
  }

  setToken (auth, expires) {
    setCookie(this.tokenKey, auth, expires)
  }

  getToken () {
    return getCookie(this.tokenKey)
  }

  removeToken () {
    removeCookie(this.tokenKey)
  }

  setRefreshToken (auth, expires) {
    setCookie(this.refreshKey, auth, expires)
  }

  getRefreshToken () {
    return getCookie(this.refreshKey)
  }

  removeRefreshToken () {
    removeCookie(this.refreshKey)
  }
}

export default new Token('template-t', 'template-rt')
