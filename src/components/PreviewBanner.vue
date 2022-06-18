<template>
    <div class="bg-selectiveYellow message text-center">
        {{$route.name == 'prePurchaseBlooprint' ? 'You are currently viewing Pre-Purchase copy of your blooprint.' : null}}
        {{$route.name == 'postPurchaseBlooprint' ? 'You are currently viewing Post-Purchase copy of your blooprint.' : null}}
    </div>
</template>

<script>
export default {
  name: 'PreviewBanner'
}
</script>

<style lang="scss" scoped>
.message {
  padding: 20px 16px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: #152141;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 16px !important;
    font-size: 16px;
    line-height: 20px;
  }
}
</style>