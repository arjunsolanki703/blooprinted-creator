<template>
  <div class="section row">
    <div class=" col-md-8 col-sm-12 col-xs-12">
      <div class="text-content">
        <div
          class="text-heading text-regalBlue f-w-600 reveal fade-bottom text-letter-space"
        >
          There’s money to make
        </div>
        <div class="text-subheading text-regalBlue f-w-600 reveal fade-bottom">
          As an original Creator, you will be able to capitalize on all of the
          growth on the platform with a partnership module.
        </div>
        <!-- <div
          class="text-description text-regalBlue f-w-500 text-fs-16 text-lh-24 reveal fade-bottom"
        >
          Nulla viverra felis phasellus lectus sit quis. In integer accumsan dis
          sed varius ultricies mollis. In vel, at nisl, amet bibendum tempus a
          arcu. Malesuada tempus imperdiet dolor sit cras nec vitae etiam. Sed
          semper sed fermentum lectus odio dolor leo lectus sed. Nunc, libero
          turpis pulvinar non. Eu posuere velit feugiat ullamcorper lectus.
          Tellus sed viverra nulla orci tristique eget eu.
        </div> -->
      </div>
    </div>
    <div class="main-content col-12">
      <div class="row justify-between">
        <div
          class="col-md-6 col-sm-12 col-xs-12 relative-position overflow-hidden left-content"
        >
          <q-img
            class="section-parent-image reveal fade-left"
            src="~assets/blooprint-detail-prepurchase.png"
            @load="parentClass = ''"
            :class="parentClass"
          >
          </q-img>
          <q-img
            class="section-child-image absolute-position reveal fade-left"
            src="~assets/blooprint-detail-prepurchasemobile.png"
          >
          </q-img>
        </div>
        <div class="col-md-5 col-sm-12 col-xs-12 relative-position">
          <div class="row right-content">
            <div
              class="f-w-600 heading text-regalBlue reveal fade-bottom text-letter-space"
            >
              Your blooprint on the marketplace
            </div>
            <div class="f-w-500 subheading text-regalBlue reveal fade-bottom">
              When you create a blooprint, you will be able to sell and monetize your knowledge. In addition to this, you will also get:
            </div>
            <div
              class="row no-wrap items-center label-margin reveal fade-bottom"
              style="width:100%"
            >
              <q-icon name="img:coolicon.svg" size="20px" />
              <div class="label f-w-500 text-regalBlue">
                Your blooprint on the blooprinted Marketplace.
              </div>
            </div>
            <div
              class="row no-wrap items-center label-margin reveal fade-bottom"
              style="width:100%"
            >
              <q-icon name="img:coolicon.svg" size="20px" />
              <div class="label f-w-500 text-regalBlue">
                Promotion across the blooprinted ecosystem.
              </div>
            </div>
            <div
              class="row no-wrap items-center label-margin reveal fade-bottom"
              style="width:100%"
            >
              <q-icon name="img:coolicon.svg" size="20px" />
              <div class="label f-w-500 text-regalBlue">
                Credibility of being associated with blooprinted and our
                partners.
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
      parentClass: 'default-height'
    }
  }
}
</script>
<style lang="scss" scoped>
$shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
$border: 2px solid #ffffff;

.section {
  padding-top: 136px;
  padding-bottom: 90px;
  .main-content {
    margin-top: 100px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-top: 60px;
    }
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 99.4px;
    padding-bottom: 80px;
  }
}
.text-content {
  margin: 0px 52px;
  .text-heading {
    font-size: 48px;
    line-height: 56px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      color: black;
      font-size: 32px;
      line-height: 36px;
    }
  }
  .text-subheading {
    font-size: 20px;
    line-height: 28px;
    margin-top: 20px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 16px;
      line-height: 24px;
    }
  }
  .text-description {
    margin-top: 20px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-left: 16px;
    margin-right: 14px;
  }
}
.section-parent-image {
  background: #ffffff;
  border: $border;
  box-shadow: $shadow;
  border-radius: 0px 20px 0px 0px;
  width: 90%;
  min-height: 450px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-height: unset;
    width: 80%;
  }
}
.section-child-image {
  width: 30%;
  left: 68%;
  border-radius: 10px;
  margin-top: -40%;
  border: $border;
  box-shadow: $shadow;
  margin-bottom: 40px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    left: 64%;
  }
}
.main-content {
  .heading {
    font-size: 32px;
    line-height: 36px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 24px;
      line-height: 28px;
    }
  }
  .subheading {
    font-size: 20px;
    line-height: 28px;
    margin: 30px 0px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 16px;
      line-height: 24px;
      margin: 20px 0px;
    }
  }
}
.label {
  font-size: 16px;
  line-height: 24px;
  margin-left: 17px;
}
.label-margin {
  margin-bottom: 20px;
}
.default-height {
  min-height: 28vw;
  @media only screen and (max-width: $breakpoint-xs-max) {
    min-height: 60vw;
  }
}
.right-content {
  padding-right: 92px;
  padding-top: 58px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-right: 0px;
    padding-top: 40px;
    margin: 0px 52px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-left: 16px;
    margin-right: 14px;
    padding-top: 20px;
  }
}

::v-deep {
  .section-parent-image {
    .q-img__image {
      background-position: 90% 100% !important;
    }
  }
}
</style>
