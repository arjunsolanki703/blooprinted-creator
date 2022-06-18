<template>
  <q-card class="publish-blooprint">
    <div class="q-pt-md">
      <label
        class="q-mb-md text-regalBlue text-fs-32 f-w-600 text-lh-36 title full-width q-pt-xl"
      >
        Unpublish blooprint
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
    <div
      class="q-mt-md f-w-500 text-fs-16 text-lh-24 text-comet subtitle-letterspace"
    >
      Are you sure you want to unpublish your blooprint?
    </div>
    <q-card-actions class="row reverse-wrap justify-between q-pa-none q-mt-xl">
      <q-btn
        flat
        label="Cancel"
        color="primary"
        class="cancel-btn btn-height q-pa-xs border-primary q-px-lg text-capitalize border-radius-md f-w-600 text-fs-16 text-lh-24"
        @click="closePopup"
      />
      <q-btn
        label="Unpublish blooprint"
        class="un-publish-btn btn-height q-pa-sm q-px-md text-white border-radius-md f-w-600 text-fs-16 text-lh-24"
        no-wrap
        no-caps
        @click="unpublishblooprint"
      />
    </q-card-actions>
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
    ...mapActions(['unPublishBlooprint']),
    async unpublishblooprint() {
      await this.unPublishBlooprint(this.id)
      this.isUpdated = true
      this.closePopup()
      this.$router.replace({ name: 'my-blooprints' }, () => {})
    },
    closePopup() {
      this.$emit('close-unpublish-popup', { isUpdated: this.isUpdated })
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-blooprint {
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.cross-icon {
  position: absolute;
  top: 25px;
  right: 25px;
}

.cancel-btn {
  border-width: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.un-publish-btn {
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
  border: 2px solid $primary;
  color: $primary !important;
  border-radius: 10px;
  @media screen and (max-width: 490px) {
    width: 100%;
  }
}
</style>
