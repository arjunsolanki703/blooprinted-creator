<template>
  <q-page class="row">
    <div
      class="logo-icon-wrapper left-colum lt-md"
      @click="onLogoClick"
      style="height: 70px"
    >
      <q-img class="cursor-pointer" src="~assets/blooprinted-logo.svg" />
    </div>
    <div class="col-md-6 gt-sm left-colum bg-solitudeBlue">
      <div class="logo-icon-wrapper" @click="onLogoClick">
        <q-img class="cursor-pointer" src="~assets/blooprinted-logo.svg" />
      </div>
      <div class="f-w-600 text-regalBlue left-text-style">
        We are searching high and low for people with a proven track record!
      </div>
      <div class="img-style">
        <q-img src="~assets/login-page-image.png" />
      </div>
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12 bg-white right-column">
      <div :style="$q.screen.gt.sm ? 'max-width: 432px' : null">
        <div class="text-fs-32-lh-36 f-w-600 text-regalBlue">
          Not a creator?
        </div>
        <div class="f-w-500 text-body1 text-comet" style="margin-top: 5px">
          Perhaps you would like to learn from top industry professionals who
          have proven results?
        </div>
        <q-btn
          color="primary"
          label="Explore blooprints"
          no-caps
          no-wrap
          class="explore-btn full-width q-mt-md f-w-600 text-body1"
          padding="10px 20px 10px 30px"
          @click="onExploreBlooprintClick()"
        >
          <div class="relative-position">
            <q-avatar class="q-ml-sm arrow" size="24px">
              <img src="~assets/login-chevron-right.svg" />
            </q-avatar>
          </div>
        </q-btn>
        <q-separator class="separtor" />
        <div>
          <div class="text-fs-32-lh-36 f-w-600 text-regalBlue">
            Creator Login
          </div>
          <div class="q-mt-30">
            <q-form @submit="onLoginClick()" ref="login" autocomplete="off">
              <label class="text-regalBlue text-body1 f-w-600">Email</label>
              <q-input
                borderless
                v-model.trim="loginForm.email"
                placeholder="Enter Email Address"
                ref="email"
                class="border-input-field input-style q-mt-xs q-mb-lg q-pb-none"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Email is required',
                  val => (val && checkEmailValidity(val)) || 'Enter valid Email'
                ]"
              />
              <label class="text-regalBlue text-body1 f-w-600">Password</label>
              <q-input
                :type="showPassText ? 'text' : 'password'"
                borderless
                v-model="loginForm.password"
                placeholder="Enter Password"
                class="border-input-field input-style q-mt-xs q-pb-none"
                ref="password"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Password is required'
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    class="cursor-pointer"
                    @click="showPassText = !showPassText"
                    :name="showPassText ? 'visibility' : 'visibility_off'"
                  />
                </template>
              </q-input>
              <div class="text-left q-mt-md">
                <a
                  @click="navigateToForgotPass()"
                  class="text-primary f-w-500 text-body1 text-underline cursor-pointer"
                  >Forgotten Password?
                </a>
              </div>
              <q-btn
                unelevated
                color="primary"
                label="Login"
                type="submit"
                size="md"
                no-caps
                no-wrap
                class="explore-btn full-width q-mt-30 text-body1 f-w-600"
              >
                <div class="relative-position">
                  <q-avatar class="q-ml-sm arrow" size="24px">
                    <img src="~assets/login-chevron-right.svg" />
                  </q-avatar>
                </div>
              </q-btn>
            </q-form>
            <div>
              <q-btn
                class="full-width bg-white google-btn text-shuttleGrey text-body1 f-w-400"
                style="margin-top: 20px"
                no-caps
                label="Login with Google"
                unelevated
                icon="img:GoogleLogo.svg"
                @click="signInWithGoogleClick()"
              />
            </div>
            <div class="text-black text-body1 f-w-400 q-mt-30 text-center">
              Don’t have creator account?
              <router-link
                class="text-underline f-w-500 text-primary cursor-pointer"
                style="margin-left:10px"
                :to="{ name: 'signup', params: { planName: 'free' } }"
              >
                Sign up
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { emailPattern, constants } from '../utils/common'
import { mapActions, mapGetters } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      showPassText: false,
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  mounted() {
    const {
      setToastMessage,
      $route: {
        query: { timeout }
      }
    } = this
    if (timeout && timeout === 'true') {
      setToastMessage({
        type: 'negative',
        message: 'Session time out',
        caption: 'Please login again'
      })
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  methods: {
    ...mapActions([
      'userLogin',
      'googleSignIn',
      'setToastMessage',
      'fetchProfileInfo'
    ]),
    // ************** To Check Email patter is valid or not ********************
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },
    // ********************* Triggers when login button is clicked **************************
    onLoginClick() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.login.validate().then(res => {
        if (res) {
          let loginData = {
            email: this.loginForm.email,
            password: this.loginForm.password
          }
          this.userLogin(loginData)
        }
      })
    },
    signInWithGoogleClick() {
      this.googleSignIn()
    },
    navigateToForgotPass() {
      this.$router.push('/forgot-password')
    },
    // ************** Navigate to Signup Screen ***********************
    navigateToSignupScreen() {
      this.$router.push('/auth/signup/free')
    },
    onLogoClick() {
      this.$router.push({ name: constants.PAGE_HOME }, () => {})
    },
    onExploreBlooprintClick() {
      window.open(constants.BLOOPRINTED_URL + '/explore')
    }
  }
}
</script>

<style lang="scss" scoped>
.q-mt-30 {
  margin-top: 30px;
}
.left-colum {
  padding-top: 29px;
  padding-left: 52px;
  @media only screen and (max-width: $breakpoint-sm) {
    padding-top: 23px;
    padding-left: 15px;
  }
}
.right-column {
  padding-top: 123px;
  padding-bottom: 112px;
  padding-left: 10%;
  padding-right: 10%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 30px;
    padding-bottom: 60px;
    padding-left: 25%;
    padding-right: 25%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 30px 15px 60px 15px;
  }
}
.left-text-style {
  font-size: 28px;
  line-height: 36px;
  margin-top: 106px;
  margin-right: 70px;
}
.logo-icon-wrapper {
  width: 184px;
  @media only screen and (max-width: $breakpoint-sm) {
    width: 138px;
  }
}
.img-style {
  margin: 78px 200px 213px -53px;
}
.explore-btn {
  border-radius: 10px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
}
.separtor {
  margin: 30px 0px;
  height: 1px;
  color: $solitudeBlue;
}
::v-deep {
  .input-style {
    height: 44px;
    padding-left: 14px;
    padding-right: 14px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      width: auto;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: auto;
    }
    .q-field__native {
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 24px !important;
    }
    .q-field__control,
    .q-field__marginal {
      height: 43px;
    }
  }
  .google-btn {
    border: 1px solid $solitudeBlue;
    border-radius: 5px;
    height: 52px;
    line-height: 20px !important;
    .q-btn__wrapper {
      .q-btn__content {
        .q-icon {
          font-size: 20px;
        }
      }
    }
  }
}

.q-field--error {
  border-bottom: 1px solid $errorColor;
}
</style>
