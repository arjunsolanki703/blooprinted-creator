<template>
  <q-card class="delete-popup">
    <div class="q-pt-md">
      <label
        class="q-mb-md text-regalBlue text-fs-32 f-w-600 text-lh-36 title full-width q-pt-xl"
      >
        Delete blooprint
      </label>
    </div>
    <div class="cross-icon">
      <q-icon
        name="clear"
        class="text-regalBlue cursor-pointer"
        size="30px"
        @click="closePopup"
      />
    </div>
    <div class="q-mt-lg">
      <q-card-section class="row items-center q-pl-none q-pb-lg">
        <div
          style="color: #F04438;"
          class="flex no-wrap"
        >
          <span class="delete-popup-message icon">
            <q-img
              src="~assets/Warning-icon.svg"
              style="width:28.9px; height:27px"
            />
          </span>

          <span class="delete-popup-message text f-w-500 text-fs-14-lh-20">
            Are you sure you want to delete your blooprint? When you delete a
            blooprint, your blooprint data is erased from our database. This cannot be
            undone.
          </span>
        </div>
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
          @click="closePopup"
        />
        <q-btn
          label="Yes, Delete blooprint"
          color="red"
          class="delete-btn btn-height q-pa-sm q-px-md  text-white border-radius-md f-w-600 text-fs-16 text-lh-24"
          no-wrap
          no-caps
          @click="deleteBlooprintMethod"
        />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['id'],
  data() {
    return {
      isUpdated: false
    }
  },
  methods: {
    ...mapActions(['deleteBlooprint']),
    async deleteBlooprintMethod() {
      await this.deleteBlooprint(this.id)
      this.isUpdated = true
      this.closePopup()
      this.$router.replace({ name: 'my-blooprints' }, () => {})
    },
    closePopup() {
      this.$emit('close-delete-popup', { isUpdated: this.isUpdated })
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-popup {
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.cross-icon {
  position: absolute;
  top: 25px;
  right: 25px;
}

.delete-popup-message {
  display: inline-block;
  vertical-align: top;
  .text {
    font-family: Barlow !important;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #f04438;
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
    max-width: 420px;
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
.delete-btn {
  padding-top: 4px;
  padding-bottom: 4px;
  width: 221px;
  height: 50px;
  background: #f04438;
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
