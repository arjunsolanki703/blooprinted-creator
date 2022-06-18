<template>
  <q-page style="min-height:80vh">
    <div
      class="q-mx-md-xl q-mx-md-sm q-mx-xs-md q-mt-md-xl q-mt-sm-xl q-mt-xs-lg row justify-between"
    >
      <div class="text-nightRider text-h5 text-weight-medium text-capitalize">
        my plan
        <q-separator width="110%" color="primary" class="q-mt-sm" size="2px" />
      </div>
    </div>

    <!-- For self plans -->
    <div class="q-px-md-xl q-px-sm-xl q-px-xs-none row justify-between q-mt-md">
      <div
        v-for="plan in selfPlans"
        :key="plan['planID']"
        class="col-md-6 col-sm-12 col-xs-12 q-pa-md-md q-pa-sm-md q-pa-xs-sm rounded-corners"
      >
        <div class="bg-white rounded-borders">
          <div class="row justify-between q-pt-md q-px-lg">
            <div class="col-6 text-h6 text-grey-8 text-capitalize">
              {{
                plan['name'] === 'self'
                  ? 'done with you blooprint'
                  : plan['name']
              }}
            </div>
            <div class="col-6 text-h6 text-grey-8 text-right">
              ${{ plan['amount'] }}
            </div>
          </div>
          <div class="row items-center justify-between q-px-lg">
            <div class="col-6 text-body2 text-grey-8">
              <div class="q-mb-md q-pt-md">
                {{ plan['description'] }}
              </div>
            </div>
            <div class="col-6 text-h6 text-grey-8 text-right">
              <q-btn
                color="primary"
                class="q-px-md"
                label="Buy"
                no-caps
                @click="updateSelfPlan(plan)"
                style="border-radius:6px"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-12 q-px-md-md q-px-sm-md q-px-xs-sm"
        v-if="allPlans.length"
      >
        <q-separator class=" shadow-3 q-my-sm" color="secondary" size="1px" />
      </div>
    </div>

    <!--For all available Plans  -->
    <div class="q-px-md-xl q-px-sm-xl q-px-xs-none row justify-between">
      <div
        v-for="plan in allPlans"
        :key="plan['planID']"
        class="col-md-6 col-sm-6 col-xs-12 q-pa-md-md q-pa-sm-md q-pa-xs-sm rounded-corners"
      >
        <div
          :class="
            plan['planID'] === planInfo.Id
              ? 'bg-smalt rounded-borders'
              : 'bg-white rounded-borders'
          "
        >
          <div class="row justify-between q-pt-md q-px-lg">
            <div
              :class="
                plan['planID'] === planInfo.Id
                  ? 'col-6 text-h6 text-white text-capitalize'
                  : 'col-6 text-h6 text-grey-8 text-capitalize'
              "
            >
              {{ plan['name'] }}
            </div>
            <div
              v-if="plan['name'] !== 'enterprise'"
              :class="
                plan['planID'] === planInfo.Id
                  ? 'col-6 text-h6 text-white text-right'
                  : 'col-6 text-h6 text-grey-8 text-right'
              "
            >
              ${{ plan['amount'] }}{{ planAmountPrefix(plan['interval']) }}
            </div>
          </div>
          <div class="row items-center justify-between q-px-lg">
            <div
              :class="
                plan['planID'] === planInfo.Id
                  ? 'col-6 text-body2 text-white'
                  : 'col-6 text-body2 text-grey-8'
              "
            >
              <div
                class="q-pt-md text-body1"
                v-if="plan['name'] !== 'enterprise'"
              >
                Number of Blooprints -
                {{
                  plan['accessibleBlooprints'] === -1
                    ? 'Unlimited'
                    : plan['accessibleBlooprints']
                }}
              </div>
              <div v-else class="q-py-md text-body1">
                {{ accessibility.enterprise }}
              </div>
              <div class="q-mb-md q-pt-sm" v-if="plan['name'] !== 'enterprise'">
                {{ plan['description'] }}
              </div>
            </div>
            <div class="col-6 text-h6 text-grey-8 text-right">
              <div
                class="text-body1 text-white"
                v-if="plan['planID'] === planInfo.Id"
              >
                Current plan
              </div>
              <q-btn
                v-else-if="plan['name'] !== 'enterprise'"
                color="primary"
                class="q-px-md"
                label="Buy"
                no-caps
                @click="updatePlan(plan)"
                style="border-radius:6px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationPopup
      v-if="confirmationPopup"
      :popupMsg="confirmPopupMsg"
      @on-confirm-popup-close="onConfirmationPopupClose"
    />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationPopup from '../components/ConfirmationPopup.vue'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    ConfirmationPopup
  },
  name: 'MyPlan',
  data() {
    return {
      show: false,
      accessibility: {
        enterprise: 'Contact our team for enterprise pricing solutions'
      },
      confirmationPopup: false,
      confirmPopupMsg: 'Are you sure you want to switch to this plan?',
      planSelected: {}
    }
  },
  mounted() {
    this.getCurrentPlanInfo()
    this.getPlans()
    this.getPlansForSelf()
  },
  methods: {
    ...mapActions([
      'getPlans',
      'getPlansForSelf',
      'getCurrentPlanInfo',
      'updateCustomerSubscription'
    ]),
    async updateSelfPlan(plan) {
      this.$router.push('plan-update/' + plan.name)
    },
    updatePlan(plan) {
      if (this.planInfo.name === undefined || this.planInfo.name == 'free') {
        this.$router.push('plan-update/' + plan.name)
      } else {
        this.planSelected = plan
        this.confirmationPopup = true
      }
    },
    onConfirmationPopupClose(event) {
      if (event['confirmStatus'] == 'yes') {
        this.upgradeToNewPlan(this.planSelected)
      } else {
        this.planSelected = {}
      }
      this.confirmationPopup = false
    },
    planAmountPrefix(duration) {
      if (duration === 'month') {
        return '/mo'
      } else if (duration === 'year') {
        return '/yr'
      }

      return ''
    },
    async upgradeToNewPlan(plan) {
      var payload = {
        id: this.planInfo.subscriptionID,
        planID: plan.planID,
        priceID: plan.priceID,
        planName: plan.name
      }
      await this.updateCustomerSubscription(payload).then(() => {
        this.mac.upgrade({
          email: this.userProfile.email,
          username:
            this.userProfile.firstName +
            (this.userProfile.lastName === undefined
              ? ''
              : ' ' + this.userProfile.lastName),
          planName: plan.name,
          amount: (plan.amount * 100).toString(),
          currency: 'USD',
          subscriptionType: plan.interval === 'month' ? 'monthly' : 'yearly',
          purchaseType: 'subscription'
        })
      })
      this.planSelected = {}
    }
  },
  computed: {
    ...mapGetters(['allPlans', 'planInfo', 'userProfile', 'selfPlans'])
  }
}
</script>
<style lang="scss" scoped></style>
