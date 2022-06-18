<template>
  <q-page style="min-height: 80vh">
    <div class="q-mx-md-xl q-mx-sm-lg q-mx-xs-md q-mt-xl row justify-between">
      <div class="text-nightRider text-h6 text-weight-medium text-capitalize">
        Signup
      </div>
    </div>
    <div class="q-mx-md-xl q-mx-sm-lg q-mx-xs-md row justify-center form">
      <div class="col-md-7 col-sm-9 col-xs-12 row justify-between q-mt-md">
        <!-- Showing Self plans here -->
        <div
          v-for="plan in selfPlans"
          :key="plan['planID']"
          class="col-12 q-my-md-sm q-my-sm-sm q-mt-xs-sm"
        >
          <div
            @click="onClickSelfPlan()"
            :class="
              isSelfPlanSelected
                ? 'bg-smalt rounded-borders cursor-pointer'
                : 'bg-white rounded-borders cursor-pointer'
            "
          >
            <div class="row justify-between q-py-md q-px-lg">
              <div
                :class="
                  isSelfPlanSelected
                    ? 'col-6 text-h6 text-white'
                    : 'col-6 text-h6 text-grey-8 text-capitalize'
                "
              >
                {{ plan['name'] === 'self' ? 'Done With You blooprint' : '' }}
              </div>
              <div
                :class="
                  isSelfPlanSelected
                    ? 'col-6 text-h6 text-white text-right'
                    : 'col-6 text-h6 text-grey-8 text-right'
                "
              >
                <span class="q-px-sm"> ${{ plan['amount'] }}</span>

                <span class="text-subtitle1 text-weight-medium text-strike">
                  ${{ '4,997' }}</span
                >
                <div class="text-subtitle2">{{ '50% off' }}</div>
              </div>
            </div>
            <div class="row items-center justify-between q-py-md q-px-lg">
              <div
                :class="
                  isSelfPlanSelected
                    ? 'col-12 text-white'
                    : 'col-12 text-grey-8'
                "
              >
                <div class="text-body1">
                  {{ plan['description'] }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <q-separator
          v-if="selfPlans.length"
          class="col-12 shadow-3 q-my-md"
          color="secondary"
          size="1px"
        />
        <!-- Showing list of all plans here -->

        <div
          v-for="plan in allPlans"
          :key="plan['planID']"
          class="col-12 q-my-md-sm q-my-sm-sm q-mt-xs-sm"
        >
          <div
            :class="
              isSelfPlanSelected && plan['name'] === 'platinum'
                ? 'rounded-borders cursor-pointer bg-white border-smalt'
                : plan['name'] === selectedPlan
                ? 'bg-smalt rounded-borders cursor-pointer'
                : 'bg-white rounded-borders cursor-pointer'
            "
            @click="onClickPlan(plan['name'])"
          >
            <div class="row justify-between q-py-md q-px-lg">
              <div
                :class="
                  isSelfPlanSelected && plan['name'] === 'platinum'
                    ? 'col-6 text-h6 text-grey-8 text-capitalize'
                    : plan['name'] === selectedPlan
                    ? 'col-6 text-h6 text-white text-capitalize'
                    : 'col-6 text-h6 text-grey-8 text-capitalize'
                "
              >
                {{ plan['name'] }}
              </div>
              <div
                v-if="plan['name'] !== 'enterprise'"
                :class="
                  isSelfPlanSelected && plan['name'] === 'platinum'
                    ? 'col-6 text-h6 text-grey-8 text-right'
                    : plan['name'] === selectedPlan
                    ? 'col-6 text-h6 text-white text-right'
                    : 'col-6 text-h6 text-grey-8 text-right'
                "
              >
                ${{ plan['amount'] }}{{ planAmountPrefix(plan['interval']) }}
              </div>
            </div>
            <div class="row items-center justify-between q-py-md q-px-lg">
              <div
                :class="
                  isSelfPlanSelected && plan['name'] === 'platinum'
                    ? 'col-6 text-grey-8'
                    : plan['name'] === selectedPlan
                    ? 'col-6 text-white'
                    : 'col-6 text-grey-8'
                "
              >
                <div class="text-body1" v-if="plan['name'] !== 'enterprise'">
                  Number of Blooprints -
                  {{
                    plan['accessibleBlooprints'] === -1
                      ? 'Unlimited'
                      : plan['accessibleBlooprints']
                  }}
                </div>
                <div class="text-body1" v-else>
                  {{ accessibility.enterprise }}
                </div>
              </div>
              <div
                :class="
                  isSelfPlanSelected && plan['name'] === 'platinum'
                    ? 'col-6 text-body2 text-right text-grey-8'
                    : plan['name'] === selectedPlan
                    ? 'col-6 text-body2 text-right text-white'
                    : 'col-6 text-body2 text-right text-grey-8'
                "
              >
                <div class="q-py-md-md">
                  {{ plan['name'] === 'enterprise' ? '' : plan['description'] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-sm-9 col-xs-12 q-my-xs-lg q-my-md-none">
        <div
          class="
            bg-primary
            rounded-borders
            q-ma-xs-none
            q-pa-xs-md
            q-ma-sm-none
            q-mt-sm-md
            q-pa-sm-lg
            q-ma-md-lg
            q-pa-md-xl
          "
        >
          <q-form
            class="q-px-xs-md q-px-sm-lg"
            @submit="userSignup()"
            ref="signUpForm"
          >
            <q-input
              borderless
              ref="first_name"
              v-model.trim="signupForm.firstName"
              label-color="white"
              input-class="text-white"
              class="border-bottom-columbia q-mb-lg q-pb-none"
              label="First Name *"
              maxlength="50"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'First Name is required',
                val =>
                  (val && checkUserNameValidity(val)) ||
                  'Please input valid First Name'
              ]"
            />
            <q-input
              borderless
              ref="last_name"
              v-model.trim="signupForm.lastName"
              label-color="white"
              input-class="text-white"
              class="border-bottom-columbia q-mb-lg q-pb-none"
              label="Last Name"
              maxlength="50"
              lazy-rules
              :rules="[
                val =>
                  checkUserNameValidity(val) || 'Please input valid Last Name'
              ]"
            />
            <q-input
              borderless
              ref="email"
              v-model.trim="signupForm.email"
              label-color="white"
              input-class="text-white"
              class="border-bottom-columbia q-mb-lg q-pb-none"
              label="Email *"
              maxlength="50"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Email is required',
                val => (val && checkEmailValidity(val)) || 'Enter valid Email'
              ]"
            />
            <PasswordEmojiValidation
              :isbuttonClicked="isbuttonClicked"
              requestFrom="desktopSignup"
              label="Password *"
              @password-value="getPasswordValue"
            />
            <q-input
              ref="confirm_password"
              v-model="signupForm.confirm_password"
              borderless
              :type="isC_Pwd ? 'password' : 'text'"
              label="Confirm Password *"
              color="white"
              label-color="white"
              input-class="text-white"
              class="border-bottom-columbia q-mb-lg q-pb-none"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'Confirm Password is required',
                val =>
                  (val && val == signupForm.password) || `Password didn't match`
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isC_Pwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  color="white"
                  @click="isC_Pwd = !isC_Pwd"
                />
              </template>
            </q-input>
            <q-checkbox
              v-model="signupForm.terms"
              keep-color
              color="info"
              label="I agree to"
              class="text-white"
            ></q-checkbox>
            <span>&nbsp;</span>
            <a
              class="text-white text-underline cursor-pointer"
              target="_blank"
              href="/terms"
              >Terms & Conditions
            </a>
            <div
              class="q-px-sm text-negative"
              v-if="isbuttonClicked && !signupForm.terms"
            >
              Please agree the terms and conditions
            </div>
            <q-btn
              unelevated
              label="Signup"
              type="submit"
              size="md"
              class="full-width q-my-lg q-pa-xs flat btn-border text-white"
            />
            <div class="text-white q-mt-md">
              Already have an account?
              <router-link
                class="text-underline text-white cursor-pointer"
                :to="{ name: 'login' }"
                >LOGIN</router-link
              >
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { emailPattern, userNamePattern } from '../utils/common'
import { mapActions, mapGetters } from 'vuex'
import PasswordEmojiValidation from './PasswordEmojiValidation'
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      signupForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm_password: '',
        terms: false
      },
      accessibility: {
        enterprise: 'Contact our team for enterprise pricing solutions'
      },
      selectedPlan: '',
      isC_Pwd: true,
      isbuttonClicked: false,
      isSelfPlanSelected: false
    }
  },
  components: {
    PasswordEmojiValidation
  },
  async mounted() {
    this.selectedPlan = this.$route.params.plan
    const validPlans = [
      'enterprise',
      'professional',
      'plus',
      'free',
      'done-for-you-blooprint'
    ]

    if (
      this.selectedPlan == 'enterprise' ||
      !validPlans.includes(this.selectedPlan)
    ) {
      this.$router.replace('professional', () => {})
      this.selectedPlan = 'professional'
    }
    if (this.selectedPlan === 'done-for-you-blooprint') {
      this.isSelfPlanSelected = true
      this.selectedPlan = 'platinum'
    }
    this.getPlans()
    this.getPlansForSelf()
  },
  methods: {
    ...mapActions(['createUserAccount', 'getPlans', 'getPlansForSelf']),

    // ************** To toggle plan ********************
    onClickPlan(planName) {
      if (planName === 'enterprise') {
        return
      } else {
        this.selectedPlan = planName
        this.isSelfPlanSelected = false
        this.$router.replace(planName, () => {})
      }
    },

    // ************** To toggle self plan ********************
    onClickSelfPlan() {
      this.selectedPlan = 'platinum'
      this.isSelfPlanSelected = true
      this.$router.replace('done-for-you-blooprint', () => {})
    },

    // ************** To Check Email patter is valid or not ********************
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },
    checkUserNameValidity(val) {
      return userNamePattern.test(val)
    },
    // ********************* Triggers when Signup button is clicked **************************
    userSignup() {
      this.isbuttonClicked = true
      this.$refs.first_name.validate()
      this.$refs.last_name.validate()
      this.$refs.email.validate()
      this.$refs.confirm_password.validate()
      this.$refs.signUpForm.validate().then(success => {
        if (success && this.signupForm.terms) {
          let params = {
            ...this.signupForm,
            requestFrom: 'desktopSignup',
            plan: this.isSelfPlanSelected ? 'self' : this.selectedPlan
          }
          this.createUserAccount(params)
        }
      })
    },
    // ************** Fetch the Password Value ***********************
    getPasswordValue(event) {
      this.signupForm.password = event
    },
    planAmountPrefix(duration) {
      if (duration === 'month') {
        return '/mo'
      } else if (duration === 'year') {
        return '/yr'
      }

      return ''
    }
  },
  computed: {
    ...mapGetters(['allPlans', 'selfPlans'])
  }
}
</script>

<style lang="scss" scoped>
.btn-border {
  border: 2px solid $columbiaBlue;
}
.q-field--error {
  border-bottom: 1px solid $errorColor;
}
</style>
