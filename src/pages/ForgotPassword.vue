<template>
  <q-page class="page column">
    <div
      class="column self-center items-center justify-center q-py-xl border-secondary q-mb-md q-mt-lg rest-password-page"
    >
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
              The instruction has been sent to your email address.
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="text-nightRider text-h5 q-mb-lg">Reset your password</div>
      <div class="column full-width items-center justify-center q-py-xl">
        <q-form class="rest-form" @submit="onSubmit()">
          <label for="emailField" class="text-grey text-weight-medium"
            >Please enter your email address*</label
          >
          <q-input
            borderless
            ref="email"
            v-model.trim="email"
            type="email"
            label="Email"
            color="primary"
            placeholder="Enter Email Address"
            label-color="secondary"
            input-class="text-dimGrey"
            class="border-secondary bg-white rounded-borders q-mt-sm q-mb-lg q-px-md q-pb-none"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Email is required',
              val => (val && checkEmailValidity(val)) || 'Enter valid Email'
            ]"
          />
          <div class="row justify-center q-pt-sm">
            <q-btn
              size="16px"
              label="Cancel"
              outline
              class="text-primary q-mr-lg border-secondary q-mb-lg"
              no-caps
              @click="redirectToLogin"
              style="width: 150px"
            />
            <q-btn
              label="Submit"
              type="submit"
              no-caps
              size="16px"
              class="bg-primary q-mr-lg text-white q-mb-lg"
              style="width: 150px"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import { emailPattern } from '../utils/common'
import { mapActions } from 'vuex'
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      email: '',
      notificationPopup: false
    }
  },
  methods: {
    ...mapActions(['sendResetEmail']),
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },
    async onSubmit() {
      this.$refs.email.validate()
      let params = {
        recoveryEmail: this.email,
        platform: 'desktop'
      }
      let response = await this.sendResetEmail(params)
      if (response) {
        this.showPopup(true)
      }
    },
    closePopup() {
      this.showPopup(false)
      this.redirectToLogin()
    },
    showPopup(status) {
      this.notificationPopup = status
    },
    redirectToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.rest-password-page {
  width: 60%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 92%;
  }
}
.rest-form {
  width: 70%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 92%;
  }
}
.q-field--error {
  border: 1px solid $errorColor;
}
</style>
