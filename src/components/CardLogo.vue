<template>
  <span>
    <q-img
      v-if="brand.toLowerCase() == 'visa'"
      src="~/assets/visa-logo-blue.svg"
      spinner-color="white"
      :height="logoHeight ? logoHeight : '16px'"
      width="50px"
      class="float-right q-mt-xs"
      :class="$route.fullPath.includes('settings') ? 'logo' : null"
    />
    <q-img
      v-if="brand.toLowerCase() == 'mastercard'"
      src="~/assets/MasterCardLogo.svg"
      spinner-color="white"
      height="23px"
      width="37px"
      class="float-right q-mt-xs"
      :class="$route.fullPath.includes('settings') ? 'logo' : null"
    />
    <q-img
      v-if="brand.toLowerCase() == 'american express'"
      src="~/assets/AmericanExpressLogo.svg"
      spinner-color="white"
      height="23px"
      width="45px"
      class="float-right"
      :class="$route.fullPath.includes('settings') ? 'logo' : null"
    />
  </span>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['brand','logoHeight'],
  methods: {}
}
</script>
<style lang="scss" scoped>
.logo{
  @media only screen and (min-width: 1024px) and (max-width: 1200px) {
    width: 30px !important;
    height: auto !important;
  }
}
</style>
