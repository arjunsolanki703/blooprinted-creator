<template>
  <div class="full-width billing-page">
    <label class="billing-heading text-letter-space">
      <img src="../assets/billing-blue.svg" class="lt-md card-icon" />
      Billing
    </label>
    <div
      class="flex no-wrap full-width card-plan-container"
      style="align-items: stretch !important"
    >
      <div
        class="plan-information-container"
        :style="
          $q.screen.gt.sm && displayCard ? 'margin-right: 20px !important' : ''
        "
        v-if="currentPlanInfo && currentPlanInfo.name"
      >
        <div class="flex full-width plan-details">
          <label
            class="flex f-w-600 text-fs-16 text-lh-24 text-capitalize plan-name"
          >
            {{ (currentPlanInfo.name === 'starter' && currentPlanInfo.doneForYou >= 1) || currentPlanInfo.doneForYou >= 1 ? 'Done with you' : currentPlanInfo.name }}
          </label>
          <q-space />
          <span class="dollar-sign">$</span>
          <label class="flex f-w-600 amount">
            <!-- {{ currentPlanInfo.amount }} -->
            {{
              planInfo && planInfo['doneForYou'] >= 1
                ? 1495
                : currentPlanInfo.name === 'starter' && currentPlanInfo.doneForYou === 0 ? 129 : 2997
            }}
          </label>
          <label class="price-plan" v-if="currentPlanInfo.name === 'starter' && currentPlanInfo.doneForYou === 0">
            p/mo
          </label>
        </div>
        <!-- <div class="flex column full-width plan-description-container">
          <label class="text-fs-14-lh-20 f-w-400 flex text-lynch no-wrap">
            <img
              src="../assets/billing-check-icon.svg"
              style="margin-right: 10px"
            /><span>
              Number of blooprints:
              <span class="text-bold q-ml-xs">{{
                currentPlanInfo.name == 'enterprise'
                  ? 'Unlimited'
                  : currentPlanInfo.accessibleBlooprints
              }}</span>
            </span>
          </label>
          <label
            class="text-fs-14-lh-20 f-w-400 flex text-lynch no-wrap"
            style="margin-top:2px"
          >
            <img
              src="../assets/billing-check-icon.svg"
              style="margin-right: 10px"
            />{{ currentPlanInfo.description }}
          </label>
          <label
            class="text-fs-14-lh-20 f-w-400 flex text-lynch"
            style="margin-top:2px"
          >
            <img
              src="../assets/billing-check-icon.svg"
              style="margin-right: 10px"
            />{{
              currentPlanInfo.name == 'free'
                ? 'No annual fee'
                : `Annual fee: $${currentPlanInfo.amount}`
            }}
          </label>
          <label
            class="text-fs-14-lh-20 f-w-400 flex text-lynch no-wrap"
            style="margin-top:2px"
            v-if="currentPlanInfo.name == 'free'"
          >
            <img
              src="../assets/billing-check-icon.svg"
              style="margin-right: 10px"
            />No charges per blooprint
          </label>
          <label
            class="text-fs-14-lh-20 f-w-400 flex text-lynch no-wrap"
            style="margin-top:2px"
            v-if="
              currentPlanInfo.name != 'free' &&
                currentPlanInfo.name != 'enterprise'
            "
          >
            <img
              src="../assets/billing-check-icon.svg"
              style="margin-right: 10px"
            />Charges per blooprint: ${{
              (
                currentPlanInfo.amount / currentPlanInfo.accessibleBlooprints
              ).toFixed(1)
            }}
          </label>
        </div> -->
        <q-space />
        <div class="full-width flex upgrade-plan-btn">
          <q-space />
          <q-btn
            flat
            dense
            no-caps
            label="Upgrade plan"
            class="upgrade-btn"
            @click="$emit('upgrade', 'myPlan')"
          >
            <q-img
              src="../assets/arrow-up-right.svg"
              width="20px"
              height="20px"
              class="q-ml-sm"
            />
          </q-btn>
        </div>
      </div>
      <div
        v-else
        class="plan-information-container full-width"
        style="margin-right: 20px !important"
      >
        <div style="display: flex !important;" class="full-width">
          <div
            style="margin-right: 30px; padding: 24px 0px 10px 24px"
            class="full-width"
          >
            <q-skeleton type="text" class="q-my-sm" width="25%" />
            <q-skeleton type="text" width="90%" />
            <q-skeleton type="text" width="90%" />
            <q-skeleton type="text" width="90%" />
            <q-skeleton type="text" width="90%" />
          </div>
          <div class="flex column align-right q-pr-md q-pt-md">
            <q-skeleton type="text" width="100px" height="60px" />
          </div>
        </div>
        <div
          class="full-width"
          style="border-top: #e4e7ec 2px solid; padding: 16px 24px"
        >
          <label class="flex">
            <q-space />
            <q-skeleton
              type="text"
              class="q-mt-sm"
              width="100px"
              height="30px"
            />
          </label>
        </div>
      </div>
      <card-information
        class="card-container"
        v-if="displayCard"
        @cardDetails="val => (displayCard = val)"
      />
    </div>
  </div>
</template>

<script>
import CardInformation from './CardInformation.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'BillingInformation',
  data() {
    return {
      currentPlanInfo: {},
      displayCard: true
    }
  },
  components: { CardInformation },
  methods: {
    ...mapActions(['getCurrentPlanInfo'])
  },
  async created() {
    this.getCurrentPlanInfo().then(() => {
      // if consumer signin on creator UI
      if (this.planInfo.Id === undefined) {
        const res = this.allPlans.filter(plan => plan.name === 'free')
        this.currentPlanInfo = { ...res[0] }
      } else {
        // const res = this.allPlans.filter(
        //   plan => plan.planID === this.planInfo.Id
        // )
        this.currentPlanInfo = this.planInfo
      }
    })
  },
  computed: {
    ...mapGetters(['planInfo', 'allPlans'])
  }
}
</script>

<style lang="scss" scoped>
.billing-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000 !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding-top: 30px !important;
  }
}
.billing-page {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0px 15px !important;
  }
}
.plan-information-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // padding: 24px;
  background: #ffffff;
  border: 1px solid #e8e9ec;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  margin-top: 30px;
  width: 100%;
  // margin-right: 10px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px !important;
    width: 100%;
    margin-right: 0px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 20px !important;
    padding: 0px !important;
    // box-shadow: none !important;
    // border: none !important;
  }
}
.amount {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 60px;
  letter-spacing: -0.02em;
  color: #101828;
  align-items: baseline !important;
  @media only screen and (max-width: 1300px) {
    font-size: 26px;
    line-height: 50px;
  }
  @media only screen and (max-width: 1090px) {
    font-size: 20px;
    line-height: 50px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 36px;
    line-height: 60px;
  }
  @media only screen and (max-width: 400px) {
    font-size: 30px;
    line-height: 50px;
  }
  @media only screen and (max-width: 374px) {
    font-size: 24px !important;
    line-height: 44px !important;
  }
  // @media only screen and (max-width: 330px) {
  //   font-size: 18px;
  //   line-height: 45px;
  // }
  span {
    font-weight: 500 !important;
    font-size: 16px !important;
    line-height: 24px !important;
    color: #667085 !important;
    padding-left: 2px;
  }
}
.upgrade-btn {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #0052cd;
  display: flex;
}
.dollar-sign {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 44px;
  color: #101828;
  padding-top: 5px;
  padding-right: 2px;
  @media only screen and (max-width: 1300px) {
    font-size: 20px;
    line-height: 46px;
    padding-top: 0px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 30px;
    line-height: 44px;
    padding-top: 5px;
  }
  @media only screen and (max-width: 400px) {
    font-size: 26px;
    line-height: 46px;
    padding-top: 0px;
  }
  @media only screen and (max-width: 374px) {
    font-size: 20px !important;
    line-height: 40px !important;
    padding-top: 0px;
  }
  // @media only screen and (max-width: 330px) {
  //   font-size: 14px;
  //   line-height: 45px;
  //   padding-top: 0px;
  // }
}
.plan-name {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #101828;
}
.plan-details {
  padding: 24px 28px 0px 24px;
  @media only screen and (min-width: 1024px) and (max-width: 1200px) {
    padding: 8px;
  }
}
.plan-description-container {
  padding: 0px 24px 13px;
  @media only screen and (min-width: 1024px) and (max-width: 1200px) {
    padding: 8px;
  }
}
.card-plan-container {
  display: flex;
  @media only screen and (max-width: $breakpoint-sm-max) {
    flex-direction: column;
  }
}
.card-container {
  max-width: 50%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 100%;
    margin-left: 0px !important;
  }
}
.card-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
.upgrade-plan-btn {
  border-top: #e4e7ec 2px solid;
  padding: 16px 24px;
  @media only screen and (min-width: 1024px) and (max-width: 1200px) {
    padding: 8px !important;
  }
}
.price-plan {
  display: flex;
  align-self: flex-end;
  margin-left: 2px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #667085;
  padding-bottom: 8px;
}
</style>
