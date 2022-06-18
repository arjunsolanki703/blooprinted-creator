<template>
  <div>
    <div class="logo-icon-wrapper" @click="onLogoClick">
      <q-img class="cursor-pointer" src="~assets/blooprinted-logo.svg" />
    </div>
    <div
      class="f-w-600 text-body1 gt-sm text-regalBlue cursor-pointer"
      style="margin-top:31px"
      v-if="displayBackOption"
      @click="onBackClick"
    >
      Back
    </div>
    <div
      class="q-mt-lg progress-section-style lt-md"
      v-if="showStepWizard && !isLoginPage && navigatedFrom.name !== 'settings'"
    >
      <q-linear-progress
        color="primary"
        size="10px"
        :value="progressValue"
        class="progress-style"
      />
      <div class="q-mt-sm f-w-600 text-body1">
        <span v-if="progressValue < 0.5">Step 1. Create Account</span>
        <span v-else-if="progressValue == 0.75">Step 2. Payment</span>
        <span v-else>{{ screenType }}</span>
      </div>
    </div>

    <div class="card-section-style">
      <div class="heading-margin">
        <div class="f-w-600 text-regalBlue plan-heading">
          {{
            !(showSelectedPlan || reqFrom == 'checkout')
              ? 'Your plan'
              : 'Pick your plan'
          }}
        </div>
        <div class="f-w-500 text-body1 text-comet q-mt-5">
          {{
            !(showSelectedPlan || reqFrom == 'checkout')
              ? 'Choose the blooprint plan that will work best for you.'
              : 'Confirm you plan'
          }}
        </div>
      </div>
      <div class="plans-margin q-mr-md-md">
        <div v-if="isLoading">
          <q-card
            bordered
            class="blooprint-card q-mb-sm"
            v-for="i in 1"
            :key="i"
          >
            <q-card-section class="card-width">
              <div class="row items-center justify-between">
                <q-skeleton type="text" width="30%" />
                <q-skeleton class="text-right" type="text" width="10%" />
              </div>
              <q-skeleton
                class="q-mt-5"
                type="QToolbar"
                width="100%"
              ></q-skeleton>
            </q-card-section>
          </q-card>
        </div>
        <div
          class="plan-border payment-plan text-regalBlue cursor-pointer bg-primary text-white selected-plan"
          v-if="(showSelectedPlan || reqFrom == 'checkout') && !isLoading"
        >
          <div class="row f-w-600 text-body1">
            <div class="col text-capitalize">
              {{
                planSelected['name'] === 'self'
                  ? 'Done With You'
                  : planSelected['name']
              }}
            </div>
            <div class="col text-right">
              ${{
                planSelected['amount']
                  ? Math.round(planSelected['amount']) == planSelected['amount']
                    ? planSelected['amount']
                    : planSelected['amount'].toFixed(2)
                  : ''
              }}{{ planAmountPrefix(planSelected['interval']) }}
            </div>
          </div>
          <div
            class="f-w-400 text-fs-14-lh-20 q-mt-5"
            v-if="planSelected['name'] != 'self'"
          >
            Number of blooprints:
            <span class="f-w-600">
              {{
                planSelected['accessibleBlooprints'] === -1
                  ? 'Unlimited'
                  : planSelected['accessibleBlooprints']
              }}
            </span>
          </div>
          <div
            class="text-comet f-w-500 text-fs-14-lh-20 text-white"
            :class="{
              'q-mt-5': planSelected['name'] == 'self'
            }"
          >
            {{ planSelected['description'] }}
          </div>
        </div>
        <div v-if="(!showSelectedPlan || reqFrom == 'checkout') && !isLoading">
          <!-- <div
            v-if="reqFrom == 'checkout'"
            class="f-w-600 text-regalBlue plan-heading"
            style="margin-top: 30px; margin-bottom: 2px"
          >
            blooprinted plan
          </div> -->
          <div
            v-for="(plans, index) in reqFrom == 'checkout'
              ? filterdPlansList
              : plansList"
            :key="plans['planID']"
            class="plan-border text-regalBlue cursor-pointer"
            :class="
              planSelected['planID']
                ? planSelected['planID'] == plans['planID']
                  ? 'bg-primary text-white selected-plan'
                  : null
                : index == 0
                ? 'bg-primary text-white selected-plan'
                : null
            "
            @click="onPlanSelect(plans)"
          >
            <div class="row f-w-600 text-body1">
              <div class="col text-capitalize">
                {{ plans['name'] === 'self' ? 'Done With You' : plans['name'] }}
              </div>
              <div class="col text-right">
                ${{ plans['amount'] }}{{ planAmountPrefix(plans['interval']) }}
              </div>
            </div>
            <div class="row text-body2">
              {{ plans['name'] === 'starter' ? '30 Days Free Trial' : '' }}
            </div>
            <div
              class="f-w-400 text-fs-14-lh-20 q-mt-5"
              v-if="plans['name'] != 'self'"
            >
              Number of blooprints:
              <span class="f-w-600">
                {{
                  plans['accessibleBlooprints'] === -1
                    ? 'Unlimited'
                    : plans['accessibleBlooprints']
                }}
              </span>
            </div>
            <div
              class="text-comet f-w-500 text-fs-14-lh-20"
              :class="{
                'text-white': planSelected['planID'] == plans['planID'],
                'q-mt-5': plans['name'] === 'self'
              }"
            >
              {{ plans['description'] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { constants, isLogin } from '../utils/common'

export default {
  name: 'PlanDetails',
  // props: [
  //   'isLoading',
  //   'progressValue',
  //   'screenType',
  //   'showPaymentForm',
  //   'cardDetails',
  //   'navigatedFrom',
  //   'showStepWizard'
  // ],
  props: {
    plansList: { type: Array },
    isLoading: { type: Boolean },
    progressValue: { type: Number },
    screenType: { type: String },
    showPaymentForm: { type: Boolean },
    cardDetails: { type: Object },
    navigatedFrom: { type: Object },
    showStepWizard: { type: Boolean },
    isOldCardPresent: { type: Boolean }
  },
  data() {
    return {
      isLoginPage: false,
      planSelected: {},
      showSelectedPlan: false,
      navBackScreen: {},
      reqFrom: ''
    }
  },
  watch: {
    $route: 'checkLoginPage',
    navigatedFrom(data) {
      this.navBackScreen = data
    },
    plansList(data) {
      if (data.length > 1) {
        this.checkForSelectedPlan()
      }
    }
  },
  computed: {
    filterdPlansList() {
      if (this.plansList) {
        let data = this.plansList.filter(
          item => item['name'] != this.planSelected['name']
        )
        return data
      } else {
        return []
      }
    },
    displayBackOption() {
      if (this.progressValue == 0.75) {
        if (this.isOldCardPresent && this.showPaymentForm) {
          return true
        } else {
          return false
        }
      }
      return true
    }
  },
  created() {
    this.checkLoginPage()
    this.reqFrom = this.$route.fullPath.includes('checkout') ? 'checkout' : ''
    if (this.$route.fullPath.includes('plan-update')) {
      this.showSelectedPlan = true
    } else {
      this.showSelectedPlan = false
    }
    this.checkForSelectedPlan()
  },
  updated() {
    this.reqFrom = this.$route.fullPath.includes('checkout') ? 'checkout' : ''
    if (this.$route.fullPath.includes('plan-update')) {
      this.showSelectedPlan = true
    } else {
      this.showSelectedPlan = false
    }
    this.checkForSelectedPlan()
  },
  methods: {
    planAmountPrefix(duration) {
      if (duration === 'month') {
        return '/mo'
      } else if (duration === 'year') {
        return '/yr'
      }

      return ''
    },
    checkLoginPage() {
      let selectedRoute = this.$router.history.current.fullPath
      if (selectedRoute.includes('login/blooprints')) {
        this.isLoginPage = true
      } else {
        this.isLoginPage = false
      }
      this.checkForSelectedPlan()
    },
    checkForSelectedPlan() {
      let i = 0
      let planName = this.$route.params.planName
      if (this.plansList.length > 0) {
        i++
        this.plansList.map(plan => {
          if (plan['name'] == planName) {
            this.planSelected = plan
          }
        })
      }
      if (this.planSelected && this.planSelected['name'] == 'free') {
        this.planSelected = this.plansList[0]
        if (this.$route.fullPath.includes('plan-update')) {
          this.$router.replace({
            name: 'plan-update',
            params: { planName: this.planSelected['name'] }
          })
        } else if (this.$route.fullPath.includes('checkout')) {
          this.$router.replace({
            name: 'plan-checkout',
            params: { planName: this.planSelected['name'] }
          })
        } else if (this.$route.fullPath.includes('signup')) {
          this.$router.replace({
            name: 'signup-plan',
            params: { planName: this.planSelected['name'] }
          })
        }
        this.$emit('on-plan-select', this.planSelected)
      } else {
        if (this.planSelected && this.planSelected['planID']) {
          this.$emit('on-plan-select', this.planSelected)
        } else {
          if (this.plansList.length > 0 && i > 0) {
            this.$router.replace({ name: 'error-screen' })
            // this.planSelected = this.plansList[0]
            // if (this.$route.fullPath.includes('plan-update')) {
            //   this.$router.replace({
            //     name: 'plan-update',
            //     params: { planName: this.planSelected['name'] }
            //   })
            // } else if (this.$route.fullPath.includes('checkout')) {
            //   this.$router.replace({
            //     name: 'plan-checkout',
            //     params: { planName: this.planSelected['name'] }
            //   })
            // } else if (this.$route.fullPath.includes('signup')) {
            //   this.$router.replace({
            //     name: 'signup-plan',
            //     params: { planName: this.planSelected['name'] }
            //   })
            // }
            // this.$emit('on-plan-select', this.planSelected)
          }
        }
      }
    },
    onPlanSelect(plan) {
      this.planSelected = plan
      this.$emit('on-plan-select', this.planSelected)
      if (isLogin()) {
        this.$router.replace(
          {
            name: 'plan-checkout',
            params: {
              planName: plan['name']
            }
          },
          () => {}
        )
      } else {
        this.$router.replace(
          {
            name: 'signup-plan',
            params: {
              planName: plan['name']
            }
          },
          () => {}
        )
      }
    },
    onLogoClick() {
      this.$router.replace({ name: constants.PAGE_HOME }, () => {})
    },
    onBackClick() {
      if (
        this.$route.fullPath.includes('plan-update') ||
        this.$route.fullPath.includes('checkout')
      ) {
        if (!this.showPaymentForm || this.cardDetails['expMonth'] == '') {
          this.navigateBack()
        } else {
          this.$emit('show-old-card', true)
        }
      } else {
        this.navigateBack()
      }
    },
    navigateBack() {
      if (this.$route.fullPath.includes('plan-update')) {
        if (this.navigatedFrom.name && this.navigatedFrom.name != 'settings') {
          this.$router.replace({ name: this.navigatedFrom.name }, () => {})
        } else {
          this.$router.replace('/settings?tab=myPlan')
        }
      } else {
        if (this.navigatedFrom.name) {
          this.$router.replace({ name: this.navigatedFrom.name }, () => {})
        } else {
          this.$router.replace({ name: 'login' }, () => {})
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.q-mt-5 {
  margin-top: 5px;
}
.text-fs-14-lh-20 {
  font-size: 14px;
  line-height: 20px;
}
.plans-margin {
  margin-top: 22px;
  margin-bottom: 203px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 0px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 30px;
    margin-bottom: 0px;
  }
}
.logo-icon-wrapper {
  width: 184px;
  @media only screen and (max-width: $breakpoint-xs) {
    width: 138px;
  }
}
.plan-heading {
  font-size: 32px;
  line-height: 36px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 24px;
    line-height: 28px;
  }
}
.heading-margin {
  margin-top: 84px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 28px;
  }
}
.plan-border {
  border: 1px solid $ghost;
  margin-top: 8px;
  border-radius: 10px;
  padding: 12px 20px;
  background: white;
}
.selected-plan {
  padding: 15px 20px;
  border: 1px solid $primary;
}
.payment-plan {
  min-width: 432px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: 580px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    min-width: auto;
  }
}
.card-section-style {
  @media only screen and (min-width: $breakpoint-sm-min) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 432px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 580px;
  }
}
.progress-section-style {
  @media only screen and (min-width: $breakpoint-sm-min) {
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
.blooprint-card {
  border-radius: 10px;
  border: 1px solid $ghost;
  box-shadow: 0px 0px 0px $shadow;
  @media only screen and (max-width: $breakpoint-sm-max) {
    box-shadow: 0px 0px 0px $shadow;
    border-radius: 10px;
    height: 20% !important;
    width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    box-shadow: 0px 0px 0px $shadow;
    border-radius: 10px;
    width: auto;
  }
  .q-card__section--vert {
    padding: 15px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 15px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 15px !important;
    }
  }
}
.card-width {
  width: 431px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
  }
}
.blooprint-font {
  font-size: 20px;
  line-height: 28px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 16px;
    line-height: 24px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 16px;
    line-height: 24px;
  }
}
.price-font {
  font-size: 24px;
  line-height: 32px;
  margin-top: 10px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 28px;
    margin-top: 8px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 28px;
    margin-top: 8px;
  }
}
::v-deep {
  .progress-style {
    margin: 8px 0px;
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
.q-skeleton--type-circle {
  width: 20px !important;
  height: 20px !important;
}
</style>
