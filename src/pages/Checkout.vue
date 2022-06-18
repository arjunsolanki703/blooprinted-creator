<template>
  <q-page style="min-height: 80vh;">
    <div
      class="q-mt-md-xl q-mx-md-xl q-mt-sm-xl q-mx-sm-xl q-mt-xs-lg q-mx-xs-lg checkout-page bg-white"
    >
      <div
        class="row justify-center q-pa-md-lg q-pa-sm-md q-pt-xs-md q-px-xs-sm"
      >
        <div
          class="col-md-6 text-center col-sm-5 col-xs-12 relative-position plan-section"
        >
          <div
            class="text-grey-7 text-body1 text-weight-medium q-mt-md-lg q-mt-sm-lg q-pt-md-lg q-pt-sm-lg q-pa-xs-md"
          >
            Subscribe to
            <span
              class="text-capitalize"
              v-if="$route.params.plan !== 'self'"
              >{{ $route.params.plan }}</span
            >
            <span v-else>{{ 'Done with you blooprint' }}</span>
            <div class="akash">
              <div
                class="text-h4 text-nightRider text-weight-medium flex q-py-sm"
                style="margin: 0 auto; width: 22%;"
              >
                ${{ amount }}
                <span
                  class="q-py-sm q-px-sm"
                  v-if="$route.params.plan !== 'self'"
                >
                  <div class="caption-text text-grey-5">per</div>
                  <div class="caption-text text-grey-5">{{ interval }}</div>
                </span>
              </div>
            </div>
          </div>
          <div
            class="q-pa-md q-mt-xl blooprinted-logo"
            style="width: 50%; margin: 0 auto;"
          >
            <q-img class="q-mr-sm" src="~assets/AppLogo.svg" />
          </div>
          <div class="change-plan-text">
            <div class="text-body2 text-grey-6 q-px-xs-md">
              If you wish to change your plan
              <router-link
                class="text-body2 text-indigo-10"
                style="text-decoration:none"
                :to="{ name: 'my plan' }"
                >Click here.</router-link
              >
            </div>
          </div>
        </div>
        <q-separator vertical style="background: #d8d8d8" size="2px" />
        <div class="col-md-5 col-sm-6 col-xs-12 q-pl-md-xl q-pl-sm-lg">
          <div class="q-pl-md-xl q-pl-sm-lg q-pa-xs-md q-mt-md-lg q-mt-sm-lg">
            <div class="text-h6 text-grey-8">
              Pay with Card
              <q-input
                borderless
                ref="email"
                v-model.trim="email"
                disable
                placeholder="Your Email"
                maxlength="50"
                input-class="text-grey"
                class="border-secondary bg-white rounded-borders q-mb-md q-px-md q-pb-none"
              />
            </div>
            <div class="text-body1 text-grey-7">
              Name on Card
              <q-input
                borderless
                v-model.trim="cardName"
                maxlength="50"
                input-class="text-grey"
                placeholder="Cardholder Name"
                class="border-secondary bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
              />
            </div>
            <form
              action="/charge"
              method="post"
              id="payment-form"
              :class="contentClass"
            >
              <div id="card-errors" class="q-my-lg"></div>
              <div class="text-body1 text-grey-7">
                Card Information
              </div>
              <div class="q-mb-lg col-md-5 col-sm-12 col-xs-12 text-white">
                <div
                  id="card-number"
                  class="cardInfo rounded-borders remove-border-bottom-left-radius remove-border-bottom-right-radius"
                >
                  <!-- a Stripe Element will be inserted. -->
                </div>
                <div
                  id="card-expiry"
                  class="cardInfo halfway rounded-borders remove-border-top-right-radius remove-border-bottom-right-radius remove-border-top-left-radius remove-border-bottom-left-radius remove-border-right"
                >
                  <!-- a Stripe Element will be inserted. -->
                </div>
                <div
                  id="card-cvc"
                  class="cardInfo halfway rounded-borders remove-border-top-left-radius remove-border-bottom-left-radius remove-border-top-right-radius "
                >
                  <!-- a Stripe Element will be inserted. -->
                </div>

                <!-- Used to display Element errors -->
                <div id="card-errors" role="alert"></div>
              </div>
              <div class="text-center">
                <q-btn
                  :loading="loading"
                  color="primary"
                  no-caps
                  @click="createSubscription()"
                  label="Subscribe"
                  style="width: 65%"
                  class="q-mt-lg text-h6"
                />
                <div
                  class="text-caption text-grey-6 q-py-md text-weight-medium"
                >
                  By confirming your subscription, you allow Blooprinted to
                  charge your card for this payment and future payments in
                  accordance with their terms.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getLoggedInUserEmail } from 'src/utils/jwt'
// eslint-disable-next-line no-undef
const stripe = Stripe(`${process.env.BLOOPRINTED_ENV_STRIPE_PUBLISHABLE_KEY}`)

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'checkout',
  data() {
    return {
      cardName: '',
      contentClass: 'hidden',
      loading: false,
      email: getLoggedInUserEmail(),
      plan: '',
      amount: '',
      showSekelton: true,
      wrongPlan: false,
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      priceId: '',
      interval: ''
    }
  },
  async mounted() {
    this.setPlan()
    this.setPaymentPage()
  },
  methods: {
    ...mapActions([
      'getPlans',
      'getPlansForSelf',
      'createCustomerAndSubscription',
      'setOneTimeLogin'
    ]),

    async setPlan() {
      var plan = this.$route.params.plan
      var plans = ['professional', 'plus', 'platinum', 'enterprise', 'self']
      if (!plans.includes(plan)) {
        this.$router.push({ name: 'dashboard' })
      }
      if (plan === 'enterprise') {
        this.$router.push(
          { name: 'checkout', params: { plan: 'professional' } },
          () => {}
        )
        plan = this.$route.params.plan
      }

      this.getPlans().then(() => {
        for (var i = 0; i < this.allPlans.length; i++) {
          if (this.allPlans[i].name === plan) {
            this.plan = plan
            this.amount = this.allPlans[i].amount
            this.priceId = this.allPlans[i].priceID
            this.interval = this.allPlans[i].interval
          }
        }
      })

      this.getPlansForSelf().then(() => {
        for (var i = 0; i < this.selfPlans.length; i++) {
          if (this.selfPlans[i].name === plan) {
            this.plan = plan
            this.amount = this.selfPlans[i].amount
            this.priceId = this.selfPlans[i].priceID
            this.interval = this.selfPlans[i].interval
          }
        }
      })

      if (this.plan.length <= 0) {
        this.wrongPlan = true
      }
      this.showSekelton = false
      if (!this.wrongPlan) {
        this.setPaymentPage()
      }
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
      this.showSekelton = false
    },
    async createSubscription() {
      this.loading = true
      var token = ''
      var displayError
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
        this.loading = false
        return
      }
      var payload = {
        quantity: '1',
        creditCardToken: token,
        priceId: this.priceId
      }
      await this.createCustomerAndSubscription(payload)
      var redirectURL = '/payment-decline'
      var params = {
        name: this.plan === 'self' ? 'Done With You blooprint' : this.plan,
        price: this.amount
      }
      if (this.paymentError.length <= 0) {
        redirectURL = '/payment-success'
        var customer = ''
        var subscriptionID = ''
        if (this.customerSubscription.customerID !== undefined) {
          customer = this.customerSubscription.customerID
        }
        if (this.customerSubscription.subscriptionID !== undefined) {
          subscriptionID = this.customerSubscription.subscriptionID
        }
        params = {
          name: this.plan === 'self' ? 'Done With You blooprint' : this.plan,
          price: this.amount,
          interval: this.interval,
          customerID: customer,
          subscriptionID: subscriptionID
        }
        this.setOneTimeLogin(this.plan)
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
          subscriptionType: this.interval === 'month' ? 'monthly' : 'yearly',
          purchaseType: this.plan === 'self' ? 'oneTime' : 'subscription'
        })
      }
      redirectURL = redirectURL + '?' + this.queryParam(params)
      this.$router.push(redirectURL)
      this.loading = false
    },
    createToken() {
      // Gather additional customer data we may have collected in our form.
      var additionalData = { name: this.cardName }
      // Important: Although we're submitting several fields, use cardNumber here instead of 'elements'.
      return stripe.createToken(this.cardNumber, additionalData)
    },
    queryParam(obj) {
      var str = []
      for (var p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
      return str.join('&')
    }
  },
  computed: {
    ...mapGetters([
      'allPlans',
      'selfPlans',
      'paymentError',
      'customerSubscription',
      'userProfile'
    ])
  }
}
</script>

<style lang="scss" scoped>
.checkout-page {
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  .caption-text {
    font-size: 12px;
    line-height: 12px;
  }
  .change-plan-text {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    @media only screen and (max-width: $breakpoint-xs-max) {
      position: static;
    }
  }
  .plan-section {
    min-height: 65vh;
    @media only screen and (max-width: $breakpoint-xs-max) {
      min-height: 15vh;
    }
  }
  .blooprinted-logo {
    @media only screen and (max-width: $breakpoint-xs-max) {
      display: none;
    }
  }
}

#card {
  padding: 18px;
  border-radius: 4px;
}
#card-errors {
  color: red;
  margin-top: 10px;
}

//labels
#payment-form label {
  border: 0.5px solid #d8d7d7;
}

//line height for 'name'
#payment-form input {
  line-height: 36px;
}

// styles for Chrome autofill
#payment-form .StripeElement--webkit-autofill {
  background: rgba(0, 0, 0, 0.05) !important;
}

.cardInfo {
  padding: 16px 12px;
  margin-bottom: -1px;
  //   background: rgba(0, 0, 0, 0.05);
  border: 0.5px solid #d8d7d7;
}
.halfway {
  display: inline-block;
  width: 50%;
}
.border-top-left-right {
  border-radius: 5px 5px 0px 0px;
}
.border-bottom-left {
  border-radius: 0px 0px 0px 5px;
}
.border-bottom-right {
  border-radius: 0px 0px 5px 0px;
}
.help-text {
  color: #abaaaa;
}
#payment-form .q-field--filled .q-field__control {
  background-color: #35343452;
}
</style>
