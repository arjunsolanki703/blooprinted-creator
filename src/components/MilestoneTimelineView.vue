<template>
  <div class="flex column">
    <div
      class="full-width"
      style="max-width: -moz-available; max-width: -webkit-fill-available;"
    >
      <div v-if="isLoading">
        <template>
          <div>
            <q-markup-table separator="cell" flat bordered>
              <thead>
                <tr>
                  <th class="text-left" style="width:40%">
                    <q-skeleton animation="blink" type="text" height="50px" />
                  </th>
                  <th class="text-right" v-for="i in 8" :key="i">
                    <q-skeleton animation="blink" type="text" height="50px" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="n in 8"
                  :key="n"
                  :class="n % 2 == 0 ? 'milestone-rows' : null"
                >
                  <td class="text-left" style="width:40%">
                    <q-skeleton animation="blink" type="text" height="50px" />
                    <q-skeleton animation="blink" type="text" height="50px" />
                  </td>
                  <td class="text-right" v-for="i in 8" :key="i">
                    <q-skeleton animation="blink" type="text" height="50px" />
                    <q-skeleton animation="blink" type="text" height="50px" />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </template>
      </div>
      <div
        v-if="tableRowsData.length === 0 && !isLoading"
        class="flex flex-center full-width q-py-xl q-px-md"
      >
        <NoDataMessageDisplay
          style="margin: auto !important; color: black !important"
        />
      </div>
      <q-table
        v-if="tableRowsData.length != 0 && !isLoading"
        :data="tableRowsData"
        :columns="columns"
        row-key="name"
        :separator="separator"
        :pagination="pagination"
        hide-pagination
        class="tableBorder my-sticky-header-table"
      >
        <template v-slot:no-data="{ message }">
          <div
            class="full-width row text-regalBlue flex-center text-body1 q-gutter-sm"
          >
            <span>
              {{ message }}
            </span>
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col['name']"
              :props="props"
              class="text-primary text-left "
              :class="col['name'] == 'milestone' ? 'milestone-headings' : ''"
            >
              <div>
                <span
                  class="float-left f-w-600 text-regalBlue text-fs-14-lh-22"
                >
                  {{ col['label'] }}
                </span>
              </div>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr
            :props="props"
            class="border-bottom"
            :class="(props.row.index + 1) % 2 == 0 ? 'milestone-rows' : null"
          >
            <q-td v-for="col in props.cols" :key="col['id']" class="no-padding">
              <div
                v-if="col['id'] == 0"
                class="q-px-sm text-body2 text-dimGrey border-bottom row justify-between"
                style="padding-top: 12px; padding-bottom: 12px"
              >
                <div
                  class="milestone-wrap f-w-600 text-fs-14-lh-22 text-regalBlue"
                >
                  {{ props.row.attributes.name }}
                </div>
                <q-tooltip>
                  {{ props.row.attributes.name }}
                </q-tooltip>
              </div>

              <!-- Dispaly lines -->
              <div v-else class="q-py-17 border-bottom full-width">
                <div
                  v-if="
                    col['id'] >= props.row.startDay &&
                      col['id'] <= props.row.endDay
                  "
                  class="bg-deepSkyBlue"
                  :class="
                    col['id'] == props.row.startDay ||
                    col['id'] == props.row.endDay
                      ? getMilestoneClass(col['id'], props.row)
                      : 'barBorder'
                  "
                  style="height:12px;"
                ></div>
                <div v-else style="height:12px; width:100%;"></div>
              </div>
              <!-- Dispaly tasks -->
              <div>
                <table style="width: 100%; border-spacing: 0">
                  <tbody>
                    <q-tr
                      v-for="task in props.row.attributes.tasks"
                      :key="task['id']"
                      style="width:100%"
                    >
                      <q-td
                        :class="
                          col['id'] == 0 && task['id'] == selectRow
                            ? 'bg-purple cursor-pointer'
                            : 'cursor-pointer'
                        "
                        style="padding-left:0px; padding-right:0px;"
                      >
                        <div
                          v-if="col['id'] == 0"
                          class="row q-pl-xs q-pr-md f-w-400 text-fs-14-lh-22"
                          :class="
                            col['id'] == 0 && task['id'] == selectRow
                              ? 'text-white'
                              : 'text-dimGrey'
                          "
                        >
                          <div class="task-lines"></div>
                          <div class="col row q-pl-md  justify-between " :class="$q.screen.width > 1024 ? '' : 'flex-nowrap'" >
                            <div class="task-wrap text-regalBlue float-left">
                            
                             {{  task['name'].length > ($q.screen.width > 1024 ? 55 : 40) ? task['name'].substring(0,
                            $q.screen.width > 1024 ? 14 : $q.screen.width > 600 ? 12 : 4
                             )+'...':task['name'] }}
                            </div>
                            <q-tooltip>
                              {{ task['name'] }}
                            </q-tooltip>
                            <div class="float-right text-comet">
                              {{ task['duration']['hours'] >= 24 ? task['duration']['days'] + 1 : task['duration']['days'] == 0 ? '':  task['duration']['days'] }}
                              {{
                                task['duration']['days']> 1 ? 'days'
                                : 'day' && task['duration']['days'] == 0
                                ? ''
                                : 'day'
                              }}
                              {{
                                  task['duration']['hours'] > 0
                                  ? getHours(task['duration']['hours'], null)
                                  : ''
                              }}
                              {{
                                  task['duration']['minutes'] > 0 &&
                                  task['duration']['hours'] > 0
                                    ?':'
                                    : ''
                              }}
                              {{
                                task['duration']['minutes'] === 0
                                  ? ''
                                  :getMinutes(task['duration']['minutes'], task['duration']['hours'])
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
                        <div
                          v-if="
                            col['id'] >= task['startDay'] &&
                              col['id'] <= task['endDay']
                          "
                          class="bg-primary cursor-pointer"
                          :class="
                            col['id'] == task['startDay'] ||
                            col['id'] == task['endDay']
                              ? getTaskLineClass(col['id'], task)
                              : 'barBorder'
                          "
                          style="height:12px;"
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NoDataMessageDisplay from './NoDataMessageDisplay.vue'

export default {
  name: 'MilestoneTimelineView',
  data() {
    return {
      colNumber: 15,
      separator: 'cell',
      pagination: {
        rowsPerPage: 0
      },
      columns: [],
      tableRowsData: [],
      isLoading: true,
      selectRow: 0
    }
  },
  components: { NoDataMessageDisplay },
  mounted() {
    this.columns = this.getColumns()
    this.isLoading = true
    this.getChartData().then(() => {
      this.isLoading = false
    })
  },

  methods: {
    ...mapActions(['getMilestoneData']),
    getHours(milestone, value) {
      const h =
        typeof milestone === 'number'
          ? milestone
          : milestone
      const m =
        typeof milestone === 'number'
          ? value
          : milestone
      return h
    },
    getMinutes(milestone, hours) {
      const h =
        typeof hours === 'number'
          ? hours
          : hours
      const m =
        typeof milestone === 'number'
          ? milestone
          : milestone
      if (h > 0 && m > 0) {
          return m < 10 ? '0' + m : m
      } else {
        return m
      }
    },
    getLabel(number, value) {
      const h =
        typeof number === 'number' ? number : number
      const m =
        typeof number === 'number' ? number : number
      if (value === 'min') {
        return m < 2 ? ' min' : 'mins'
      } else {
        return h < 2 ? ' hr' : 'hrs'
      }
    },
    async getChartData() {
      let chartData = await this.getMilestoneData()
      if (chartData.length > 0) {
        chartData.forEach((element, index) => {
         
          // update milestone days
          element.index = index
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
              let countDays = task.days == 0 ? 1 : task.days;
              if (index == 0) {
                task.startDay = element.startDay
              } else {
                //if startsSameDayAsPrevTask true then consider start index for previous task
                  if(tasks[index].startsSameDayAsPrevTask == true){
                    task.startDay = tasks[index - 1].startDay
                  }else{
                   task.startDay = tasks[index - 1].endDay + 1
                  }
              }
              if (countDays == 1) {
                if(task.duration.hours > 0 || task.duration.minutes > 0){
                  if(task.days == 1){
                    element.endDay = task.startDay + 1
                    task.endDay = task.startDay + 1;
                  }else{
                    element.endDay = task.startDay + (task.days) 
                    task.endDay = task.startDay + (task.days) 
                  }
                  task.endDay = task.days == 0 ? task.startDay : task.startDay + 1
                }else{
                  task.endDay = task.startDay
                }
              } else {
                if(task.duration.hours > 0 || task.duration.minutes > 0){
                  element.endDay = task.startDay + (task.days - 1) + 1
                  task.endDay = task.startDay + (task.days - 1) + 1
                }else{
                  task.endDay = task.startDay + (task.days - 1)
                }
              }
            })
           
          }
        })
      }
      const data = chartData.slice(-1)
      let columnCount = (data[0]?.endDay)
      // chartData.forEach(item => {
      //   columnCount += item.days
      // })
      this.tableRowsData = chartData
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
      let totalDays = 0
      let extraHours = 0
      let totalMinutes = 0
       row.attributes.tasks.map(item => {
        totalDays = totalDays + item['duration']['days']
        totalMinutes = totalMinutes + item['duration']['minutes']
        extraHours = extraHours + item['duration']['hours']
      })
      const hrs = extraHours / 24
      let totalHours = extraHours + Math.floor(totalMinutes / 60)
      let seconds = Number(totalHours * 60 * 60) // total hours convert into second
      let totalAdditionalDays = Math.floor(seconds / (3600 * 24)) // total second convert into days
      let totalNumberOfDays = Math.floor(totalDays + totalAdditionalDays);
      if(row.attributes.tasks.length == 0){
        return 0;
      }
      return  totalNumberOfDays == 0 ? 1 : totalNumberOfDays;
    },
    getColumns() {
      let totalColumns = this.colNumber
      let colData = [
        {
          id: 0,
          name: 'milestone',
          label: '',
          field: 'milestone',
          sortable: false
        }
      ]
      for (let i = 1; i <= totalColumns; i++) {
        let col = {
          id: i ,
          name: 'Day' + i,
          label: 'Day' + " " + i,
          field: 'Day' + i,
          sortable: false
        }
        colData.push(col)
      }
      return colData
    },
    getTaskLineClass(col, task) {
      if (col == task.startDay && col == task.endDay) {
        return 'taskBarLeftRight'
      }
      if (col == task.startDay) {
        return 'taskBarLeft'
      }
      if (col == task.endDay) {
        return 'taskBarRight'
      }
    },
    getMilestoneClass(col, milestone) {
      if (col == milestone.startDay && col == milestone.endDay)  {
        return 'milestoneBarLeft milestoneBarBarRight'
      }
      if (col == milestone.startDay) {
        return 'milestoneBarLeft'
      }
      if (col == milestone.endDay) {
        return 'milestoneBarRight'
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.text-fs-14-lh-22 {
  font-size: 14px;
  line-height: 22px;
}
.q-py-17 {
  padding-top: 17px;
  padding-bottom: 17px;
}
.taskBarLeft {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: -1px;
  margin-left: 8px;
}
.taskBarRight {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-left: -1px;
  margin-right: 8px;
}
.taskBarLeftRight {
  border-radius: 10px;
  margin: 0px 8px;
}
.milestoneBarRight {
  margin-left: -1px;
}
.milestoneBarLeft {
  margin-right: -1px;
  margin-left: -1px;
}
.createBtn {
  width: 301px;
  height: 57px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.tableBorder {
  border-top-left-radius: 0px;
  border-top: 1px solid $ghost !important;
  border-bottom: 1px solid $ghost !important;
}
.q-table th {
  border-color: $ghost !important;
  padding: 8px 16px;
}
.q-table tr {
  border-color: $ghost !important;
}
.q-table td {
  border-color: $ghost !important;
}
.border-bottom {
  border-bottom: 1px solid $ghost;
}
.barBorder {
  margin-right: -1px;
  margin-left: -1px;
}
.test {
  margin-right: -1px;
  margin-left: -1px;
}
.milestone-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 230px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 180px;
  }
}
.task-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 175px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 150px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 100px;
  }
}
.milestone-headings {
  padding: 8px;
  min-width: 272px;
  width: 272px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: 250px;
    width: 250px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    min-width: 200px;
    width: 200px;
  }
}
tr:nth-child(odd) {
  background-color: white;
}
.milestone-rows {
  background-color: #e8eefd;
  .q-td {
    background-color: #e8eefd !important;
  }
}
.q-table__card {
  box-shadow: none;
}
.task-lines {
  width: 4px;
  background: #8ba8f7;
  border-radius: 8px;
  margin-top: -14px;
  margin-bottom: -14px;
}
::v-deep {
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: $secondary;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    margin: 10px 0px;
  }
}
.my-sticky-header-table {
  height: 600px;
  thead {
    tr th {
      position: sticky;
      z-index: 1;
    }
    tr:first-child th {
      top: 0;
    }
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 500px;
  }
}
.flex-nowrap {
  flex-wrap: nowrap !important;
}
</style>
