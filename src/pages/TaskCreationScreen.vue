<template>
  <div>
    <q-card class="dragDropCard">
      <q-card-section class="col items-center no-wrap">
        <draggable
          class="row"
          :list="fieldsList"
          :group="{ name: 'people', pull: 'clone', put: false }"
          @change="onFieldPositionChange"
          :move="onFieldsMove"
        >
          <div
            v-for="field in fieldsList"
            :key="field.type"
            class="col-2 text-center"
          >
            <q-icon size="xl" class="text-smalt border-class q-pa-sm ">
              <q-img
                v-if="field.type == 'text'"
                src="~assets/textIcon.svg"
                height="25px"
                width="32px"
              />
              <q-img
                v-if="field.type == 'image'"
                src="~assets/photographIcon.svg"
                height="25px"
                width="32px"
              />
              <q-img
                v-if="field.type == 'video'"
                src="~assets/videoIcon.svg"
                height="25px"
                width="32px"
              />
              <q-img
                v-if="field.type == 'audio'"
                src="~assets/audioIcon.svg"
                height="28px"
                width="19px"
              />
              <q-img
                v-if="field.type == 'attachment'"
                src="~assets/attachmentClipIcon.svg"
                height="29px"
                width="32px"
              />
              <q-img
                v-if="field.type == 'divider'"
                src="~assets/dividerIcon.svg"
                height="25px"
                width="32px"
              />
            </q-icon>

            <div class="text-grey text-capitalize text-caption text-center">
              {{ field.type }}
            </div>
          </div>
        </draggable>
        <q-separator
          color="#F0F0F0"
          class="q-my-md  q-gutter-x-md rightMargin"
        />
        <div class="col text-body1">
          <span
            style="word-wrap: break-word;"
            v-show="!mileStone.edit"
            @click="toggleEdit('mileStone')"
            >{{ mileStone.val }}</span
          >

          <q-input
            type="text"
            outlined
            ref="milestoneName"
            v-model.trim="mileStone.val"
            v-show="mileStone.edit"
            :rules="[val => !!val || '* Required']"
            @blur="updateTaskDetails('mileStone')"
          />
          <q-input
            type="text"
            outlined
            label="Milestone Description"
            v-model.trim="mileStone.description"
            v-show="mileStone.edit"
            @blur="updateTaskDetails('mileStone')"
          />
          <div>
            <q-icon
              class="float-right cursor-pointer q-pa-sm"
              @click="removeMilestoneVideo"
              v-if="mileStone.video"
            >
              <q-img
                height="17px"
                width="13px"
                src="~assets/deleteBtnIcon.svg"
              />
            </q-icon>

            <FileUpload
              :model="mileStone.video"
              label="Upload Video"
              accept=".mp4, .mov"
              fileType="video"
              icon="videocam"
            />
          </div>
          <q-btn label="Save Milestone" @click="onUpdateMilestone"> </q-btn>
        </div>

        <q-separator
          color="#F0F0F0"
          class=" q-my-md  q-gutter-x-md rightMargin"
        />
        <div class="row">
          <div class="col text-h6">
            <span
              style="word-wrap: break-word;"
              v-show="!taskName.edit"
              @click="toggleEdit('name')"
              >{{ taskName.val }}</span
            >

            <q-input
              ref="taskName"
              type="text"
              outlined
              v-model.trim="taskName.val"
              v-show="taskName.edit"
              :rules="[val => !!val || '* Required']"
              @blur="updateTaskDetails('name')"
            />
          </div>
          <div class="col text-right text-h6">
            <span v-show="!totalDays.edit" @click="toggleEdit('days')"
              >{{ totalDays.val }} days
            </span>
            <q-input
              ref="taskDays"
              type="number"
              min="1"
              outlined
              :rules="[
                val => !!val || '* Required',
                val => val > 0 || 'Days should be 1 or more'
              ]"
              v-model.trim="totalDays.val"
              v-show="totalDays.edit"
              @blur="updateTaskDetails('days')"
            />
          </div>
        </div>
        <q-separator
          color="#F0F0F0"
          class="q-my-md q-gutter-x-md rightMargin"
        />
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
              :key="element.id"
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
                    icon="videocam"
                    :index="index"
                  />
                </div>
                <div class="full-width col" v-if="element.type == 'image'">
                  <FileUpload
                    :model="element.model"
                    label="Upload Image"
                    accept=".jpg, .jpeg, .png"
                    fileType="image"
                    :elementData="element"
                    icon="photo_library"
                    :index="index"
                  />
                </div>
                <div class="full-width col" v-if="element.type == 'audio'">
                  <FileUpload
                    :model="element.model"
                    label="Upload Audio"
                    accept=".mp3"
                    fileType="audio"
                    :elementData="element"
                    icon="keyboard_voice"
                    :index="index"
                  />
                </div>
                <div class="full-width col" v-if="element.type == 'attachment'">
                  <FileUpload
                    :model="element.model"
                    label="Upload Pdf"
                    accept=".pdf"
                    fileType="attachment"
                    :elementData="element"
                    icon="picture_as_pdf"
                    :index="index"
                    @on-fileUpload="onAttachmentUpload"
                  />
                </div>
                <div class="full-width col" v-if="element.type == 'divider'">
                  <q-separator color="blue" class="q-my-md" />
                </div>
                <div
                  class="col-1 q-ml-sm border-class text-center text-smalt"
                  style="height:70px"
                >
                  <q-icon size="sm" class="handle q-pa-xs">
                    <q-img
                      height="18px"
                      width="20px"
                      src="~assets/draggable.svg"
                    />
                  </q-icon>
                  <q-separator color="#F0F0F0" />
                  <q-icon class="q-pa-sm" @click="removeItem(element)">
                    <q-img
                      height="17px"
                      width="13px"
                      src="~assets/deleteBtnIcon.svg"
                    />
                  </q-icon>
                </div>
              </div>
            </div>
            <div
              class="row q-pa-md q-py-lg back-fill q-gutter-md rightMargin flex flex-center"
              style="border-bottom: 1px solid #F0F0F0"
            >
              <span class="text-body2 text-grey">
                Drag your preferred media widgets above to build your task content
              </span>
            </div>
          </draggable>
        </div>
        <div class="q-pa-md q-gutter-sm row">
          <q-btn
            flat
            class="btns text-body1 text-smalt border-secondary"
            no-caps
            @click="onDeleteClick()"
          >
            <q-icon size="13px" class="q-mr-sm">
              <q-img src="~assets/deleteBtnIcon.svg" />
            </q-icon>
            <span>Delete</span>
          </q-btn>

          <q-btn
            v-if="draggedFieldsList.length > 0"
            @click="openDialog = true"
            flat
            class="btns text-smalt text-body1 border-secondary "
            no-caps
          >
            <q-icon size="21px" class="q-mr-sm">
              <q-img src="~assets/eyeIcon.svg" />
            </q-icon>
            <span>Preview</span>
          </q-btn>

          <q-btn
            @click="onSaveTask"
            flat
            class="btns text-body1 text-smalt border-secondary "
            no-caps
          >
            <q-icon size="15px" class="q-mr-sm">
              <q-img src="~assets/saveIcon.svg" />
            </q-icon>
            <span>Save</span>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-actions class="q-mt-xl">
        <q-btn
          flat
          no-caps
          @click="onCancelClick"
          class="text-smalt border-secondary text-body2 q-px-md closeBtn q-mt-xl"
        >
          Close
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-dialog v-model="openDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Preview</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div
            class="list-group-item"
            v-for="element in draggedFieldsList"
            :key="element.id"
          >
            <div class="row q-my-sm">
              <div class="full-width col" v-if="element.type == 'text'">
                {{ element.value }}
              </div>
              <div class="full-width col" v-if="element.type == 'video'">
                <q-file
                  v-if="element.model == ''"
                  outlined
                  readonly
                  v-model="element.model"
                  label="Upload Video"
                  accept=".mp4, .mov"
                  max-files="1"
                />
                <!-- <q-video
                  controls
                  :ratio="16 / 9"
                  v-else
                  id="video"
                  class="full-width"
                  :src="element.model"
                /> -->
                <video id="video" width="100%" height="300px" controls muted>
                  <source :src="element.model" type="video/mp4" />
                </video>
              </div>
              <div class="full-width col" v-if="element.type == 'image'">
                <q-file
                  v-if="element.model == ''"
                  outlined
                  readonly
                  label="Upload Image"
                  v-model="element.model"
                  accept=".jpg, .jpeg, .png"
                  max-files="1"
                />
                <q-img
                  v-else
                  id="image"
                  class="full-width"
                  :ratio="4 / 3"
                  :src="element.model"
                />
              </div>
              <div class="full-width col" v-if="element.type == 'audio'">
                <q-file
                  v-if="element.model == ''"
                  outlined
                  readonly
                  label="Upload Audio"
                  accept=".mp3"
                  v-model="element.model"
                  max-files="1"
                />
                <audio
                  controls
                  v-else
                  id="audio"
                  class="full-width"
                  :src="element.model"
                />
              </div>

              <div class="full-width col" v-if="element.type == 'attachment'">
                <!-- <q-input
                  readonly
                  outlined
                  :value="getFileName(element.model)"
                  autogrow
                /> -->
                <a target="_blank" :href="element.model">{{
                  getFileName(element.model)
                }}</a>
                <div></div>
              </div>
              <div class="full-width col" v-if="element.type == 'divider'">
                <q-separator color="blue" class="q-my-md" />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class=" bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <ConfirmationPopup
      v-if="confirmationPopup"
      :popupMsg="confirmPopupMsg"
      @on-confirm-popup-close="onConfirmationPopupClose"
    />
  </div>
</template>

<script>
import Ckeditor from 'src/components/Ckeditor'
import draggable from 'vuedraggable'
import FileUpload from '../components/FileUpload.vue'
import ConfirmationPopup from '../components/ConfirmationPopup.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    draggable,
    FileUpload,
    ConfirmationPopup,
    Ckeditor
  },
  data() {
    return {
      fieldsList: [
        {
          type: 'text',
          value: '',
          id: 'text',
          order: 0,
          model: ''
        },
        {
          type: 'video',
          value: '',
          id: 'video',
          order: 0,
          model: ''
        },
        {
          type: 'image',
          value: '',
          id: 'image',
          order: 0,
          model: ''
        },
        {
          type: 'audio',
          value: '',
          id: 'audio',
          order: 0,
          model: ''
        },
        {
          type: 'attachment',
          value: '',
          id: 'attachment',
          order: 0,
          model: '',
          attachmentName: ''
        },
        {
          type: 'divider',
          value: 'true',
          id: 'divider',
          order: 0,
          model: 'true'
        }
      ],
      draggedFieldsList: [],
      indexOfTaskModel: '',
      testList: [],
      openDialog: false,
      taskName: { val: this.taskSelected.attributes['name'], edit: false },
      totalDays: { val: this.taskSelected.attributes['days'], edit: false },
      mileStone: {
        val: this.milestoneSelected.attributes['name'],
        description: this.milestoneSelected.attributes['description'],
        video: this.milestoneSelected.attributes['video']
          ? this.milestoneSelected.attributes['video']
          : '',
        edit: false
      },
      confirmationPopup: false,
      confirmPopupMsg: 'Are you sure you want to delete task?'
    }
  },
  props: ['taskSelected', 'milestoneSelected'],
  computed: {
    ...mapGetters(['fileUrl'])
  },

  watch: {
    fileUrl(data) {
      if (data) {
        if (this.draggedFieldsList[data['index']] !== undefined) {
          this.draggedFieldsList[data['index']].model = data['url']
        } else {
          this.mileStone.video = data['url']
        }
      }
    }
  },
  mounted() {
    if (
      this.taskSelected.attributes.fields &&
      this.taskSelected.attributes.fields.length > 0
    ) {
      let taskFieldsArray = this.taskSelected.attributes.fields
      taskFieldsArray.forEach((fieldItem, index) => {
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
  },
  methods: {
    ...mapActions([
      'createTask',
      'updateTask',
      'updateMilestone',
      'deleteMilestoneTask'
    ]),
    getFileName(url) {
      let fileURL = url.substring(url.lastIndexOf('%2F') + 3, url.length)
      let fileName = fileURL.split('?alt')
      let decodedFileName = decodeURIComponent(fileName[0])
      return decodedFileName
    },
    onFileRejected(event) {
      this.setToastMessage({
        type: 'negative',
        message: 'File size should be less than 400 MB'
      })
    },
    updateMarkup(val) {
      this.draggedFieldsList[this.indexOfTaskModel].value = val
    },
    setIndexOfTaskModel(index) {
      this.indexOfTaskModel = index
    },
    onVideoUpload(event) {
      let videoAdded = event
      let fileName = videoAdded['name'].toLowerCase()
      this.blooprintData.promoVideo = null
      if (fileName.endsWith('mp4')) {
        let data = {
          file: videoAdded,
          type: 'video',
          from: 'blooprint/'
        }
        this.fileUploadToFirebase(data, 'video')
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Upload valid Video File'
        })
      }
    },
    onDeleteClick() {
      this.confirmationPopup = true
    },
    onConfirmationPopupClose(event) {
      if (event['confirmStatus'] == 'yes') {
        this.deleteTask()
      }
      this.confirmationPopup = false
    },

    onAttachmentUpload(event) {
      this.draggedFieldsList.forEach(item => {
        if (item['id'] == event.id) {
          item['attachmentName'] = event.attachmentName
        }
      })
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
    // ************** Triggers when the Parent Elements are moved ************************
    onFieldsMove: function(event) {
      return true
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
    // ******************** Triggers when milestone video delete Icon is clicked *****************************
    removeMilestoneVideo() {
      this.mileStone.video = ''
    },
    // ************ On Save Button click *****************************
    async onSaveTask() {
      this.$refs.taskName.validate()
      this.$refs.taskDays.validate()
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
        let updatedTask = {
          milestoneID: this.milestoneSelected.id,
          taskID: this.taskSelected.id,
          name: this.taskName.val,
          days: Number(this.totalDays.val),
          order: this.taskSelected.attributes.order,
          fields: fields
        }
        await this.updateTask(updatedTask)

        this.$emit('on-task-popup-close', {
          type: 'close'
        })
      }
    },
    // ************ On Cancel Button click *****************************
    onCancelClick() {
      this.$emit('on-task-popup-close', {
        type: 'close'
      })
    },
    // **************** On updating the Task Name and Days **************************
    toggleEdit(val) {
      if (val == 'name') {
        this.taskName.edit = !this.taskName.edit
      } else if (val == 'days') {
        this.totalDays.edit = !this.totalDays.edit
      } else if (val == 'mileStone') {
        this.mileStone.edit = !this.mileStone.edit
      }
    },
    async onUpdateMilestone() {
      let updatedMilestone = {
        type: 'blooprint milestones',
        attributes: {
          milestoneID: this.milestoneSelected.id,
          name: this.mileStone.val,
          order: this.milestoneSelected.attributes.order,
          video: this.mileStone.video,
          description: this.mileStone.description,
          duration: {
            days: this.milestoneSelected.attributes.days,
            hours: this.milestoneSelected.attributes.hours,
            minutes: this.milestoneSelected.attributes.minutes
          }
        }
      }
      await this.updateMilestone(updatedMilestone)
    },

    async updateTaskDetails(val) {
      if (val == 'mileStone') {
        this.$refs.milestoneName.validate()
        if (this.$refs.milestoneName.hasError) {
        } else {
          let updatedMilestone = {
            type: 'blooprint milestones',
            attributes: {
              milestoneID: this.milestoneSelected.id,
              name: this.mileStone.val,
              order: this.milestoneSelected.attributes.order,
              video: this.mileStone.video,
              description: this.mileStone.description
            }
          }
          await this.updateMilestone(updatedMilestone)
          this.toggleEdit(val)
          this.$emit('on-task-popup-close', {
            type: 'milestone'
          })
        }
      } else if (val == 'name' || val == 'days') {
        this.$refs.taskName.validate()
        this.$refs.taskDays.validate()
        if (this.$refs.taskName.hasError || this.$refs.taskDays.hasError) {
        } else {
          this.toggleEdit(val)
        }
      }
    },
    async deleteTask() {
      let deleteData = {
        milestoneID: this.milestoneSelected.id,
        taskID: this.taskSelected.id,
        taskName: this.taskSelected.attributes.name
      }
      await this.deleteMilestoneTask(deleteData)
      this.$emit('on-task-popup-close', {
        type: 'close'
      })
    }
  }
}
</script>
<style scoped>
.border-class {
  border: 1px solid #d8d8d8;
}
.back-fill {
  background: #f7f7f7;
  min-height: 100px;
}
.rightMargin {
  margin-right: -16px;
}
.daysInput {
  max-width: 50px;
}
.dragDropCard {
  min-height: 94vh;
  min-width: 500px;
  position: relative;
}
.btns {
  height: 40px;
  width: 155px;
}
.q-field__control {
  height: 140px !important;
}
.closeBtn {
  left: 34px;
  bottom: 20px;
  position: absolute;
}
</style>
