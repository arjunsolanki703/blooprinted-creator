import request from 'src/api'

export async function getBillingHistory({ commit }, { type, offset, limit }) {
  await request
    .get(`/subscriptions/invoices?offset=${offset}&limit=${limit}`)
    .then(({ data }) => {
      commit('setBillingHistory', { data, type })
    })
    .catch(error => {
      console.log(error)
    })
}

export async function getBillingInvoice({ commit }, productID) {
  let invoice = {}
  await request
    .get(`/subscriptions/invoices/${productID}`)
    .then(response => {
      invoice = response
    })
    .catch(error => {
      console.log(error)
    })
  return invoice
}
