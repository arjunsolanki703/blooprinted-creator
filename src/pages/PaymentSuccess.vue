<template>
  <q-page class="payment-success">
    <div class="flex flex-center text-center">
      <div
        class="bg-white text-nightRider q-btn-group--push q-my-xl q-pb-md"
        style="min-height: 82vh; border: solid 1px #D8D8D8; width: 90vw"
      >
        <q-img
          src="../assets/success.png"
          :ratio="16 / 9"
          contain
          style="width: 20%"
          class="q-mt-xl"
        />
        <h2 class="text-nightRider text-h3">Success!</h2>
        <div class="text-h5">Your payment has been processed</div>
        <div class="text-h5">
          Details of the transition has been included below
        </div>
        <div class="q-mt-xl text-h6 row flex flex-center content-center">
          <div class="q-mx-sm col-md-6 col-sm-6 col-xs-12" v-if="planPrice">
            <div class="row">
              <div class="col-6 text-nightRider">
                Amount:
              </div>
              <div class="col-6" v-if="interval">
                ${{ planPrice }} /{{ interval === 'month' ? 'mo' : 'yr' }}
              </div>
              <div class="col-6" v-else>${{ planPrice }}</div>
            </div>
          </div>
          <div class="q-mx-sm col-md-6 col-sm-6 col-xs-12" v-if="planName">
            <div class="row">
              <div class="col-6 text-nightRider">
                Plan Name:
              </div>
              <div class="col-6">{{ planName }}</div>
            </div>
          </div>
          <div class="q-mx-sm col-md-6 col-sm-6 col-xs-12" v-if="customerID">
            <div class="row">
              <div class="col-6 text-nightRider">
                customer:
              </div>
              <div class="col-6">{{ customerID }}</div>
            </div>
          </div>
          <div
            class="q-mx-sm col-md-6 col-sm-6 col-xs-12"
            v-if="subscriptionID"
          >
            <div class="row">
              <div class="col-6 text-nightRider">
                subscription:
              </div>
              <div class="col-6">{{ subscriptionID }}</div>
            </div>
          </div>
        </div>
        <div class="q-mt-lg text-h6 text-nightRider">
          Page will automatically redirect to home page in
          {{ countDown }} seconds <br />
          or click button to redirect to home page
        </div>
        <div class="q-mt-lg text-body1">
          <q-btn
            :to="{ name: 'dashboard' }"
            text-color="white"
            color="primary"
            no-caps
            class="text-capitalize text-h6 q-px-xl"
            label="Go to Home Page"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'PaymentSuccess',
  data() {
    return {
      planPrice: this.getPlanPricing(),
      planName: this.getPlanName(),
      customerID: this.getcustomerID(),
      subscriptionID: this.getsubscriptionID(),
      interval: this.getInterval(),
      countDown: 10,
      redirectUser: true
    }
  },
  methods: {
    getPlanName() {
      return this.$router.currentRoute.query.name
    },
    getInterval() {
      return this.$router.currentRoute.query.interval
    },
    getcustomerID() {
      return this.$router.currentRoute.query.customerID
    },
    getsubscriptionID() {
      return this.$router.currentRoute.query.subscriptionID
    },
    getPlanPricing() {
      return this.$router.currentRoute.query.price
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        if (this.redirectUser) {
          this.$router.push({ name: 'dashboard' })
        }
      }
    }
  },
  mounted() {
    this.countDownTimer()
  },
  beforeDestroy() {
    this.redirectUser = false
  }
}
</script>
