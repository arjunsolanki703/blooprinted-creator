import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import { getFireBaseUserId } from 'src/utils/jwt'
import timezones from 'src/utils/timezones'
import request from 'src/api'

export function setLoading({ commit }, value) {
  commit('setLoading', value)
}

export function setToastMessage({ commit }, message) {
  commit('setToastMessage', message)
}

export function setAPIResponseType({ commit }, type) {
  commit('setAPIResponseType', type)
}

export function isAPIResponseFailed({ commit }, type) {
  commit('isAPIResponseFailed', type)
}

export function fileUploadToFirebase({ commit, dispatch }, params) {
  dispatch('setLoading', true)
  let fileUrl = ''
  try {
    let url = `${getFireBaseUserId()}/${params.from}/${new Date().getTime()}/${
      params.file.name
    }`
    const ref = firebase.storage().ref(url)
    const storageRef = ref.put(params.file)
    storageRef.on(
      'state_changed',
      snapshot => {
        let progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      error => {
        console.log(error.message)
        dispatch('setLoading', false)
        dispatch('setToastMessage', {
          type: 'negative',
          message: error.message
        })
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
          fileUrl = downloadURL
          let fileResponse = {
            url: downloadURL,
            type: params['type']
          }
          if (params['index'] != null && params['index'] != undefined) {
            fileResponse['index'] = params['index']
          }
          commit('updateFileUrl', fileResponse)
          dispatch('setLoading', false)
        })
      }
    )
    return fileUrl
  } catch (error) {
    dispatch('setLoading', false)
    dispatch('setToastMessage', {
      type: 'negative',
      message: error.message
    })
  }
}

export async function getTimezoneNames() {
  return timezones
}
