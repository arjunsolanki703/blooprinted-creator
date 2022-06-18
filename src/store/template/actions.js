import request from 'src/api'
import { getUserId } from 'src/utils/common'
import { buildApiData } from 'src/utils/api'

// ********************* API to Create Email Templates *************************
export async function createEmailTemplate({ commit, dispatch }, templateData) {
  commit('setLoading', true)
  try {
    await request.post(
      '/email/templates',
      buildApiData('email templates', templateData)
    )
    commit('setToastMessage', {
      type: 'positive',
      message: 'Email template created successfully!'
    })
    this.$router.replace({ name: 'manage templates' })
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    commit('setLoading', false)
  }
}

// ********************* API to Update Email Template *************************
export async function updateEmailTemplate({ commit, dispatch }, templateData) {
  commit('setLoading', true)
  try {
    await request.put(
      `/email/templates/${templateData.id}`,
      buildApiData('email templates', templateData.attributes)
    )
    commit('setToastMessage', {
      type: 'positive',
      message: 'Email template updated successfully!'
    })
    this.$router.replace({ name: 'manage templates' })
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    commit('setLoading', false)
  }
}

// ********************* API to Get Email Template by ID *************************
export async function getEmailTemplateById({ commit, dispatch }, id) {
  await request
    .get(`/email/templates/${id}`)
    .then(result => {
      commit('setEmailTemplateForEdit', result['data']['attributes'])
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        dispatch('isAPIResponseFailed', true)
      }
      commit('setEmailTemplateForEdit', {})
    })
    .finally(() => {})
}

// ********************* API to Get Email Templates *************************
export async function getEmailTemplates({ commit, dispatch }, params) {
  await request
    .get(`/email/templates`, params)
    .then(result => {
      commit('setEmailTemplates', result['data'])
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        dispatch('isAPIResponseFailed', true)
      }
      commit('setEmailTemplates', [])
    })
    .finally(() => {})
}

// ********************* API to Get Template Tokens *************************
export async function getTemplateTokens({ commit, dispatch }, params) {
  await request
    .get('/email/templates/tokens', params)
    .then(result => {
      commit('setTemplateTokens', result['data']['attributes']['tokens'])
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        dispatch('isAPIResponseFailed', true)
      }
      commit('setTemplateTokens', [])
    })
    .finally(() => {})
}
