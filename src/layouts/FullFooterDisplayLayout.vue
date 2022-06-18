<template>
  <q-layout class="page" view="lHh lpr lFf">
    <Header />
    <q-page-container style="padding: 0 !important">
      <router-view />
    </q-page-container>
    <Footer
      :singleLineFooter="false"
      :mediumFooter="false"
      :fullFooter="true"
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
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 600px !important;
}
</style>
