import request from 'src/api'
import { constants, getUserId } from 'src/utils/common'

// ********************* API create Blooprint*************************
export async function createBlooprint({ commit, dispatch }, blooprintData) {
  commit('setLoading', true)
  try {
    let body = {
      data: {
        type: 'blooprints',
        attributes: blooprintData
      }
    }
    let { data } = await request.post('/blooprints', body)
    dispatch('setToastMessage', {
      type: 'positive',
      caption: 'Blooprint Created Successfully'
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
  } finally {
    commit('setLoading', false)
  }
}

// ********************* API to get the Blooprint Details By Id *************************
export async function getBlooprintDetailsById({ dispatch }) {
  let blooprintId = this.$router.history.current.params.blooprintId
  let blooprintData = {}
  await request
    .get(`/blooprints/${blooprintId}`)
    .then(result => {
      blooprintData = result['data']
      const loggedInUserID = getUserId()
      const authorID = blooprintData['attributes']['authorID']
      if (loggedInUserID !== authorID) {
        return this.$router.replace({ name: constants.PAGE_404 })
      }
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
        if (error.response.data.status == 404) {
          this.$router.replace({ name: constants.PAGE_404 })
        }
      }
    })
    .finally(() => {})
  return blooprintData
}

// ********************* API Update Blooprint*************************
export async function updateBlooprint({ commit, dispatch }, blooprintData) {
  commit('setLoading', true)
  //let blooprintId = this.$router.history.current.params.blooprintId
  let blooprintId = blooprintData.blooprintId
  try {
    let body = {
      data: {
        type: 'blooprints',
        attributes: blooprintData
      }
    }
    let { data } = await request.put(`/blooprints/${blooprintId}`, body)
    dispatch('setToastMessage', {
      type: 'positive',
      caption: 'Blooprint Updated Successfully'
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
  } finally {
    commit('setLoading', false)
  }
}

// ********************* API to get author's blooprint list *************************
export async function retrieveAuthorBlooprintList(
  { dispatch, commit },
  params
) {
  // commit('setLoading', true)
  let authorID = getUserId()
  try {
    const { data } = await request.get(
      `/blooprints/authors/${authorID}`,
      params
    )
    return data
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
    commit(
      'setErrorInGettingAuthorBlooprintList',
      'Unable to fetch Available Blooprints'
    )
  } finally {
    // commit('setLoading', false)
  }
}

// ********************* API to Delete Blooprint By Id *************************
export async function deleteBlooprint({ dispatch }, blooprintId) {
  let isDeleteSuccess = false
  dispatch('setLoading', true)
  try {
    let { status } = await request.delete(
      `/blooprints/${blooprintId}?version=1`
    )
    dispatch('setLoading', false)
    if (status && status == 204) {
      dispatch('setToastMessage', {
        type: 'positive',
        caption: 'Blooprint Deleted Successfully.'
      })
      isDeleteSuccess = true
      return isDeleteSuccess
    }
  } catch (error) {
    dispatch('setLoading', false)
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}
// ********************* API to Publish Blooprint By Id *************************
export async function publishBlooprint({ dispatch }, blooprintId) {
  let isSuccess = false
  dispatch('setLoading', true)
  try {
    const { data } = await request.post(
      `/blooprints/${blooprintId}/publish`,
      {}
    )
    if (data['attributes']['status'] == 'active') {
      isSuccess = true
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Blooprint Published Successfully.'
      })
    }
    return isSuccess
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}

// ********************* API to un-publish Blooprint By Id *************************
export async function unPublishBlooprint({ dispatch }, blooprintId) {
  let isSuccess = false
  dispatch('setLoading', true)
  try {
    const { data } = await request.post(
      `/blooprints/${blooprintId}/unpublish`,
      {}
    )
    if (data['attributes']['status'] == 'unpublish') {
      isSuccess = true
      dispatch('setToastMessage', {
        type: 'positive',
        message: 'Blooprint Unpublished Successfully.'
      })
    }
    return isSuccess
  } catch (error) {
    if (error.response) {
      dispatch('setLoading', false)
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
    dispatch('setLoading', false)
  }
}

export async function retrieveBlooprintList({ dispatch }, params) {
  let blooprintData = {
    totalCount: 0,
    blooprintList: []
  }
  await request
    .get(`/blooprints`, params)
    .then(result => {
      result['data']['data'].map(item => {
        item['selectionCount'] = 0
        item['isSelected'] = false
      })
      blooprintData['blooprintList'] = result['data']['data']
      blooprintData['totalCount'] = result['data']['meta']['count']
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
  return blooprintData
}
// *************** API to Add the Blooprints to Popular Blooprint List *************************
export async function addBlooprintsToPopular({ dispatch }, params) {
  let isBlooprintsAddedToPopular = false
  dispatch('setLoading', true)
  await request
    .post(`/blooprints/popular`, params)
    .then(result => {
      if (result['status'] == 200) {
        isBlooprintsAddedToPopular = true
        dispatch('setToastMessage', {
          type: 'positive',
          caption: 'Popular Blooprints',
          message: 'Selected Blooprints are added to Popular Blooprints'
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
  return isBlooprintsAddedToPopular
}

// *************** API to Retrieve the Popular Blooprints List *********************************
export async function fetchPopularBlooprintsList({ dispatch }) {
  let popularBlooprintList = []
  dispatch('setLoading', true)
  await request
    .get(`/blooprints/popular`)
    .then(result => {
      popularBlooprintList = result['data']
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
  return popularBlooprintList
}

// *************** API to Add the Blooprints to Popular Blooprint List *************************
export async function addBlooprintsToFeatured({ dispatch }, params) {
  let isBlooprintsAddedToFeatured = false
  dispatch('setLoading', true)
  await request
    .post(`/blooprints/featured`, params)
    .then(result => {
      if (result['status'] == 200) {
        isBlooprintsAddedToFeatured = true
        dispatch('setToastMessage', {
          type: 'positive',
          caption: 'Featured Blooprints',
          message: 'Selected Blooprints are added to Featured Blooprints'
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
  return isBlooprintsAddedToFeatured
}

// *************** API to Retrieve the Popular Blooprints List *********************************
export async function fetchFeaturedBlooprintsList({ dispatch }) {
  let featuredBlooprintList = []
  dispatch('setLoading', true)
  await request
    .get(`/blooprints/featured`)
    .then(result => {
      featuredBlooprintList = result['data']
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
  return featuredBlooprintList
}

// *********************** CREATE MILESTONE *******************************

export async function createMilestone({ commit, dispatch }, milestoneData) {
  commit('setLoading', true)
  try {
    let body = {
      data: {
        type: 'blooprint milestones',
        attributes: {
          name: milestoneData.name,
          title: milestoneData.title,
          order: milestoneData.order,
          video: milestoneData.video,
          description: milestoneData.description
        }
      }
    }
    let { data } = await request.post(
      `blooprints/${this.$router.history.current.params.blooprintId}/milestones`,
      body
    )
    return data
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
// ************************ CREATE TASK **************************************
export async function createTask({ commit, dispatch }, taskData) {
  try {
    let body = {
      data: {
        type: 'blooprints task',
        attributes: {
          name: taskData.name,
          days: taskData.days,
          order: taskData.order,
          fields: taskData.fields,
          duration: {
            days: taskData.duration.days,
            hours: taskData.duration.hours,
            minutes: taskData.duration.minutes
          },
          startsSameDayAsPrevTask: taskData.startsSameDayAsPrevTask
        }
      }
    }
    let { data } = await request.post(
      `blooprints/${this.$router.history.current.params.blooprintId}/milestones/${taskData.milestoneID}/tasks`,
      body
    )
    dispatch('setToastMessage', {
      type: 'positive',
      caption: 'Task has been created Successfully'
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
  } finally {
  }
}

//********************** GET MILESTONE DATA **************************
export async function getMilestoneData({ commit, dispatch }) {
  try {
    let { data } = await request.get(
      `blooprints/${this.$router.history.current.params.blooprintId}/milestones`
    )
    return data
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
  } finally {
  }
}

//********************** UPDATE SameDayAsPrevTask Status ********************************
export async function updateSameDayAsPrevTask({ commit, dispatch }, taskData) {
  try {
    let body = {
      data: {
        type: 'blooprints task',
        attributes: {
          name: taskData.name,
          order: taskData.order,
          startsSameDayAsPrevTask: taskData.startsSameDayAsPrevTask,
          days: taskData.days,
          fields: taskData.fields,
          duration: {
            days: taskData.duration.days,
            hours: taskData.duration.hours,
            minutes: taskData.duration.minutes
          },
        }
      }
    }
    let { data } = await request.put(
      `blooprints/${this.$router.history.current.params.blooprintId}/milestones/${taskData.milestoneID}/tasks/${taskData.taskID}`,
      body
    )
    return 1
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
export async function updateTask({ commit, dispatch }, taskData) {
  commit('setLoading', true)
  try {
      let body = {
        data: {
          type: 'blooprints task',
          attributes: {
            name: taskData.name,
            days: taskData.days,
            order: taskData.order,
            fields: taskData.fields,
            duration: {
              days: taskData.duration.days,
              hours: taskData.duration.hours,
              minutes: taskData.duration.minutes
            },
            startsSameDayAsPrevTask: taskData.startsSameDayAsPrevTask
          }
        }
      }
      let { data } = await request.put(
       `blooprints/${this.$router.history.current.params.blooprintId}/milestones/${taskData.milestoneID}/tasks/${taskData.taskID}`,
      body
      )
      dispatch('setToastMessage', {
        type: 'positive',
        caption: 'Task Updated Successfully'
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
  } finally {
    commit('setLoading', false)
  }
}

//********************** UPDATE MILESTONE ***************************************

export async function updateMilestone({ commit, dispatch }, milestoneData) {
  commit('setLoading', true)
  try {
    let body = {
      data: {
        type: 'blooprint milestones',
        attributes: {
          name: milestoneData.name,
          title: milestoneData.title,
          order: milestoneData.order,
          video: milestoneData.video,
          description: milestoneData.description
        }
      }
    }
    let { data } = await request.put(
      `blooprints/${this.$router.history.current.params.blooprintId}/milestones/${milestoneData.milestoneID}`,
      body
    )
    return data
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

//********************* DELETE TASK *********************************************
export async function deleteMilestoneTask({ commit, dispatch }, deleteData) {
  commit('setLoading', true)
  try {
    let { data } = await request.delete(
      `blooprints/${this.$router.history.current.params.blooprintId}/milestones/${deleteData.milestoneID}/tasks/${deleteData.taskID}`
    )
    dispatch('setToastMessage', {
      type: 'positive',
      caption: ` Task "${deleteData.taskName}" has been deleted successfully`
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
  } finally {
    commit('setLoading', false)
  }
}

// ********************* DELETE MILESTONE ***************************************
export async function deleteMilestone({ commit, dispatch }, milestoneData) {
  commit('setLoading', true)
  try {
    await request.delete(
      `blooprints/${this.$router.history.current.params.blooprintId}/milestones/${milestoneData.id}`
    )

    dispatch('setToastMessage', {
      type: 'positive',
      caption: `Milestone "${milestoneData.attributes.name}" has been deleted successfully`
    })
    return true
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

// ******************** GET TASK DETAILS ********************************************
export async function retrieveTaskDetails({ commit, dispatch }, requestData) {
  try {
    const { data } = await request.get(
      `blooprints/${this.$router.history.current.params.blooprintId}/milestones/${requestData.milestoneID}/tasks/${requestData.taskID}`
    )
    return data
  } catch (error) {
    if (error.response) {
      dispatch('setToastMessage', {
        type: 'negative',
        caption: 'Status ' + error.response.data.status,
        message: error.response.data.title
      })
    }
  } finally {
  }
}
//********************** GET MILESTONE DATA **************************
export async function getMilestoneDataById({ commit, dispatch }, blooprintId) {
  try {
    let { data } = await request.get(`blooprints/${blooprintId}/milestones`)
    return data
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
  } finally {
  }
}

// ********************* API to get the Blooprint Details By Id *************************
export async function getBlooprintDetailsBasedOnId(
  { commit, dispatch },
  blooprintId
) {
  let blooprintData = {}
  commit('setLoading', true)
  await request
    .get(`/blooprints/${blooprintId}`)
    .then(result => {
      blooprintData = result['data']
      const loggedInUserID = getUserId()
      const authorID = blooprintData['attributes']['authorID']
      if (loggedInUserID !== authorID) {
        return this.$router.replace({ name: constants.PAGE_404 })
      }
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
        if (error.response.data.status == 404) {
          this.$router.replace({ name: constants.PAGE_404 })
        }
      }
    })
    .finally(() => {
      commit('setLoading', false)
    })
  return blooprintData
}

// *************** API to Retrieve the MileStones List Based on Blooprint Id *********************************
export async function fetchAllMilestonesByBlooprintId({ dispatch }, params) {
  let blooprintId = this.$router.history.current.params.blooprintId
  if (!blooprintId) {
    blooprintId = params
  }
  let mileStonesList = []
  dispatch('setLoading', true)
  await request
    .get(`/blooprints/${blooprintId}/milestones`)
    .then(result => {
      mileStonesList = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
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
  return mileStonesList
}

// *************** API to Retrieve the MileStones Tasks List Based on Blooprint, Milestone and Task Id's *********************************
export async function fetchTasksDetails({ dispatch }, params) {
  let blooprintId = this.$router.history.current.params.blooprintId
  let milestoneId = this.$router.history.current.params.milestoneId
  let taskId = this.$router.history.current.params.taskId
  if (!milestoneId) {
    milestoneId = params['milestoneId']
  }
  if (!taskId) {
    taskId = params['taskId']
  }
  let taskDetails = []
  dispatch('setLoading', true)
  await request
    .get(`/blooprints/${blooprintId}/milestones/${milestoneId}/tasks/${taskId}`)
    .then(result => {
      taskDetails = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
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
  return taskDetails
}

// *************** API to Fetch Task Status *********************************
export async function fetchTaskStatus({ dispatch }, params) {
  let taskStatus = {}
  let blooprintID = this.$router.history.current.params.blooprintId
  let taskId = this.$router.history.current.params.taskId
  if (!taskId) {
    taskId = params['taskId']
  }
  dispatch('setLoading', true)
  await request
    .get(`/schedule/blooprints/${blooprintID}/tasks/${taskId}/status`)
    .then(result => {
      taskStatus = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
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
  return taskStatus
}
