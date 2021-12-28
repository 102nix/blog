const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
const STAY_ON = 'user-stay-on'

export function setTokens ({ refreshToken, idToken, localId, stayOn = false, expiresIn = 3600 }, setAuth) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(USERID_KEY, localId)
  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
  localStorage.setItem(STAY_ON, stayOn)
  // if (getRefreshToken() && getExpiresToken() && getStayOn()) {
  //   setAuth(true)
  // } else if (getRefreshToken() && getExpiresToken() > Date.now()) {
  //   setAuth(true)
  // } else {
  //   setAuth(false)
  // }
  checkLogin(setAuth)
}
export function getAccessToken () {
  return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken () {
  return localStorage.getItem(REFRESH_KEY)
}
export function getExpiresToken () {
  return localStorage.getItem(EXPIRES_KEY)
}
export function getUserId () {
  return localStorage.getItem(USERID_KEY)
}
export function getStayOn () {
  return localStorage.getItem(STAY_ON)
}
export function removeAuthData () {
  localStorage.removeItem(USERID_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(STAY_ON)
}
export function checkLogin (setAuth) {
  if ((getRefreshToken() && getExpiresToken() && getStayOn()) === true) {
    setAuth(true)
  } else if (getRefreshToken() && getExpiresToken() > Date.now()) {
    setAuth(true)
  } else {
    setAuth(false)
  }
}
const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresToken,
  getUserId,
  getStayOn,
  removeAuthData,
  checkLogin
}

export default localStorageService