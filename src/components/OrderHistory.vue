<template>
  <div class="full-width order-history-page">
    <label class="order-history-heading header-letterspace text-capitalize">
      Order history</label
    >
    <div
      class="full-width table-data"
      v-if="orderHistory.length > 0 && !isLoading"
    >
      <q-table
        :data="orderHistory"
        :columns="columns"
        row-key="orderHistory.id"
        class="full-width order-history-table"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                >
                <div class="">{{ col.label }}</div>
              </q-th>
            </q-tr> 
        </template>
        <template v-slot:body="props">
              <q-tr :props="props">
              <q-td key="col.Order" class="text-left order-text">
                    {{props.row['Order'
                    ]}}
              </q-td>
              <q-td key="col.Customer Name" class="text-left amount-date-text">
                    <span v-if="props.row['Customer Name'].length <= 50">{{props.row['Customer Name']}}</span>
                    <span v-else>{{ props.row['Customer Name'].substring(0,50)+"..." }}</span>
              </q-td>
              <q-td key="col.Email" class="text-left amount-date-text">
                    <span v-if="props.row['Email'].length <= 50">{{props.row['Email']}}</span>
                    <span v-else>{{ props.row['Email'].substring(0,50)+"..." }}</span>
              </q-td>
              <q-td key="col.Amount" class="text-left amount-date-text">
                    {{props.row['Amount']}}
              </q-td>
              <q-td key="col.Date" class="text-left amount-date-text">
                    {{props.row['Date']}}
              </q-td>
              <q-td key="col.Status" class="text-capitalize">
                <label class="status-text" v-if="props.row['Status'] == 'Paid'">
                  <q-img
                    src="../assets/check.svg"
                    width="12px"
                    height="12px"
                    style="margin-right: 4px !important"
                  />
                  Paid
                </label>
                <label
                  class="status-text bg-red-1"
                  style="color: #B63C16 !important"
                  v-else>
                  <q-icon name="close" color="red" class="q-mr-xs" />
                    Failed
                </label> 
              </q-td>
              </q-tr>
        </template>
      </q-table>
      <template>
        <div class="q-py-md gt-xs">
          <div class="row">
            <div class="col-5">
              <button  class="previous"  :disabled="isDisabledPrevious" v-on:click="goPreviousPage()">
                <q-icon size="17px">
                  <img src="~assets/LeftArrow.svg" width="100%"/>
                </q-icon>
                <span class="previous-text">Previous</span>
              </button>
            </div>
            <div class="col-5 q-mt-xs" >
              <q-pagination
                      v-model="currentPage"
                      :max="lastPage"
                      :max-pages="4"
                      @input="onRequest"
                      color="primary"
                      active-color="info"
              />
            </div>
            <div class="col">
              <button class="next" :disabled="isDisabledNext" v-on:click="goNextPage()">
                <span  class="next-text">Next</span>
                <q-icon size="17px">
                    <img src="~assets/NextArrow.svg" width="100%"/>  
                </q-icon>
              </button>
            </div>
          </div>
        </div>
        <!--For Mobile-->
        <div class="q-pa-md row lt-sm flex flex-center ">
          <div class="col-12 row">
            <div class="col-5">
              <button  class="previous buttonicon"   :disabled="isDisabledPrevious" v-on:click="goPreviousPage()">
                <q-icon size="17px">
                  <img src="~assets/LeftArrow.svg" width="100%"/>
                </q-icon>
              </button>
            </div>
            <div class="col-6 q-pt-sm">
              <span class="amount-date-text">Page {{this.currentPage}} of {{this.lastPage}}</span>
           </div>
            <div class="col-1" >
              <button  class="next buttonicon" :disabled="isDisabledNext" v-on:click="goNextPage()">
               <q-icon size="17px">
                  <img src="~assets/NextArrow.svg" width="100%"/>  
               </q-icon>
              </button>

            </div>
          </div>
        </div>
      </template>
      <!-- ********************* for mobile ********************* -->
      <div class="flex flex-center full-width">
        <q-spinner-ios
          v-if="showSpinner"
          class="items-center"
          color="primary"
          size="50px"
          style="margin-top: 40px !important"
        />
      </div>
    </div>
    <q-markup-table
      v-if="isLoading"
      flat
      bordered
      class="full-width order-history-table"
      style="background: #FFFFFF !important; width: 100% !important; margin-top: 30px !important"
    >
      <thead class="" style="background: #F9FAFB !important">
        <tr>
          <th class="text-left">
            <div class="gt-xs">Order</div>
            <div class="lt-sm">Invoice</div>
          </th>
          <th class="text-left">
            <div class="">Customer Name</div>
          </th>
           <th class="text-left">
            <div class="">Email</div>
          </th>
          <th class="text-left">
            <div class="">Amount</div>
          </th>
          <th class="text-left gt-xs">
            <div class="">Date</div>
          </th>
          <th class="text-left">
            <div class="">Status</div>
          </th>
         
        </tr>
      </thead>
      <tbody class="full-width" style="background: #F9FAFB !important;">
        <tr v-for="i in 8" :key="i" class="full-width">
          <td class="text-left" style="width:45% !important">
            <q-skeleton type="text"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td class="text-left " style="width:15% !important">
            <q-skeleton type="text" width="100px" class="gt-xs"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td class="text-left " style="width:15% !important">
            <q-skeleton type="text" width="100px" class="gt-xs"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td class="text-left " style="width:15% !important">
            <q-skeleton type="text" width="100px" class="gt-xs"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td
            class="text-left text-capitalize gt-xs"
            style="width:15% !important"
          >
            <q-skeleton type="text" width="100px" class="gt-xs"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td class="text-left text-capitalize" style="width:15% !important">
            <q-skeleton type="text" width="100px" class="gt-xs"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div
      v-if="orderHistory.length === 0 && !isLoading"
      class="flex flex-center full-width q-pt-xl q-px-md"
      style=""
    >
      <NoDataMessageDisplay
        style="margin: auto !important; color: black !important"
        :payment="true"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import NoDataMessageDisplay from './NoDataMessageDisplay.vue'
import axios from 'axios'
export default {
  name: 'OrderHistory',
  components: { NoDataMessageDisplay },
  data() {
    return {
      orderHistoryList: [],
      isLoading: false,
      currentPage:1,
      lastPage:0,
      rowsPerPage :10,
      showSpinner: false,
      columns: [
      {
        name: 'Order',
        required: true,
        label: 'Order #',
        align: 'left',
        field: 'Order',
        sortable: false,
        style: 'width: 15% !important'
      },
      {
        name: 'Customer Name',
        required: true,
        label: 'Customer Name',
        align: 'left',
        field: 'Customer Name',
        sortable: false,
      },
     {
      name: 'Email',
      required: true,
      label: 'Email',
      align: 'left',
      field: 'Email',
      sortable: false,
     },
     {
      name: 'Amount',
      required: true,
      label: 'Amount',
      align: 'left',
      field: 'Amount',
      sortable: false,
     },
      {
      name: 'Date',
      required: true,
      label: 'Date',
      align: 'left',
      field: 'Date',
      sortable: false,
     },
     {
      name: 'Status',
      required: true,
      label: 'Status',
      align: 'left',
      field: 'Status',
      sortable: false,
     }
     ]
    }
  },
  methods: {
    ...mapActions(['getOrderHistory']),
    getDate(date) {
      return moment(date).format('ll')
    },
    goNextPage(){
      let nextPage = this.currentPage + 1;
      this.onRequest(nextPage);
      this.currentPage = nextPage;
    },
    goPreviousPage(){
      let previousPage = this.currentPage - 1;
      this.onRequest(previousPage);
      this.currentPage = previousPage;
    },
    async onRequest (page) {
      this.showSpinner = true
      this.isLoading = true
      // calculate starting row of data
      const startRow = (page - 1) * this.rowsPerPage
      // fetch data from "Api"
      await this.getOrderHistory({
        type: 'loadMore',
        offset: startRow,
        limit: this.rowsPerPage
      })
      //count total number of pages
      this.lastPage = Math.ceil( this.orderHistoryCount/this.rowsPerPage );
      this.isLoading = false;
      this.showSpinner = false;
    },
   
  },
  mounted () {
    // get initial data from server (1st page)
    this.onRequest(1)
  },
   computed: {
    ...mapGetters(['orderHistory', 'orderHistoryCount']),
      isDisabledNext() {
        // you can  check your form is filled or not here.
        return this.currentPage < this.lastPage ? false:true
      },
      isDisabledPrevious() {
        return this.currentPage > 1 ? false:true
      }
  }
}
</script>

<style lang="scss" scoped>
.order-history-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000 !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding: 30px 15px 0px !important;
  }
}
.previous-text{
  margin-left:10px;
  color: #535D6E;
}
.buttonicon{
  height: 40px;
  width: 40px;
  padding: 0 !important;
}
.next-text{
  margin-right:15px;
  color: #535D6E;
}
.next{
  background: none;
  border:1px solid #DBDFE5;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 100px;
  font-weight: 600;
  color: #535D6E;
  padding: 10px 15px;
  float: right;
}
.previous{
    font-family: Poppins;
   background: none;
    border:1px solid #DBDFE5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    opacity: 1 !important;
    border-radius: 100px;
    font-weight: 600;
    color: #535D6E;
    padding: 10px 15px;

}
.order-history-table {
  border: 1px solid #e4e7ec !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06) !important;
  border-radius: 8px !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    box-shadow: none !important;
    border-radius: 0px !important;
  }
}
.status-text {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 8px !important;
  background: #ecfdf3;
  border-radius: 16px;
  font-family: Poppins !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 18px !important;
  text-align: center;
  color: #027a48;
  max-width: fit-content;
}
.q-table td {
  padding: 16px 10px !important;
  background-color: #ffffff !important;
  border-color: #e4e7ec !important;
}
.q-table th {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #667085;
  background: #f9fafb;
  padding: 12px 10px !important;
  border-color: #e4e7ec !important;
}
.amount-date-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
}
.order-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #101828;
}
.order-history-page {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0px 0px 40px !important;
  }
}
.table-data {
  margin-top: 20px !important;
  @media only screen and (min-width: $breakpoint-sm-max) {
    // max-height: 60vh !important;
    // overflow-y: auto !important;
    padding-right: 10px !important;
    margin-top: 30px !important;
    // padding-bottom: 10px !important;
  }
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 2px;
}
.q-table td {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-left: 15px !important;
    word-break: break-word !important;
  }
  @media only screen and (max-width: 375px) {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
}
.q-table th {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-left: 15px !important;
  }
  @media only screen and (max-width: 375px) {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
}
.q-table tr {
  @media only screen and (max-width: $breakpoint-xs-max) {
    vertical-align: initial !important;
  }
}
.see-more-btn {
  width: 220px;
  height: 50px;
  border-radius: 10px;
  font-weight: 600;
  // margin-top: 20px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-weight: normal;
  }
}
</style>
