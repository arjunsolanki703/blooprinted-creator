<template>
  <div class="section bg-solitudeBlue" id="plans-section">
    <div>
      <div
        class="heading text-regalBlue f-w-600 reveal fade-left text-letter-space"
      >
        Creator payment plans
      </div>
      <div
        class="subheading text-regalBlue text-lh-28 f-s-20 f-w-400 reveal fade-left q-mt-md"
      >
        What kind of creator are you? Choose the plan that works for you.
      </div>
      <div class="row items-end plans-container justify-center">
        <div
          class="plan col bg-white overflow-hidden reveal fade-bottom"
          :class="plan.popular ? 'popular' : ''"
          v-for="(plan, i) in plans"
          :key="i"
        >
          <div v-if="plan.popular" class="bg-primary">
            <div class="text-center text-white row-items-center">
              <span><q-icon size="20px" name="favorite" color="white"/></span>
              <span class="popular-text f-w-500">Most Popular</span>
            </div>
          </div>
          <div class="plan-content">
            <div class="plan-name f-w-600 text-regalBlue text-capitalize">
              {{ plan.label }}
            </div>
            <div class="no-of-blooprints text-regalBlue f-w-400">
              Number of {{ plan.name === 'free' ? 'blooprint' : 'blooprints' }}:
              <span class="f-w-600"> {{ plan.blooprints }}</span>
            </div>
            <div class="profit-text f-w-500 text-comet">
              blooprint creator will get {{ plan.profit }} on every sale
            </div>
            <div
              class="duration-text f-w-600 text-regalBlue"
              :class="plan.popular && $q.screen.gt.sm ? 'popular' : ''"
            >
              {{ plan.price }}
            </div>
            <q-btn
              :label="plan.name === 'free' ? 'Try for free' : 'Get Started'"
              no-caps
              no-wrap
              flat
              class="get-started-button"
              :class="
                plan.popular
                  ? ' bg-primary text-white'
                  : 'text-primary popular-plan bg-white'
              "
              @click="() => goToPlan(plan.name)"
            >
              <div class="relative-position" v-if="plan.popular">
                <div
                  class="arrow"
                  style="margin-bottom: 1px; margin-left: 17px"
                >
                  <q-img
                    src="~assets/chevron-right.svg"
                    width="6px"
                    height="12px"
                  />
                </div>
              </div>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isLogin } from 'src/utils/common'

export default {
  data() {
    return {
      plans: [
        // {
        //   name: 'free',
        //   blooprints: '1',
        //   profit: '65%',
        //   price: '$0',
        //   popular: false
        // },
        // {
        //   name: 'professional',
        //   blooprints: '10',
        //   profit: '85%',
        //   price: '$497',
        //   popular: true
        // },
        // {
        //   name: 'platinum',
        //   blooprints: 'Unlimited',
        //   profit: '90%',
        //   price: '$997',
        //   popular: false
        // }
        {
          label: 'Starter',
          name: 'starter',
          blooprints: 'Unlimited',
          price: '$129/month (30 days free trial)',
          popular: false,
          profit: '90%'
        },
        {
          label: 'Done with you',
          name: 'self',
          blooprints: 'Unlimited',
          price: '$2997',
          popular: true,
          profit: '90%'
        }
      ]
    }
  },

  methods: {
    async goToPlan(planName) {
      if (isLogin()) {
        if (planName === 'starter') {
          await this.$router.replace('/settings?tab=myPlan')
          if (this.$q.screen.width < 1024) {
            this.$root.$emit('myPlanComponent')
          }
        } else {
          this.$router.push({
            name: 'plan-update',
            params: { planName: 'self' }
          })
        }
        return
      }

      this.$router.push({
        name: 'signup-plan',
        params: { planName }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  padding-top: 120px;
  padding-left: 52px;
  padding-right: 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 100px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-left: 14px;
    padding-right: 14px;
  }
}
.heading {
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
    color: black;
  }
}
.subheading {
  margin-bottom: 60px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 30px;
  }
}
.plan-content {
  padding: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px;
  }
}
.plan {
  border-radius: 20px;
  height: min-content;
  .plan-name {
    font-size: 24px;
    line-height: 32px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      font-size: 20px;
      line-height: 24px;
    }
  }
  &.popular {
    margin: 0px 20px;
    border: 3px solid #1652f0;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    @media only screen and (max-width: $breakpoint-sm-max) {
      margin: 0px;
    }
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: 100% !important;
    margin-bottom: 10px !important;
  }
}
.popular-text {
  font-size: 16px;
  line-height: 24px;
  margin-left: 10px;
  padding: 10px 0px;
  display: inline-block;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 0px;
  }
}
.no-of-blooprints {
  font-size: 20px;
  line-height: 28px;
  margin-top: 8px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 16px;
    line-height: 24px;
    margin-top: 0px;
    font-weight: 500;
  }
}

.profit-text {
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 14px;
    line-height: 20px;
    margin-top: 5px;
  }
}
.duration-text {
  font-size: 24px;
  line-height: 32px;
  margin-top: 20px;
  &.popular {
    font-size: 32px;
    line-height: 36px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 24px;
    margin-top: 10px;
  }
}
.get-started-button {
  height: 50px;
  width: 100%;
  margin-top: 16px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  &.popular-plan {
    border: 2px solid $primary;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 20px;
  }
}
</style>
