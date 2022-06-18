<template>
  <q-page>
    <!-- Desktop -->
    <div class="welcome-banner gt-sm" style="margin-top: 2px;">
      <div class="row">
        <div class="col-md-6">
          <div class="title header-letterspace">
            Welcome to <br />
            blooprinted
          </div>
          <div class="subtitle subtitle-letterspace">
            Everyone can teach and earn money on
            <a target="_blank" :href="url" class="blooprinted-link"
              >blooprinted.com</a
            >
          </div>
          <div class="row">
            <q-btn
              color="primary"
              label="Start Creating"
              no-caps
              no-wrap
              @click="startCreating"
              class="create-button subtitle-letterspace"
            >
              <div class="relative-position">
                <div class="arrow" style="margin-left: 17px">
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
        <div class="col-md-6">
          <div class="title">
            <video
              controls
              muted
              class="video-mask video-shadow bg-black video-style"
            >
              <source src="~assets/demoVideo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
    <div
      class="explore-section gt-sm justify-center flex cursor-pointer align-center self-center"
      @click="redirectToHome"
    >
      <div class="explore-section-text subtitle-letterspace">
        Explore studio.blooprinted.com
      </div>
      <div>
        <q-img
          style="margin-left:8px !important;"
          class="arrow"
          src="~assets/RightArrow.svg"
          width="24px"
          height="24px"
        ></q-img>
      </div>
    </div>
    <!-- Mobile/Tablet -->
    <div class="lt-md welcome-banner">
      <div>
        <div class="video-card">
          <video
            controls
            muted
            class="video-mask video-shadow bg-black video-style"
          >
            <source src="~assets/demoVideo.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="title header-letterspace">
          Welcome to blooprinted
        </div>
        <div class="subtitle subtitle-letterspace">
          Everyone can teach and earn money on
          <a target="_blank" :href="url" class="blooprinted-link">
            blooprinted.com
          </a>
        </div>
        <q-btn
          color="primary"
          label="Start Creating"
          no-caps
          no-wrap
          @click="startCreating"
          class="create-button subtitle-letterspace"
        >
          <div class="relative-position">
            <div class="arrow" style="margin-left: 15px">
              <q-img
                src="~assets/chevron-right.svg"
                class="button-arrow"
                width="6px"
                height="12px"
              />
            </div>
          </div>
        </q-btn>
      </div>
    </div>
    <div
      class="explore-section lt-md justify-center flex cursor-pointer"
      @click="redirectToHome"
    >
      <div class="explore-section-text subtitle-letterspace">
        Explore studio.blooprinted.com
      </div>
      <div>
        <q-img
          style="margin-left:8px !important;"
          class="arrow"
          src="~assets/RightArrow.svg"
          width="24px"
          height="24px"
        ></q-img>
      </div>
    </div>
    <SocialMediaAccount
      v-if="showSocialMediaPopup"
      @on-social-media-close="onSocialMediaPopupClose"
    />
  </q-page>
</template>
<script>
import SocialMediaAccount from 'components/SocialMediaAccount.vue'
import { mapGetters } from 'vuex'
import { constants } from 'src/utils/common'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  data() {
    return {
      showSocialMediaPopup: false,
      url: constants.BLOOPRINTED_URL
    }
  },
  components: {
    SocialMediaAccount
  },
  watch: {
    userProfile(data) {
      if (data && data['showOnboardingForm'] == false) {
        this.showSocialMediaPopup = true
      }
    }
  },
  mounted() {
    if (this.userProfile && this.userProfile['showOnboardingForm'] == false) {
      this.showSocialMediaPopup = true
    }
  },
  methods: {
    startCreating() {
      this.$router.push({ name: 'firstBlooprintCreationName' })
    },
    redirectToHome() {
      this.$router.push({ name: 'my-blooprints' })
    },
    onSocialMediaPopupClose() {
      this.showSocialMediaPopup = false
    }
  }
}
</script>
<style lang="scss" scoped>
.welcome-banner {
  background-color: #e8edf2;
  padding: 60px 165px 100px 165px;
  font-family: Poppins;

  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px 40px 15px;
  }
}

.title {
  margin-top: 58px;
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
    margin-top: 20px;
  }
}

.subtitle {
  margin-top: 16px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #152141;
}
.blooprinted-link {
  font-weight: 600;
  color: #1652f0;
  text-decoration: none;
}
.create-button {
  margin-top: 32px;
  font-weight: 600;
  height: 50px;
  width: 197px;
  font-size: 16px;
  line-height: 24px;
  border-radius: 10px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 40px;
    width: 177px;
    border-radius: 5px;
  }
}

.video-card {
  text-align: center;
  .video-style {
    border-radius: 20px;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
    @media only screen and (max-width: $breakpoint-sm-max) {
      //   max-height: 350px;
    }
  }
}
::v-deep {
  .q-btn__wrapper {
    padding: 0px 0px !important;
  }
}

.button-arrow {
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 1px;
  }
}

@supports (-moz-appearance: none) {
  .q-img {
    margin-bottom: 0px !important;
  }
  .arrow {
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding-bottom: 2px !important;
    }
  }
}

.explore-section {
  font-family: Poppins;
  margin-top: 40px;
  padding-bottom: 134px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    margin-left: 15px;
    padding-bottom: 127px !important;
  }
}

.explore-section-text {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #152141;
}

.explore-section .arrow {
  transition: transform 0.3s;
}
.explore-section:hover .arrow {
  transition: transform 0.3s ease-out;
  transform: translateX(10px);
}
.video-mask {
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  height: calc(18vw * (663 / 550));
  position: relative;
  margin-left: 20px;
  object-fit: cover;
  max-height: 450px;
  @media only screen and (max-width: $breakpoint-sm) {
    width: 80%;
    height: calc(32vw * (621 / 455));
    margin-left: 0;
  }
  @media only screen and (max-width: $breakpoint-xs) {
    width: 100%;
    height: calc(45vw * (621 / 527));
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
