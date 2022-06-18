export default function() {
  return {
    cardDetails: {},
    allPlans: [],
    selfPlans:[],
    paymentError: '',
    customerSubscription: '',
    showPaymentLoading: false,
    showCardDetailsButtonLoading: false,
    showCardDetailsSkeleton: false,
    showPlanDetailsSkeleton: false,
    errorMessageIngettingPlan: '',
    errorMessageIngettingCardInfo: '',
    planInfo: {},
    orderHistory: [],
    orderHistoryCount: 0
  }
}
