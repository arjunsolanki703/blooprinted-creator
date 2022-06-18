import request from 'src/api'
import { buildApiData } from 'src/utils/api'
import { Loading } from 'quasar'

export async function updateCustomerCreditCard({ commit, dispatch }, token) {
  try {
    commit('setPaymentError', '')
    commit('setPaymentLoading', true)
    let body = {
      data: {
        type: 'card',
        attributes: {
          creditCardToken: token
        }
      }
    }
    const { data } = await request.put('subscriptions/credit-card', body)
    commit('setCardInfo', {
      brand: data.attributes.brand,
      last4: data.attributes.last4,
      expMonth: data.attributes.expMonth,
      expYear: data.attributes.expYear,
      name: data.attributes.name === undefined ? '' : data.attributes.name
    })
    dispatch('setToastMessage', {
      type: 'positive',
      message: 'Card updated successfully!'
    })
  } catch (e) {
    console.log(e)
    if (e.response === undefined) {
      commit(
        'setPaymentError',
        "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that., please try again later"
      )
    } else {
      commit('setPaymentError', e.response.data.detail)
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + e.response.data.status,
        message: e.response.data.title
      })
    }
  } finally {
    commit('setPaymentLoading', false)
  }
}

export async function getCardDetails({ commit, dispatch }) {
  let cardInfo = {}
  // dispatch('setLoading', true)
  try {
    let body = {
      // data: {
      //   type: 'blooprint',
      //   attributes: blooprintData
      // }
    }
    const { data } = await request.get('/subscriptions/credit-card', body)
    cardInfo = data
    commit('setCardInfo', {
      brand: data.attributes.brand,
      last4: data.attributes.last4,
      expMonth: data.attributes.expMonth,
      expYear: data.attributes.expYear,
      name: data.attributes.name === undefined ? '' : data.attributes.name
    })
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
  return cardInfo
}

export async function getPlans({ commit, dispatch }) {
  let plansList = []
  try {
    const { data } = await request.get('/subscriptions/plans', {
      type: 'studio'
    })
    let plans = []
    data.forEach(plan => {
      plans.push(plan.attributes)
    })
    commit('setAllPlans', plans)
    plansList = plans
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    } else {
      dispatch('isAPIResponseFailed', true)
    }
  }
  return plansList
}

export async function getPlansForSelf({ commit, dispatch }) {
  let plans = []
  try {
    const { data } = await request.get('/subscriptions/plans', {
      type: 'self'
    })
    data.forEach(plan => {
      plans.push(plan.attributes)
    })
    commit('setSelfPlans', plans)
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    } else {
      dispatch('isAPIResponseFailed', true)
    }
  }
  return plans
}

export async function getCurrentPlanInfo({ commit, dispatch }) {
  try {
    const { data } = await request.get('/subscriptions')
    commit('setCurrentPlan', {
      name: data.attributes.planName,
      Id: data.attributes.planID,
      subscriptionID: data.id,
      accessibleBlooprints: data.attributes.accessibleBlooprints,
      doneForYou: data.attributes.doneForYou
    })
    return data
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  }
}

// Create customer and its subscription
export async function createCustomerAndSubscription(
  { commit, dispatch },
  payload
) {
  try {
    commit('setPaymentLoading', true)
    commit('setPaymentError', '')
    const { data } = await request.post(
      '/subscriptions',
      buildApiData('subscriptions', payload)
    )
    commit('setCustomerSubscription', data.attributes)
  } catch (error) {
    if (error.response === undefined) {
      commit(
        'setPaymentError',
        "Uh... Error 500! Something went wrong at our end. Don't worry, its not you - it's us. Sorry about that., please try again later"
      )
    } else {
      commit('setPaymentError', error.response.data.detail)
      dispatch('setToastMessage', {
        type: 'negative',
        caption: error.response.data.detail,
        message: 'Oops! Payment Failed',
        timeout: 6000,
        classes: 'payment-fail-toast'
      })
    }
  } finally {
    commit('setPaymentLoading', false)
  }
}

// Update customer subscription
export async function updateCustomerSubscription(
  { commit, dispatch },
  payload
) {
  try {
    Loading.show({
      message:
        '<div class="text-white text-h5">Switching your plan</div> <div class=" text-h6 text-carrotOrange text-weight-bold">Hang on...</div>'
    })
    const body = {
      data: {
        type: 'subscriptions',
        id: payload.id,
        attributes: {
          planID: payload.planID,
          priceID: payload.priceID,
          planName: payload.planName
        }
      }
    }
    const { data } = await request.put('/subscriptions', body)
    commit('setCurrentPlan', {
      name: data.attributes.planName,
      Id: data.attributes.planID,
      subscriptionID: data.id
    })
    dispatch('setToastMessage', {
      type: 'positive',
      message:
        'Congratulations! Your plan has been changed to ' + payload.planName
    })
  } catch (error) {
    console.log(error)
    commit('setPaymentError', error.response.data.detail)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    Loading.hide()
  }
}

// for order history
export async function getOrderHistory({ commit }, { offset,limit,type }) {
  commit('clearOrderHistory')
  await request
   // .get(`/reports?type=json&offset=${offset}&limit=${limit}`)
   .get(`/reports?type=json&offset=${offset}&limit=${limit}`)
    .then(({ data }) => {
      commit('setOrderHistory', { data, type })
    })
    .catch(error => {
      console.log(error)
    })
}
