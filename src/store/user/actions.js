import request from 'src/api'
import { setToken, clearStorage } from 'src/utils/auth'
import { mac } from 'src/boot/mac'
import { firebaseAuth, googleAuth } from 'src/boot/firebase'
import { getUserId } from 'src/utils/common'
import { getFireBaseUserId } from 'src/utils/jwt'

export async function createUserAccount({ commit, dispatch }, registerData) {
  commit('setLoading', true)
  var isUserAccountCreatedSuccessfully = true
  await firebaseAuth
    .createUserWithEmailAndPassword(registerData.email, registerData.password)
    .then(async user => {
      await firebaseAuth.currentUser
        .getIdToken(false)
        .then(async token => {
          setToken(token) // set token into cookie.
          let body = {
            data: {
              type: 'profiles',
              attributes: {
                email: user.user.email,
                firebaseUID: user.user.uid
              }
            }
          }
          body['data']['attributes']['firstName'] = registerData.firstName
          body['data']['attributes']['lastName'] = registerData.lastName
          body['data']['attributes']['author'] = true
          body['data']['attributes']['additonalInfo'] = {
            planName: registerData.planName,
            oneTimeLogin: false
          }
          body['data']['attributes'][
            'timeZone'
          ] = Intl.DateTimeFormat().resolvedOptions().timeZone
          try {
            const data = await request.post('/profiles', body)
            // default notification setup start
            dispatch('saveUserNotificationIno', {
              data: {
                type: 'profiles',
                attributes: {
                  blooprintAlert: false,
                  blooprintPurchased: true,
                  emailNotification: true,
                  mobileNotification: false,
                  mobileNumber: '',
                  monthlyOffers: true,
                  weeklyUpdate: true
                }
              }
            })
            // default notification setup end
            // commit('setToastMessage', {
            //   type: 'positive',
            //   message:
            //     'Instructions on how to activate your account have been sent to your email'
            // })
            commit('setLoggedIn', false)
            // if (registerData.planName == 'free') {
            //   clearStorage()
            // }

            /* MAC integration */
            try {
              const user = data.data.attributes
              mac.lead({
                email: user.email,
                username:
                  user.firstName +
                  (user.lastName === undefined ? '' : ' ' + user.lastName)
              })
            } catch (error) {
              console.log(error)
            }
            /*End of MAC integration*/
          } catch (error) {
            isUserAccountCreatedSuccessfully = false
            if (error.response) {
              dispatch('setToastMessage', {
                type: 'negative',
                caption: 'Status ' + error.response.data.status,
                message: error.response.data.title
              })
            }
          }
        })
        .catch(error => {
          isUserAccountCreatedSuccessfully = false
          dispatch('setToastMessage', {
            type: 'negative',
            message: error.message
          })
        })
    })
    .catch(error => {
      isUserAccountCreatedSuccessfully = false
      dispatch('setToastMessage', {
        type: 'negative',
        message: error.message
      })
    })
    .finally(() => {
      commit('setLoading', false)
    })
  return isUserAccountCreatedSuccessfully
}

export async function userLogin({ commit, dispatch }, loginData) {
  commit('setLoading', true)
  if (loginData) {
    firebaseAuth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => {
        let userId = res['user']['uid']
        firebaseAuth.currentUser.getIdToken().then(async access_token => {
          setToken(access_token) // set token into cookie.

          let { validUser, oneTimeLogin, plan, status } = await getUserType(
            userId
          )
          //checking if user is admin or author
          if (!validUser) {
            firebaseAuth
              .signOut()
              .then(() => {
                clearStorage()
              })
              .catch(error => {
                console.log(error)
              })
            return commit('setToastMessage', {
              type: 'negative',
              message: 'Please check your credentials and try again!'
            })
          } else {
            if (status !== 'pending') {
              // commit('setToastMessage', {
              //   type: 'positive',
              //   message: 'Login Successful!'
              // })

              //checking if user logs in for first time
              // if (!oneTimeLogin && plan !== 'free') {
              //   this.$router.replace({
              //     name: 'checkout',
              //     params: { plan: plan }
              //   })
              // } else {
              //   // this.$router.replace({
              //   //   name: 'dashboard'
              //   // })
              dispatch('fetchProfileInfo').then(() => {
                dispatch('retrieveAuthorBlooprintList').then(data => {
                  if (data.meta.count == 0) {
                    this.$router.push({
                      name: 'firstBlooprintCreation'
                    })
                  } else {
                    this.$router.push({
                      name: 'my-blooprints'
                    })
                  }
                })
              })

              /* MAC integration */
              try {
                const data = await request.get(`/profiles/${userId}`)
                const user = data.data.attributes
                mac.login({
                  email: user.email,
                  username:
                    user.firstName +
                    (user.lastName === undefined ? '' : ' ' + user.lastName)
                })
              } catch (error) {
                console.log(error)
              }
              /*End of MAC integration*/
            } else {
              dispatch('setToastMessage', {
                type: 'negative',
                message: 'Please verify your account'
              })
              clearStorage()
            }
          }
        })
      })
      .catch(error => {
        if (error.code == 'auth/user-not-found') {
          dispatch('setToastMessage', {
            type: 'negative',
            message: 'Invalid Login Credentials'
          })
        } else {
          dispatch('setToastMessage', {
            type: 'negative',
            message: error.message
          })
        }
      })
      .finally(() => {
        commit('setLoading', false)
      })
  }
}

// ************* Method For Get user type  ********************************
async function getUserType(userId) {
  var validUser
  let oneTimeLogin
  let plan
  let status
  await request.get(`/profiles/${userId}`).then(data => {
    let res = data.data.attributes
    oneTimeLogin = res.additonalInfo.oneTimeLogin
    validUser = res.author || res.admin
    status = res.status
    plan = res.additonalInfo.planName
  })
  return { validUser, oneTimeLogin, plan, status }
}

// ************* Method For Google Sign In  ********************************
export async function googleSignIn({ dispatch, commit }) {
  var provider = googleAuth()
  dispatch('setLoading', true)
  firebaseAuth
    .signInWithPopup(provider)
    .then(async result => {
      let userId = result['user']['uid']
      dispatch('setLoading', false)
      const isNewUser = result['additionalUserInfo']['isNewUser']
      firebaseAuth.currentUser.getIdToken(false).then(async token => {
        setToken(token)
        if (isNewUser) {
          var user = result.user
          let body = {
            data: {
              type: 'profiles',
              attributes: {
                email: user.email,
                firebaseUID: user.uid,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1]
                  ? user.displayName.split(' ')[1]
                  : '',
                phone: user.phoneNumber ? user.phoneNumber : '',
                author: true,
                picture: user.photoURL,
                additonalInfo: {
                  planName: 'free',
                  oneTimeLogin: false
                }
              }
            }
          }
          try {
            dispatch('setLoading', true)
            const { data } = await request.post('/profiles', body)
            // commit('setToastMessage', {
            //   type: 'positive',
            //   message:
            //     'Instructions on how to activate your account have been sent to your email'
            // })
            commit('setLoggedIn', false)
            // clearStorage()

            /* MAC integration */
            try {
              const user = data.attributes
              mac.lead({
                email: user.email,
                username:
                  user.firstName +
                  (user.lastName === undefined ? '' : ' ' + user.lastName)
              })
            } catch (error) {
              console.log(error)
            }
            /*End of MAC integration*/
            dispatch('fetchProfileInfo').then(() => {
              this.$router.push(
                {
                  name: 'firstBlooprintCreation'
                },
                () => {}
              )
            })

            // this.$router.replace({ name: 'dashboard' })
          } catch (error) {
            dispatch('setLoading', false)
            if (error.response) {
              console.log('er', error)
              dispatch('setToastMessage', {
                type: 'negative',
                caption: 'Status ' + error.response.data.status,
                message: error.response.data.title
              })
            }
          } finally {
            dispatch('setLoading', false)
          }
        } else {
          let { validUser, status } = await getUserType(userId)
          if (!validUser) {
            firebaseAuth
              .signOut()
              .then(() => {
                clearStorage()
              })
              .catch(error => {
                console.log(error)
              })
            return commit('setToastMessage', {
              type: 'negative',
              message: 'Please check your credentials and try again!'
            })
          } else {
            if (status !== 'pending') {
              dispatch('fetchProfileInfo').then(() => {
                dispatch('retrieveAuthorBlooprintList').then(data => {
                  if (data.meta.count == 0) {
                    this.$router.push({
                      name: 'firstBlooprintCreation'
                    })
                  } else {
                    this.$router.push({
                      name: 'my-blooprints'
                    })
                  }
                })
              })
              // this.$router.replace({ name: 'dashboard' })

              /* MAC integration */
              try {
                const data = await request.get(`/profiles/${userId}`)
                const user = data.data.attributes
                mac.login({
                  email: user.email,
                  username:
                    user.firstName +
                    (user.lastName === undefined ? '' : ' ' + user.lastName)
                })
              } catch (error) {
                console.log(error)
              }
              /*End of MAC integration*/
            } else {
              dispatch('setToastMessage', {
                type: 'negative',
                message: 'Please verify your account'
              })
              clearStorage()
            }
          }
        }
      })
    })
    .catch(error => {
      dispatch('setToastMessage', {
        type: 'negative',
        message: error.message
      })
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
}

//****************** API to activate user account *******************
export async function userAccountActivation({ commit, dispatch }, token) {
  commit('setLoading', true)
  commit('setErrorInAccountActivation', '')
  try {
    const { data } = await request.post(`/profiles/activation?secure=${token}`)
    const tokenInfo = data.attributes.message
    setToken(tokenInfo)
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
      commit('setErrorInAccountActivation', error.response.data.title)
    } else {
      commit(
        'setErrorInAccountActivation',
        "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that., please try again later"
      )
    }
  } finally {
    commit('setLoading', false)
  }
}

// ****************** API to Follow an Author ***************************************
export async function followAuthor({ dispatch }, authorInfo) {
  let authorID = this.$router.history.current.params.profileId
  if (!authorID) {
    authorID = authorInfo['authorID']
  }
  let userID = getUserId()
  let isFollowSuccess = false
  try {
    dispatch('setLoading', true)
    let params = {
      data: {
        type: 'relationships',
        attributes: {
          following: authorID
        }
      }
    }
    let followResponse = await request.post(
      `profiles/${userID}/relationships/following`,
      params
    )
    if (followResponse['data']['attributes']['following']) {
      isFollowSuccess = true
    }
    return isFollowSuccess
  } catch (error) {
    dispatch('setLoading', false)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.detail
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}

// ****************** API to Un-Follow an Author ***************************************
export async function unFollowAuthor({ dispatch }, authorInfo) {
  let authorID = this.$router.history.current.params.profileId
  if (!authorID) {
    authorID = authorInfo['authorID']
  }
  let userID = getUserId()
  let isUnFollowSuccess = false
  try {
    dispatch('setLoading', true)
    let params = {
      data: {
        type: 'relationships',
        attributes: {
          unfollow: authorID
        }
      }
    }
    let unFollowResponse = await request.post(
      `profiles/${userID}/relationships/unfollow`,
      params
    )

    if (unFollowResponse['data']['attributes']['unfollow']) {
      isUnFollowSuccess = true
    }
    return isUnFollowSuccess
  } catch (error) {
    dispatch('setLoading', false)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.detail
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}

// ********************* API to Update User Profile Data *************************
export async function updateProfileInfo({ commit }, profileData) {
  let requestFrom = ''
  let profileId = profileData['profileId']
  delete profileData['profileId']
  if (profileData['requestFrom']) {
    requestFrom = profileData['requestFrom']
    delete profileData['requestFrom']
  }
  commit('setLoading', true)
  let isProfileUpdated = false
  await request
    .patch(`/profiles/${profileId}`, profileData)
    .then(data => {
      let profileData = data['data']
      if (profileData) {
        let result = {
          ...profileData['attributes'],
          id: profileData['id']
        }
        if (requestFrom != 'editProfilePicture') {
          if (profileId == getFireBaseUserId()) {
            localStorage.setItem('userId', profileData['id'])
            localStorage.setItem(
              'isUserAdmin',
              profileData['attributes']['admin']
            )
            commit('setUserProfile', result)
          }
          if (localStorage.getItem('userId') == profileId) {
            commit('setUserProfile', result)
          }
        }
        if (requestFrom == 'editProfilePicture') {
          commit('setProfilePicture', result['picture'])
        }
      }
      if (requestFrom != 'socialMediaSkip') {
        commit('setToastMessage', {
          type: 'positive',
          message: 'Profile Data Updated Successfully'
        })
      }
      isProfileUpdated = true
    })
    .catch(error => {
      if (error.response) {
        commit('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      commit('setLoading', false)
    })
  return isProfileUpdated
}

// ********************* API to Get User Profile Info Based on ID *************************
export async function fetchProfileInfo({ commit, dispatch }, params) {
  let profileId = this.$router.history.current.params.profileId
  let profileInfo = {}
  if (params && params['authorId']) {
    profileId = params['authorId']
  }
  if (!profileId) {
    profileId = getFireBaseUserId()
  }
  //  if (profileData && profileData['showLoader']) {
  // dispatch('setLoading', true)
  // }
  commit('setErrorInGettingUserDetails', '')
  await request
    .get(`/profiles/${profileId}`)
    .then(data => {
      let profileData = data['data']
      if (profileData) {
        let result = {
          ...profileData['attributes'],
          id: profileData['id']
        }
        if (profileId == getFireBaseUserId()) {
          localStorage.setItem('userId', profileData['id'])
          localStorage.setItem(
            'isUserAdmin',
            profileData['attributes']['admin']
          )
          commit('setUserProfile', result)
        }
        if (localStorage.getItem('userId') == profileId) {
          commit('setUserProfile', result)
        }
        profileInfo = result
      }
    })
    .catch(error => {
      console.log(error)
      if (localStorage.getItem('userId') == profileId) {
        commit('setUserProfile', {})
      }
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        commit(
          'setErrorInGettingUserDetails',
          "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that."
        )
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return profileInfo
}

export async function sendResetEmail({ dispatch }, params) {
  try {
    dispatch('setLoading', true)
    let body = {
      data: {
        type: 'profiles',
        attributes: {
          email: params.recoveryEmail,
          platform: 'studio'
        }
      }
    }
    await request.post(`profiles/reset-password`, body)
    return true
  } catch (error) {
    if (error.code == 'auth/user-not-found') {
      return true
    } else {
      dispatch('setToastMessage', {
        type: 'negative',
        message: error.message
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}

export async function resetPassword({ dispatch }, params) {
  try {
    dispatch('setLoading', true)
    let body = {
      data: {
        type: 'profiles',
        attributes: {
          password: params.password
        }
      }
    }
    let data = await request.post(
      `profiles/reset-password?secure=${params.code}`,
      body
    )
    if (data) {
      return true
    }
  } catch (error) {
    dispatch('setToastMessage', {
      type: 'negative',
      message: error.message
    })
    return false
  } finally {
    dispatch('setLoading', false)
  }
}

export async function setOneTimeLogin({}, plan) {
  let userID = getUserId()
  if (userID) {
    let body = {
      data: {
        type: 'profiles',
        attributes: {
          additonalInfo: {
            planName: plan,
            oneTimeLogin: true
          }
        }
      }
    }
    await request.patch(`/profiles/${userID}`, body)
  }
}
// ********************* API to Delete User Data *************************
export async function deleteUser({ dispatch }) {
  dispatch('setLoading', true)
  let profileId = localStorage.getItem('userId')

  await request
    .delete(`/profiles/${profileId}`)
    .then(result => {
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'User Profile Deleted Successfully'
      })
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
      clearStorage()
      this.$router.replace({
        name: 'login'
      })
    })
}

// ********************* Method for User Logout *************************
export function userLogout({ dispatch, commit }) {
  dispatch('setLoading', true)

  firebaseAuth
    .signOut()
    .then(() => {
      clearStorage()
      this.$router.push({ name: 'index' }, () => {})
    })
    .catch(error => {
      dispatch('setLoading', false)
      console.log(error)
    })
    .finally(() => {
      dispatch('setLoading', false)
      commit('setLoggedIn', false)
      commit('setUserProfile', {})
    })
}
// ************************* API to Fetch All Authors List ***********************************
export async function fetchAllAuthorsList({ dispatch }, params) {
  try {
    let authorsData = await request.get(`profiles/authors`, params)
    if (authorsData['status'] == 200) {
      authorsData['data'].map(item => {
        item['selectionCount'] = 0
        item['isSelected'] = false
      })
      return authorsData['data']
    }
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.detail
      })
    } else {
      dispatch('isAPIResponseFailed', true)
    }
  } finally {
    dispatch('setLoading', false)
  }
}
// *************** API to Add the Authors to Popular Author List *************************
export async function addAuthorsToPopular({ dispatch }, params) {
  let isAuthorAddedToPopular = false
  dispatch('setLoading', true)
  await request
    .post(`/profiles/authors/popular`, params)
    .then(result => {
      console.log(result)
      if (result['status'] == 200) {
        isAuthorAddedToPopular = true
        dispatch('setToastMessage', {
          type: 'positive',
          caption: 'Popular Authors',
          message: 'Selected Authors are added to Popular Authors'
        })
      }
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return isAuthorAddedToPopular
}

// *************** API to Retrieve the Popular Authors List *********************************
export async function fetchPopularAuthorsList({ dispatch }) {
  let popularAuthorsList = []
  dispatch('setLoading', true)
  await request
    .get(`/profiles/authors/popular`)
    .then(result => {
      popularAuthorsList = result['data']
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return popularAuthorsList
}
// *************** Change Password *********************************
export async function updateLoginCredentials(
  { commit, dispatch, getters },
  loginData
) {
  commit('setLoading', true)
  var passwordSuccess = true
  if (loginData) {
    await firebaseAuth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => {
        let userId = res['user']['uid']
        firebaseAuth.currentUser.getIdToken().then(async access_token => {
          try {
            firebaseAuth.currentUser
              .updatePassword(loginData.newPassword)
              .then(() => {
                dispatch('setToastMessage', {
                  type: 'positive',
                  message: 'Password has been updated successfully!!'
                })
              })
              .catch(error => {
                dispatch('setToastMessage', {
                  type: 'positive',
                  message: error.message
                })
                passwordSuccess = false
              })
          } catch (error) {
            console.log(error)
            passwordSuccess = false
          }
        })
      })
      .catch(error => {
        dispatch('setToastMessage', {
          type: 'negative',
          message: error.message
        })
        passwordSuccess = false
      })
      .finally(() => {
        commit('setLoading', false)
      })
  }
  return passwordSuccess
}
export async function getProfileDetailsList({ commit }, profileInfo) {
  let profileList = {}
  try {
    const { data } = await request.post('profiles/lists', profileInfo)
    data.forEach(item => {
      profileList[item.attributes.firebaseUID] = {
        name: `${item.attributes.firstName} ${item.attributes.lastName}`,
        photoURL: item.attributes.picture,
        uid: item.attributes.firebaseUID,
        caption: item.attributes.companyName
      }
    })
    return profileList
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
    return []
  }
}
