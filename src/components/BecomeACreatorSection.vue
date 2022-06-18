<template>
  <div>
    <div class="image-container relative-position gt-xs overflow-hidden">
      <div>
        <q-img
          class="creators-section-image relative-position"
          src="~assets/creator-section-image.png"
        >
          <div class="row transparent text-section">
            <div class="col-md-8 col-sm-7 text-container">
              <div
                class="image-text-heading text-white container-width reveal fade-right text-letter-space"
              >
                Design a  blooprint of your success!
              </div>
              <div class="image-text-description text-white reveal fade-right">
                Help others follow in your footsteps, by creating a blooprint.
              </div>
              <q-btn
                @click="GoToTop('plans-section')"
                color="primary"
                label="Get Started"
                no-caps
                no-wrap
                class="text-body1 f-w-600 creator-btn q-px-md reveal fade-bottom"
                style="border-radius: 10px; height: 60px; width: 218px"
              >
                <div class="col q-py-xs text-left relative-position">
                  <q-avatar class="arrow" style="margin-left: 15px" size="18px">
                    <img src="~assets/chevron-right.svg" />
                  </q-avatar>
                </div>
              </q-btn>
            </div>
          </div>
        </q-img>
      </div>
    </div>
    <div class="relative-position image-mobile-container lt-sm">
      <div>
        <q-img
          class="creators-section-image-mobile relative-position"
          contain
          src="~assets/creator-section-image-mobile.png"
        >
          <div class="row transparent text-section">
            <div class="col-md-8 col-sm-7 col-xs-12 text-container">
              <div class="image-text-heading text-white reveal fade-left">
                Design a blooprint of your success!
              </div>
              <div class="image-text-description text-white reveal fade-left">
                Help others follow in your footsteps, by creating a blooprint.
              </div>
              <q-btn
                @click="GoToTop('plans-section')"
                color="primary"
                label="Get Started"
                no-caps
                no-wrap
                class="btn-text f-w-600 q-pl-sm reveal fade-bottom"
                style="border-radius: 10px; height: 50px; width: 170px"
              >
                <div class="col q-py-xs text-left relative-position">
                  <q-avatar class="arrow" style="margin-left: 15px" size="18px">
                    <img src="~assets/chevron-right.svg" />
                  </q-avatar>
                </div>
              </q-btn>
            </div>
          </div>
        </q-img>
      </div>
    </div>
    <div class=" divider gt-xs">
      <q-separator color="solitudeBlue" size="5px" />
    </div>
  </div>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
export default {
  methods: {
    GoToTop(el) {
      const ele = document.getElementById(el)
      const target = getScrollTarget(ele)
      const offset = ele.offsetTop
      setScrollPosition(target, offset, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.creators-section-image {
  border-radius: 20px 20px 20px 20px;
  width: 100%;
  overflow: unset !important;
  @media only screen and (max-width: 1200px) {
    min-height: 600px;
    border-radius: 0px;
  }
}
.creators-section-image-mobile {
  overflow: unset !important;
  min-height: 40vh;
}
.image-container {
  margin-left: 52px;
  margin-right: 52px;
  @media only screen and (max-width: 1290px) {
    margin-left: 0px;
    margin-right: 0px;
  }
}
.image-text-heading {
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
  }
}
.image-text-description {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
  margin-bottom: 40px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 16px;
    line-height: 24px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
}
::v-deep {
  .creator-btn {
    .block {
      font-size: 20px;
      line-height: 28px;
    }
  }
}
.text-section {
  left: 70%;
  bottom: 10%;
  @media only screen and (min-width: 2000px) {
    left: 70%;
    bottom: 20%;
  }
  @media only screen and (max-width: 1650px) {
    left: 65%;
    bottom: 15%;
  }
  @media only screen and (max-width: 1502px) {
    left: 60%;
    bottom: 10%;
  }
  @media only screen and (max-width: 1290px) {
    left: 60%;
    bottom: 10%;
  }
  @media only screen and (max-width: 1150px) {
    left: 38%;
    bottom: 15%;
  }
  @media only screen and (max-width: 883px) {
    left: 30%;
    bottom: 15%;
  }
  @media only screen and (max-width: 700px) {
    left: 20%;
    bottom: 12%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    left: 0%;
    bottom: 0%;
    padding: 0px 30px;
    padding-bottom: 60px;
  }
  .container-width {
    width: 27.6rem;
  }
}
.btn-text {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}
::v-deep {
  .creators-section-image {
    .q-img__image {
      background-position: 30% 100% !important;
    }
  }
}
.divider {
  margin: 74px 52px 100px 52px;
}
</style>
