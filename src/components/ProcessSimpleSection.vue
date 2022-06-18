<template>
  <div class="section">
    <div class="content">
      <div class="image-container gt-xs">
        <q-img class="image" src="~assets/simpleProcessBanner.png">
          <div class="text-content bg-white reveal fade-bottom">
            <div class="heading text-regalBlue f-w-600 text-letter-space">
              The Process is Simple
            </div>
            <div class="description text-regalBlue text-lh-28 f-s-20 f-w-400">
              We work with you to build a full blooprint to share with the world.
            </div>
          </div>
        </q-img>
      </div>
      <div class="mobile-image-container lt-sm">
        <q-img src="~assets/simpleProcessBannerMobile.png">
          <div class="text-content-mobile bg-white">
            <div class="heading text-black f-w-600 text-letter-space">
              The Process is Simple
            </div>
            <div class="description text-black text-lh-28 f-s-20 f-w-400">
              We work with you to build a full blooprint to share with the world.
            </div>
          </div>
        </q-img>
      </div>
      <div class="steps-container bg-white row">
        <div class="steps col-md-4 col-sm-4 col-xs-12 reveal fade-bottom">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <q-img class="step-image" src="~assets/home/step1.svg" width="66px" height="63px" />
            </div>
            <div class="col-md-12 col-sm-12 text-area col">
              <div class="step-heading f-w-600 text-regalBlue">
                Step 1
              </div>
              <div class="text-lh-28 f-s-20 f-w-400 text-regalBlue">
                Sign up for blooprinted as a Creator.
              </div>
            </div>
          </div>
        </div>
        <div class="steps col-md-4 col-sm-4 col-xs-12 reveal fade-bottom">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <q-img class="step-image" src="~assets/home/step2.svg" width="72px" height="69px" />
            </div>
            <div class="col-md-12 col-sm-12 text-area col">
              <div class="step-heading f-w-600 text-regalBlue">
                Step 2
              </div>
              <div class="text-lh-28 f-s-20 f-w-400 text-regalBlue">
                Plan your blooprint milestones.
              </div>
            </div>
          </div>
        </div>
        <div class="steps col-md-4 col-sm-4 col-xs-12 reveal fade-bottom">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <q-img class="step-image" src="~assets/home/step3.svg" width="52px" height="65px"/>
            </div>
            <div class="col-md-12 col-sm-12 text-area col">
              <div class="step-heading f-w-600 text-regalBlue">
                Step 3
              </div>
              <div class="text-lh-28 f-s-20 f-w-400 text-regalBlue">
                Add your blooprint inside the Creator Studio.
              </div>
            </div>
          </div>
        </div>
        <div class="steps col-md-4 col-sm-4 col-xs-12 reveal fade-bottom">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <q-img class="step-image" src="~assets/home/step4.svg" width="70px" height="80px"/>
            </div>
            <div class="col-md-12 col-sm-12 text-area col">
              <div class="step-heading f-w-600 text-regalBlue">
                Step 4
              </div>
              <div class="text-lh-28 f-s-20 f-w-400 text-regalBlue">
                Set your price of your blooprint.
              </div>
            </div>
          </div>
        </div>
        <div class="steps col-md-4 col-sm-4 col-xs-12 reveal fade-bottom">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <q-img class="step-image" src="~assets/home/step5.svg" width="83px" height="87px"/>
            </div>
            <div class="col-md-12 col-sm-12 text-area col">
              <div class="step-heading f-w-600 text-regalBlue">
                Step 5
              </div>
              <div class="text-lh-28 f-s-20 f-w-400 text-regalBlue">
               Begin marketing your blooprint.
              </div>
            </div>
          </div>
        </div>
        <div class="steps col-md-4 col-sm-4 col-xs-12 reveal fade-bottom">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <q-img class="step-image" src="~assets/home/step6.svg" width="85px" height="85px" />
            </div>
            <div class="col-md-12 col-sm-12 text-area col">
              <div class="step-heading f-w-600 text-regalBlue">
                Step 6
              </div>
              <div class="text-lh-28 f-s-20 f-w-400 text-regalBlue">
                Begin earning money through a new income stream.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepText: 'Guidance by successfull people in their business'
    }
  }
}
</script>

<style lang="scss" scoped>
//styling for  banner area
.section {
  margin-top: 100px;
  background: linear-gradient(to top, $solitudeBlue 15%, white 15%);
  .content {
    margin: 0px 52px;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
    @media only screen and (max-width: 1024px) {
      margin: 0px;
    }
  }
}
.image-container {
  border-radius: 20px 20px 0px 0px;
  overflow: hidden;
  @media only screen and (max-width: 1024px) {
    border-radius: 0px;
  }
  .image {
    min-height: 500px;
  }
}
.text-content {
  padding: 60px;
  margin: 60px;
  border-radius: 20px;
  width: 51%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media only screen and (max-width: 1366px) {
    width: 60%;
  }
  @media only screen and (max-width: 1174px) {
    width: 70%;
  }
  @media only screen and (max-width: 1024px) {
    margin: 40px;
    padding: 40px;
  }
}
.text-content-mobile {
  padding: 20px;
  margin: 15px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.heading {
  font-size: 48px;
  line-height: 56px;
  margin-bottom: 20px;
  @media only screen and (max-width: 1024px) {
    font-size: 32px;
    line-height: 36px;
    color: black;
  }
  @media only screen and (max-width: 374px) {
    font-size: 24px;
    line-height: 32px;
    color: black;
  }
}
.description {
  @media only screen and (max-width: 374px) {
    font-size: 16px;
    line-height: 24px;
    color: black;
  }
}

//styling for  steps
.step-heading {
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 10px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
  }
}
.steps-container {
  border-radius: 0px 0px 20px 20px;
  overflow: hidden;
  .steps {
    border: 1px solid #e8edf2;
    padding: 40px 60px;
    .step-image {
      width: 86.15px;
      height: 80px;
      margin-bottom: 30px;
      @media only screen and (max-width: $breakpoint-sm-max) {
        width: 64.62px;
        height: 60px;
      }
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 30px;
    }
  }
  .text-area {
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-left: 30px;
    }
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    border-radius: 0px;
  }
}
::v-deep {
  .image {
    .q-img__image {
      background-position: 70% 50% !important;
    }
  }
}
</style>
