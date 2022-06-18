<template>
  <div class="payment-body">
    <label class="payment-heading text-letter-space">
      <span class="dollar-icon">$</span>
      <h6 class="customer-title header-letterspace">Payments</h6>
    </label>

    <div class="row">
      <div class="wallet-card col-md-6 col-lg-6 col-sm-6 col-xs-12">
        <div class="main-card" style="padding: 0">
          <div class="wallet-box">
            <h5 class="title">Wallet Balance</h5>
            <q-skeleton type="QBtn" v-if="loading" />
            <h6 v-else class="price">
              <span class="dollar-symbol">$</span>
              <span class="amount">{{
                parseFloat(bankAccountDetail.availableBalance).toFixed(2)
              }}</span>
              <span class="amount-suffix">{{
                bankAccountDetail.currency
              }}</span>
            </h6>
          </div>

          <div
            class="card-footer"
            style="width: 100%;
    padding: 16px 24px;
    border-top: 1px solid #e8e9ec;"
          >
            <h5 class="subtitle-letterspace">
              Deposit frequency <span>Monthly</span>
              <p class="icon-question">
                ?
                <!-- <q-tooltip transition-show="rotate" transition-hide="rotate">
                  On Every 15<sup>th</sup> of the month, wallet money will
                  transfer to your bank account
                </q-tooltip> -->
              </p>
            </h5>
          </div>
        </div>
      </div>
      <div class="bank-card col-md-6 col-lg-6 col-sm-6 col-xs-12">
        <div class="main-card">
          <div class="bank-box">
            <h5 class="title bank-account-details">Bank account details</h5>
            <p>This is the account we will use for all of your deposits</p>
          </div>
          <div class="full-width" v-if="loading">
            <q-skeleton type="QInput"></q-skeleton>
          </div>
          <div
            class="card-information full-width"
            v-if="!loading && bankAccountDetail.bankAccount.last4Number > 0"
          >
            <div>
              <div class="bank-name header-letterspace text-black">
                {{ bankAccountDetail.bankAccount.bankName }}
              </div>
              <div class="routing-number">
                Routing Number:
                {{ bankAccountDetail.bankAccount.routingNumber }}
              </div>
              <div class="last-4-number">
                Last 4 Number: *****
                {{ bankAccountDetail.bankAccount.last4Number }}
              </div>
            </div>
            <q-btn
              @click="addNewBank"
              :loading="stripeLoading"
              flat
              no-caps
              class="float-right edit-replace-button "
            >
              Edit
            </q-btn>
            <q-btn
              round
              color="primary"
              class="sm-mobile-btn"
              icon="edit"
              @click="addNewBank"
              :loading="stripeLoading"
              style="font-size: 8px; width: 1.5rem; height: 1.5rem;"
            ></q-btn>
            <!-- <div
              class="float-right lt-sm sm-mobile-btn"
              :style="`background-image:url(${editIcon})`"
              @click="addNewBank"
            >
              <span v-if="stripeLoading">
                <q-spinner color="white" size="2em" :thickness="10" />
              </span>
            </div> -->
          </div>
          <div class="card-footer add-new-bank" v-else-if="!loading">
            <q-btn
              flat
              :loading="stripeLoading"
              @click="addNewBank"
              class="text-capitalize"
            >
              <img
                style="width: 11px; height: 11px; margin-right: 12px;"
                src="~assets/plus.svg"
              />
              Add New Bank Account
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BankAccountDetails',
  data() {
    return {
      loading: true,
      stripeLoading: false,
      editIcon: require('../assets/EditIcon.svg'),
      bankAccountDetail: {
        availableBalance: '0.00',
        pendingBalance: '',
        bankAccount: {
          bankName: '',
          routingNumber: '',
          last4Number: ''
        }
      }
    }
  },
  created() {
    this.walletBalance()
  },
  methods: {
    async addNewBank() {
      this.stripeLoading = true
      axios({
        url: `${process.env.BLOOPRINTED_ENV_API_URL}/v1/accounts/link_url`,
        method: 'GET',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          window.open(response.data.data.attributes.message, '_blank')
        })
        .finally(() => {
          this.stripeLoading = false
        })
    },
    async walletBalance() {
      axios({
        url: `${process.env.BLOOPRINTED_ENV_API_URL}/v1/accounts`,
        method: 'GET',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          this.bankAccountDetail = response.data.data.attributes
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-question {
  @media screen and (width: 1024px) {
    width: 23px !important;
  }
}
.price .dollar-symbol {
  font-weight: bold;
  font-size: 32px;
  color: black;
  position: relative;
  top: -10px;
  right: -10px;
}
.payment-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000 !important;
  margin-bottom: 20px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding-top: 30px !important;
  }
}
.dollar-icon {
  color: #1652f0;
  font-size: 26px;
  line-height: 24px;
  margin-right: 10px;
  display: none;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    display: block;
  }
}
.row {
  @media only screen and (max-width: 600px) {
    display: block;
  }
}
.title {
  font-weight: 500 !important;
}
.main-card .bank-account-details {
  margin-bottom: 4px;
}
.price {
  font-weight: 600 !important;
}
.payment-body {
  @media only screen and (max-width: $breakpoint-sm) {
    padding: 10px;
  }
}
.wallet-box {
  padding: 24px;
  margin-bottom: 45px;
}
.customer-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #152141;
  margin: 0;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    color: #000000 !important;
  }
}

.main-card {
  max-height: 250px;
  height: 100%;
  border: 1px solid #e8e9ec;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.bank-card .main-card {
  padding: 24px;
}

.main-card h5 {
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  display: block;
  color: #101828;
  margin: 0 0 15px 0;
}

.main-card h6 {
  font-weight: 700;
  font-size: 48px;
  color: #101828;
  margin: 0;
}

.main-card .amount {
  font-weight: 700;
  font-size: 48px;
  color: #101828;
  margin: 12px;
}

.main-card p {
  font-weight: 400;
  font-size: 14px;
  color: #667085;
  margin: 0;
}

.main-card .amount-suffix {
  font-weight: 500;
  font-size: 16px;
  color: #667085;
  margin: 0 0 0 -10px;
  text-transform: uppercase;
}

.main-card .card-footer {
  margin-top: 10px;
}

.main-card .card-footer button {
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #344054;
  background: none;
  cursor: pointer;
}

.main-card .card-footer h5 {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  margin: 0;
  color: #152141;
  cursor: pointer;
}

.main-card .card-footer h5 p {
  border: 1px solid #667085;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  height: 20px;
}

.main-card .card-footer h5 span {
  color: #1652f0;
  background: #e8eefd;
  padding: 3px 13px;
  font-size: 14px;
  display: block;
  border-radius: 50px;
  margin: 0 9px 0 8px;
}

.card-information {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  margin-top: 20px;

  .bank-name {
    display: block;
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    height: 20px;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 200px;
  }

  .routing-number,
  .last-4-number {
    display: block;
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: rgba(102, 112, 133, 1);
    height: 20px;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 200px;
  }

  @media only screen and (min-width: 1024px) and (max-width: 1200px) {
    padding: 8px;
  }
}

.card-logo {
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 6px;
  margin-right: 16px !important;
  @media only screen and (min-width: 1024px) and (max-width: 1200px) {
    margin-right: 8px !important;
  }
}

.sm-mobile-btn {
  display: none !important;
  @media only screen and (max-width: 450px) {
    display: block !important;
    // background-size: 100%;
    // background-repeat: no-repeat;
    // background-position: center !important;
    // width: 35px !important;
    // height: 35px !important;
    // border-radius: 50% !important;
    // box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  }
}

.edit-replace-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 10px !important;
    width: 80px !important;
    height: 30px !important;
  }
  @media only screen and (max-width: 450px) {
    display: none !important;
  }
  @media only screen and (min-width: 1024px) and (max-width: 1200px) {
    padding: 10px 0px;
  }
}
.wallet-card {
  padding-right: 15px;
}
.bank-card {
  padding-left: 15px;
}
@media only screen and (max-width: 1350px) {
  .wallet-card {
    margin-bottom: 10px;
    padding-right: 0;
  }
  .bank-card {
    margin-top: 10px;
    padding-left: 0;
  }
}
.wallet-card,
.bank-card {
  @media only screen and (max-width: 1350px) {
    width: 100%;
    margin: 10px 0;
    .main-card {
      width: 100%;
    }
  }
}
.main-card .add-new-bank {
  margin-top: 80px;
}
</style>
