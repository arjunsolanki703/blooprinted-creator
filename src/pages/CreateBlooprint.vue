<template>
  <q-page class="row bg-whiteSmoke q-pt-lg q-pl-lg">
    <div
      class="col-3 bg-primary"
      style="max-width:300px; border-top-right-radius: 7px;  border-top-left-radius: 7px;"
    >
      <div
        class=" text-body2 q-pa-md bg-white"
        style="min-height:57px; border:1px solid #F0F0F0; border-top-right-radius: 5px; border-top-left-radius: 5px;"
      >
        Create Blooprint
      </div>
      <div class="text-body2 bg-primary">
        <q-btn
          color="primary"
          size="14px"
          flat
          class="q-pa-sm full-width "
          align="left"
          text-color="white"
          label="Milestone"
          @click="onMilestoneClick()"
          no-caps
        />
      </div>
    </div>

    <div class="col-9">
      <BlooprintDetails />
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import BlooprintDetails from 'components/BlooprintDetails.vue'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    BlooprintDetails
  },
  data() {
    return {
      blooprintID: null,
      planDetails: {
        accessibleGroup: '',
        name: 'free'
      },
      showPlanPopup: false,
      allPlansList: [],
      currentPlanInfo: {}
    }
  },
  mounted() {
    this.blooprintID = this.$route.params.blooprintId
  },
  methods: {
    ...mapActions(['setToastMessage']),
    onMilestoneClick() {
      if (this.blooprintID && this.blooprintID != null) {
        this.$router.push({
          name: 'blooprints-milestone',
          params: { blooprintId: this.blooprintID }
        })
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Blooprint not created. Click save to create blooprint'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pageBg {
  background-color: $whiteSmoke;
}
</style>
