import moment from 'moment'

export function setPaymentLoading(state, value) {
  state.showPaymentLoading = value
}

export function setCardInfo(state, cardInfo) {
  state.cardDetails = { ...cardInfo }
}

export function setCustomerSubscription(state, value) {
  state.customerSubscription = value
}

export function setPaymentError(state, value) {
  state.paymentError = value
}

export function setCardDetailsSkeletonStatus(state, status) {
  state.showCardDetailsSkeleton = status
}

export function setPlanDetailsSkeletonStatus(state, status) {
  state.showPlanDetailsSkeleton = status
}

export function setCardDetailsButtonLoadingStatus(state, status) {
  state.showCardDetailsButtonLoading = status
}

export function setAllPlans(state, value) {
  state.allPlans = value
}

export function setSelfPlans(state, value) {
  state.selfPlans = value
}

export function setCurrentPlan(state, planInfo) {
  state.planInfo = { ...planInfo }
}

export function setErrorInGettingPlan(state, value) {
  state.errorMessageIngettingPlan = value
}

export function setErrorInGettingCardInfo(state, value) {
  state.errorMessageIngettingCardInfo = value
}
export const clearOrderHistory = state => {
  state.orderHistory = [];
};
export function setOrderHistory(state, { data, type }) {
  data.data.attributes.jsonData.forEach(item => {
       let orderHistoryData = {
        'Order' : item.id.slice(0,7),
        'Customer Name' : item.firstName + " " + item.lastName,
        'Email' : item.email,
        'Amount' : 'USD $' + item.amount,
        'Date' : moment(item.startDate).format('ll'),
        'Status' : (item.paid == true ? 'Paid':'Failed') 
      };
      state.orderHistory.push(orderHistoryData);
  });
  state.orderHistoryCount =  data.meta.count;
}
