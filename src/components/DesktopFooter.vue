<template>
  <q-footer
    class="bg-whiteSmoke text-dimGrey absolute-bottom full-width q-px-md-xl q-px-sm-lg q-px-xs-lg"
  >
    <q-separator class="text-secondary" />
    <div class="row q-py-md-lg q-py-sm-md q-py-xs-md">
      <div class="col text-body2 text-left">&#169; 2021, Blooprinted</div>
      <router-link
        class="text-body2 text-right text-dimGrey remove-underline q-mr-md"
        :to="{ name: 'terms-and-conditions' }"
        >Terms & Conditions</router-link
      >
      <span>|</span>
      <router-link
        class="text-body2 text-right text-dimGrey remove-underline q-ml-md"
        :to="{ name: 'privacy-policy' }"
        >Privacy Policy</router-link
      >
    </div>
  </q-footer>
</template>
<script>
export default {}
</script>
