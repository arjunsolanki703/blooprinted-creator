<template>
  <div>
    <!-- <draggable :list="blooprintMileStoneList" group="people" handle=".handle"> -->
    <q-list
      bordered
      class="milestone-list bg-white milestone-bottom"
      v-for="(milestone, milestoneIndex) in blooprintMileStoneList"
      :key="milestoneIndex"
    >
      <div class="row">
        <q-expansion-item
          class="col"
          v-model="milestone['isOpened']"
          expand-icon="none"
          :class="milestone['isOpened'] ? 'milestone-active' : null"
        >
          <template v-slot:header>
            <div
              class="row q-pr-md milestone-drag-style"
              v-if="!milestone['isOpened']"
            >
              <!-- handler for dragging items -->
              <q-icon class="handle">
                <q-img height="18px" width="10px" src="~assets/drag.svg" />
              </q-icon>
            </div>
            <q-item-section
              avatar
              class="milestone-section-style"
              :style="milestone['isOpened'] ? 'padding-left: 8px' : null"
            >
              <div class="relative-position order-icon-style">
                <div
                  class="absolute-center text-body1 subtitle-letterspace f-w-600 text-black"
                >
                  {{ milestoneIndex + 1 }}
                </div>
              </div>
            </q-item-section>
            <q-item-section
              class="f-w-600 text-body1 subtitle-letterspace text-start word-break-break-word"
              :class="{
                'text-ghost': milestone['isOpened'],
                'text-black': !milestone['isOpened']
              }"
            >
              <span class="gt-xs">
                {{ milestone['attributes']['name'] || 'Untitled Milestone' }}
              </span>
              <span class="lt-sm text-black">
                {{ milestone['attributes']['name'] || 'Untitled Milestone' }}
              </span>
            </q-item-section>
            <q-item-section side class="milestone-item-side">
              <div class="row q-mt-xs gt-xs">
                <div
                  class="f-w-500 text-black text-body1 subtitle-letterspace"
                  style="margin-left:32px"
                >
                  {{ milestone['attributes']['tasks'].length }}
                  {{
                    milestone['attributes']['tasks'].length > 1
                      ? 'tasks'
                      : 'task'
                  }}
                </div>
                <q-avatar size="8px" class="q-mx-md q-mt-sm" color="primary" />
                <div class="f-w-500 text-black text-body1 subtitle-letterspace">
                  {{
                    getTotalTaskDays(milestone) === 0 &&
                    getTotalTaskHours(milestone) === '' &&
                    getTotalTaskMinutes(milestone) === ''
                      ? '0 day'
                      : ''
                  }}
                  {{
                    getTotalTaskDays(milestone) >= 1
                      ? getTotalTaskDays(milestone)
                      : ''
                  }}
                  {{
                    getTotalTaskDays(milestone) > 1
                      ? 'days'
                      : 'day' && getTotalTaskDays(milestone) == 0
                      ? ''
                      : 'day'
                  }}
                  {{
                    getTotalTaskHours(milestone) > 0
                      ? getHours(milestone, null)
                      : ''
                  }}
                  {{
                    getTotalTaskMinutes(milestone) > 0 &&
                    getTotalTaskHours(milestone) > 0
                      ? ':'
                      : ''
                  }}
                  {{
                    getTotalTaskMinutes(milestone) === 0
                      ? ''
                      : getMinutes(milestone, null)
                  }}
                  {{
                    getTotalTaskHours(milestone) == 0 &&
                    getTotalTaskMinutes(milestone) > 0
                      ? getLabel(milestone, 'min')
                      : ''
                  }}
                  {{
                    getTotalTaskHours(milestone) > 0
                      ? getLabel(milestone, 'hr')
                      : ''
                  }}
                </div>
                <div
                  class="delete-mile-padd flex flex-start"
                  v-if="!milestone['isOpened']"
                >
                  <q-img
                    class="cursor-pointer"
                    src="~assets/deletepicture.svg"
                    width="20px"
                    height="20px"
                    v-on:click.stop.prevent="onDeleteMilestoneClick(milestone)"
                  />
                </div>
              </div>
              <div class="row lt-sm">
                <div class="column q-mt-xs q-ml-lg items-end">
                  <div class="f-w-500 text-black text-fs-14-lh-20 q-mb-xs">
                    {{ milestone['attributes']['tasks'].length }}
                    {{
                      milestone['attributes']['tasks'].length > 1
                        ? 'tasks'
                        : 'task'
                    }}
                  </div>
                  <div class="f-w-500 text-black text-fs-14-lh-20">
                    {{
                      getTotalTaskDays(milestone) === 0 &&
                      getTotalTaskHours(milestone) === '' &&
                      getTotalTaskMinutes(milestone) === ''
                        ? '0 day'
                        : ''
                    }}
                    {{
                      getTotalTaskDays(milestone) >= 1
                        ? getTotalTaskDays(milestone)
                        : ''
                    }}
                    {{
                      getTotalTaskDays(milestone) > 1
                        ? 'days'
                        : 'day' && getTotalTaskDays(milestone) == 0
                        ? ''
                        : 'day'
                    }}
                    {{
                      getTotalTaskHours(milestone) > 0
                        ? getHours(milestone, null)
                        : ''
                    }}
                    {{
                      getTotalTaskMinutes(milestone) > 0 &&
                      getTotalTaskHours(milestone) > 0
                        ? ':'
                        : ''
                    }}
                    {{
                      getTotalTaskMinutes(milestone) === 0
                        ? ''
                        : getMinutes(milestone, null)
                    }}
                    {{
                      getTotalTaskHours(milestone) == 0 &&
                      getTotalTaskMinutes(milestone) > 0
                        ? getLabel(milestone, 'min')
                        : ''
                    }}
                    {{
                      getTotalTaskHours(milestone) > 0
                        ? getLabel(milestone, 'hr')
                        : ''
                    }}
                  </div>
                </div>
                <div
                  class="delete-mile-padd flex flex-start q-mt-sm"
                  v-if="!milestone['isOpened']"
                >
                  <q-img
                    class="cursor-pointer"
                    src="~assets/deletepicture.svg"
                    width="20px"
                    height="20px"
                    v-on:click.stop.prevent="onDeleteMilestoneClick(milestone)"
                  />
                </div>
              </div>
            </q-item-section>
          </template>
          <!-------------- milestone contents --------->
          <div class="milestone-content">
            <!-- code for toggle-->
            <q-list>
              <div class="row">
                <q-expansion-item
                  class="col q-px-0 milestone-content-container"
                  v-model="milestone['isToggle']"
                  expand-icon="none"
                  :class="milestone['isToggle'] ? 'milestone-active' : null"
                  :header-class="[milestone['isToggle'] ? 'hidden' : '']"
                >
                  <template v-slot:header v-if="!milestone['isToggle']">
                    <q-item-section
                      class="f-w-600 text-body1 subtitle-letterspace text-start word-break-break-word"
                    >
                      <span class="gt-xs">
                        {{
                          milestone['attributes']['name'] ||
                            'Untitled Milestone'
                        }}
                      </span>
                      <span class="lt-sm text-black">
                        {{
                          milestone['attributes']['name'] ||
                            'Untitled Milestone'
                        }}
                      </span>
                    </q-item-section>
                    <q-item-section side class="milestone-item-side">
                      <div class="row q-mt-xs">
                        <div
                          class="flex flex-start q-ml-md"
                          v-if="!milestone['isToggle']"
                        >
                          <q-img
                            class="cursor-pointer"
                            src="~assets/toggle.svg"
                            width="20px"
                            height="20px"
                          />
                        </div>
                      </div>
                    </q-item-section>
                  </template>
                  <!-------------- milestone contents --------->
                  <div class="milestone-content">
                    <q-form ref="milestoneForm">
                      <div>
                        <label
                          class="f-w-600 text-body1 subtitle-letterspace text-regalBlue"
                        >
                          Milestone name
                          <span class="text-errorColor">*</span>
                        </label>
                        <q-input
                          ref="name"
                          style="margin-top:4px;"
                          type="text"
                          v-model.trim="milestone['attributes']['newName']"
                          class="border-input-field input-style subtitle-letterspace  q-mt-xs input-margin  q-pb-none"
                          borderless
                          placeholder="Enter the name of your milestone..."
                          :rules="[
                            val =>
                              (val && val.length > 0) ||
                              'Milestone name is required'
                          ]"
                        >
                        </q-input>
                      </div>
                      <div>
                        <label
                          class="f-w-600 text-body1 subtitle-letterspace text-regalBlue"
                        >
                          Milestone title
                          <span
                            class="f-w-400 text-manateeGrey"
                            style="font-style: italic;"
                          >
                            — Optional
                          </span>
                        </label>
                        <q-input
                          ref="title"
                          style="margin-top:4px;"
                          type="text"
                          v-model.trim="milestone['attributes']['newTitle']"
                          class="border-input-field  input-style subtitle-letterspace  q-mt-xs input-margin  q-pb-none"
                          borderless
                          placeholder="Enter the title of your milestone..."
                        >
                        </q-input>
                      </div>
                      <div>
                        <label
                          class="f-w-600 text-body1 subtitle-letterspace text-regalBlue"
                        >
                          Milestone description
                          <span
                            class="f-w-400 text-manateeGrey"
                            style="font-style: italic;"
                          >
                            — Optional
                          </span>
                        </label>
                        <q-input
                          style="margin-top:4px;"
                          type="textarea"
                          v-model.trim="
                            milestone['attributes']['newDescription']
                          "
                          class="border-input-field description-input-style subtitle-letterspace  q-mt-xs input-margin  q-pb-none"
                          borderless
                          placeholder="Enter the description of your milestone..."
                        >
                        </q-input>
                      </div>
                      <div class="q-mb-xs">
                        <label class="f-w-600 text-body1 subtitle-letterspace">
                          <span class="text-regalBlue f-w-600"
                            >Milestone video
                          </span>
                          <span
                            class="f-w-400 text-manateeGrey"
                            style="font-style: italic;"
                          >
                            — Optional
                          </span>
                        </label>
                      </div>
                      <div class="relative-position">
                        <FileUpload
                          :model="milestone['attributes']['newVideo']"
                          label="Upload Video"
                          accept=".mp4, .mov"
                          fileType="video"
                          :elementData="milestone"
                          icon="img:video.svg"
                          :index="milestoneIndex"
                        />
                        <q-avatar
                          v-if="
                            milestone['attributes']['newVideo'] != '' &&
                              milestone['attributes']['newVideo'] != null
                          "
                          class="video-edit-after-upload"
                          @click="milestone['attributes']['newVideo'] = null"
                          square
                          color="primary"
                          size="24px"
                          text-color="white"
                          icon="close"
                        />
                      </div>
                      <div class="text-dimGrey q-mt-sm">
                        <div>
                          Allowed type: .mp4, .mov, .MOV, Max size: 400 MB
                        </div>
                      </div>
                    </q-form>
                    <div class="q-mt-32">
                      <div class="row q-mt-32 q-mb-lg gt-xs">
                        <div class="col">
                          <q-btn
                            class="text-primary f-w-600 text-body1 subtitle-letterspace cancel-btn"
                            label="Cancel"
                            no-caps
                            unelevated
                            @click="onCancelClick(milestone)"
                          />
                        </div>
                        <div class="col text-right">
                          <q-btn
                            color="primary"
                            class="save-milestone-btn text-body1 subtitle-letterspace f-w-600"
                            text-color="white"
                            label="Save Milestone"
                            no-caps
                            unelevated
                            @click="
                              onSaveMilestoneClick(milestone, milestoneIndex)
                            "
                          />
                        </div>
                      </div>
                      <div class="column q-mt-32 q-mb-lg lt-sm">
                        <div class="">
                          <q-btn
                            color="primary"
                            class="save-milestone-btn text-body1 subtitle-letterspace f-w-600 full-width"
                            text-color="white"
                            label="Save Milestone"
                            no-caps
                            unelevated
                            @click="
                              onSaveMilestoneClick(milestone, milestoneIndex)
                            "
                          />
                        </div>
                        <div class="q-mt-md">
                          <q-btn
                            class="text-primary f-w-600 text-body1 subtitle-letterspace cancel-btn full-width"
                            label="Cancel"
                            no-caps
                            unelevated
                            @click="onCancelClick(milestone)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-expansion-item>
              </div>
            </q-list>
            <!-- End code for toggle-->

            <!-- <div>
              <q-btn
                class="add-media-content text-fs-16 text-lh-24 q-mb-sm text-black f-w-600 bg-white"
                label="Add Media"
                no-caps
                no-wrap
                flat
                icon="close"
                dense
              >
              </q-btn>
            </div> -->
            <div class="q-mt-32">
              <div class="f-w-600 text-body1 subtitle-letterspace text-black">
                Tasks
              </div>
              <div
                class="f-w-500 text-body1 subtitle-letterspace text-manateeGrey q-mt-xs q-mb-lg"
              >
                Add the tasks to the milestones below on how to complete this
                milestone.
              </div>
              <!-- <draggable
                  :list="milestone['attributes']['tasks']"
                  group="tasks"
                > -->
              <div
                bordered
                v-for="(task, taskIndex) in milestone['attributes']['tasks']"
                :key="task['id']"
                class="task-background row q-mb-10 cursor-pointer"
                @click="onEditTaskClick(milestone,task,taskIndex)"
              >
                <div class="row q-mt-sm">
                  <!-- handler for dragging items -->
                  <q-icon class="handle">
                    <q-img height="18px" width="10px" src="~assets/drag.svg" />
                  </q-icon>
                </div>
                <div class="relative-position q-ml-sm order-icon-style">
                  <div
                    class="absolute-center text-body1 subtitle-letterspace f-w-600 text-black"
                  >
                    {{ alphabet[taskIndex] }}
                  </div>
                </div>
                <div class="flex col justify-between">
                  <div
                    class="q-pl-md-lg q-pl-sm-md q-pl-xs-sm row flex-center f-w-600 text-body1 subtitle-letterspace word-break-break-word text-black"
                  >
                    {{ task['name'] }}
                  </div>
                  <div
                    class="q-pl-xs-md f-w-500 text-black text-body1 subtitle-letterspace q-pt-xs q-pl-md-lg q-pl-sm-md q-pl-xs-xs text-right word-break-break-word"
                  >
                    {{
                      task['duration']['days'] > 0
                        ? task['duration']['days']
                        : ''
                    }}
                    {{
                      task['duration']['days'] > 1
                        ? 'days'
                        : 'day' && task['duration']['days'] == 0
                        ? ''
                        : 'day'
                    }}
                    <q-avatar
                      size="8px"
                      class="q-mx-md"
                      color="primary"
                      v-if="
                        (task['duration']['minutes'] > 0 ||
                          task['duration']['hours'] > 0) &&
                          task['duration']['days'] > 0
                      "
                    />
                    {{
                      task['duration']['hours'] > 0
                        ? getHours(
                            task['duration']['hours'],
                            task['duration']['minutes']
                          )
                        : ''
                    }}
                    {{
                      task['duration']['hours'] > 0 &&
                      task['duration']['minutes'] > 0
                        ? ':'
                        : ''
                    }}
                    {{
                      task['duration']['minutes'] > 0
                        ? getMinutes(
                            task['duration']['minutes'],
                            task['duration']['hours']
                          )
                        : ''
                    }}
                    {{
                      task['duration']['hours'] == 0 &&
                      task['duration']['minutes'] > 0
                        ? getLabel(task['duration']['minutes'], 'min')
                        : ''
                    }}
                    {{
                      task['duration']['hours'] > 0
                        ? getLabel(task['duration']['hours'], 'hr')
                        : ''
                    }}
                  </div>
                </div>
              </div>
              <!-- </draggable> -->
              <div
                class="new-task-btn cursor-pointer q-mt-md q-mb-lg"
                @click="onAddNewTaskClick(milestone)"
              >
                <div class="row flex flex-center">
                  <q-img
                    height="24px"
                    width="24px"
                    src="~assets/plus-square.svg"
                  />
                  <div
                    class="q-ml-sm f-w-600 text-body1 subtitle-letterspace text-black"
                  >
                    Add new task
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-expansion-item>
        <!-- <div
          class="q-mr-md delete-mile-padd flex flex-start"
          v-if="!milestone['isOpened']"
        >
          <q-img
            class="cursor-pointer"
            src="~assets/deletepicture.svg"
            width="20px"
            height="20px"
            @click="onDeleteMilestoneClick(milestone)"
          />
        </div> -->
      </div>
    </q-list>
    <!-- </draggable> -->

    <div
      class="new-milestone-btn cursor-pointer q-mt-md"
      @click="onAddNewMilestoneClick"
    >
      <div class="row flex flex-center">
        <q-img height="24px" width="24px" src="~assets/plus-square.svg" />
        <div class="q-ml-sm f-w-600 text-body1 subtitle-letterspace text-black">
          Add new milestone
        </div>
      </div>
    </div>
    <div class="text-right">
      <q-btn
        color="primary"
        class="save-btn text-body1 subtitle-letterspace f-w-600"
        text-color="white"
        label="Next"
        no-caps
        @click="goToGeneralMenu"
        unelevated
      />
    </div>
    <q-dialog
      v-model="taskpopup"
      persistent
      :maximized="$q.screen.lt.md ? true : false"
    >
      <CreateTaskPopup
        :milestoneSelected="milestoneSelected"
        :taskSelected="taskSelected"
        :taskPopupType="taskPopupType"
        :taskCount="taskCount"
        @on-task-popup-close="onTaskPopupClose"
        @on-delete-task-click="onDeleteTaskClick"
      />
    </q-dialog>
    <q-dialog v-model="showDeletePopup" persistent>
      <q-card class="delete-account-popup">
        <div class="full-width switch-popup">
          <label
            class="q-mb-md text-black text-fs-32 f-w-600 text-lh-36 header-letterspace"
          >
            Delete {{ deletePopupType }}?
          </label>
        </div>
        <div class="cross-icon">
          <q-icon
            name="clear"
            class="text-regalBlue cursor-pointer"
            size="30px"
            @click="closeDeletePopup('no')"
          />
        </div>
        <div class="f-w-500 text-body1 subtitle-letterspace text-comet">
          If you delete this {{ deletePopupType }} you will lose all of the
          content related to it, are you sure you wish to continue?
        </div>
        <q-card-actions
          class="row reverse-wrap justify-between q-pa-none"
          style="margin-top:100px"
        >
          <q-btn
            flat
            label="Cancel"
            color="primary"
            class="cancel-delete-btn q-pa-xs border-primary q-px-lg subtitle-letterspace text-capitalize border-radius-md f-w-600 text-fs-16 text-lh-24"
            @click="closeDeletePopup('no')"
          />
          <q-btn
            :label="
              deletePopupType == 'task' ? 'Delete Task' : 'Delete Milestone'
            "
            class="q-pa-sm q-px-md text-capitalize text-white border-radius-md subtitle-letterspace f-w-600 text-fs-16 text-lh-24"
            no-wrap
            :class="
              deletePopupType == 'milestone'
                ? 'delete-milestone-btn'
                : 'delete-task-btn'
            "
            style="background-color: #D92D20;"
            @click="closeDeletePopup('yes')"
          >
            <div class="relative-position">
              <div style="margin-left: 11px">
                <q-img
                  src="~assets/white-delete-icon.svg"
                  width="24px"
                  height="24px"
                />
              </div>
            </div>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
// import draggable from 'vuedraggable'
import FileUpload from 'components/FileUpload.vue'
import CreateTaskPopup from 'components/CreateTaskPopup.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MilestoneCreationListView',
  components: {
    // draggable,
    FileUpload,
    CreateTaskPopup
  },
  data() {
    return {
      blooprintMileStoneList: [],
      taskpopup: false,
      milestoneSelected: {},
      taskPopupType: 'add',
      taskSelected: {},
      nextIndex: 0,
      showDeletePopup: false,
      deletePopupType: 'milestone',
      additionalHours: 0,
      additionalDays: 0,
      taskCount: 0,
      alphabet: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'AA',
        'AB',
        'AC',
        'AD',
        'AE',
        'AF',
        'AG',
        'AH',
        'AI',
        'AJ',
        'AK',
        'AL',
        'AM',
        'AN',
        'AO',
        'AP',
        'AQ',
        'AR',
        'AS',
        'AT',
        'AU',
        'AV',
        'AW',
        'AX',
        'AY',
        'AZ'
      ]
    }
  },
  computed: {
    ...mapGetters(['fileUrl'])
  },
  props: ['milestonesList'],
  watch: {
    milestonesList(data) {
      this.blooprintMileStoneList = data
    },
    fileUrl(data) {
      if (data && !this.taskpopup) {
        this.blooprintMileStoneList[data['index']]['attributes']['newVideo'] =
          data['url']
      }
    }
  },
  mounted() {
    if (this.milestonesList && this.milestonesList.length > 0) {
      this.blooprintMileStoneList = this.milestonesList
    }
  },
  methods: {
    ...mapActions([
      'updateMilestone',
      'createMilestone',
      'deleteMilestoneTask',
      'setToastMessage',
      'deleteMilestone',
      'retrieveTaskDetails',
      'updateSameDayAsPrevTask'
    ]),
    // getTotalTaskDays(milestone) {
    //   let totalDays = 0
    //   let extraHours = 0
    //   milestone.attributes.tasks.map(item => {
    //     totalDays = totalDays + item['duration']['days']
    //     extraHours = extraHours + item['duration']['hours']
    //   })
    //   const hrs = extraHours / 24;
    //   return Math.floor(totalDays + this.additionalDays);
    // },

    getTotalTaskDays(milestone) {
      let totalDays = 0
      let extraHours = 0
      let totalMinutes = 0
      milestone.attributes.tasks.map(item => {
        totalDays = totalDays + item['duration']['days']
        totalMinutes = totalMinutes + item['duration']['minutes']
        extraHours = extraHours + item['duration']['hours']
      })
      const hrs = extraHours / 24
      let totalHours = extraHours + Math.floor(totalMinutes / 60)
      let seconds = Number(totalHours * 60 * 60) // total hours convert into second
      let totalAdditionalDays = Math.floor(seconds / (3600 * 24)) // total second convert into days
      return Math.floor(totalDays + totalAdditionalDays)
    },
    getTotalTaskHours(milestone) {
      let hours = 0
      let totalMinutes = 0
      milestone.attributes.tasks.map(item => {
        hours = hours + item['duration']['hours']
        totalMinutes = totalMinutes + item['duration']['minutes']
      })
      let totalHours = hours + Math.floor(totalMinutes / 60)
      let seconds = Number(totalHours * 60 * 60) // total hours convert into second
      // this.additionalDays = Math.floor(seconds / (3600*24)); // total second convert into days
      var hrs = Math.floor((seconds % (3600 * 24)) / 3600) // seconds convert into hours
      const hour = hrs > 0 ? hrs : ''
      return hour
    },
    getTotalTaskMinutes(milestone) {
      let totalMinutes = 0
      milestone.attributes.tasks.map(item => {
        totalMinutes = totalMinutes + item['duration']['minutes']
      })
      // this.additionalHours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60
      const minute = minutes > 0 ? minutes : ''
      return minute
    },
    retrieveTotalTaskDays(milestone) {
      return (
        (this.getTotalTaskDays(milestone) % 60) +
        Math.trunc(this.getTotalTaskHours(milestone) / 24)
      )
    },
    retrieveTotalTaskHours(milestone) {
      return (
        (this.getTotalTaskHours(milestone) % 24) +
        Math.trunc(this.getTotalTaskMinutes(milestone) / 60)
      )
    },
    fetchMilestoneOrder() {
      let order = 1
      this.blooprintMileStoneList.map(item => {
        let currentOrder = item['attributes']['order']
        if (order <= currentOrder) {
          order = currentOrder + 1
        }
      })
      return order
    },
    onAddNewMilestoneClick() {
      this.blooprintMileStoneList.push({
        attributes: {
          name: '',
          title: '',
          description: '',
          order: this.fetchMilestoneOrder(),
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
    onSaveMilestoneClick(milestone, milestoneIndex) {
      this.$refs.name[milestoneIndex].validate()
      this.$refs.title[milestoneIndex].validate()
      this.$refs.milestoneForm[milestoneIndex].validate().then(success => {
        if (success) {
          let params = {
            milestoneID: milestone.id,
            name: milestone.attributes.newName,
            title: milestone.attributes.newTitle,
            order: milestone.attributes.order,
            video: milestone.attributes.newVideo,
            description: milestone.attributes.newDescription
          }
          if (milestone.id != '') {
            this.callUpdateMilestone(params, milestone)
            this.$emit('onUpdate', true)
          } else {
            this.saveMilestone(params, milestone)
            this.$emit('onUpdate', true)
          }
        }
      })
    },
    onCancelClick(milestone) {
      milestone['attributes']['newName'] = milestone['attributes']['name']
      milestone['attributes']['newDescription'] =
        milestone['attributes']['description']
      milestone['attributes']['newTitle'] = milestone['attributes']['title']
      milestone['attributes']['newVideo'] = milestone['attributes']['video']
        ? milestone['attributes']['video']
        : null
      milestone['isOpened'] = true
      milestone['isToggle'] = false
    },
    async saveMilestone(params, milestone) {
      let data = await this.createMilestone(params)
      if (data && data['id']) {
        milestone['id'] = data['id']
        this.updateWithNewData(milestone)
      }
    },
    async callUpdateMilestone(params, milestone) {
      let data = await this.updateMilestone(params)
      if (data) {
        this.updateWithNewData(milestone)
      }
    },
    updateWithNewData(milestone) {
      milestone['attributes']['name'] = milestone['attributes']['newName']
      milestone['attributes']['description'] = milestone['attributes'][
        'newDescription'
      ]
        ? milestone['attributes']['newDescription']
        : ''
      milestone['attributes']['title'] = milestone['attributes']['newTitle']

      milestone['attributes']['video'] = milestone['attributes']['newVideo']
        ? milestone['attributes']['newVideo']
        : ''
      milestone['isOpened'] = true
      milestone['isToggle'] = false
    },
    onAddNewTaskClick(milestone) {
     
      if (milestone['id'] != '') {
        if(milestone.attributes.tasks.length == 1){
          this.taskCount = milestone.attributes.tasks.length + 1;
        }else{
          this.taskCount = milestone.attributes.tasks.length;
        }
        this.milestoneSelected = milestone
        this.taskpopup = true
        this.taskPopupType = 'add'
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Task cannot be created without creating a milestone.'
        })
      }
    },
    onEditTaskClick(milestone,task,taskIndex) {
      this.taskCount = taskIndex;
      this.milestoneSelected = milestone
      this.taskSelected = task
      this.taskPopupType = 'edit'
      this.taskpopup = true
    },
    onTaskPopupClose(event) {
      if (event['isCreatedOrUpdated']) {
        this.taskCount = 0;
        if (this.taskPopupType == 'add') {
          this.milestoneSelected['attributes']['tasks'].push({
            id: event['response']['id'],
            duration: {
              days: event['response']['attributes']['duration']['days'],
              hours: event['response']['attributes']['duration']['hours'],
              minutes: event['response']['attributes']['duration']['minutes']
            },
            startsSameDayAsPrevTask: event['response']['attributes']['startsSameDayAsPrevTask'],
            name: event['response']['attributes']['name'],
            order: event['response']['attributes']['order']
          })
        } else {
          let task = this.milestoneSelected['attributes']['tasks'].filter(
            tasks => tasks.id == event['response']['id']
          )
          if (task.length > 0) {
            task[0]['id'] = event['response']['id']
            task[0]['days'] = event['response']['attributes']['days']
            task[0]['name'] = event['response']['attributes']['name']
            task[0]['order'] = event['response']['attributes']['order']
            task[0]['startsSameDayAsPrevTask'] = event['response']['attributes']['startsSameDayAsPrevTask']
            task[0]['duration']['days'] =
              event['response']['attributes']['duration']['days']
            task[0]['duration']['hours'] =
              event['response']['attributes']['duration']['hours']
            task[0]['duration']['minutes'] =
              event['response']['attributes']['duration']['minutes']
          }
          this.$emit('on-milestone-task-update', true)
        }
      }
      this.taskpopup = false
      this.milestoneSelected = {}
    },
    onDeleteMilestoneClick(milestone) {
      if (milestone['id'] != '') {
        if (milestone['attributes']['tasks'].length > 0) {
          this.setToastMessage({
            type: 'negative',
            message: 'Please delete all tasks to delete milestone'
          })
        } else {
          this.milestoneSelected = milestone
          this.showDeletePopup = true
          this.deletePopupType = 'milestone'
        }
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Milestone cannot be deleted without creating it.'
        })
      }
    },
    onDeleteTaskClick(event) {
      if (event) {
        this.taskpopup = false
        this.showDeletePopup = true
        this.deletePopupType = 'task'
      }
    },
    closeDeletePopup(type) {
      if (type == 'no') {
        this.milestoneSelected = {}
        this.taskSelected = {}
      } else {
        if (this.deletePopupType == 'task') {
          this.deleteTask()
        } else {

          this.callDeleteMilestone()
        }
      }
      this.showDeletePopup = false
    },
    async deleteTask() {
      let deleteData = {
        milestoneID: this.milestoneSelected.id,
        taskID: this.taskSelected.id,
        taskName: this.taskSelected.name
      }
      //get next index
      if(this.milestoneSelected.attributes.tasks.length >1 ){
        this.milestoneSelected.attributes.tasks.map((item,index) => {
          if (this.taskSelected.id == item['id']) {
              this.nextIndex = index + 1;
            }
        });
      }
      await this.deleteMilestoneTask(deleteData)
      if(this.nextIndex == 1){
        if(this.milestoneSelected.attributes.tasks[this.nextIndex]){
          if(this.milestoneSelected.attributes.tasks[this.nextIndex].startsSameDayAsPrevTask == true){
             let params = {
               milestoneID: this.milestoneSelected.id,
               taskID: this.milestoneSelected.attributes.tasks[this.nextIndex].id
             }
             let taskDetails = await this.retrieveTaskDetails(params)
             let updateTaskParams = {
              milestoneID: this.milestoneSelected.id,
              taskID: taskDetails.id,
              startsSameDayAsPrevTask:false,
              name: taskDetails.attributes.name,
              order: taskDetails.attributes.order,
              days: taskDetails.attributes.duration.days,
              fields:taskDetails.attributes.fields,
              duration: {
                days: taskDetails.attributes.duration.days,
                hours: taskDetails.attributes.duration.hours,
                minutes: taskDetails.attributes.duration.minutes
              },
             };
             let data = await this.updateSameDayAsPrevTask(updateTaskParams
             );
          }
         }
      }
      this.$emit('on-milestone-task-update', true)
    },
    async callDeleteMilestone() {
      await this.deleteMilestone(this.milestoneSelected)
      this.$emit('on-milestone-task-update', true)
    },
    goToGeneralMenu() {
      this.$emit('navigate-to-general-menu')
    },
    getNumberLeadingZero(number) {
      return number < 10 ? '0' + number : number
    },
    getHours(milestone, value) {
      const h =
        typeof milestone === 'number'
          ? milestone
          : this.getTotalTaskHours(milestone)
      const m =
        typeof milestone === 'number'
          ? value
          : this.getTotalTaskMinutes(milestone)
      return h
    },
    getMinutes(milestone, value) {
      const h =
        typeof milestone === 'number'
          ? value
          : this.getTotalTaskHours(milestone)
      const m =
        typeof milestone === 'number'
          ? milestone
          : this.getTotalTaskMinutes(milestone)
      if (h > 0 && m > 0) {
        return m < 10 ? '0' + m : m
      } else {
        return m
      }
    },
    getLabel(number, value) {
      const h =
        typeof number === 'number' ? number : this.getTotalTaskHours(number)
      const m =
        typeof number === 'number' ? number : this.getTotalTaskMinutes(number)
      if (value === 'min') {
        return m < 2 ? ' min' : 'mins'
      } else {
        return h < 2 ? ' hr' : 'hrs'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.q-mt-32 {
  margin-top: 32px;
}
.q-mb-10 {
  margin-bottom: 10px;
}
.milestone-bottom {
  margin-bottom: 16px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 8px !important;
  }
}
.milestone-active {
  border: 2px solid #8ba8f7;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 4px #e8eefd;
  border-radius: 8px;
}
.milestone-drag-style {
  margin-top: 8px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 20px;
  }
}
.milestone-section-style {
  min-width: auto !important;
  padding-right: 24px !important;
  justify-content: start !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 20px 0px;
    padding-right: 8px !important;
  }
}
.milestone-content {
  padding: 0px 24px;
  margin-top: 24px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 0px 16px;
  }
}
.order-icon-style {
  min-width: 32px;
  height: 32px;
  background: $lavenderBlue1;
  border: 4px solid #e8eefd;
  border-radius: 32px;
}
.add-media-content {
  height: 56px;
  border: 2px dashed $lavenderBlue1;
  border-radius: 8px;
  width: 100%;
}
.input-margin {
  margin-bottom: 32px;
}
::v-deep {
  .input-style {
    height: 44px;
    padding-left: 14px;
    padding-right: 14px;
    .q-field__native {
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 24px !important;
    }
    .q-field__control,
    .q-field__marginal {
      height: 43px;
    }
    .q-field--auto-height,
    .q-field__native {
      min-height: 0px;
    }
  }
  .description-input-style {
    padding-left: 14px;
    padding-right: 14px;
    .q-field__native {
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 24px !important;
      padding: 6px 0px;
    }
    .q-field__control,
    .q-field__marginal {
      text-area {
        height: auto;
      }
    }
    .q-field--auto-height,
    .q-field__native {
      min-height: 0px;
    }
  }
  .add-media-content .q-icon {
    margin-right: 8px;
    color: $primary;
    font-size: 24px;
  }
  .milestone-list {
    border: 2px solid #e8edf2 !important;
    border-radius: 8px !important;
    .q-item {
      padding: 16px 16px 16px 16px !important;
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 8px 15px 8px 15px !important;
      }
      .q-item__section--main ~ .q-item__section--side {
        padding-left: 0px !important;
        .q-icon {
          font-size: 0px !important;
        }
      }
    }
  }
  .milestone-item-side {
    justify-content: start !important;
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding-top: 14px !important;
      padding-bottom: 14px !important;
    }
  }
  .cancel-btn {
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    .q-btn__wrapper {
      padding: 6px 20px !important;
      border: 2px solid $primary;
    }
  }
  .save-milestone-btn {
    border-radius: 5px;
    .q-btn__wrapper {
      padding: 8px 20px !important;
    }
  }
  .save-btn {
    border-radius: 10px;
    margin-top: 40px;
    width: 200px;
    height: 50px;
    .q-btn__wrapper {
      padding: 10px 30px !important;
    }
  }
  .scroll {
    overflow: unset;
  }
}
.task-background {
  padding: 12px 24px 12px 8px;
  background: $solitudeBlue;
  border: 2px solid $solitudeBlue;
  border-radius: 4px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 12px 16px 12px 8px !important;
  }
}
.new-task-btn {
  height: 56px;
  padding: 16px 24px;
  background: #e8eefd;
  border: 2px dashed $lavenderBlue1;
  border-radius: 8px;
}
.new-milestone-btn {
  height: 64px;
  padding: 20px 24px;
  background: #e8eefd;
  border: 2px dashed $lavenderBlue1;
  border-radius: 8px;
}

.delete-account-popup {
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
  padding: 30px 0px 8px 0;
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
    width: 85%;
    margin-left: 17.91px;
    @media screen and (max-width: 490px) {
      width: 77%;
      line-height: 20px;
      padding-top: 15px;
    }
  }
}
.delete-milestone-btn {
  padding-top: 4px;
  padding-bottom: 4px;
  width: 200px;
  height: 50px;
  background: $primary;
  border-radius: 10px;
  @media screen and (max-width: 490px) {
    width: 100%;
    margin-left: 0 !important;
    margin-bottom: 16px;
  }
}
.delete-task-btn {
  padding-top: 4px;
  padding-bottom: 4px;
  width: 176px;
  height: 50px;
  background: $primary;
  border-radius: 10px;
  @media screen and (max-width: 490px) {
    width: 100%;
    margin-left: 0 !important;
    margin-bottom: 16px;
  }
}
.cancel-delete-btn {
  height: 50px;
  width: 118px;
  border: 2px solid $primary;
  color: $primary !important;
  border-radius: 10px;
  border-width: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  @media screen and (max-width: 490px) {
    width: 100%;
  }
}
.video-edit-after-upload {
  position: absolute;
  top: 0px;
  right: 0px;
}
.delete-mile-padd {
  // padding-top: 20px !important;
  padding-left: 20px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    // padding-top: 30px !important;
    padding-left: 15px;
  }
}
.q-px-0 {
  padding-left: 0;
  padding-right: 0;
}

.q-expansion-item.q-expansion-item--collapsed.milestone-content-container {
  ::v-deep {
    .q-item {
      border: 2px solid #e8edf2;
      border-radius: 4px;
    }
  }
}
</style>
