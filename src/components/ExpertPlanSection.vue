<template>
  <div class="section">
    <div class="content">
      <div class="row bg-white">
        <div class="col gt-sm reveal fade-left">
          <q-img class="image" src="~assets/expertPlan.png" />
        </div>
        <div class="col-12 lt-md reveal fade-left">
          <q-img class="imag" src="~assets/expertPlanMobile.png" />
        </div>
        <div class="gt-sm" style="width:20px"></div>
        <div class="col text-content reveal fade-right">
          <div class="heading f-w-600 text-regalBlue text-letter-space">
            Leave it to the experts
          </div>
          <div class="subheading f-w-400 f-s-20 text-lh-28 text-regalBlue">
            <span> Let us build your
            blooprint with you.</span>
          </div>
          <div class="row items-center label-margin no-wrap">
            <q-icon name="img:coolicon.svg" size="20px" />
            <div class="label f-w-500 text-regalBlue">
              Work with our professional team who will help organize your expertise into a blooprint.
            </div>
          </div>
          <div class="row items-center label-margin no-wrap">
            <q-icon name="img:coolicon.svg" size="20px" />
            <div class="label f-w-500 text-regalBlue">
              Prime Placement On The Platform For The First 30-Days.
            </div>
          </div>
          <div class="row items-center label-margin no-wrap">
            <q-icon name="img:coolicon.svg" size="20px" />
            <div class="label f-w-500 text-regalBlue">
              ​​​Perfect For Busy, Success-Driven People.
            </div>
          </div>
          <div class="row items-center label-margin no-wrap">
            <q-icon name="img:coolicon.svg" size="20px" />
            <div class="label f-w-500 text-regalBlue">
              The Opportunity To Add Additional Done For You blooprints!
            </div>
          </div>
          <div class="row reverse-wrap flex price-container">
            <div
              class="f-w-600 discounted-price-text"
              style="margin-right:20px"
            >
              Only $2,997
            </div>
            <div class="text-regalBlue f-w-400 actual-price-text">
              $5,000
            </div>
          </div>
          <q-btn
            label="Get Started"
            no-caps
            no-wrap
            flat
            class="get-started-button"
            :class="'bg-primary text-white'"
            @click="onGetStatedClick"
          >
            <div class="relative-position">
              <div class="arrow" style="margin-bottom: 1px; margin-left: 17px">
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
</template>

<script>
import { isLogin } from '../utils/common'

export default {
  methods: {
    onGetStatedClick() {
      this.$router.push({
        name: isLogin() ? 'plan-update' : 'signup-plan',
        params: { planName: 'self' }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.section {
  padding-top: 50px;
  background: linear-gradient(to bottom, $solitudeBlue 55%, white 55%);
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 20px;
  }
}
.content {
  margin: 0px 52px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 0px 15px;
  }
}
.text-content {
  padding: 60px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 30px 20px;
  }
  .heading {
    font-size: 48px;
    line-height: 56px;
    margin-bottom: 20px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      font-size: 32px;
      line-height: 36px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-bottom: 10px;
    }
  }
  .subheading {
    margin-bottom: 40px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-bottom: 30px;
    }
  }
  .label {
    font-size: 16px;
    line-height: 24px;
    margin-left: 17px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-left: 12px;
    }
  }
  .label-margin {
    margin-bottom: 16px;
  }
  .discounted-price-text {
    font-size: 32px;
    line-height: 36px;
    color: #d92d20;
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 24px;
      line-height: 28px;
      width: 100%;
    }
  }
  .actual-price-text {
    font-size: 32px;
    line-height: 36px;
    text-decoration: line-through;
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 5px;
    }
  }
}
.price-container {
  margin-top: 40px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 30px;
  }
}
.get-started-button {
  height: 60px;
  width: 218px;
  margin-top: 30px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 20px;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    height: 50px;
  }
}
::v-deep {
  .image {
    height: 100%;
    .q-img__image {
      background-position: 20% 100% !important;
    }
  }
}
</style>
