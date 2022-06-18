<template>
  <q-dialog v-model="confirmationPopup" persistent>
    <q-card class="switch-account-popup">
      <div class="full-width switch-popup">
        <label class="q-mb-md text-regalBlue text-fs-32 f-w-600 text-lh-36"
          >Switch Plan</label
        >
      </div>
      <div class="cross-icon">
        <q-icon
          name="clear"
          class="text-regalBlue cursor-pointer"
          size="30px"
          @click="closePopup('no')"
        />
      </div>
      <q-card-section class="row items-center q-pl-none q-pb-xl">
        <span
          style="color: #F04438;
"
        >
          <span class="switch-popup-message icon">
            <q-img
              src="~assets/Warning-icon.svg"
              style="width:28.9px; height:27px"
            />
          </span>

          <span class="switch-popup-message text f-w-500 text-fs-14-lh-20"
            >{{popupMsg}}
          </span>
        </span>
      </q-card-section>

      <q-card-actions
        class="row reverse-wrap justify-between q-pa-none"
        style="margin-top:12px"
      >
        <q-btn
          flat
          label="Cancel"
          color="primary"
          class="cancel-btn btn-height q-pa-xs border-primary q-px-lg text-capitalize border-radius-md f-w-600 text-fs-16 text-lh-24"
          @click="closePopup('no')" 
        />
        <q-btn
          label="Yes, Switch Plan"
          class="switch-btn btn-height q-pa-sm q-px-md text-capitalize text-white border-radius-md f-w-600 text-fs-16 text-lh-24"
          no-wrap
          @click="closePopup('yes')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  data() {
    return {
      confirmationPopup: true
    }
  },
  props: ['popupMsg'],
  methods: {
    //   ***************** Triggers when Yes/No button is clicked ***********************8
    closePopup(type) {
      this.$emit('on-confirm-popup-close', { confirmStatus: type })
    }
  }
}
</script>
<style lang="scss" scoped>
.switch-account-popup {
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.cross-icon {
  position: absolute;
  top: 25px;
  right: 25px;
}
.switch-popup {
  padding: 30px 0px 32px 0;
  @media screen and (max-width: 490px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    label {
      font-size: 26px;
    }
  }
}
.switch-popup-message {
  display: inline-block;
  vertical-align: top;
  .text {
    font-family: Barlow !important;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #F04438;
    @media screen and (max-width: 490px) {
      margin-left: 10px !important;
    }
  }
  &.icon {
    margin-top: 6px;
    width: 6%;
    @media screen and (max-width: 490px) {
      width: 11%;
      margin-top: 20px;
    }
  }
  &.text {
    width: 85%;
    margin-left: 17.91px;
    @media screen and (max-width: 490px) {
      width: 77%;
      line-height: 20px;
      padding-top: 15px;
    }
  }
}
.cancel-btn {
  border-width: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.switch-btn {
  padding-top: 4px;
  padding-bottom: 4px;
  width: 221px;
  height: 50px;
  background: $primary;
  border-radius: 10px;
  @media screen and (max-width: 490px) {
    width: 100%;
    margin-left: 0 !important;
    margin-bottom: 16px;
  }
}
.cancel-btn {
  height: 50px;
  width: 118px;
  border: 2px solid #d0d5dd;
  color: #344054 !important;
  border-radius: 10px;
  @media screen and (max-width: 490px) {
    width: 100%;
  }
}
</style>