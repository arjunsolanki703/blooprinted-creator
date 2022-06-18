<template>
  <div class="section">
    <div class="content row reverse-wrap justify-between">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="text-content reveal fade-left active">
          <div class="heading-text text-regalBlue text-letter-space">
            Done with you. <br />
            Built for success.
          </div>
          <div class="f-w-400 f-s-20 text-lh-28 text-regalBlue">
            Get paid to solve the most pressing challenge that exists in the
            coaching industry by actually getting results for people who want to
            accomplish what you already have as a blooprint Creator.
          </div>
          <q-btn
            label="Get Started"
            no-caps
            no-wrap
            flat
            class="bg-primary text-white get-started-button"
            @click="GoToTop('plans-section')"
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
      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="gt-xs image-container reveal fade-right active">
          <video controls muted class="video-mask video-shadow bg-black">
            <source
              src="https://firebasestorage.googleapis.com/v0/b/dev-blooprinted.appspot.com/o/E8Rab2WGFBQF0r9VUjRkJnBZR572%2Fblooprint%2F1634146209125%2FWIN_20210810_16_12_04_Pro.mp4?alt=media&token=1c89b2a0-05e6-4338-87ba-75f9ecc1356d"
              type="video/mp4"
            />
          </video>
        </div>
        <div class="lt-sm reveal image-container fade-right active">
          <video
            width="16px"
            height="9px"
            controls
            muted
            class="video-mask video-shadow bg-black"
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/dev-blooprinted.appspot.com/o/E8Rab2WGFBQF0r9VUjRkJnBZR572%2Fblooprint%2F1634146209125%2FWIN_20210810_16_12_04_Pro.mp4?alt=media&token=1c89b2a0-05e6-4338-87ba-75f9ecc1356d"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
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
.section {
  background: linear-gradient(to top, $solitudeBlue 60px, white 60px);
  .content {
    margin: 0px 52px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      margin-left: 15px;
      margin-right: 15px;
      margin-top: 15px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin: 0px;
    }
  }
  .text-content {
    margin-right: 40px;
    max-width: 600px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      margin: 0px 15px;
      max-width: initial;
      text-align: center;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      text-align: left;
    }
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    background: linear-gradient(to top, $solitudeBlue 30px, white 30px);
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    background: linear-gradient(to top, $solitudeBlue 20px, white 20px);
  }
}
.heading-text {
  font-weight: 600;
  font-size: 72px;
  line-height: 80px;
  margin-bottom: 20px;
  margin-top: 34px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 30px;
  }
}
.image-container {
  border-radius: 20px;
}
.get-started-button {
  height: 60px;
  width: 210px;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-top: 30px;
  border-radius: 10px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: 40px;
    width: 149px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    border-radius: 5px;
  }
}
.video-shadow {
  filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.1));
}
.video-mask {
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  height: calc(22vw * (663 / 560));
  position: relative;
  object-fit: cover;
  height: 450px;
  @media only screen and (max-width: $breakpoint-sm) {
    width: 80%;
    height: calc(32vw * (663 / 490));
  }
  @media only screen and (max-width: $breakpoint-xs) {
    width: 100%;
    height: calc(35vw * (663 / 410));
    border-radius: 0;
  }
}
.image-container {
  @media only screen and (max-width: $breakpoint-sm) {
    text-align: center;
  }
}
video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
