<template>
  <q-page class="payment-decline">
    <div class="flex flex-center text-center">
      <div
        class="bg-white text-nightRider q-btn-group--push q-my-xl q-pb-md"
        style="min-height: 80vh; border: solid 1px #D8D8D8; width: 90vw"
      >
        <q-img
          src="../assets/fail.svg"
          :ratio="16 / 9"
          contain
          style="width: 25%"
          class="q-mt-xl"
        />
        <h2 class="text-nightRider text-h3">Payment Failed!</h2>
        <div class="text-h5">Your payment has been failed</div>
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
        </div>
        <div class="q-mt-lg text-h6 text-nightRider">
          Page will automatically redirect to home page in
          {{ countDown }} seconds <br />
          or click button to redirect to home page
        </div>
        <div class="q-mt-xl text-body1">
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
  name: 'PaymentDecline',
  data() {
    return {
      planPrice: this.getPlanPricing(),
      planName: this.getPlanName(),
      countDown: 10,
      redirectUser: true,
      interval: this.getInterval()
    }
  },
  methods: {
    getInterval() {
      return this.$router.currentRoute.query.interval
    },
    getPlanName() {
      return this.$router.currentRoute.query.name
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
