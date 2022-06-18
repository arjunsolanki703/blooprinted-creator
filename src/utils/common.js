import { getToken } from 'src/utils/auth'
import { Platform, date } from 'quasar'
import request from 'src/api'
import moment from 'moment-timezone'
import { getFireBaseUserId } from 'src/utils/jwt'

export const emailPattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
export const userNamePattern = /^[a-zA-Z\$.-\s]*$/

export const urlPattern = {
  linkedin: /http(?:s)?:\/\/(?:www\.)?linkedin\.com\/([a-zA-Z0-9_]+)/,
  twitter: /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
  facebook: /http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/,
  instagram: /http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/
}
export const file10MB = 10485760 // ***** Image Size 10 MB ***********

export const isLogin = () => {
  return !!getToken('access')
}

// ***************** Method to fetch LoggedIn User Id *****************************
export function getUserId() {
  let userId = localStorage.getItem('userId')
  return userId
}

// ***************** Method to fetch LoggedIn User Type *****************************
export function isUserAdmin() {
  let userType = localStorage.getItem('isUserAdmin')
  return JSON.parse(userType)
}

export async function checkNumberOfBlooprints() {
  let authorID = getUserId()
  try {
    const response = request.get(`/blooprints/authors/${authorID}`)
    const { data } = await response
    let blooprintCount = parseInt(data.meta.count)
    if (blooprintCount > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {}
}

export function categoryRouteNavigation() {
  let authorID = getUserId()
  try {
    const { data } = request.get(`/blooprints/authors/${authorID}`, params)
    if (data[0]['attributes']['name'] === '') {
      return false
    } else return true
  } catch (error) {}
}

export async function checkPlanExistsOrNot() {
  try {
    const response = request.get(`/subscriptions`)
    const { data } = await response
    if (data && data['id'] != '') {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

export const constants = {
  PAGE_LOGIN: 'login',
  PAGE_PROFILE: 'my-profile',
  PAGE_CREATE_BLOOPRINT: 'create-blooprint',
  PAGE_HOME: 'home',
  PAGE_DASHBOARD: 'dashboard',
  PAGE_HOME: 'home',
  PAGE_USER_BLOOPRINT_LIST: 'blooprints-list',
  PAGE_404: 'error-screen',
  STATUS: {
    ACTIVE: 'active',
    PROGRESS: 'progress',
    PUBLISH: 'publish',
    UNPUBLISH: 'unpublish'
  },
  BLOOPRINTED_URL: process.env.BLOOPRINTED_ENV_CONSUMER_URL
}

export function isMobileApp() {
  if (Platform.is.capacitor != undefined) {
    return Platform.is.capacitor
  }
  return false
}
export function getDateFormat(value) {
  return date.formatDate(new Date(value), 'DD/MM/YYYY')
}
export function saveDateFormat(date, timezoneName) {
  return moment
  .tz(date,'YYYY-MM-DD HH:mm:ss', timezoneName)
  .utc()
  .format()
}
export function discountDateFormat(value) {
  return date.formatDate(new Date(value), 'MM/DD/YYYY')
}
export async function getTimezones() {
  let timeZoneNames = []
  let timezones = await import('./timezones.json')
  // Applying the following format on timezones i.e "(GMT+05:30) India Standard Time (Asia/Kolkata)"
  Object.keys(timezones).forEach(function(key) {
    if (key === 'default') return
    let value = timezones[key]
    timeZoneNames.push(value + ' ' + '(' + key + ')')
  })
  return timeZoneNames
}

// ********************* Get TimeZone String by Timezone Name *************************
export async function getTimezoneString(timezone) {
  // Getting timezone with the following format i.e "(GMT+05:30) India Standard Time (Asia/Kolkata)"
  let timezones = await import('./timezones.json')
  return timezones[timezone] + ' ' + '(' + timezone + ')'
}

// ********************* Remove format from Timezone string  *************************
export function removeFormatFromTimezoneString(timezone) {
  return timezone.split(' (')[1].replace(')', '')
}

export function routeRedirection(next) {
  if (isLogin()) {
    next({ name: 'my-blooprints' })
  } else {
    next({ name: 'home' })
  }
}

export function adminRouteRedirection(next) {
  if (isUserAdmin()) {
    next()
  } else {
    next({ name: 'my-blooprints' })
  }
}
export function formatDateToRespectiveTimeZone(date, timezoneName) {
  return moment.tz(date, timezoneName).format('YYYY-MM-DD HH:mm:ss')
}
// ********************* Remove format from Timezone string  *************************

// ********************* Old approach *********************
// export function calcDiscountedPrice(timezone, endDate, price, discount) {
//   let today = new Date()
//   let discEndDate = ''
//   let isDiscountPresent = false
//   if (timezone && timezone != '') {
//     discEndDate = getDateFormat(
//       formatDateToRespectiveTimeZone(endDate, timezone)
//     )
//   } else {
//     discEndDate = getDateFormat(endDate)
//   }
//   let discountDate = discEndDate.split(',')[0].split('/')
//   if (Number(discountDate[2]) >= today.getFullYear()) {
//     if (
//       Number(discountDate[1]) >= today.getMonth() + 1 &&
//       Number(discountDate[0]) >= today.getDate()
//     ) {
//       isDiscountPresent = true
//     } else {
//       if (Number(discountDate[2]) > today.getFullYear()) {
//         isDiscountPresent = true
//       } else {
//         isDiscountPresent = false
//       }
//     }
//   } else {
//     isDiscountPresent = false
//   }
//   if (isDiscountPresent) {
//     return (price - price * (discount / 100)).toFixed(2)
//   } else {
//     return 0
//   }
// }

// ********************* New approach *********************
export function calcDiscountedPrice(timezone, endDate, price, discount, startDate) {
  // let today = getDateFormat(new Date())
  let month = new Date().getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day =
    new Date().getDate() > 10
      ? new Date().getDate()
      : '0' + new Date().getDate()
  let today =  month + '/' + day + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  let discEndDate = ''
  let discStartDate = ''
  let isDiscountPresent = false
  if (timezone && timezone != '') {
    discEndDate = endDate ? date.formatDate(
      formatDateToRespectiveTimeZone(endDate, timezone), 'MM/DD/YYYY HH:mm:ss'
    ) : ''
    discStartDate = startDate ? date.formatDate(
      formatDateToRespectiveTimeZone(startDate, timezone), 'MM/DD/YYYY HH:mm:ss'
    ) : ''
  } else {
    discEndDate = endDate ? date.formatDate(endDate, 'MM/DD/YYYY HH:mm:ss') : ''
    discStartDate = startDate ? date.formatDate(startDate, 'MM/DD/YYYY HH:mm:ss') : ''
  }
  if(discEndDate && discStartDate){
    if (Date.parse(discEndDate) >= Date.parse(today) && Date.parse(discStartDate) <= Date.parse(today)) {
      isDiscountPresent = true
    } else {
      isDiscountPresent = false
    }
  }
  else{ 
    if(discEndDate && discStartDate == ''){
      if (Date.parse(discEndDate) >= Date.parse(today)) {
        isDiscountPresent = true
      } else {
        isDiscountPresent = false
      }
    }
    else if(discStartDate && discEndDate == ''){
      if (Date.parse(discStartDate) <= Date.parse(today)) {
        isDiscountPresent = true
      } else {
        isDiscountPresent = false
      }
    }
    else{
      isDiscountPresent = true
    }
  }
  if (isDiscountPresent) {
    return (price - price * (discount / 100)).toFixed(2)
  } else {
    return 0
  }
}

// ********************* Remove format from Timezone string End  *************************