export function setLoading(state, value) {
  state.showLoading = value
}

export function setToastMessage(state, value) {
  state.toastMessage = value
}
export function setAPIResponseType(state, value) {
  state.apiResponseType = value
}
export function isAPIResponseFailed(state, value) {
  state.isApiResponseFailed = value
}
export function updateFileUrl(state, value) {
  state.fileUrl = value
}
export function setErrorInGettingUserDetails(state, value) {
  state.errorInGettingUserDetails = value
}