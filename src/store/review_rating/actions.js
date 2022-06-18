import request from 'src/api'

// ********************* API to Add Blooprint to WishList *************************
export async function fetchReviewsList({ dispatch }, params) {
  let reviewList = []
  await request
    .get(`/reviews`, params)
    .then(result => {
      reviewList = result['data']
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
    .finally(() => {})
  return reviewList
}

// ********************* API to Save the Review/Rating *************************
export async function saveReviewAndRating({ dispatch }, params) {
  let isReviewSaved = false
  dispatch('setLoading', true)

  await request
    .post(`/reviews`, params)
    .then(result => {
      isReviewSaved = true
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Review Submitted Successfully'
      })
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.detail
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return isReviewSaved
}

// ********************* API to Get Blooprint Rating *************************
export async function getBlooprintRating({ dispatch }, blooprintId) {
  let ratingValue = { isError: false, value: 0 }
  dispatch('setLoading', true)
  try {
    let result = await request.get(
      `/reviews/blooprints/${blooprintId}/rating`
    )
    ratingValue['value'] = result['data']['attributes']['blooprintRating']
    dispatch('setLoading', false)
  } catch (error) {
    ratingValue['isError'] = true
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
    dispatch('setLoading', false)
  }
  return ratingValue
}

// ********************* API to Get Author Rating *************************
export async function getAuthorRating({ dispatch }, requestFrom) {
  let ratingValue = { isError: false }
  dispatch('setLoading', true)
  let authorId
  if (requestFrom['from'] == 'desktop') {
    authorId = requestFrom['isLoggedInUser']
      ? localStorage.getItem('userId')
      : this.$router.history.current.params.profileId
  }
  await request
    .get(`/reviews/authors/${authorId}/rating`)
    .then(result => {
      ratingValue['data'] = result['data']['attributes']
    })
    .catch(error => {
      ratingValue['isError'] = true
      console.log(error)
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return ratingValue
}

// ********************* API to Get Review Details By Id *************************
export async function getReviewById({ dispatch }, reviewId) {
  let reviewDetails = {}
  dispatch('setLoading', true)
  await request
    .get(`/reviews/${reviewId}`)
    .then(result => {
      reviewDetails = result['data']
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
  return reviewDetails
}
// ********************* API to Update the Review/Rating *************************
export async function updateReviewAndRating({ dispatch }, params) {
  let isReviewSaved = false
  dispatch('setLoading', true)
  let reviewId = params['reviewId']
  delete params['reviewId']

  await request
    .put(`/reviews/${reviewId}`, params)
    .then(result => {
      isReviewSaved = true
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Review Updated Successfully'
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
    })
  return isReviewSaved
}
