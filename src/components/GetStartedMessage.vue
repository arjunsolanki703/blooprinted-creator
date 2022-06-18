<template>
  <div
    class="message text-center text-lh-28 f-s-20 f-w-400 bg-primary text-white"
  >
    We are searching high and low for people with a proven track record!
    <span
      class="f-w-600 underline cursor-pointer"
      @click="GoToTop('plans-section')"
    >
      Get started</span
    >
  </div>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
export default {
  methods: {
    GoToTop(el) {
      const ele = document.getElementById(el)
      const target = getScrollTarget(ele)
      const offset = ele.offsetTop
      setScrollPosition(target, offset, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  padding: 20px 16px;
  margin-bottom: 60px;
  .underline {
    text-decoration: underline;
  }
}
</style>
