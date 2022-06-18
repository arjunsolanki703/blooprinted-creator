<template>
  <q-layout class="page" view="lHh lpr lFf">
    <Header v-if="isHeaderPresent" />
    <q-page-container style="padding: 0 !important">
      <router-view />
    </q-page-container>
    <Footer
      :singleLineFooter="true"
      :mediumFooter="false"
      :fullFooter="false"
    />
  </q-layout>
</template>
<script>
import Header from 'components/Header.vue'
import Footer from 'components/Footer.vue'

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
      if (
        selectedRoute.includes('signup') ||
        selectedRoute.includes('login') ||
        selectedRoute.includes('checkout') ||
        selectedRoute.includes('register')
      ) {
        this.isHeaderPresent = false
      } else {
        this.isHeaderPresent = true
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
