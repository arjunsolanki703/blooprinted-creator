import { Cookies } from 'quasar'

const tokenName = 'access_token'
const tokenSettings = { domain: process.env.DOMAIN }

export function setToken(token) {
  // Cookies.set(tokenName, token, tokenSettings)
  localStorage.setItem(tokenName, token)
}

export function removeToken() {
  // Cookies.remove(tokenName, tokenSettings)
  localStorage.removeItem(tokenName)
}

export function clearStorage() {
  localStorage.clear()
}

export function getToken(item) {
  return item == 'access'
    ? localStorage.getItem(tokenName)
    : localStorage.getItem(item)
}
