<template>
  <div class="full-width main-container">
    <label class=" text-letter-space profile-heading">
      <q-img
        src="../assets/tag-blue.svg"
        class="lt-md profile-icon text-primary margin-bottom-30"
      />
      My Plan
    </label>
    <div v-if="selfPlanDetails && selfPlanDetails.length > 0">
      <div
        class="done-for-you plan-card"
        style="color: #000000"
      >
        <div style="">
          <div class="flex justify-between">
          <label class="flex f-w-600 text-fs-16 text-lh-24 subtitle-letterspacing">
            {{ selfPlanDetails[0].name === 'starter' ?  selfPlanDetails[0].name.charAt(0).toUpperCase() + selfPlanDetails[0].name.slice(1) : 'Done With You' }}
          </label>
          <label class="flex f-w-600 text-fs-16 text-lh-24 amount-name subtitle-letterspacing"
              >${{ selfPlanDetails[0]['amount'] }}</label
            >
          </div>
          <label
            
            class="text-fs-14-lh-20 flex"
            style="margin-top:10px;"
          ></label>
          <label class="text-fs-14-lh-20 f-w-400 flex no-wrap subtitle-letterspace"
              v-if="selfPlanDetails[0].accessibleBlooprints === -1 && selfPlanDetails[0].name === 'starter'">
              <img
                src="../assets/Ellipse.svg"
                class="desc-dot"
              /><span>
                Number of blooprints:
                <span class="text-bold q-ml-xs">
                  Unlimited
                </span>
              </span>
            </label>
            <label class="text-fs-14-lh-20 f-w-400 flex no-wrap  subtitle-letterspace"
              style="margin-right: 20px"
            >
              <img src="../assets/Ellipse.svg" class="desc-dot" />
              {{
                selfPlanDetails[0]['name'] == 'enterprise'
                  ? selfPlanDetails[0]['description']
                  : `${selfPlanDetails[0]['description']}`
              }}
            </label>
        </div>
        <div class="flex column amount-btn-container">
          <label class="flex f-w-600 text-fs-16 amount text-lh-24 subtitle-letterspacing">
            <q-space />${{ Math.round(selfPlanDetails[0].amount) == selfPlanDetails[0].amount ? selfPlanDetails[0].amount : selfPlanDetails[0].amount.toFixed(2) }}
            <span v-if="selfPlanDetails[0].accessibleBlooprints === -1 && selfPlanDetails[0].name !== 'self'">/mo</span>
          </label>
          <q-btn
            class="buy-btn subtitle-letterspace "
            no-caps
            dense
            flat
            label="Buy"
            :to="`plan-update/${selfPlanDetails[0].name}`"
          />
        </div>
      </div>
    </div>
    <hr
      style=" color: #E8E9EC; background-color: #E8E9EC; border: 1px solid #E8E9EC; margin: 0px !important"
      v-if="selfPlanDetails && selfPlanDetails.length > 0"
    />
    <div
      v-if="selfPlanDetails && selfPlanDetails.length > 0"
      style="padding-top: 10px"
      class="plan-card-margin-bottom"
    >
      <div
        class="plan-card"
        v-for="(plan, i) in selfPlanDetails.slice(1)"
        :key="plan['planID']"
        :class="
          [plan['planID'] === planInfo.Id ||
          currentPlanInfo.planID === plan['planID']
            ? 'current-plan'
            : null, i === 0 ? 'plan-card-border' : null]
        "
      >
        <div class="description-container">
          <div class="flex">
            <label
              class="flex f-w-600 text-fs-16 text-lh-24 text-capitalize subtitle-letterspacing"
              >{{ plan.name === 'self' ? 'Done With You' : plan['name'] }}</label
            >
            <q-space />
            <label class="flex f-w-600 text-fs-16 text-lh-24 amount-name subtitle-letterspacing"
              >${{ plan['amount'] }}/mo</label
            >
          </div>
          <div style="margin-top: 10px; margin-right: 20px" class="subtitle-letterspace">
            <label class="text-fs-14-lh-20 f-w-400 flex no-wrap"
              v-if="plan.accessibleBlooprints === -1 && plan.name === 'starter'">
              <img
                src="../assets/Ellipse.svg"
                class="desc-dot"
              /><span>
                Number of blooprints:
                <span class="text-bold q-ml-xs">
                  Unlimited
                </span>
              </span>
            </label>
            <label class="text-fs-14-lh-20 f-w-400 flex no-wrap subtitle-letterspace">
              <img src="../assets/Ellipse.svg" class="desc-dot" />
              {{
                plan['name'] == 'enterprise'
                  ? plan['description']
                  : `${plan['description']}`
              }}
            </label>
          </div>
        </div>
        <div
          class="flex column amount-btn-container"
          :class="
            plan['planID'] === planInfo.Id ||
            currentPlanInfo.planID === plan['planID']
              ? 'fee-btn-container'
              : null
          "
        >
          <label class="flex f-w-600 text-fs-16 text-lh-24 amount subtitle-letterspacing  "
            ><q-space />${{ plan['amount'] }}
            <span v-if="plan.accessibleBlooprints === -1 && plan.name !== 'self'">/mo</span>
            </label
          >
          <q-btn
            v-if="
              plan['planID'] === planInfo.Id ||
                currentPlanInfo.planID === plan['planID']
            "
            class="current-plan-btn cursor-none f-w-400 subtitle-letterspace"
            no-caps
            dense
            flat
            label="Current Plan"
          />
          <q-btn
            v-else
            class="buy-btn f-w-400 subtitle-letterspace"
            no-caps
            dense
            flat
            label="Buy"
            :to="`plan-update/${plan.name}`"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="$q.screen.width > 600">
        <div class="done-for-you" v-for="i in 2" :key="i">
          <div style="margin-right: 30px" class="full-width">
            <q-skeleton type="text" class="q-my-sm" width="25%" />
            <q-skeleton type="text" width="70%" />
            <q-skeleton type="text" width="70%" />
            <q-skeleton type="text" width="70%" />
          </div>
          <div class="flex column align-right">
            <label class="flex">
              <q-space />
              <q-skeleton type="text" class="q-mt-sm" width="70px" />
            </label>
            <q-skeleton type="text" width="100px" height="60px" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="done-for-you" v-for="i in 2" :key="i">
          <div style="margin-right: 30px" class="full-width">
            <div class="flex justify-between">
              <q-skeleton type="text" class="q-my-sm" width="25%" />
              <div class="flex column align-right">
                <label class="flex">
                  <q-space />
                  <q-skeleton type="text" class="q-mt-sm" width="70px" />
                </label>
              </div>
            </div>
            <q-skeleton type="text" width="100%" />
            <q-skeleton type="text" width="100%" />
            <q-skeleton type="text" width="100%" />
            <q-skeleton type="text" width="100%" height="60px" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="text-fs-14-lh-20 f-w-400 flex subtitle-letterspace"
      style="margin-top: 10px; color: #000000"
      :style="$q.screen.lt.md ? 'padding-bottom: 100px' : ''"
    >
      *Plus the merchant processing fee of 4%
    </div> -->
    <ConfirmationPopup
      v-if="confirmationPopup"
      :popupMsg="confirmPopupMsg"
      @on-confirm-popup-close="onConfirmationPopupClose"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationPopup from '../components/ConfirmationPopup.vue'
export default {
  name: 'MyPlan',
  data() {
    return {
      planSelected: {},
      confirmationPopup: false,
      confirmPopupMsg: 'Are you sure you want to switch to this plan?',
      currentPlanInfo: {},
      currentPlanIndex: 0,
      selfPlanDetails: [],
      allPlansList: []
    }
  },
  components: { ConfirmationPopup },
  methods: {
    ...mapActions([
      'getPlans',
      'getPlansForSelf',
      'getCurrentPlanInfo',
      'updateCustomerSubscription'
    ]),
    updatePlan(plan) {
      if (this.planInfo.name === undefined || this.planInfo.name == 'free') {
        this.$router.push('checkout/' + plan.name)
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
  async created() {
    // await this.getPlans()
    this.getCurrentPlanInfo().then(() => {
      // if consumer signin on creator UI
      if (this.planInfo.Id === undefined) {
        const res = this.allPlans.filter(plan => plan.name === 'free')
        this.currentPlanInfo = { ...res[0] }
      } else {
        const res = this.allPlans.filter(
          plan => plan.planID === this.planInfo.Id
        )
        this.currentPlanInfo = { ...res[0] }
      }
      // get index of current plan to display Upgrade/Downgrade
      this.currentPlanIndex = this.allPlans.findIndex((plan, i) => {
        if (plan.planID === this.currentPlanInfo.planID) return i
      })
      this.allPlansList = [...this.allPlans]
    })
    this.getPlansForSelf().then(() => {
      this.selfPlanDetails = [...this.selfPlans]
    })
  },
  computed: {
    ...mapGetters(['allPlans', 'planInfo', 'userProfile', 'selfPlans'])
  },
  watch: {
    planInfo() {
      const res = this.allPlans.filter(plan => plan.planID === this.planInfo.Id)
      this.currentPlanInfo = { ...res[0] }
      this.currentPlanIndex = this.allPlans.findIndex((plan, i) => {
        if (plan.planID === this.currentPlanInfo.planID) return i
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding-top: 30px !important;
  }
}
.done-for-you {
  display: flex;
  font-family: Poppins;
  margin-top: 30px !important;
  margin-bottom: 20px;
  background: #ffffff;
  border: 2px solid #e8e9ec;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 15px 20px 20px;
  justify-content: space-between;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px !important;
  }
}
.buy-btn {
  display: flex;
  height: 40px;
  width: 71px !important;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  background: #1652f0;
  border-radius: 5px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100% !important;
  }
}
.plan-card {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px 20px;
  background: #ffffff;
  border: 2px solid #e8e9ec;
  box-sizing: border-box;
  border-radius: 10px;
  color: #000000;
  font-family: Poppins;
  @media only screen and (max-width: $breakpoint-xs-max) {
    flex-direction: column;
    .amount {
      display: none;
    }
  }
}
.downgrade-btn {
  display: flex;
  height: 40px;
  width: 135px !important;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  background: #ffffff;
  border: 2px solid #1652f0;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1652f0;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100% !important;
  }
}
.current-plan {
  background-color: $primary;
  color: #ffffff;
}
.current-plan-btn {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap !important;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  height: 40px;
  background: #5c86f5;
  border-radius: 2px;
  font-size: 16px;
  line-height: 24px;
  width: 160px;

  @media only screen and (max-width: 430px) {
    padding: 8px 0px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
  }
}
.profile-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
.main-container {
  @media only screen and (max-width: $breakpoint-sm) {
    padding: 0 15px !important;
    background: #ffffff !important;
  }
}
.fee-btn-container {
  @media only screen and (min-width: 1024px) and (max-width: 1090px) {
    // width: 31% !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
  }
}
.description-container {
  padding-right: 20px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-right: 0px;
  }
}
.amount-name {
  display: none;
  @media only screen and (max-width: $breakpoint-xs-max) {
    display: flex;
  }
}
.subtitle-letterspacing {
  letter-spacing: 0.75px;
}
.desc-dot {
  margin-right: 10px;
  align-self: flex-start;
  margin-top: 5px;
}
.plan-card-margin-bottom {
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 10px;
  }
}
</style>
