<template>
  <q-page :class="$q.screen.width > 1023 ? 'row' : 'column'">
    <div
      class="col-md-6 col-sm-12 col-xs-12 lhs-padding"
      :class="$q.screen.gt.sm ? 'bg-solitudeBlue' : 'bg-white'"
    >
      <PlanDetails
        :isLoading="isLoading"
        :progressValue="progressValue"
        :plansList="plansList"
        :screenType="screenType"
        :showStepWizard="showStepWizard"
        :showPaymentForm="showPaymentForm"
        :cardDetails="cardDetails"
        :isLoginPage="isLoginPage"
        :navigatedFrom="navigatedFrom"
        :isOldCardPresent="isOldCardPresent"
        @show-old-card="showOldCardDetails"
        @on-plan-select="onPlanSelected"
      />
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12 bg-white">
      <div
        :class="isLoginPage ? 'login-section' : 'signup-section'"
        v-if="!isSignupSuccess"
      >
        <div>
          <div class="gt-sm" style="margin-bottom: 71px" v-if="!isLoginPage">
            <q-linear-progress
              color="primary"
              size="10px"
              :value="progressValue"
              class="progress-style"
            />
            <div class="f-w-600 text-body1 q-mt-sm text-black">
              Step 1. Create Account
            </div>
          </div>
          <SignupForm
            v-if="!isLoginPage"
            :requestFrom="'paymentSignupScreen'"
            :selectedPlan="selectedPlan"
            @on-terms-privacy-click="onTermsPrivacyClick"
          />
        </div>
      </div>
      <div
        :class="
          showStepWizard ? 'payment-section' : 'payment-section-without-step'
        "
        v-if="isSignupSuccess"
      >
        <div>
          <div class="gt-sm" style="margin-bottom: 71px" v-if="showStepWizard">
            <q-linear-progress
              color="primary"
              size="10px"
              :value="progressValue"
              class="progress-style"
            />
            <div class="f-w-600 text-body1 q-mt-sm text-black">
              <span v-if="progressValue == 0.75">Step 2. Payment</span>
              <span v-else>{{ screenType }}</span>
            </div>
          </div>
          <PaymentCardForSignup
            v-if="screenType == 'payment'"
            :plansList="plansList"
            :selectedPlan="selectedPlan"
            @on-terms-privacy-click="onTermsPrivacyClick"
            @on-payment-complete="onPaymentComplete"
            :showStepWizard="showStepWizard"
            :showPaymentForm="showPaymentForm"
            @on-new-card-open="onNewCardOpen"
            @get-card-details="getCardDetails"
          />
        </div>
      </div>
    </div>
    <q-dialog
      v-model="showPopupContent['displayPopup']"
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
    >
      <q-card class="bg-whiteSmoke">
        <q-btn
          icon="close"
          class="q-mt-md q-mx-sm text-primary"
          flat
          round
          dense
          @click="onPopupClose"
        />
        <Terms v-if="showPopupContent['popupType'] == 'terms'" />
        <PrivacyPolicy v-if="showPopupContent['popupType'] == 'privacy'" />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'
import PlanDetails from 'components/PlanDetails.vue'
import SignupForm from 'components/SignupForm.vue'
import PaymentCardForSignup from 'components/PaymentCardForSignup.vue'
import Terms from '../Terms.vue'
import PrivacyPolicy from '../PrivacyPolicy.vue'

import { isMobileApp, isLogin } from '../../utils/common'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      plansList: [],
      isLoading: true,
      progressValue: 0.25,
      isLoginPage: false,
      isSignupSuccess: false,
      screenType: 'payment',
      showPopupContent: {
        displayPopup: false,
        popupType: ''
      },
      paymentInfo: {},
      showStepWizard: true,
      showPaymentForm: false,
      cardDetails: {},
      selectedPlan: {},
      navigatedFrom: {},
      isOldCardPresent: false
    }
  },
  components: {
    PlanDetails,
    SignupForm,
    PaymentCardForSignup,
    Terms,
    PrivacyPolicy
  },
  watch: {
    $route: 'checkToDisplaySignupOrPayment'
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.navigatedFrom = from
    })
  },
  mounted() {
    this.checkToDisplaySignupOrPayment()
    this.fetchPlanDetails()
  },
  methods: {
    ...mapActions(['getPlans', 'getPlansForSelf']),
    async fetchPlanDetails() {
      this.isLoading = true
      let selfPlans = await this.getPlansForSelf()
      this.plansList = selfPlans
      // let data = await this.getPlans()
      this.isLoading = false
      // this.plansList = this.plansList.concat(data)
    },
    checkToDisplaySignupOrPayment() {
      let selectedRoute = this.$router.history.current.fullPath
      if (selectedRoute.includes('checkout')) {
        if (isLogin()) {
          this.isSignupSuccess = true
          this.progressValue = 0.75
          this.showStepWizard = true
        } else {
          this.isSignupSuccess = false
          this.progressValue = 0.25
          this.$router.push({
            name: 'signup-plan',
            params: {
              planName: this.$route.params['planName']
            }
          })
        }
      } else if (selectedRoute.includes('signup')) {
        if (isLogin()) {
          this.isSignupSuccess = true
          this.progressValue = 0.75
          this.showStepWizard = true
          this.$router.push({
            name: 'plan-checkout',
            params: {
              planName: this.$route.params['planName']
            }
          })
        } else {
          this.isSignupSuccess = false
          this.progressValue = 0.25
        }
      } else if (selectedRoute.includes('plan-update')) {
        if (isLogin()) {
          this.isSignupSuccess = true
          this.progressValue = 0
          this.showStepWizard = false
        } else {
          this.isSignupSuccess = false
          this.progressValue = 0.25
          this.showStepWizard = true
          this.$router.push({
            name: 'signup-plan',
            params: {
              planName: this.$route.params['planName']
            }
          })
        }
      }
    },
    onTermsPrivacyClick(event) {
      if (isMobileApp()) {
        this.showPopupContent = {
          displayPopup: true,
          popupType: event['popupType']
        }
      } else {
        window.open(window.location.origin + `/${event['popupType']}`)
      }
    },
    onPopupClose() {
      this.showPopupContent = {
        displayPopup: false,
        popupType: ''
      }
    },
    onPaymentComplete(event) {
      this.progressValue = 1
      this.screenType = event['type']
      this.paymentInfo = event
    },
    onNewCardOpen(event) {
      this.isOldCardPresent = event['isOldCardPresent']
      this.showPaymentForm = true
    },
    showOldCardDetails() {
      this.showPaymentForm = false
    },
    getCardDetails(data) {
      this.cardDetails = data
    },
    onPlanSelected(data) {
      this.selectedPlan = data
    }
  }
}
</script>
<style lang="scss" scoped>
.lhs-padding {
  padding-top: 29px;
  padding-left: 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 23px;
    padding-left: 15px;
    padding-right: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 23px;
    padding-left: 15px;
    padding-right: 15px;
  }
}
::v-deep {
  .progress-style {
    // margin: 8px 0px;
    border-radius: 5px;
    opacity: 1 !important;
    height: 5px;
    .q-linear-progress__track {
      opacity: 1 !important;
    }
    .q-linear-progress__track--light {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
.signup-section {
  @media only screen and (min-width: $breakpoint-md-min) {
    margin-top: 92px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: $breakpoint-sm-min) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
.payment-section {
  @media only screen and (min-width: $breakpoint-md-min) {
    margin-top: 92px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: $breakpoint-sm-min) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
.payment-section-without-step {
  @media only screen and (min-width: $breakpoint-md-min) {
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: $breakpoint-sm-min) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
