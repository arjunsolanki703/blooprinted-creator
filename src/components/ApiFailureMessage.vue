<template>
  <q-page
    class="q-ma-md-xl q-ma-sm-xl q-ma-xs-lg border-secondary shadow-1 bg-white flex flex-center text-center"
    style="min-height:76vh"
  >
    <div class="q-my-md">
      <div class="text-smalt text-h3">
        Uh... Error 500!
      </div>
      <q-img class="q-my-md" style="width: 145px" src="~assets/500Icon.png" />
      <div class="text-grey text-h5 q-px-xs-md">
        Something went wrong at our end. Don't worry, its not you - it's us.
      </div>
      <div class="text-grey text-h5 q-px-xs-md">
        Sorry about that.
      </div>
      <div
        class="q-mt-sm text-grey text-h4 cursor-pointer q-px-xs-md"
        @click="onLogoClick"
      >
        Click here to go back to Blooprinted App
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  methods: {
    onLogoClick() {
      this.$router.go()
      this.$emit('clicked')
    }
  }
}
</script>
<style lang="scss" scoped></style>
