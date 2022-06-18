<template>
  <q-card class="task-popup bg-white">
    <q-img
      src="~assets/closepopup.svg"
      width="30px"
      height="30px"
      class="close-icon cursor-pointer"
      @click="onTaskPopupClose"
    />
    <div
      class="scroll-area"
      style="margin-top: 30px;"
      :style="$q.screen.gt.sm ? 'padding-right : 30px' : 'padding-right : 15px'"
    >
      <div class="f-w-600 task-heading text-black q-mb-sm header-letterspace">
        {{ taskPopupType == 'add' ? 'Add new task' : 'Edit task' }}
      </div>
      <div class="f-w-500 text-body1 text-comet subtitle-letterspace">
        {{
          taskPopupType == 'add'
            ? 'Create a new task below. Please be specific.'
            : 'Use the fields below to make changes to your blooprint’s task'
        }}
      </div>
      <div
        class="f-w-500 text-body1 subtitle-letterspace text-regalBlue milestone-name word-break-break-word"
      >
        {{ milestoneSelected['attributes']['name'] }}
      </div>
      <div class="task-details row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="f-w-600 text-body1 subtitle-letterspace text-regalBlue">
            Task name
            <span class="text-errorColor">*</span>
          </div>
          <q-input
            placeholder="Enter the name of your task..."
            class="border-input-field subtitle-letterspace input-style q-mt-xs input-margin q-pb-none"
            type="text"
            borderless
            ref="taskName"
            v-model.trim="taskName"
            :rules="[val => (val && val.length > 0) || 'Task name is required']"
          />
        </div>
      </div>
      <div style="margin:20px 0;">
        <div class="f-w-600 text-fs-16 text-lh-24 text-regalBlue">
          Task length
          <span class="text-errorColor">*</span>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              ref="taskDays"
              class="border-input-field input-style2 q-mt-xs"
              borderless
              :dropdown-icon="`img:${dropDownIcon}`"
              :options="taskDaysList"
              v-model="taskDay"
              :stack-label="false"
              fill-input
              emit-value
              map-options
              transition-hide="fade"
              transition-show="fade"
              behavior="menu"
              input-debounce="0"
            >
            </q-select>
            <span
              style="margin-top:4px; display: block;"
              class="f-w-500 text-fs-16 text-lh-24 text-regalBlue"
              :class="[$q.screen.lt.md ? 'q-mb-sm' : '']"
              >Days</span
            >
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              ref="taskHour"
              class="border-input-field input-style2 q-mt-xs"
              borderless
              :dropdown-icon="`img:${dropDownIcon}`"
              :options="taskHoursList"
              v-model="taskHour"
              :stack-label="false"
              fill-input
              emit-value
              map-options
              transition-hide="fade"
              transition-show="fade"
              behavior="menu"
              input-debounce="0"
            >
            </q-select>
            <span
              style="margin-top:4px; display: block;"
              class="f-w-500 text-fs-16 text-lh-24 text-regalBlue"
              :class="[$q.screen.lt.md ? 'q-mb-sm' : '']"
              >Hours</span
            >
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              ref="taskMinutes"
              class="border-input-field input-style2 q-mt-xs"
              borderless
              :dropdown-icon="`img:${dropDownIcon}`"
              :options="taskMinutesList"
              v-model="taskMinutes"
              :stack-label="false"
              fill-input
              emit-value
              map-options
              transition-hide="fade"
              transition-show="fade"
              behavior="menu"
              input-debounce="0"
            >
            </q-select>
            <span
              style="margin-top:4px; display: block;"
              class="f-w-500 text-fs-16 text-lh-24 text-regalBlue"
              >Minutes</span
            >
          </div>
        </div>
        <q-toggle
          class="q-mt-20 f-w-500 text-fs-16 text-lh-24"
          v-model="value"
          label="Include in same day as previous task"
          v-if="taskCount != 0"
        />
      </div>
      <div
        class="f-w-600 q-mb-xs text-body1 subtitle-letterspace"
        :style="$q.screen.gt.sm ? 'margin-top:20px' : 'margin-top: 24px'"
      >
        Build your task
      </div>
      <div
        class="f-w-500 text-body1 subtitle-letterspace q-mb-md-lg q-mb-sm-md q-mb-xs-md text-comet"
      >
        Drag and drop any media or attachments needed for this task.
      </div>
      <div>
        <draggable
          :list="draggedFieldsList"
          group="people"
          @change="onFieldPositionChange"
          handle=".handle"
        >
          <div
            class="list-group-item"
            v-for="(element, index) in draggedFieldsList"
            :key="index"
          >
            <div class="row q-my-sm">
              <div class="full-width col" v-if="element.type == 'text'">
                <Ckeditor
                  :markup="element.value"
                  @setIndex="setIndexOfTaskModel(index)"
                  @updateMarkup="updateMarkup"
                ></Ckeditor>
              </div>

              <div class="full-width col" v-if="element.type == 'video'">
                <FileUpload
                  :model="element.model"
                  label="Upload Video"
                  accept=".mp4, .mov"
                  fileType="video"
                  :elementData="element"
                  icon="img:video.svg"
                  :index="index"
                />
                <div class="text-dimGrey q-mt-sm text-fs-14-lh-20">
                  <div>Allowed type: .mp4, .mov, .MOV, Max size: 400 MB</div>
                </div>
              </div>
              <div class="full-width col" v-if="element.type == 'image'">
                <FileUpload
                  :model="element.model"
                  label="Upload Image"
                  accept=".jpg, .jpeg, .png"
                  fileType="image"
                  :elementData="element"
                  icon="img:image.svg"
                  :index="index"
                />
                <div class="f-w-500 q-mt-sm text-comet text-fs-14-lh-20">
                  <div>Recommended dimensions: 1280 x 720</div>
                  <div>Allowed types: jpg, jpeg, png</div>
                </div>
              </div>
              <div class="full-width col" v-if="element.type == 'audio'">
                <FileUpload
                  :model="element.model"
                  label="Upload Audio"
                  accept=".mp3"
                  fileType="audio"
                  :elementData="element"
                  icon="img:mic.svg"
                  :index="index"
                />
                <div class="f-w-500 q-mt-sm text-comet text-fs-14-lh-20">
                  <div>Allowed type: mp3, Max size: 400 MB</div>
                </div>
              </div>
              <div class="full-width col" v-if="element.type == 'attachment'">
                <FileUpload
                  :model="element.model"
                  label="Upload Pdf"
                  accept=".pdf"
                  fileType="attachment"
                  :elementData="element"
                  icon="img:paperclip.svg"
                  :index="index"
                  @on-fileUpload="onAttachmentUpload"
                />
                <div class="f-w-500 q-mt-sm text-comet text-fs-14-lh-20">
                  <div>Allowed types: pdf, doc, docx, xls, xlsx</div>
                </div>
              </div>
              <div class="full-width col" v-if="element.type == 'divider'">
                <q-separator color="blue" class="q-my-md" />
              </div>
              <div class="column q-pl-sm">
                <q-img
                  class="handle cursor-pointer"
                  src="~assets/taskDrag.svg"
                />
                <q-img
                  @click="removeItem(element)"
                  src="~assets/deletepicture.svg"
                  width="24px"
                  height="24px"
                  class="q-mt-md cursor-pointer"
                />
              </div>
            </div>
          </div>
        </draggable>
        <div
          v-if="showMediaOptions"
          class="row q-pa-md q-py-lg back-fill q-gutter-md rightMargin flex flex-center"
          style="border-bottom: 1px solid #F0F0F0"
        >
          <span class="text-body2 text-grey">
            Drag your preferred media widgets above to build your task content
          </span>
        </div>
      </div>
      <div
        class="q-mt-sm  align-center add-media justify-center cursor-pointer"
        :class="showMediaOptions ? 'bg-white' : ''"
      >
        <div
          class="flex flex-center"
          @click="toggleMediaOption"
          :style="
            showMediaOptions ? 'margin-bottom:24px; padding-top:16px' : ''
          "
        >
          <q-img
            src="~assets/plus-square.svg"
            width="24px"
            height="24px"
            class="add-media-icon"
            v-if="!showMediaOptions"
          />
          <q-img
            v-else
            src="~assets/closemedia.svg"
            width="24px"
            height="24px"
            class="add-media-icon"
          />
          <div class="f-w-600 text-fs-16 text-lh-24 q-ml-sm">Add Media</div>
        </div>
        <q-slide-transition>
          <draggable
            v-if="showMediaOptions"
            :list="fieldsList"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="onFieldPositionChange"
            :move="onFieldsMove"
            class="q-mt-sm media-options row  text-regalBlue f-w-500 text-fs-14-lh-20"
          >
            <div
              class="media cursor-pointer"
              v-for="field in fieldsList"
              :key="field.type"
            >
              <q-icon size="20px" class="q-mb-xs" :name="field.icon" />
              <div>{{ field.label }}</div>
            </div>
          </draggable>
        </q-slide-transition>
      </div>
      <div
        class="buttons-section row reverse-wrap align-center justify-between"
      >
        <q-btn
          v-if="taskPopupType == 'add'"
          label="Cancel"
          no-caps
          unelevated
          @click="onTaskPopupClose"
          class="bg-white subtitle-letterspace text-primary cancel-button f-w-600 text-fs-16 text-lh-24"
        />
        <q-btn
          v-if="taskPopupType == 'edit'"
          label="Delete"
          no-caps
          unelevated
          @click="onDeleteTaskClick"
          class="bg-white subtitle-letterspace text-primary delete-button f-w-600 text-fs-16 text-lh-24"
        >
          <div class="relative-position">
            <div style="margin-left: 11px; margin-bottom:2px">
              <q-img
                src="~assets/deletepicture.svg"
                width="24px"
                height="24px"
              />
            </div>
          </div>
        </q-btn>
        <q-btn
          label="Save Task"
          no-caps
          unelevated
          @click="onSaveTaskClick"
          class="bg-primary subtitle-letterspace text-white f-w-600 save-task-btn text-fs-16 text-lh-24"
        >
          <div class="relative-position">
            <div class="arrow" style="margin-left: 17px;margin-bottom: 2px">
              <q-img
                src="~assets/chevron-right.svg"
                width="6px"
                height="12px"
              />
            </div>
          </div>
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="showAlert" persistent>
      <alert-popup
        @close-popup="val => (showAlert = val)"
        :requestFrom="'createTask'"
        @onConfirm="onConfirm()"
      />
    </q-dialog>
  </q-card>
</template>

<script>
import draggable from 'vuedraggable'
import Ckeditor from 'components/Ckeditor'
import FileUpload from 'components/FileUpload.vue'
import { mapActions, mapGetters } from 'vuex'
import AlertPopup from './AlertPopup.vue'
import { Notify } from 'quasar'
import TaskCreationScreenVue from 'src/pages/TaskCreationScreen.vue'

export default {
  data() {
    return {
      value: false,
      dropDownIcon: require('../assets/chevron-down-black.svg'),
      showMediaOptions: false,
      taskDaysList: [],
      taskHoursList: [],
      taskMinutesList: [],
      taskName: '',
      taskDay: 1,
      taskHour: 0,
      taskMinutes: 0,
      showAlert: false,
      savedTaskDetails: {},
      initialTaskDetails: {},
      draggedFieldsList: [],
      testList: [],
      fieldsList: [
        {
          type: 'text',
          label: 'Text',
          value: '',
          id: 'text',
          order: 0,
          model: '',
          icon: 'img:align-left.svg'
        },
        {
          type: 'video',
          label: 'Video',
          value: '',
          id: 'video',
          order: 0,
          model: '',
          icon: 'img:video.svg'
        },
        {
          type: 'image',
          label: 'Image',
          value: '',
          id: 'image',
          order: 0,
          model: '',
          icon: 'img:image.svg'
        },
        {
          type: 'audio',
          label: 'Audio',
          value: '',
          id: 'audio',
          order: 0,
          model: '',
          icon: 'img:mic.svg'
        },
        {
          type: 'attachment',
          label: 'Attach',
          value: '',
          id: 'attachment',
          order: 0,
          model: '',
          attachmentName: '',
          icon: 'img:paperclip.svg'
        },
        {
          type: 'divider',
          label: 'Divider',
          value: 'true',
          id: 'divider',
          order: 0,
          model: 'true',
          icon: 'img:divide-square.svg'
        }
      ]
    }
  },
  components: {
    draggable,
    FileUpload,
    Ckeditor,
    AlertPopup
  },
  props: ['milestoneSelected', 'taskPopupType', 'taskSelected','taskCount'],
  computed: {
    ...mapGetters(['fileUrl'])
  },
  watch: {
    fileUrl(data) {
      if (data) {
        if (this.draggedFieldsList[data['index']] !== undefined) {
          this.draggedFieldsList[data['index']].model = data['url']
        }
      }
    }
  },
  mounted() {
    for (let i = 0; i <= 30; i++) {
      this.taskDaysList.push({
        label: i,
        value: i
      })
    }
    for (let i = 0; i <= 23; i++) {
      this.taskHoursList.push({
        label: i,
        value: i
      })
    }
    for (let i = 0; i <= 59; i++) {
      this.taskMinutesList.push({
        label: i,
        value: i
      })
    }
    if (this.taskPopupType == 'edit') {
      this.fetchTaskDetails()
    }
  },
  methods: {
    ...mapActions([
      'createTask',
      'updateTask',
      'setLoading',
      'retrieveTaskDetails'
    ]),
    async fetchTaskDetails() {
      this.setLoading(true)
      let params = {
        milestoneID: this.milestoneSelected.id,
        taskID: this.taskSelected.id
      }
      let data = await this.retrieveTaskDetails(params)
      this.setLoading(false)
      if (data['id']) {
        this.savedTaskDetails = data
        this.initialTaskDetails = JSON.parse(JSON.stringify(data))
        this.taskName = data['attributes']['name']
        this.taskDay = data['attributes']['duration']['days']
        this.taskHour = data['attributes']['duration']['hours']
        this.taskMinutes = data['attributes']['duration']['minutes']
        this.value = data['attributes']['startsSameDayAsPrevTask']
        if (data['attributes']['fields']) {
          data['attributes']['fields'].forEach((fieldItem, index) => {
            let item = {
              type: fieldItem.type,
              value: fieldItem.value,
              id: fieldItem.type + index,
              order: fieldItem.order,
              model: fieldItem.value
            }
            this.draggedFieldsList.push(item)
            this.testList.push(item)
          })
        }
      }
    },
    toggleMediaOption() {
      this.showMediaOptions = !this.showMediaOptions
    },
    // ************** Triggers when the Parent Elements are moved ************************
    onFieldsMove: function(event) {
      return true
    },
    // ***************** Triggers on Field Drag and Drop ********************************
    onFieldPositionChange: function(event) {
      if (event.added) {
        this.onFieldDropped(event)
      }
    },
    // **************** Triggers when Parent field is dropped *******************************
    onFieldDropped(event) {
      this.draggedFieldsList = []
      let filterList = this.testList.filter(
        item => item.type == event.added.element.type
      )
      if (this.testList.length == 0) {
        // *************** When List is empty *********************************
        this.testList.push({
          type: event.added.element.type,
          value: event.added.element.value,
          id: event.added.element.id + (filterList.length + 1),
          order: 0,
          model: event.added.element.value
        })
      } else {
        // *************** When items are present in the List *********************************
        this.testList.splice(event.added.newIndex, 0, {
          type: event.added.element.type,
          value: event.added.element.value,
          id: event.added.element.id + (filterList.length + 1),
          order: 0,
          model: event.added.element.model
        })
      }
      this.draggedFieldsList = this.testList
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      let indexList = []

      // ************** Fetch the dupliacte fields index position *********************************
      this.draggedFieldsList.forEach((item, index) => {
        if (!numbers.includes(Number(item['id'][item['id'].length - 1]))) {
          indexList.push(index)
        }
      })
      // *********** Removing the duplicate fields from the List ***********************
      for (let i = indexList.length - 1; i >= 0; i--) {
        this.draggedFieldsList.splice(indexList[i], 1)
      }
    },
    updateMarkup(val) {
      this.draggedFieldsList[this.indexOfTaskModel].value = val
    },
    setIndexOfTaskModel(index) {
      this.indexOfTaskModel = index
    },
    onAttachmentUpload(event) {
      this.draggedFieldsList.forEach(item => {
        if (item['id'] == event.id) {
          item['attachmentName'] = event.attachmentName
        }
      })
    },
    // ******************** Triggers when delete Icon is clicked *****************************
    removeItem(item) {
      if (item['value'] == 'video') {
        item['model'] = ''
      } else if (item['value'] == 'audio') {
        item['model'] = ''
      } else if (item['value'] == 'image') {
        item['model'] = ''
      } else if (item['value'] == 'attachment') {
        item['model'] = ''
      }
      this.draggedFieldsList = this.draggedFieldsList.filter(
        data => data.id != item.id
      )
      this.testList = this.testList.filter(data => data.id != item.id)
    },
    fetchTaskOrder() {
      let order = 1
      this.milestoneSelected.attributes.tasks.map(item => {
        let currentOrder = item['order']
        if (order <= currentOrder) {
          order = currentOrder + 1
        }
      })
      return order
    },
    async onSaveTaskClick() {
      this.$refs.taskName.validate()
      this.$refs.taskDays.validate()
      if (this.taskDay <= 0 && this.taskHour <= 0 && this.taskMinutes <= 0) {
        this.$q.notify({
          type: 'negative',
          message: "Task length can't be empty",
          position: 'top',
          textColor: 'white'
        })
        return
      }
      if (this.$refs.taskName.hasError || this.$refs.taskDays.hasError) {
      } else {
        let fields = []
        this.draggedFieldsList.forEach((item, index) => {
          item['order'] = index + 1
          let val = ''
          if (item.type == 'text') {
            val = item.value
          } else {
            val = item.model
          }
          if (val && val != '') {
            let fieldItem = {
              type: item.type,
              order: item.order,
              value: val
            }
            fields.push(fieldItem)
          }
        })
        if (this.taskPopupType == 'add') {
          let params = {
            milestoneID: this.milestoneSelected.id,
            name: this.taskName,
            days: this.taskDay,
            order: this.fetchTaskOrder(),
            fields: fields,
            duration: {
              days: this.taskDay,
              hours: this.taskHour,
              minutes: this.taskMinutes
            },
            startsSameDayAsPrevTask: this.value
          }
          this.setLoading(true)
          let data = await this.createTask(params)
          this.setLoading(false)
          if (data) {
            this.$emit('on-task-popup-close', {
              isCreatedOrUpdated: true,
              response: data
            })
          }
        } else {
          let params = {
            milestoneID: this.milestoneSelected.id,
            taskID: this.savedTaskDetails.id,
            name: this.taskName,
            days: this.taskDay,
            order: this.savedTaskDetails.attributes.order,
            fields: fields,
            duration: {
              days: this.taskDay,
              hours: this.taskHour,
              minutes: this.taskMinutes
            },
            startsSameDayAsPrevTask: (this.taskCount == 0) ? false : this.value
          }
          this.setLoading(true)
          let data = await this.updateTask(params)
          this.setLoading(false)
          if (data) {
            this.$emit('on-task-popup-close', {
              isCreatedOrUpdated: true,
              response: data
            })
          }
        }
      }
    },
    onTaskPopupClose() {
      // this.$emit('on-task-popup-close', {
      //   isCreatedOrUpdated: false
      // })
      if (this.savedTaskDetails && this.savedTaskDetails.attributes) {
        if (this.savedTaskDetails.attributes.fields) {
          if (
            this.savedTaskDetails.attributes.name != this.taskName ||
            this.savedTaskDetails.attributes.days != this.taskDay ||
            JSON.stringify(this.savedTaskDetails.attributes.fields) !=
              JSON.stringify(
                this.testList.map(el => {
                  return { type: el.type, value: el.value, order: el.order }
                })
              ) ||
            JSON.stringify(
              this.testList.map(el => {
                return { type: el.type, value: el.value, order: el.order }
              })
            ) !=
              JSON.stringify(
                this.draggedFieldsList.map(el => {
                  return { type: el.type, value: el.value, order: el.order }
                })
              )
          ) {
            this.showAlert = true
          } else {
            this.onConfirm()
          }
        } else {
          if (
            this.savedTaskDetails.attributes.name != this.taskName ||
            this.savedTaskDetails.attributes.days != this.taskDay ||
            JSON.stringify(
              this.testList.map(el => {
                return { type: el.type, value: el.value, order: el.order }
              })
            ) !=
              JSON.stringify(
                this.draggedFieldsList.map(el => {
                  return { type: el.type, value: el.value, order: el.order }
                })
              )
          ) {
            this.showAlert = true
          } else {
            this.onConfirm()
          }
        }
      } else {
        if (
          this.testList.length > 0 ||
          this.draggedFieldsList.length > 0 ||
          this.taskName != '' ||
          this.taskDay != 1
        ) {
          this.showAlert = true
        } else {
          this.onConfirm()
        }
      }
    },
    onDeleteTaskClick() {
      this.$emit('on-delete-task-click', true)
    },
    onConfirm() {
      this.showAlert = false
      this.$emit('on-task-popup-close', {
        isCreatedOrUpdated: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.task-heading {
  font-size: 32px;
  line-height: 36px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 24px;
    line-height: 28px;
  }
}
.task-popup {
  width: 70%;
  min-width: 80vh;
  max-width: 80vh;
  padding: 30px 0px 30px 22px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px !important;
  overflow-y: hidden;
  @media only screen and (max-width: $breakpoint-xl-max) {
    max-width: 60vh;
    min-width: 60vh;
  }
  @media only screen and (max-width: $breakpoint-lg-max) {
    max-width: 90vh;
    min-width: 60vh;
  }
  @media only screen and (max-width: $breakpoint-md-max) {
    max-width: 90vh;
    min-width: 60vh;
  }
  @media only screen and (max-width: 1400px) {
    max-width: 90vh;
    min-width: 50vh;
  }
  @media only screen and (max-width: 1130px) {
    max-width: 90vh;
    min-width: 45vh;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 15px 0px 15px 7px;
    border-radius: 0px !important;
    overflow-y: auto;
  }
}
.close-icon {
  position: absolute;
  top: 30px;
  right: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    top: 15px;
    right: 15px;
  }
}
.milestone-name {
  background: #e8edf2;
  border-radius: 8px !important;
  margin-top: 20px;
  padding: 10px 14px;

  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
    margin-top: 16px;
  }
}

.task-details {
  margin-top: 20px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: flex;
    flex-direction: column;
  }
}
.scroll-area {
  max-height: 75vh !important;
  overflow-y: auto !important;
  padding: 0px 30px 0px 8px;
  &::-webkit-scrollbar-track {
    margin: 0px 0px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-height: none !important;
    padding: 0px 50px 0px 8px;
  }
}
::v-deep {
  .input-style {
    height: 44px;
    padding-left: 14px;
    padding-right: 14px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      width: auto;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: auto;
    }
    .q-field__native {
      padding: 0px !important;
      font-weight: 500;
      margin: 10px 0px;
      font-size: 16px !important;
      line-height: 24px !important;
      height: 24px;
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

  .input-style2 {
    width: 95%;
    height: 44px;
    padding-left: 14px;
    padding-right: 14px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      width: auto;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: auto;
    }
    .q-field__native {
      padding: 0px !important;
      font-weight: 500;
      margin: 10px 0px;
      font-size: 16px !important;
      line-height: 24px !important;
      height: 24px;
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
}
.task-description {
  min-height: 120px;
  width: 566px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 90%;
    max-width: 90vw;
    //width: max-content;
  }
  @media only screen and (max-width: 620px) and (min-width: 600px) {
    width: 90%;
    max-width: 87vw;
    //width: max-content;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90%;
    max-width: 85vw;
  }
  @media only screen and (max-width: 414px) and (min-width: 379px) {
    width: 90%;
    max-width: 80vw;
  }
  @media only screen and (max-width: 378px) and (min-width: 300px) {
    width: 90%;
    max-width: 77vw;
    min-width: 5vw;
  }
}

.add-media {
  padding: 16px 16px;
  background: #e8eefd;
  border: 2px dashed #b9cbfb;
  border-radius: 8px !important;
}
.add-media:hover {
  .add-media-icon {
    transition: transform 0.5s ease-in;
    transform: scale(1.2);
  }
}

.buttons-section {
  margin-top: 40px;
  margin-bottom: 4px;
}
::v-deep {
  .cancel-button {
    width: 118px;
    height: 50px;
    border: 2px solid $primary;
    box-sizing: border-box;
    border-radius: 10px;
    .q-btn__wrapper {
      .q-btn__content {
        @media only screen and (max-width: $breakpoint-sm-max) {
          margin-bottom: 4px !important;
        }
      }
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      margin-left: auto;
      margin-right: auto;
      width: 60%;
      height: 40px;
      border-radius: 5px;
      margin-bottom: 16px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 100%;
    }
  }
  .delete-button {
    width: 144px;
    height: 50px;
    border: 2px solid $primary;
    box-sizing: border-box;
    border-radius: 10px;
    .q-btn__wrapper {
      .q-btn__content {
        @media only screen and (max-width: $breakpoint-sm-max) {
          margin-bottom: 4px !important;
        }
      }
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      margin-left: auto;
      margin-right: auto;
      width: 60%;
      height: 40px;
      border-radius: 5px;
      margin-bottom: 16px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 100%;
    }
  }
}

.save-task-btn {
  border-radius: 10px;
  width: 164px;
  height: 50px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    height: 40px;
    border-radius: 5px;
    margin-bottom: 16px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
  }
}
.media {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e8eefd;
  border: 1px solid #b9cbfb;
  border-radius: 8px;
  padding: 16px 0px;
  // width: 93px;
  height: 76px;
  // @media only screen and (max-width: $breakpoint-sm-max) {
  //      width: 109.67px;
  //  }
}

.media-options {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 8px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    grid-template-columns: repeat(3, 1fr);
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  margin: 30px 0px !important;
}
.q-mt-20 {
  margin-top: 20px;
}
</style>
