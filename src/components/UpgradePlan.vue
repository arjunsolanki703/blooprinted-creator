<template>
  <div>
    <q-dialog persistent v-model="showPopup">
      <q-card
        class="q-px-md q-py-lg bg-white rounded-borders upgrade-popup relative-position"
      >
        <div class="absolute-right">
          <q-icon
            name="close"
            class="q-pa-xs close-icon bg-white"
            @click="onPopupClose"
            size="30px"
          />
        </div>
        <div class="q-pa-lg">
          <div
            class="text-h5 text-weight-medium text-center"
            style="color:#162E8B"
          >
            Please upgrade your plan
          </div>
          <div
            class="q-py-md text-subtitle1 text-nightRider text-center text-weight-medium"
          >
            You have reached a limit of your current plan.
          </div>
          <div class="flex flex-center">
            <q-img
              spinner-color="secondary"
              src="~assets/AppLogo.svg"
              height="30%"
              width="30%"
            />
          </div>
          <div
            class="text-subtitle1 text-nightRider text-center q-pa-md text-weight-medium"
          >
            If you want to create more blooprints, Please upgrade your plan as
            per requirement
          </div>
          <div class="row flex flex-center">
            <q-btn
              class=" col-xs-12 col-sm-8 col-md-4 q-my-xs q-ml-md q-mr-md text-capitalize"
              label="Upgrade Now"
              type="button"
              color="primary"
              size="20px"
              to="/my-plan"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'UpgradePlan',
  props: ['currentPlan'],
  data() {
    return {
      showPopup: true
    }
  },
  methods: {
    onPopupClose() {
      this.showPopup = false
      this.$emit('on-upgrade-plan-popup-close', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.upgrade-popup {
  min-height: 40vh;
  width: 90vw;
  .close-icon {
    color: black;
    right: 10px;
    top: 10px;
    cursor: pointer;
    &:hover {
      color: $info;
    }
  }
}
@media (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: 760px;
  }
}
</style>
