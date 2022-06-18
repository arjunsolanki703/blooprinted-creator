import request from 'src/api'
import { buildApiData } from 'src/utils/api'

// ********************* API to manage Categories *************************
export async function saveCategory({ commit, dispatch }, categoriesData) {
  commit('setLoading', true)
  try {
    await request.post(
      '/categories',
      buildApiData('categories', categoriesData)
    )
    commit('setToastMessage', {
      type: 'positive',
      message: 'Category has been created successfully!'
    })
    this.$router.replace({ name: 'manage_categories' })
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

export async function updateCategory({ commit, dispatch }, categoryData) {
  commit('setLoading', true)
  try {
    await request.put(
      `/categories/${categoryData.id}`,
      buildApiData('categories', categoryData)
    )
    commit('setToastMessage', {
      type: 'positive',
      message: 'Category has been updated successfully!'
    })
    this.$router.replace({ name: 'manage_categories' })
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

export async function getCategoriesList({ commit, dispatch }, params) {
  let categoryList = []
  await request
    .get(`/categories`, params)
    .then(result => {
      categoryList = result['data']
      commit('setCategoriesList', result['data'])
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
      commit('setCategoriesList', [])
    })
    .finally(() => {})
  return categoryList
}

export async function getParentCategoriesList({ commit, dispatch }, params) {
  let categoryList = []
  await request
    .get(`/categories?parent=true`)
    .then(result => {
      result['data'].map(item => {
        categoryList.push({
          label: item['attributes']['name'],
          value: item['id']
        })
      })
      commit('setParentCategoriesList', result['data'])
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
      commit('setParentCategoriesList', [])
    })
    .finally(() => {})
  return categoryList
}

export async function getCategory({ commit, dispatch }, categoryID) {
  await request
    .get(`/categories/${categoryID}`)
    .then(result => {
      commit('setCategory', result['data'])
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
    })
    .finally(() => {})
}

// ********************* DELETE CATEGORY ***************************************
export async function deleteCategory({ commit, dispatch }, categoryData) {
  commit('setLoading', true)
  try {
    await request.delete(`/categories/${categoryData.id}`)

    dispatch('setToastMessage', {
      type: 'positive',
      caption: `Category "${categoryData.name}" has been deleted successfully`
    })
    this.$router.replace({ name: 'manage_categories' })
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
// *************** API to Retrieve All Categories List *********************************
export async function fetchCategorySubCategoryList({ dispatch }, params) {
  let categoryList = []
  await request
    .get('/categories', params)
    .then(result => {
      result['data'].map(item => {
        if (!item['attributes']['parent']) {
          categoryList.push({
            label: item['attributes']['name'],
            value: item['id'],
            subCategory: [{ label: 'None', value: item['id'] }]
          })
        }
      })
      result['data'].map(item => {
        if (item['attributes']['parent']) {
          let index = categoryList.findIndex(
            category => category.value == item['attributes']['parent']
          )
          if (index != -1) {
            categoryList[index]['subCategory'].push({
              label: item['attributes']['name'],
              value: item['id']
            })
          }
        }
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
  return categoryList
}
