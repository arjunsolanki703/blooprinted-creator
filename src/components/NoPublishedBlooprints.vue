<template>
  <div class="bg-solitude main-banner">
    <div class="column">
      <div
        class="f-w-600 text-fs-24-lh-32 text-center gt-sm"
        style="margin-bottom: 8px;"
      >
        Looks like you haven’t published any blooprints yet
      </div>
      <div
        class="f-w-600 f-s-20 text-lh-24 text-center lt-md"
        style="margin-bottom: 16px;"
      >
        Looks like you haven’t published any blooprints yet
      </div>
      <div class="f-w-400 text-fs-16 text-lh-24 text-center">
        Have a great blooprint idea but not sure where to start? Have our expert
        blooprint creators build one for you!
      </div>
      <q-btn
        label="Done With You blooprint"
        no-caps
        unelevated
        @click="goToCheckout"
        class="f-w-600 text-fs-16 text-lh-24 text-white bg-primary self-center"
      >
        <div class="relative-position">
          <div class="arrow" style="margin-left: 17px">
            <q-img src="~assets/chevron-right.svg" width="6px" height="12px" />
          </div>
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToCheckout() {
      this.$router.push({
        name: 'plan-update',
        params: {
          planName: 'self'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-banner {
  padding: 48px 40px 56px;
  border-radius: 8px;
  width: 100%;
  margin-top: 24px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 32px 20px 40px;
    margin-top: 20px;
  }
}

.q-btn {
  width: 266px;
  height: 50px;
  margin-top: 28px;
  border-radius: 10px;

  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 32px;
    max-width: 305px;
    width: 100%;
  }
}

@supports (-moz-appearance: none) {
  .q-img {
    margin-bottom: 0px !important;
  }
  .arrow {
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding-bottom: 2px !important;
    }
  }
}
</style>
