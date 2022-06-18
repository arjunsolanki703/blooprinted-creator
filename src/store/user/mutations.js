export function setLoggedIn(state, value) {
  state.loggedIn = value
}
export function setUserProfile(state, value) {
  state.userProfile = value.picture ? value : { picture: '', ...value }
}
export function setErrorInAccountActivation(state, value) {
  state.errorInAccountActivation = value
}
// update only profile picture
export function setProfilePicture(state, value) {
  state.userProfile.picture = value ? value : ''
}

export const setUnreadMessagesCount = (state, value) => {
  state.unreadMessagesCount = value
}
