<template>
  <q-page class="page bg-whiteSmoke q-px-xl">
    <div class="row q-px-xl">
      <div class="q-pa-md full-width q-px-xl">
        <div class="row q-py-md">
          <div class="text-black text-h5 text-weight-medium col-3">
            My Blooprints
            <q-separator width="40%" class="q-mt-xs bg-smalt" size="2px" />
          </div>
          <div class="flex col-9 row justify-end">
            <!-- <q-input
              outlined
              color="primary"
              bg-color="white"
              dense
              v-model="filter"
              placeholder="Search"
              input-class="text-dimGrey"
            />
            <q-icon
              name="search"
              class="bg-smalt q-pa-sm text-white"
              style="font-size: 1.5rem"
            /> -->

            <q-btn
              label="Create New Blooprint"
              class="q-ml-md bg-smalt text-caption"
              text-color="white"
              no-caps
              @click="goToCreateBlooprint()"
            />
          </div>
        </div>

        <q-table
          flat
          :data="blooprintList"
          :filter="filter"
          :columns="columns"
          row-key="name"
          class="text-dimGrey tableBorder"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-options="rowsPerPage"
          @request="fetchUserBlooprintsList"
          binary-state-sort
          bordered
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-white thFont tableBorder"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td
                key="name"
                :props="props"
                class="tdFont tableBorder word-break-break-all"
                style="width:55%;white-space:normal;"
              >
                {{ props.row.name }}
              </q-td>
              <q-td key="created" :props="props" class="tdFont tableBorder">
                {{ props.row.created }}
              </q-td>
              <q-td key="status" :props="props" class="tdFont tableBorder">
                <q-btn
                  outline
                  color="dodgerBlue"
                  label="Action"
                  no-caps
                  icon-right="expand_more"
                >
                  <q-menu
                    :content-style="{
                      backgroundColor: '#eee',
                      color: 'dodgerBlue'
                    }"
                  >
                    <q-list style="min-width: 120px">
                      <q-item
                        clickable
                        v-close-popup
                        v-bind:id="props.row.id"
                        @click="onActionItemSelect(props.row, 'publish')"
                      >
                        <q-item-section
                          v-if="
                            props.row.status == 'progress' ||
                              props.row.status == 'unpublish'
                          "
                          >Publish</q-item-section
                        >
                        <q-item-section v-if="props.row.status == 'active'"
                          >Un-Publish</q-item-section
                        >
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        @click="onEditClick(props.row.id)"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        @click="onActionItemSelect(props.row, 'delete')"
                      >
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="confirmationPopup" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            Are you sure you want to {{ actionTypeSelected }} blooprint?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" @click="closePopup" />
          <q-btn flat label="Yes" color="primary" @click="confirmAction()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'
import { constants } from 'src/utils/common'

const PUBLISH = 'publish'
const EDIT = 'edit'
const DELETE = 'delete'
const UNPUBLISH = 'un-publish'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 0
      },
      rowsPerPage: [5, 10, 15, 20, 25],
      model: null,
      options: ['Publish', 'Edit', 'Delete'],
      filter: '',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Blooprint Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'created',
          align: 'left',
          label: 'Created On',
          field: 'created'
        },
        {
          name: 'status',
          align: 'left',
          label: 'Actions',
          field: 'status'
        }
      ],
      blooprintList: [],
      loading: false,
      confirmationPopup: false,
      rowSelected: {},
      actionTypeSelected: ''
    }
  },
  mounted() {
    this.fetchUserBlooprintsList({
      pagination: this.pagination
    })
  },
  methods: {
    ...mapActions([
      'retrieveAuthorBlooprintList',
      'deleteBlooprint',
      'publishBlooprint',
      'unPublishBlooprint'
    ]),
    goToCreateBlooprint() {
      this.$router.push({ name: 'blooprintCreation' })
    },
    async getBlooprintData(params) {
      const blooprintData = await this.retrieveAuthorBlooprintList(params)
      if (blooprintData) {
        this.pagination.rowsNumber = blooprintData['meta']['count']
        let tableData = []
        blooprintData['data'].forEach(element => {
          let dateObj = new Date(element.attributes.createdDate.slice(0, -10))
          let date = dateObj.toDateString()
          let blooprintDate = date.split(' ')
          let elementData = {
            name: element.attributes.name,
            created:
              blooprintDate[0] +
              ', ' +
              blooprintDate[2] +
              ' ' +
              blooprintDate[1] +
              ' ' +
              blooprintDate[3],
            status: element.attributes.status,
            id: element.id
          }
          tableData.push(elementData)
        })
        return tableData
      }
    },
    // *********** Triggers when an Action Dropdown Item is selected *******************************
    onActionItemSelect(row, type) {
      this.rowSelected = row
      this.actionTypeSelected = type
      this.confirmationPopup = true
      if (type == 'publish') {
        if (row.status == 'active') {
          this.actionTypeSelected = 'un-publish'
        } else if (row.status == 'progress' || row.status == 'unpublish') {
          this.actionTypeSelected = 'publish'
        }
      }
    },
    // ************ Triggers when Yes Button is clicked for Action Item Popup ******************************
    confirmAction() {
      switch (this.actionTypeSelected) {
        case PUBLISH:
          this.onPublishClick(this.rowSelected.id)
          break
        case UNPUBLISH:
          this.onUnPublishClick(this.rowSelected.id)
          break
        case DELETE:
          this.onDeleteClick(this.rowSelected.id)
          break
        default:
          break
      }
    },
    // ************* Triggers when Confirmation Popup is closed **************************
    closePopup() {
      this.rowSelected = {}
      this.actionTypeSelected = ''
      this.confirmationPopup = false
    },
    // **************** Triggers when Publish is selected ****************************
    async onPublishClick(rowId) {
      this.confirmationPopup = false
      this.closePopup()
      let isPublishSuccess = await this.publishBlooprint(rowId)
      if (isPublishSuccess) {
        this.blooprintList.forEach(item => {
          if (item['id'] == rowId) {
            item['status'] = 'active'
          }
        })
      }
    },
    // **************** Triggers when Un-Publish is selected ****************************
    async onUnPublishClick(rowId) {
      this.confirmationPopup = false
      this.closePopup()
      let isUnPublishSuccess = await this.unPublishBlooprint(rowId)
      if (isUnPublishSuccess) {
        this.blooprintList.forEach(item => {
          if (item['id'] == rowId) {
            item['status'] = 'unpublish'
          }
        })
      }
    },
    // ****************** Triggers when Edit is selected *************************************
    onEditClick(rowId) {
      this.$router.push({
        name: 'editblooprint',
        params: { blooprintId: rowId }
      })
    },
    // ****************** Triggers when Delete is selected *************************************
    async onDeleteClick(blooprintId) {
      this.confirmationPopup = false
      this.closePopup()
      let isBlooprintDeleted = await this.deleteBlooprint(blooprintId)
      if (isBlooprintDeleted) {
        this.blooprintList = []
        this.fetchUserBlooprintsList({
          pagination: this.pagination
        })
      }
    },
    // **************** Method to fetch the User Blooprints List ************************************
    async fetchUserBlooprintsList(props) {
      const { page, rowsPerPage } = props.pagination
      this.loading = true
      let fetchCount = rowsPerPage
      let startRow = (page - 1) * rowsPerPage
      let params = {
        limit: fetchCount,
        offset: startRow
      }
      const tableData = await this.getBlooprintData(params)
      if (tableData) {
        this.blooprintList.splice(0, this.blooprintList.length, ...tableData)
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  height: 378px;
  width: 260px;
  box-shadow: none;
  border: 2px solid $info;
  border-radius: 30px;
}
.textBlue {
  color: dodgerblue;
}
.tableBorder {
  border-color: $secondary;
}
.statusDiv {
  border-radius: 5px;
  display: inline-block;
}
.tdFont {
  font-size: 16px;
}
.thFont {
  font-size: 14px;
  background-color: $smalt;
}
.search {
  border: 1px solid $secondary;
}
</style>
<style lang="scss">
.q-table__bottom {
  border-color: $secondary;
}
tr:nth-child(even) {
  background-color: $dimBackground;
}
</style>
