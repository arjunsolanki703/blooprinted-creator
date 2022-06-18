<template>
  <q-layout class="page" view="lHh lpr lFf">
    <Header v-if="isHeaderPresent" />
    <q-page-container style="padding: 0 !important">
      <router-view />
    </q-page-container>
    <Footer
      :singleLineFooter="false"
      :mediumFooter="true"
      :fullFooter="false"
    />
  </q-layout>
</template>
<script>
import Header from 'components/Header.vue'
import Footer from 'components/Footer.vue'
import { checkPlanExistsOrNot } from '../utils/common'

export default {
  data() {
    return {
      isHeaderPresent: false
    }
  },
  components: {
    Header,
    Footer
  },
  watch: {
    $route: 'checkToDisplayHeader'
  },
  mounted() {
    this.checkToDisplayHeader()
  },
  methods: {
    checkToDisplayHeader() {
      let selectedRoute = this.$router.history.current.fullPath
      if (selectedRoute.includes('checkout')) {
        this.isHeaderPresent = false
      } else if (selectedRoute.includes('plan-update')) {
        this.isHeaderPresent = false
        this.checkForPlanExistence()
      } else {
        this.isHeaderPresent = true
        this.checkForPlanExistence()
      }
    },
    async checkForPlanExistence() {
      let data = await checkPlanExistsOrNot()
      if (!data) {
        this.$router.replace(
          {
            name: 'plan-checkout',
            params: { planName: 'self' }
          },
          () => {}
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 600px !important;
}
</style>
