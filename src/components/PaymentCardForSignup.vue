<template>
  <div>
    <q-form
      class="form-margin"
      ref="paymentForm"
      :class="$route.path.includes('settings') ? 'update-card-form' : null"
    >
      <div
        class="pay-heading text-black f-w-600 q-mb-30"
        v-if="!$route.path.includes('settings') && !isLoading"
      >
        <span>
          Pay with card for
        </span>
        <br />
        <span class="text-capitalize">
          {{
            selectedPlan['name'] == 'self'
              ? 'Done With You'
              : selectedPlan['name']
          }}
          plan
        </span>
      </div>
      <div
        class="q-mb-md"
        v-if="!$route.path.includes('settings') && isLoading"
      >
        <q-skeleton width="100%" type="QBtn" />
      </div>
      <div
        class="f-w-500 text-tangaroa text-fs-18-lh-28 q-mb-md"
        v-if="!showStepWizard && !$route.path.includes('settings')"
      >
        Saved payment method
      </div>
      <q-separator
        v-if="
          !showStepWizard && !$route.path.includes('settings') && !showOldCard
        "
        style="border: 1px solid #E8EDF2;margin-bottom: 30px"
      />
      <SavedCardDetails
        v-if="showOldCard"
        :isLoading="isLoading"
        :cardDetails="oldCardDetails"
        :loggedUserDetails="loggedUserDetails"
      />
      <div class="row q-mt-md" v-if="showOldCard && isLoading">
        <q-icon name="add" color="grey-4" class="q-mx-sm q-mb-xs" size="20px" />
        <q-skeleton type="text" width="50%" />
      </div>
      <div class="q-mt-md text-primary" v-if="showOldCard && !isLoading">
        <q-icon
          class="q-mx-sm q-mb-xs cursor-pointer"
          name="add"
          size="20px"
          color="primary"
          @click="addNewCardClick(true)"
        />
        <span
          class="f-w-600 text-fs-14-lh-21 cursor-pointer"
          @click="addNewCardClick(true)"
        >
          Add New Card
        </span>
      </div>
      <div id="card-errors" class="q-my-lg" v-if="!showOldCard"></div>
      <div class="col-md-5 col-sm-12 col-xs-12 text-white" v-if="!showOldCard">
        <div
          class="f-w-500 text-fs-18-lh-28 text-tangaroa q-mb-sm"
          v-if="!showStepWizard && !$route.path.includes('settings')"
        >
          Add New Card
        </div>
        <label class="text-regalBlue f-w-600 text-body1">Card Number</label>
        <div
          id="card-number"
          class="cardInfo f-w-500 text-body1 border-top-left-right q-mt-xs q-mb-lg"
        >
          <!-- a Stripe Element will be inserted. -->
        </div>
        <label class="text-regalBlue f-w-600 text-body1">Name on Card</label>
        <q-input
          borderless
          class="bg-white input-style f-w-500 text-body1 q-mt-xs q-mb-lg"
          :class="cardName == '' ? 'input-placeholder' : 'input-text-style'"
          ref="cardName"
          name="name"
          v-model.trim="cardName"
          maxlength="50"
          id="card-name"
          autocomplete="cc-name"
          placeholder="Enter Name on Card"
        />
        <div class="row">
          <div class="col q-pr-md">
            <label class="text-regalBlue f-w-600 text-body1">Expiry Date</label>
            <div
              id="card-expiry"
              class="cardInfo f-w-500 text-body1 border-bottom-right q-mt-xs"
            >
              <!-- a Stripe Element will be inserted. -->
            </div>
          </div>
          <div class="col q-pl-xs">
            <label class="text-regalBlue f-w-600 text-body1">CVC</label>
            <div
              id="card-cvc"
              class="cardInfo f-w-500 text-body1 border-bottom-right q-mt-xs"
            >
              <!-- a Stripe Element will be inserted. -->
            </div>
          </div>
        </div>
        <div class="q-mt-md" v-if="!$route.path.includes('settings')">
          <q-checkbox
            class="f-w-500 text-body1 text-regalBlue"
            :style="$q.screen.gt.sm ? 'margin-left: -8px' : 'margin-left: 0px'"
            v-model="saveCard"
            label="Save card details for future payments"
          />
        </div>
        <!-- Used to display Element errors -->
        <div id="card-errors" role="alert"></div>
      </div>
      <div
        v-if="!$route.path.includes('settings')"
        class="row f-w-600 text-fs-24-lh-32 text-regalBlue"
        style="margin-top: 30px"
      >
        <span class="col text-left">Total</span>
        <span class="col text-right" v-if="selectedPlan && selectedPlan.name">
          ${{
            Math.round(selectedPlan.amount) == selectedPlan.amount
              ? selectedPlan.amount
              : selectedPlan.amount.toFixed(2)
          }}{{ planAmountPrefix(selectedPlan['interval']) }}
        </span>
        <div class="row text-right" v-else>
          <q-skeleton type="QBtn" />
        </div>
      </div>
      <div
        style="margin-top: 10px; margin-bottom: 20px"
        v-if="!$route.path.includes('settings')"
      >
        <q-btn
          color="primary"
          class="full-width f-w-600 text-body1"
          label="Make payment"
          no-caps
          style="height: 50px;border-radius: 10px"
          @click="onPayButtonClick()"
        />
      </div>
      <!-- ******************************** for update card information ******************************** -->
      <div
        v-if="$route.path.includes('settings')"
        class="flex justify-between update-group"
        style="margin-top: 60px"
      >
        <q-btn
          class="text-body1 bg-white text-primary cancel-btn"
          label="Cancel"
          no-caps
          unelevated
          style="height: 50px;border-radius: 10px"
          @click="$emit('closePopup', false)"
        />
        <q-btn
          color="primary"
          class="text-body1 flex no-wrap update-btn"
          no-caps
          style="height: 50px;border-radius: 10px"
          @click="onPayButtonClick()"
        >
          <label class="save-btn-label">Save payment method</label>
          <q-space />
          <img src="~assets/chevron-right.svg" id="right" class="q-mr-xs" />
        </q-btn>
      </div>
      <div
        class="text-regalBlue text-left privacy-text f-w-400"
        v-if="!$route.path.includes('settings')"
      >
        By clicking the ‘Make payment’ button, you allow blooprinted to charge
        your card for this payment, and you agree to blooprints's
        <span
          class="text-primary text-underline cursor-pointer f-w-600"
          @click="navigateToTermsPolicyScreen('terms')"
        >
          Terms of Use
        </span>
        and
        <span
          class="text-primary text-underline cursor-pointer f-w-600"
          @click="navigateToTermsPolicyScreen('privacy')"
        >
          Privacy Policy
        </span>
        .
      </div>
      <div
        class="text-center img-margin"
        v-if="!$route.path.includes('settings')"
      >
        <img src="~assets/Secure.svg" />
      </div>
    </q-form>
  </div>
</template>
<script>
const stripe = Stripe(`${process.env.BLOOPRINTED_ENV_STRIPE_PUBLISHABLE_KEY}`)
import { mapActions, mapGetters } from 'vuex'
import { getLoggedInUserEmail, getLoggedInUserName } from '../utils/jwt'
import SavedCardDetails from 'components/SavedCardDetails.vue'

export default {
  name: 'PaymentCardForSignup',
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      email: '',
      contentClass: 'hidden',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      saveCard: true,
      showOldCard: false,
      oldCardDetails: {
        brand: '',
        last4: '',
        expMonth: '',
        expYear: '',
        name: ''
      },
      isLoading: true,
      loggedUserDetails: {}
    }
  },
  props: ['plansList', 'showStepWizard', 'showPaymentForm', 'selectedPlan'],
  computed: {
    ...mapGetters(['paymentError', 'customerSubscription', 'userProfile'])
  },
  watch: {
    showPaymentForm(data) {
      this.showOldCard = !data
    }
  },
  components: { SavedCardDetails },
  mounted() {
    this.showOldCard = this.showPaymentForm
    this.showOldCard = true
    if (
      this.$route.fullPath.includes('settings') ||
      this.$route.fullPath.includes('signup')
    ) {
      this.showOldCard = false
      this.setPaymentPage()
    } else {
      this.showOldCard = true
      this.fetchSavedCardInfo()
      this.getLoggedUserDetails()
    }
  },
  methods: {
    ...mapActions([
      'setLoading',
      'updateCustomerCreditCard',
      'setToastMessage',
      'getCardDetails',
      'createCustomerAndSubscription',
      'updateCustomerSubscription',
      'setOneTimeLogin',
      'fetchProfileInfo'
    ]),
    planAmountPrefix(duration) {
      if (duration === 'month') {
        return '/mo'
      } else if (duration === 'year') {
        return '/yr'
      }

      return ''
    },
    async fetchSavedCardInfo() {
      this.isLoading = true
      let data = await this.getCardDetails()
      this.isLoading = false
      if (data && data['id'] && data['attributes']['brand']) {
        this.showOldCard = true
        this.oldCardDetails = data['attributes']
      } else {
        this.showOldCard = false
        this.addNewCardClick(false)
      }
      this.$emit('get-card-details', this.oldCardDetails)
    },
    addNewCardClick(isOldCardPresent) {
      this.showOldCard = false
      this.$emit('on-new-card-open', { isOldCardPresent: isOldCardPresent })
      let interval = setTimeout(() => {
        this.setPaymentPage()
        clearTimeout(interval)
      }, 0)
    },
    setPaymentPage() {
      const elements = stripe.elements()
      const style = {
        base: {
          iconColor: '#0057d2',
          color: '#525151',
          fontWeight: 500,
          fontSize: '16px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#aaaaaa'
          }
        },
        complete: {
          color: '#525151'
        },
        invalid: {
          color: 'red',
          iconColor: 'red'
        }
      }
      this.cardNumber = elements.create('cardNumber', {
        style: style,
        showIcon: true
      })
      this.cardNumber.mount('#card-number')

      this.cardExpiry = elements.create('cardExpiry', {
        style: style
      })

      this.cardExpiry.mount('#card-expiry')

      this.cardCvc = elements.create('cardCvc', {
        style: style
      })
      this.cardCvc.mount('#card-cvc')

      const displayErrors = document.getElementById('card-errors', {
        style: style
      })

      this.contentClass = ''
    },
    navigateToTermsPolicyScreen(type) {
      this.$emit('on-terms-privacy-click', { popupType: type })
    },
    // *************** Triggers when Pay Button is clicked **************************
    onPayButtonClick() {
      this.checkCardValidity()
    },
    // *************** Method to check card validity **************************
    async checkCardValidity() {
      this.setLoading(true)
      var token = ''
      var displayError
      if (!this.showOldCard) {
        await this.createToken().then(function(result) {
          // Stop loading!
          if (result.error) {
            displayError = document.getElementById('card-errors')
            if (result.error) {
              displayError.textContent = result.error.message
            } else {
              displayError.textContent = ''
            }
          } else {
            // Send the token to your server
            token = result.token.id
          }
        })
        if (displayError !== undefined) {
          this.setLoading(false)
          return
        }
        if (this.$route.path.includes('settings')) {
          await this.updateCustomerCreditCard(token)
          this.$emit('closePopup', false)
          this.setLoading(false)
          return
        }
      }
      if (this.showOldCard == true && this.selectedPlan.name != 'self') {
        var payload = {
          id: this.customerSubscription.subscriptionID,
          planID: this.selectedPlan.planID,
          priceID: this.selectedPlan.priceID,
          planName: this.selectedPlan.name
        }
        await this.updateCustomerSubscription(payload)
      } else {
        var payload = {
          quantity: '1',
          creditCardToken: token,
          priceId: this.selectedPlan.priceID,
          saveCard: token == '' ? false : this.saveCard
        }
        await this.createCustomerAndSubscription(payload)
      }

      var params = {
        name:
          this.selectedPlan.name === 'self'
            ? 'Done With You blooprint'
            : this.selectedPlan.name,
        price: this.selectedPlan.amount
      }
      if (this.paymentError.length <= 0) {
        var customer = ''
        var subscriptionID = ''
        if (this.customerSubscription.customerID !== undefined) {
          customer = this.customerSubscription.customerID
        }
        if (this.customerSubscription.subscriptionID !== undefined) {
          subscriptionID = this.customerSubscription.subscriptionID
        }
        params = {
          name:
            this.selectedPlan.name === 'self'
              ? 'Done With You blooprint'
              : this.selectedPlan.name,
          price: this.selectedPlan.amount,
          interval: this.selectedPlan.interval,
          customerID: customer,
          subscriptionID: subscriptionID,
          saveCard: this.saveCard
        }
        this.setOneTimeLogin(this.selectedPlan.name)
        this.mac.purchase({
          planName: params.name,
          amount: (params.price * 100).toString(),
          currency: 'USD',
          email: getLoggedInUserEmail(),
          username:
            this.userProfile.firstName +
            (this.userProfile.lastName === undefined
              ? ''
              : ' ' + this.userProfile.lastName),
          subscriptionType:
            this.selectedPlan.interval === 'month' ? 'monthly' : 'yearly',
          purchaseType:
            this.selectedPlan.name === 'self' ? 'oneTime' : 'subscription',
          saveCard: this.saveCard
        })
        this.setToastMessage({
          type: 'positive',
          caption: 'Payment Success!',
          message: 'Your payment has been processed',
          timeout: 5000
        })
        this.$router.push({ name: 'firstBlooprintCreation' })
      }
      this.setLoading(false)
    },
    createToken() {
      // Gather additional customer data we may have collected in our form.
      var additionalData = { name: this.cardName }
      // Important: Although we're submitting several fields, use cardNumber here instead of 'elements'.
      return stripe.createToken(this.cardNumber, additionalData)
    },
    async getLoggedUserDetails() {
      let data = await this.fetchProfileInfo()
      this.loggedUserDetails = data
      if(data.additonalInfo.planName === 'starter'
        && this.$route.params.planName !== 'self'
        && !this.$route.path.includes('checkout')) {
        await this.$router.replace('/settings?tab=myPlan')
        if (this.$q.screen.width < 1024) {
          this.$root.$emit('myPlanComponent')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.text-fs-18-lh-28 {
  font-size: 18px;
  line-height: 28px;
}
.form-margin {
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 40px 15px 0px 15px;
  }
}
.q-mb-30 {
  margin-bottom: 30px;
}
.pay-heading {
  font-size: 32px;
  line-height: 36px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 24px;
    line-height: 28px;
  }
}
.text-fs-24-lh-32 {
  font-size: 24px;
  line-height: 32px;
}
.privacy-text {
  max-width: 431px;
  font-size: 12px;
  line-height: 18px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 900px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 431px;
  }
}
#card-errors {
  color: red;
  margin-top: 10px;
  max-width: 431px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 900px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 431px;
  }
}
.cardInfo {
  padding: 12.5px 14px;
  border: 1px solid $ghost;
  border-radius: 8px;
  height: 44px;
}
.img-margin {
  margin-top: 30px;
  margin-bottom: 78px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
::v-deep {
  .input-style {
    border: 1px solid $ghost;
    border-radius: 8px;
    height: 44px;
    padding: 0px 14px;
    .q-field__control,
    .q-field__marginal {
      height: 43px;
    }
  }
  .input-placeholder {
    .q-placeholder {
      color: $manateeGrey !important;
    }
  }
  .input-text-style {
    .q-field__native {
      color: #525151 !important;
    }
  }
}

.update-group {
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 24px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 24px !important;
    display: flex;
    flex-direction: column;
  }
}
.cancel-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  background: #ffffff;
  border: 2px solid #1652f0;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #1652f0;
  @media only screen and (min-width: 600px) {
    width: 118px !important;
    height: 50px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    order: 2;
    margin-top: 24px !important;
  }
}
#right {
  left: 0;
  margin-left: 12px !important;
  position: relative;
  transition: left 0.3s linear;
}
.update-btn {
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  padding: 10px 20px 10px 30px !important;
  background: #1652f0 !important;
  border-radius: 10px !important;
  height: 50px !important;
  &:hover {
    #right {
      left: 10px;
      position: relative;
      transition: left 0.3s linear;
    }
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    order: 1;
  }
  @media only screen and (max-width: 450px) {
    padding: 10px 0px 10px 0px !important;
  }
}
.save-btn-label {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #ffffff;
}
.update-card-form {
  margin-top: 24px !important;
  margin-bottom: 0px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 24px 0px 15px;
  }
}
::v-deep {
  .q-checkbox:not(.disabled) .q-checkbox__inner:before {
    opacity: 0 !important;
  }
}
</style>
