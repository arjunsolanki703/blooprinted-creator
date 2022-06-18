<template>
  <div class="flex  column ">
    <div class="full-width">
      <q-btn
        color="primary"
        size="14px"
        class="q-mr-md createBtn"
        text-color="white"
        label="Create Blooprint"
        no-caps
        align="left"
        @click="onBackClick()"
      />
    </div>
    <div
      class="full-width"
      style="max-width: -moz-available; max-width: -webkit-fill-available;"
    >
      <div v-if="this.isLoading">
        <template>
          <div class="q-pa-lg">
            <q-markup-table class="q-pa-lg">
              <thead>
                <tr>
                  <th class="text-left" style="width:30%">
                    <q-skeleton animation="blink" type="text" height="50px" />
                  </th>
                  <th class="text-right " style="width:70%">
                    <q-skeleton animation="blink" type="text" height="50px" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in 5" :key="n">
                  <td class="text-left" style="width:30%">
                    <q-skeleton animation="blink" type="text" height="50px" />
                  </td>
                  <td class="text-right" style="width:70%">
                    <q-skeleton animation="blink" type="text" height="50px" />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </template>
      </div>
      <q-table
        v-else
        :data="data"
        :columns="columns"
        row-key="name"
        :separator="separator"
        :pagination="pagination"
        no-data-label="Click on + sign to add new milestone."
        hide-pagination
        class="tableBorder"
      >
        <template v-slot:no-data="{ message }">
          <div class="full-width row text-grey text-body2 q-gutter-sm">
            <span>
              {{ message }}
            </span>
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-primary text-left "
              :style="
                col.name == 'milestone'
                  ? 'min-width:300px; width:300px; height:57px; padding-right:16px'
                  : ''
              "
            >
              <div>
                <span class="float-left text-black text-body2 q-py-xs">
                  {{ col.label }}
                </span>
                <q-btn
                  v-if="col.name == 'milestone'"
                  size="sm"
                  @click="addMilestone()"
                  color="accent"
                  round
                  dense
                  icon="add"
                  class="q-ml-md float-right"
                />
              </div>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" class="border-bottom">
            <q-td v-for="col in props.cols" :key="col.id" class="no-padding">
              <div
                v-if="col.id == 0"
                class="q-px-md text-body2 text-dimGrey border-bottom row justify-between"
                style="padding-top: 10px; padding-bottom: 8px;"
              >
                <div class="q-pt-sm wrap">
                  {{ props.row.attributes.name }}
                </div>
                <q-tooltip>
                  {{ props.row.attributes.name }}
                </q-tooltip>
                <div>
                  <span>
                    <q-tooltip
                      v-if="props.row.attributes.tasks.length >= 1"
                      class="bg-accent"
                      >please delete all tasks to delete milestone</q-tooltip
                    >
                    <q-btn
                      flat
                      size="md"
                      @click="onDeleteClick(props.row)"
                      :disable="
                        props.row.attributes.tasks.length >= 1 ? true : false
                      "
                    >
                      <q-img
                        src="~assets/delete.svg"
                        height="20px"
                        width="15px"
                      />
                    </q-btn>
                  </span>
                  <q-btn
                    v-if="props.row.type == 'blooprint milestones'"
                    size="sm"
                    color="accent"
                    round
                    dense
                    icon="add"
                    class="float-right q-mt-sm"
                    @click="addTask(props.row)"
                  />
                </div>
              </div>

              <!-- Dispaly lines -->
              <div v-else class="q-py-lg border-bottom full-width">
                <div
                  v-if="
                    col.id >= props.row.startDay && col.id <= props.row.endDay
                  "
                  class="bg-lime "
                  :class="
                    col.id == props.row.startDay || col.id == props.row.endDay
                      ? getMilestoneClass(col.id, props.row)
                      : 'barBorder'
                  "
                  style="height:6px;"
                >
                  <span v-if="col.id == props.row.startDay">
                    <q-icon size="6px" style="top:-2px; left:0;">
                      <img src="~assets/milestone-arrow-1.svg" width="100%" />
                    </q-icon>
                  </span>
                  <span
                    v-if="col.id == props.row.endDay"
                    style="position:absolute; right:0px"
                  >
                    <q-icon size="6px" style="top:-2px; right:0;">
                      <img
                        src="~assets/milestone-arrow-2.svg"
                        width="100%"
                      /> </q-icon
                  ></span>
                </div>
                <div v-else style="height:6px; width:100%;"></div>
              </div>
              <!-- Dispaly tasks -->
              <div>
                <table style="width: 100%; border-spacing: 0">
                  <tbody>
                    <q-tr
                      v-for="task in props.row.attributes.tasks"
                      :key="task.id"
                      style="width:100%"
                    >
                      <q-td
                        :class="
                          col.id == 0 && task.id == seletctRow
                            ? 'bg-purple cursor-pointer'
                            : 'cursor-pointer'
                        "
                        style="padding-left:0px; padding-right:0px;"
                      >
                        <div
                          v-if="col.id == 0"
                          class="  row justify-between q-pl-xl q-pr-md  text-body2"
                          :class="
                            col.id == 0 && task.id == seletctRow
                              ? 'text-white'
                              : 'text-dimGrey'
                          "
                          @click="onTaskSelect(task, props.row)"
                        >
                          <div class="wrap">
                            {{ task.name }}
                          </div>
                          <q-tooltip>
                            {{ task.name }}
                          </q-tooltip>
                          <div class="float-right">{{ task.days }} day</div>
                        </div>
                        <div
                          v-if="
                            col.id >= task.startDay && col.id <= task.endDay
                          "
                          class="bg-primary cursor-pointer"
                          :class="
                            col.id == task.startDay || col.id == task.endDay
                              ? getClass(col.id, task)
                              : 'barBorder'
                          "
                          style="height:20px;"
                          @click="onTaskSelect(task, props.row)"
                        />
                      </q-td>
                    </q-tr>
                  </tbody>
                </table>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <ConfirmationPopup
      v-if="confirmationPopup"
      :popupMsg="confirmPopupMsg"
      @on-confirm-popup-close="onConfirmationPopupClose"
    />
  </div>
</template>

<script>
import { constants } from 'src/utils/common'
import { mapActions } from 'vuex'
import ConfirmationPopup from './ConfirmationPopup.vue'
export default {
  name: 'BlooprintDetails',
  data() {
    return {
      colNumber: 15,
      separator: 'cell',
      pagination: {
        rowsPerPage: 0
      },
      columns: [],
      data: [],
      isLoading: false,
      seletctRow: 0,
      confirmationPopup: false,
      confirmPopupMsg: 'Are you sure you want to delete milestone?',
      deleteMilestoneData: null
    }
  },
  components: {
    ConfirmationPopup
  },
  props: ['isUpdated', 'removeSelection'],
  watch: {
    isUpdated: function(val) {
      this.getChartData()
    },
    removeSelection: function(val1) {
      this.seletctRow = 0
    }
  },
  mounted() {
    this.columns = this.getColumns()
    this.isLoading = true
    this.getChartData().then(() => {
      this.isLoading = false
    })
  },

  methods: {
    ...mapActions([
      'createMilestone',
      'createTask',
      'getMilestoneData',
      'deleteMilestone',
      'setToastMessage',
      'retrieveTaskDetails',
      'setLoading'
    ]),

    async getChartData() {
      let chartData = await this.getMilestoneData()
      if (chartData.length > 0) {
        chartData.forEach((element, index) => {
          // update milestone days
          element.days = this.getTotalDay(element)
          if (index == 0) {
            element.startDay = 1
            element.endDay = element.days
          } else {
            element.startDay = chartData[index - 1].endDay + 1
            if (element.days == 1) {
              element.endDay = element.startDay
            } else {
              element.endDay = element.startDay + (element.days - 1)
            }
          }
          // update tasks days
          if (element.attributes.tasks.length > 0) {
            let tasks = element.attributes.tasks
            tasks.forEach((task, index) => {
              if (index == 0) {
                task.startDay = element.startDay
              } else {
                task.startDay = tasks[index - 1].endDay + 1
              }
              if (task.days == 1) {
                task.endDay = task.startDay
              } else {
                task.endDay = task.startDay + (task.days - 1)
              }
            })
          }
        })
      }
      this.data = chartData
      let columnCount = 0
      chartData.forEach(item => {
        columnCount += item.days
      })

      if (columnCount >= this.colNumber) {
        this.colNumber = columnCount + 1
        this.columns = this.getColumns()
      } else if (columnCount < this.colNumber && this.colNumber > 15) {
        if (columnCount < 15) {
          this.colNumber = 15
        } else {
          this.colNumber = columnCount + 1
        }
        this.columns = this.getColumns()
      }
    },
    getTotalDay(row) {
      let tasksArray = row.attributes.tasks
      let daysCount = 0
      tasksArray.forEach(task => {
        daysCount += task.days
      })

      return daysCount
    },

    getColumns() {
      let totalColumns = this.colNumber
      let colData = [
        {
          id: 0,
          name: 'milestone',
          label: 'Milestone',
          field: 'milestone',
          sortable: false
        }
      ]
      for (let i = 1; i <= totalColumns; i++) {
        let col = {
          id: i,
          name: 'Day' + i,
          label: 'Day ' + i,
          field: 'Day' + i,
          sortable: false
        }
        colData.push(col)
      }
      return colData
    },
    getClass(col, task) {
      if (col == task.startDay && col == task.endDay) {
        return 'taskBarLeft taskBarRight'
      }
      if (col == task.startDay) {
        return 'taskBarLeft'
      }
      if (col == task.endDay) {
        return 'taskBarRight'
      }
    },
    getMilestoneClass(col, milestone) {
      if (col == milestone.startDay && col == milestone.endDay) {
        return 'milestoneBarLeft milestoneBarBarRight'
      }
      if (col == milestone.startDay) {
        return 'milestoneBarLeft'
      }
      if (col == milestone.endDay) {
        return 'milestoneBarRight'
      }
    },
    // **************************** Create Milestone ***************************
    async addMilestone() {
      this.setLoading(true)

      let milestoneList = this.data
      let newMilestoneName = ''
      let i = 1
      while (true) {
        newMilestoneName = 'Untitled Milestone ' + i++
        if (
          !this.nameAlreadyExist(newMilestoneName, milestoneList, 'milestone')
        ) {
          break
        }
      }

      let milestoneOrder = this.data.length + 1
      let mileStoneData = {
        name: newMilestoneName,
        order: milestoneOrder
      }
      let createdMilestone = await this.createMilestone(mileStoneData)

      let newTaskData = {
        milestoneID: createdMilestone.id,
        name: 'Untitled Task 1',
        days: 1,
        order: 1,
        fields: []
      }
      let createdTask = await this.createTask(newTaskData)
      this.getChartData()
      this.onTaskSelect(createdTask, createdMilestone)
      this.setLoading(false)
    },

    nameAlreadyExist(name, dataList, type) {
      if (type == 'task') {
        if (dataList.some(data => data.name == name)) {
          return true
        }
      } else if (type == 'milestone') {
        if (dataList.some(data => data.attributes.name == name)) {
          return true
        }
      }
    },

    // ************************** Create Task Method *********************
    async addTask(milestone) {
      this.setLoading(true)
      let taskList = milestone.attributes.tasks
      let newTaskName = ''
      let i = 1
      while (true) {
        newTaskName = 'Untitled Task ' + i++
        if (!this.nameAlreadyExist(newTaskName, taskList, 'task')) {
          break
        }
      }

      let newTaskData = {
        milestoneID: milestone.id,
        name: newTaskName,
        days: 1,
        order: milestone.attributes.tasks.length + 1,
        fields: []
      }
      let createdTask = await this.createTask(newTaskData)
      this.getChartData()
      this.onTaskSelect(createdTask, milestone)
      this.setLoading(false)
    },
    onBackClick() {
      this.$router.push({
        path: `/blooprint/${this.$router.history.current.params.blooprintId}/edit`
      })
    },
    onDeleteClick(milestone) {
      this.deleteMilestoneData = milestone
      this.confirmationPopup = true
    },
    onConfirmationPopupClose(event) {
      if (event['confirmStatus'] == 'yes') {
        this.clickDeleteMilestone(this.deleteMilestoneData)
      }
      this.confirmationPopup = false
    },
    // ************ Emit Data to the Parent When a Task is Selected ********************************
    async onTaskSelect(task, milestone) {
      this.setLoading(true)
      this.seletctRow = task.id

      let taskParams = {
        milestoneID: milestone.id,
        taskID: task.id
      }
      let taskData = await this.retrieveTaskDetails(taskParams)

      this.$emit('on-task-select', {
        taskSelected: taskData,
        show: true,
        milestone: milestone
      })
      this.setLoading(false)
    },
    async clickDeleteMilestone(milestone) {
      if (milestone.attributes.tasks.length > 0) {
        this.setToastMessage({
          type: 'negative',
          message: 'please delete all tasks to delete milestone'
        })
      } else {
        await this.deleteMilestone(milestone)
        this.deleteMilestoneData = null
        this.getChartData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.taskBarLeft {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  margin-right: -1px;
}
.taskBarRight {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  margin-left: -1px;
}
.milestoneBarRight {
  margin-left: -1px;
}
.milestoneBarLeft {
  margin-right: -1px;
}
.createBtn {
  width: 301px;
  height: 57px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.tableBorder {
  border-top-left-radius: 0px;
}
.barBorder {
  margin-right: -1px;
  margin-left: -1px;
}
.test {
  margin-right: -1px;
  margin-left: -1px;
}
.wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 190px;
}
tr:nth-child(even) {
  background-color: white;
}
</style>
