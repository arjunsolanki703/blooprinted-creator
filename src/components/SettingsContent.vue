<template>
  <div>
    <Header :isLogin="isUserLoggedIn" />
    <div
      class="flex justify-between settings-page"
      style="padding: 20px 15px; background: #E8EDF2;"
    >
      <label class="settings-mobile text-letter-space">Settings</label>
      <label class="back-button text-primary cursor-pointer" @click="close()">
        Back
      </label>
    </div>
    <div
      class="full-width right-container plan-height"
      :style="getWindowHeight > 1100 ? 'min-height: 85vh !important' : ''"
    >
      <q-card flat class="dialog-card" v-if="tab === 'myProfile'">
        <creator-profile :profileData="userProfile" />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'account'">
        <Account />
        <DeleteAccount />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'notifications'">
        <notifications />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'myPlan'">
        <my-plan />
      </q-card>
      <q-card class="right-card" v-if="tab === 'payments'">
        <BankAccountDetails />
      </q-card>
      <q-card class="right-card order-history" v-if="tab === 'payments'">
        <order-history />
      </q-card>
      <q-card class="right-card customer-data" v-if="tab === 'payments'">
        <div class="blank"></div>
        <DownloadCustomerData class="download-customer-data" />
      </q-card>
      <q-card flat class="dialog-card" v-if="tab === 'billing'">
        <billing-information @upgrade="val => $emit('upgrade', val)" />
        <billing-history />
      </q-card>
    </div>
    <Footer
      :singleLineFooter="false"
      :mediumFooter="true"
      :fullFooter="false"
    />
  </div>
</template>
<script>
import { isLogin } from '../utils/common'
import { mapActions, mapGetters } from 'vuex'
import Account from 'src/components/Account.vue'
import DeleteAccount from 'src/components/DeleteAccount.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'
import CreatorProfile from './CreatorProfile.vue'
import MyPlan from './MyPlan.vue'
import OrderHistory from './OrderHistory.vue'
import BillingInformation from './BillingInformation.vue'
import BillingHistory from './BillingHistory.vue'
import Notifications from './Notifications.vue'
import DownloadCustomerData from '../components/DownloadCustomerData.vue'
import BankAccountDetails from '../components/BankAccountDetails.vue'
export default {
  components: {
    Footer,
    DeleteAccount,
    Account,
    Header,
    CreatorProfile,
    MyPlan,
    OrderHistory,
    BillingInformation,
    BillingHistory,
    Notifications,
    DownloadCustomerData,
    BankAccountDetails
  },
  props: ['tab'],
  name: 'SettingsContent',
  data() {
    return {
      displayCardInformation: true,
      isUserLoggedIn: false
    }
  },
  updated() {
    this.isUserLoggedIn = isLogin()
  },
  computed: {
    ...mapGetters(['userProfile']),
    getWindowHeight() {
      return window.innerHeight
    }
  },
  methods: {
    ...mapActions(['fetchProfileInfo']),
    close() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.order-history,
.customer-data {
  box-shadow: none;
  .blank {
    padding: 10px;
    margin: 10px 0;
    background: #e8edf2;
  }
  .download-customer-data {
    padding: 15px;
  }
}
.dialog-card,
.dialog-card .main-container {
  box-shadow: none !important;
}
.settings-mobile {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #000000;
}
.back-button {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  color: #1652f0;
}
.plan-height {
  min-height: 60vh !important;
  @media screen and (max-width: $breakpoint-sm-max) {
    min-height: 70vh !important;
  }
  @media screen and (max-width: $breakpoint-xs-max) {
    min-height: 60vh !important;
  }
}
</style>
