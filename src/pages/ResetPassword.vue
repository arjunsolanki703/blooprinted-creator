<template>
  <q-page class="column">
    <div
      class="row self-center items-center bg-white justify-center border-secondary q-pa-md-xl q-pa-sm-md q-pa-xs-md q-mt-xl q-mb-md reset-page-width"
    >
      <div class="q-my-md text-center text-nightRider text-bold text-h5">
        Reset Password
      </div>

      <div class="q-py-xl column full-width items-center justify-center">
        <q-form
          @submit="onSignInClick()"
          class="reset-page-width"
          ref="deskResetPassword"
        >
          <label for="password" class="text-dimGrey">Password*</label>
          <PasswordEmojiValidation
            :isbuttonClicked="isbuttonClicked"
            @password-value="getPasswordValue"
          />
          <label for="confirmPassword" class="text-dimGrey"
            >Confirm Password*</label
          >
          <q-input
            borderless
            type="password"
            v-model="confirmPassword"
            ref="d_confirm_Password"
            input-class="text-dimGrey"
            class="border-secondary bg-white q-mb-lg q-px-md q-pb-none"
            :rules="[
              val => (val && val.length > 0) || 'Confirm Password is required',
              val => val == this.password || `Password didn't match`
            ]"
          />
          <div class="row justify-center q-mt-lg q-pt-lg">
            <q-btn
              color="white"
              text-color="primary"
              label="Cancel"
              class="q-mr-md border-secondary q-px-md"
              size="14px"
              unelevated
              @click="onCancel()"
            />
            <q-btn
              color="primary"
              class="q-px-lg"
              label="Save"
              size="14px"
              unelevated
              type="submit"
            />
          </div>
        </q-form>
      </div>
    </div>
    <q-dialog v-model="notificationPopup" persistent class="border-secondary">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-none">
          <q-btn
            color="primary"
            icon="close"
            flat
            round
            dense
            @click="closePopup()"
          />
        </q-card-section>
        <q-card-section class="q-py-xl flex flex-center column">
          <div class="text-h4 text-primary text-center q-mb-xl">
            Successful
          </div>

          <q-img
            style="width: 120px"
            src="~assets/SuccessIcon.png"
            class="q-mb-xl"
          ></q-img>
          <div class="text-subtitle1 text-primary text-center q-mb-xl">
            Your password has been reset successfully. Click here to
            <a href="/login">Login</a>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PasswordEmojiValidation from './PasswordEmojiValidation'
import { mapActions } from 'vuex'
import { constants } from 'src/utils/common'
import { route } from 'quasar/wrappers'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirmPassword: '',
      showPassword: true,
      showConfirmPassword: true,
      notificationPopup: false,
      resetSuccess: true,
      isbuttonClicked: false,
      validConfirmationCode: true
    }
  },
  components: {
    PasswordEmojiValidation
  },
  methods: {
    ...mapActions(['resetPassword']),
    onSignInClick() {
      this.validatePassword('d_confirm_Password', 'deskResetPassword')
    },
    validatePassword(confPass, resetFrom) {
      this.$refs[confPass].validate()
      this.$refs[resetFrom].validate().then(async success => {
        if (success) {
          let codeURI = this.$route.query.secure.replace(/ /g, '+')
          const passwordInfo = {
            code: codeURI,
            password: this.password
          }

          let reseteStatus = await this.resetPassword(passwordInfo)
          if (reseteStatus) {
            this.showPopup(true)
          } else {
            // this.redirectToSignup()
          }
        }
      })
    },
    closePopup() {
      this.showPopup(false)
      if (this.resetSuccess) {
        this.redirectToSignup()
      }
      this.resetForm()
    },
    showPopup(status) {
      this.notificationPopup = status
    },
    //    resetForm() {
    //     this.password = ''
    //     this.confirmPassword = ''
    //   },
    redirectToSignup() {
      this.$router.push({ name: constants.PAGE_LOGIN })
    },

    onCancel() {
      this.redirectToSignup()
    },
    getPasswordValue(event) {
      this.password = event
    }
    //   getResetCode() {
    //     const queryString = window.location.search
    //     const urlParams = new URLSearchParams(queryString)
    //     return urlParams.get('oobCode')
    //   }
    // },
    // created() {
    //   let confirmationCode = this.getResetCode()
    //   firebaseAuth
    //     .verifyPasswordResetCode(confirmationCode)
    //     .then(() => {
    //       this.validConfirmationCode = true
    //     })
    //     .catch(() => {
    //       this.validConfirmationCode = false
    //     })
  }
}
</script>
<style lang="scss" scoped>
@media only screen and (min-width: $breakpoint-xs) {
  .main {
    max-width: 75%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
}
.reset-page-width {
  width: 60%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 80%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90%;
  }
}
.dialogCard {
  border-radius: 3% 3% 0 0 !important;
  margin-top: 15%;
}
.desktopCard {
  min-width: 75%;
  margin-top: 0;
  border-radius: 0;
}
.q-field--error {
  border: 1px solid $errorColor;
}
</style>
