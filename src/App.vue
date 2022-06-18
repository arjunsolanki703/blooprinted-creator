<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Swiper as SwiperClass } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/swiper-bundle.min.css'
//registering Carousel globally
Vue.use(getAwesomeSwiper(SwiperClass))
const { directive } = getAwesomeSwiper(SwiperClass)
Vue.directive('swiper', directive)
export default {
  name: 'App',
  computed: {
    ...mapGetters(['showLoading', 'toastMessage'])
  },
  watch: {
    showLoading(val) {
      if (val) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    },
    toastMessage(data) {
      if (data) {
        this.$q.notify({
          position: 'top',
          timeout: 2500,
          textColor: 'white',
          actions: [{ icon: 'close', color: 'white' }],
          ...data
        })
      }
    }
  }
}
</script>
