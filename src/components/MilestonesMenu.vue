<template>
  <div
    :class="
      panel == 'list'
        ? 'milestone-list-card-padding'
        : 'milestone-timeline-card-padding'
    "
  >
    <div class="row items-center justify-between">
      <div class="f-w-600 milestone-heading text-regalBlue">Milestones</div>
      <div class="row items-center" v-if="$q.screen.width > 374">
        <div class="text-black q-mr-md gt-xs text-fs-16 text-lh-24 f-w-500">
          View
        </div>
        <div class="options-container q-pa-xs">
          <q-btn
            class="list-btn text-black text-fs-16 text-lh-24 f-w-500"
            :style="panel == 'list' ? 'background: #E8EEFD' : null"
            label="List"
            no-caps
            no-wrap
            dense
            flat
            icon-right="img:menu.svg"
            @click="panel = 'list'"
          />
          <q-btn
            class="calender-btn text-black text-fs-16 text-lh-24 f-w-500"
            label="Timeline"
            :style="panel == 'timeline' ? 'background: #E8EEFD' : null"
            no-caps
            no-wrap
            dense
            flat
            icon-right="img:calender.svg"
            @click="panel = 'timeline'"
          />
        </div>
      </div>
    </div>
    <div class="row q-mt-md" v-if="$q.screen.width <= 374">
      <div class="options-container q-pa-xs">
        <q-btn
          class="list-btn text-black text-fs-16 text-lh-24 f-w-500"
          :style="panel == 'list' ? 'background: #E8EEFD' : null"
          label="List"
          no-caps
          no-wrap
          dense
          flat
          icon-right="img:menu.svg"
          @click="panel = 'list'"
        />
        <q-btn
          class="calender-btn text-black text-fs-16 text-lh-24 f-w-500"
          label="Timeline"
          :style="panel == 'timeline' ? 'background: #E8EEFD' : null"
          no-caps
          no-wrap
          dense
          flat
          icon-right="img:calender.svg"
          @click="panel = 'timeline'"
        />
      </div>
    </div>
    <q-tab-panels
      v-model="panel"
      animated
      class="main-container"
      :transition-duration="10000"
    >
      <!-------------- list view ----------->
      <q-tab-panel
        class="q-pa-none discoun-reveal fade-left active"
        name="list"
      >
        <div
          v-if="milestonesList.length == 0 && !isLoading"
          class="no-milestones bg-primary text-center"
        >
          <div class="text-fs-24-lh-32 text-white f-w-600 q-mb-sm">
            Start building your blooprint milestones
          </div>
          <div class="text-fs-16 text-lh-24 text-white f-w-400 q-mb-xs">
            Add your first milestone
          </div>
          <q-btn
            label="Add Milestone"
            flat
            no-wrap
            @click="onAddMileStoneClick"
            no-caps
            class="q-mt-md bg-white add-milestone-btn text-primary  text-fs-16 text-lh-24 f-w-600"
          />
        </div>
        <div v-if="isLoading">
          <div v-for="i in 10" :key="i">
            <q-skeleton
              type="QBtn"
              style="height: 64px;border-radius: 8px;"
              class="q-mb-md full-width"
            />
          </div>
        </div>

        <MilestoneCreationListView
          class="discoun-reveal fade-left active"
          v-else-if="milestonesList.length > 0"
          :milestonesList="milestonesList"
          @on-milestone-task-update="onMilestoneTaskUpdate"
          @navigate-to-general-menu="navigateToGeneralMenu"
          @onUpdate="onUpdate"
        />
      </q-tab-panel>

      <!----------- timeline view ----------->
      <q-tab-panel
        class="timeline-panel discoun-reveal fade-left active"
        name="timeline"
      >
        <MilestoneTimelineView />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import MilestoneCreationListView from 'components/MilestoneCreationListView.vue'
import MilestoneTimelineView from 'components/MilestoneTimelineView.vue'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      panel: 'list',
      isLoading: true,
      milestonesList: [],
      initialList: []
    }
  },
  props: ['blooprintDetails'],
  components: {
    MilestoneCreationListView,
    MilestoneTimelineView
  },
  watch: {
    blooprintDetails(data) {
      // console.log(data)
    }
  },
  mounted() {
    this.fetchMileStonesList()
  },
  methods: {
    ...mapActions(['getMilestoneData']),
    isSaved() {
      if (this.initialList.length == this.milestonesList.length) {
        for (let i = 0; i < this.initialList.length; i++) {
          if (
            this.initialList[i].attributes.newName !=
              this.milestonesList[i].attributes.newName ||
            this.initialList[i].attributes.newTitle !=
              this.milestonesList[i].attributes.newTitle ||
            this.initialList[i].attributes.newDescription !=
              this.milestonesList[i].attributes.newDescription ||
            this.initialList[i].attributes.newVideo !=
              this.milestonesList[i].attributes.newVideo
          ) {
            return false
          }
        }
      } else {
        return false
      }
      return true
    },
    async fetchMileStonesList() {
      this.isLoading = true
      let data = await this.getMilestoneData()
      this.isLoading = false
      data.forEach(item => {
        item['attributes']['newName'] = item['attributes']['name']
          ? item['attributes']['name']
          : ''
        item['attributes']['newDescription'] = item['attributes']['description']
          ? item['attributes']['description']
          : ''
        item['attributes']['newTitle'] = item['attributes']['title']
          ? item['attributes']['title']
          : ''
        item['attributes']['newVideo'] = item['attributes']['video']
          ? item['attributes']['video']
          : ''
      })
      this.milestonesList = data
      this.initialList = JSON.parse(JSON.stringify(data))
    },
    onAddMileStoneClick() {
      this.milestonesList.push({
        attributes: {
          name: '',
          title: '',
          description: '',
          order: this.milestonesList.length + 1,
          tasks: [],
          newName: '',
          newDescription: '',
          newTitle: '',
          newVideo: ''
        },
        id: '',
        isOpened: true,
        isToggle: true
      })
    },
    onUpdate(val) {
      this.initialList = JSON.parse(JSON.stringify(this.milestonesList))
    },
    onMilestoneTaskUpdate(event) {
      console.log('here', event)
      if (event) {
        this.fetchMileStonesList()
      }
    },
    navigateToGeneralMenu() {
      this.$emit('on-blooprint-data-update')
    }
  }
}
</script>

<style lang="scss" scoped>
.milestone-list-card-padding {
  padding: 40px 40px 200px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 16px 0px 100px 0px;
  }
}
.milestone-timeline-card-padding {
  padding: 40px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 16px 0px 16px 0px;
  }
}
.milestone-heading {
  font-size: 24px;
  line-height: 32px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 24px;
  }
}
.main-container {
  margin-top: 36px;
}
.timeline-panel {
  padding: 12px 0px 40px 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 12px 0px 40px 0px;
  }
}
.options-container {
  // height: 40px;
  border: 1px solid #e8e9ec;
  border-radius: 8px;
}
.no-milestones {
  padding: 48px 40px 56px;
  border-radius: 8px;
}
.list-btn {
  width: 66px;
  height: 32px;
  border-radius: 4px;
}
.calender-btn {
  width: 109px;
  height: 32px;
  margin-left: 8px;
  border-radius: 4px;
}
.add-milestone-btn {
  border-radius: 10px;
  width: 176px;
  height: 50px;
}
.q-dialog__inner--minimized > div {
  max-width: fit-content;
}
::v-deep {
  .list-btn .q-icon {
    font-size: 16px !important;
    margin-left: 8px;
  }
  .calender-btn .q-icon {
    font-size: 16px !important;
    margin-left: 8px;
  }
  .scroll {
    // overflow: unset;
  }
}
.discoun-reveal {
  opacity: 0;
  &.active {
    opacity: 1;
    &.fade-left {
      animation: fade-left 1s ease-in;
    }
  }
}
@keyframes fade-left {
  0% {
    transform: translateX(0px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
