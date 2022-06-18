<template>
  <q-page class="q-pa-lg">
    <Chart
      @on-task-select="onTaskSelect"
      :isUpdated="isUpdated"
      :removeSelection="removeSelection"
    />
    <q-dialog
      persistent
      v-model="openTaskPopup"
      position="right"
      style="width:800px;"
    >
      <TaskCreationScreen
        :milestoneSelected="milestoneSelected"
        :taskSelected="taskSelected"
        @on-task-popup-close="onTaskPopupClose"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import Chart from '../components/Chart.vue'
import TaskCreationScreen from '../pages/TaskCreationScreen.vue'
import { mapActions } from 'vuex'
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    Chart,
    TaskCreationScreen
  },
  data() {
    return {
      openTaskPopup: false,
      taskSelected: {},
      milestoneSelected: {},
      isUpdated: false,
      removeSelection: false
    }
  },
  methods: {
    ...mapActions(['getBlooprintDetailsById', 'getMilestoneData']),
    // ************** Open the Popup when Task is selected *********************************
    onTaskSelect(event) {
      this.isUpdated = false
      this.openTaskPopup = event['show']
      this.taskSelected = event['taskSelected']
      this.milestoneSelected = event['milestone']
    },
    // *************** Close the Popup once Task is closed ******************************
    onTaskPopupClose(event) {
      if (this.isUpdated) {
        this.isUpdated = false
      } else {
        this.isUpdated = true
      }
      if (this.removeSelection) {
        this.removeSelection = false
      } else {
        this.removeSelection = true
      }
      if (event.type != 'milestone') {
        this.openTaskPopup = false
      }
    }
  },
  mounted() {
    this.getBlooprintDetailsById()
  }
}
</script>
<style lang="scss" scoped></style>
