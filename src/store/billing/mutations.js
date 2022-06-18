export function setBillingHistory(state, { data, type }) {
  if (type === 'loadMore') {
    data.data.forEach(item => {
      state.billingHistory.push(item)
    })
  } else {
    if (Object.keys(data).length > 0) {
      state.billingHistory = data.data
    }
  }
  if (Object.keys(data).length > 0) {
    state.billingHistoryCount = data.meta.count
  }
}
