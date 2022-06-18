<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <DesktopHeader :isLogin="isUserLoggedIn" /> -->
    <Header :isUserLoggedIn="isUserLoggedIn" />
    <DesktopFooter />
    <q-page-container style="padding-top: 0px !important">
      <ApiFailureMessage v-if="isAPIFailed" @clicked="isAPIFailed = false" />
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>

<script>
import { isLogin } from '../utils/common'
import { mapGetters, mapActions } from 'vuex'
import DesktopFooter from 'components/DesktopFooter.vue'
// import DesktopHeader from 'components/DesktopHeader.vue'
import Header from 'components/Header.vue'
import { checkPlanExistsOrNot } from '../utils/common'
import ApiFailureMessage from 'components/ApiFailureMessage.vue'

export default {
  name: 'MainLayout',
  components: {
    // DesktopHeader,
    DesktopFooter,
    Header,
    ApiFailureMessage
  },

  data() {
    return {
      isUserLoggedIn: false,
      isAPIFailed: false
    }
  },
  computed: {
    ...mapGetters(['isApiResponseFailed'])
  },
  mounted() {
    this.isUserLoggedIn = isLogin()
    this.checkPlanStatus()
  },

  updated() {
    this.isUserLoggedIn = isLogin()
  },
  watch: {
    isApiResponseFailed(data) {
      this.isAPIFailed = data
    },
    $route() {
      this.isAPIFailed = false
      this.isAPIResponseFailed(false)
      this.checkPlanStatus()
    }
  },
  methods: {
    ...mapActions(['isAPIResponseFailed']),
    async checkPlanStatus() {
      let data = await checkPlanExistsOrNot()
      if (!data) {
        this.$router.replace({
          name: 'plan-checkout',
          params: { planName: 'self' }
        })
      }
    }
  }
}
</script>
