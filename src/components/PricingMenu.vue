<template>
  <div class="price-card-padding">
    <div class="text-regalBlue f-w-600 price-heading">Pricing</div>
    <div class="input-style" v-if="!blooprintDetails.id">
      <q-skeleton type="QSlider" />
      <q-skeleton class="q-mt-md" width="150px" />
      <q-skeleton class="save-btn" type="QBtn" />
    </div>
    <q-form ref="priceForm" v-else>
      <div>
        <label class="f-w-600 text-body1 text-regalBlue">
          Price
          <span class="text-errorColor">*</span>
        </label>
        <q-input
          borderless
          ref="price"
          v-model.trim="price"
          type="text"
          fill-mask="0"
          mask="#.##"
          maxlength="8"
          reverse-fill-mask
          class="border-input-field input-style price-input text-regalBlue subtitle-letterspace q-mt-xs q-mb-lg q-pb-none"
          lazy-rules
          :rules="[
            val => (val && isPriceValid(val)) || 'Price is required',
            val =>
              (val && minPriceValidation(val)) ||
              'Price should not be less than 0.5',
            val =>
              (val && maxPriceValidation(val)) ||
              'Price should not be greater than 10,000'
          ]"
          @keyup="onPriceChange"
        >
          <template v-slot:prepend>
            <div class="text-manateeGrey f-w-500 text-body1">$</div>
          </template>
        </q-input>
      </div>
      <q-toggle
        style="margin-left: -10px"
        name="music_active"
        class="f-w-500 text-body1 text-regalBlue"
        :class="discount ? 'q-mb-lg' : null"
        v-model="discount"
        label="Add discount"
      />

      <div class="discoun-reveal fade-left active" v-if="discount">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xs-12">
            <label class="f-w-600 text-body1 text-regalBlue">
              Discount percentage (% off)
              <span class="text-errorColor">*</span>
            </label>
            <q-input
              borderless
              ref="discount_percentage"
              v-model.trim="discount_percentage"
              type="text"
              placeholder="00"
              mask="##"
              maxlength="2"
              class="border-input-field input-style discount-percentage text-regalBlue subtitle-letterspace q-mt-xs q-pb-none"
              :class="
                isDiscountDateExceeded && discount_end_date
                  ? 'error-border'
                  : null
              "
              lazy-rules
              :rules="[
                val => (val && isPriceValid(val)) || 'Discount % is required',
                val =>
                  (val && maxPercentageValidation(val)) ||
                  'Discount % should be < 100'
              ]"
              @keyup="onDiscountPercentageChange"
            />
          </div>
          <div
            class="col-md-6 col-sm-6 col-xs-12 q-mt-md-none q-mt-sm-none q-mt-xs-lg"
          >
            <label class="f-w-600 text-body1 text-regalBlue discount-price">
              Discounted blooprint price
            </label>
            <q-input
              borderless
              ref="discount_price"
              v-model.trim="discount_price"
              type="text"
              fill-mask="0"
              mask="#.##"
              disable
              reverse-fill-mask
              class="border-input-field input-style discount-price text-regalBlue subtitle-letterspace q-mt-xs q-pb-none"
              :class="
                isDiscountDateExceeded && discount_end_date
                  ? 'error-border'
                  : null
              "
              style="background: #E8EDF2; border: none !important"
              lazy-rules
              :rules="[
                val =>
                  (val && isPriceValid(val)) || 'Discounted blooprint price is required',
                val => (val && val >= 1) || 'Discounted blooprint price should be >= $1'
              ]"
            >
              <template v-slot:prepend>
                <div class="text-regalBlue f-w-500 text-body1">$</div>
              </template>
            </q-input>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12" style="margin-top:30px">
            <label class="f-w-600 text-body1 text-regalBlue">
              Discount start date
            </label>
            <q-input
              borderless
              v-model="discount_start_date"
              placeholder="MM/DD/YYYY"
              class="border-input-field input-style discount-percentage text-regalBlue subtitle-letterspace q-mt-xs q-pb-none"
              :class="
                isDiscountStartDateExceeded && discount_start_date
                  ? 'error-border'
                  : null
              "
              readonly
              ref="startDateField"
              @click="onDateClick('startDate')"
              :error="
                isDiscountStartDateExceeded && discount_start_date != null
              "
              error-message="Start date cannot be after end date"
            >
              <template v-slot:append>
                <q-icon
                  name="img:calendar.svg"
                  size="24px"
                  @click="onDateClick('startDate')"
                  class="cursor-pointer"
                >
                </q-icon>
              </template>
            </q-input>
            <div>
              <q-popup-proxy
                ref="qStartDateProxy"
                transition-show="scale"
                transition-hide="scale"
                @hide="onDateHide('startDate')"
                :breakpoint="1025"
              >
                <q-date
                  v-model="discount_start_date"
                  mask="MM/DD/YYYY"
                  :options="disableStartDays"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Clear"
                      no-caps
                      @click="discount_start_date = null"
                      color="primary"
                      flat
                    />
                    <q-btn
                      v-close-popup
                      label="Close"
                      no-caps
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12" style="margin-top:30px">
            <label class="f-w-600 text-body1 text-regalBlue discount-price">
              Discount end date
            </label>
            <q-input
              borderless
              v-model="discount_end_date"
              placeholder="MM/DD/YYYY"
              class="border-input-field input-style discount-price text-regalBlue subtitle-letterspace q-mt-xs q-pb-none"
              :class="
                isDiscountDateExceeded && discount_end_date
                  ? 'error-border'
                  : null
              "
              readonly
              ref="endDateField"
              @click="onDateClick('endDate')"
              :error="isDiscountDateExceeded && discount_end_date != null"
              error-message="Discount date was exceeded"
            >
              <template v-slot:append>
                <q-icon
                  name="img:calendar.svg"
                  size="24px"
                  @click="onDateClick('endDate')"
                  class="cursor-pointer"
                >
                </q-icon>
              </template>
            </q-input>
            <div>
              <q-popup-proxy
                ref="qEndDateProxy"
                transition-show="scale"
                transition-hide="scale"
                @hide="onDateHide('endDate')"
                :breakpoint="1025"
              >
                <q-date
                  v-model="discount_end_date"
                  mask="MM/DD/YYYY"
                  :options="disableEndDays"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Clear"
                      no-caps
                      @click="discount_end_date = null"
                      color="primary"
                      flat
                    />
                    <q-btn
                      v-close-popup
                      label="Close"
                      no-caps
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </div>
          </div>
        </div>
        <!-- <div class="f-w-500 err-msg" v-if="isDiscountDateExceeded">
          Discount date was exceeded
        </div> -->
      </div>
      <div>
        <q-btn
          color="primary"
          class="save-btn text-body1 f-w-600"
          text-color="white"
          label="Save"
          no-caps
          unelevated
          @click="updateBlooprintPricingInfo()"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { discountDateFormat, saveDateFormat } from '../utils/common'
import moment from 'moment-timezone'
export default {
  name: 'PricingMenu',
  data() {
    return {
      price: '',
      discount: false,
      discount_price: '',
      discount_percentage: '',
      discount_end_date: null,
      discount_start_date: null,
      isDiscountDateExceeded: false,
      isDiscountStartDateExceeded: false
    }
  },
  props: ['blooprintDetails', 'isSaveDraftClicked'],
  watch: {
    blooprintDetails(data) {
      this.updatePricingValues()
    },
    // discount(data) {
    //   if (!data) {
    //     this.discount_price = ''
    //     this.discount_percentage = ''
    //     this.discount_end_date = null
    //   }
    // },
    isSaveDraftClicked(isClicked) {
      if (isClicked) {
        this.updateBlooprintPricingInfo()
      }
    },
    discount_end_date() {
      this.checkDiscountStartDateValidity()
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  mounted() {
    this.updatePricingValues()
  },
  methods: {
    ...mapActions(['updateBlooprint']),
    isSaved() {
      if (this.blooprintDetails.attributes) {
        if (
          this.price ==
            (this.blooprintDetails.attributes.price
              ? this.blooprintDetails.attributes.price.toFixed(2)
              : 0.0) &&
          this.discount == this.discount_percentage > 0 &&
          this.discount_end_date ==
            discountDateFormat(
              this.blooprintDetails.attributes.discountEndDate
            ) &&
          this.discount_percentage == this.blooprintDetails.attributes.discount
        ) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    isPriceValid(val) {
      return !(val == 0.0 || val == '')
    },
    minPriceValidation(val) {
      return !(val != 0.0 && val != '' && val < 0.5)
    },
    maxPriceValidation(val) {
      return !(val != 0.0 && val != '' && val > 10000)
    },
    maxPercentageValidation(val) {
      return !(val != 0.0 && val != '' && val > 100)
    },
    onDateClick(val) {
      val == 'startDate'
        ? this.$refs.qStartDateProxy.show()
        : this.$refs.qEndDateProxy.show()
    },
    onDateHide(val) {
      val == 'startDate'
        ? this.$refs.qStartDateProxy.hide()
        : this.$refs.qEndDateProxy.hide()
      val == 'endDate'
        ? this.checkDiscountEndDateValidity()
        : this.checkDiscountStartDateValidity()
    },
    disableEndDays(date) {
      let month = new Date().getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day =
        new Date().getDate() > 10
          ? new Date().getDate()
          : '0' + new Date().getDate()
      let today = new Date().getFullYear() + '/' + month + '/' + day
      this.checkDiscountStartDateValidity()
      return this.discount_start_date && !this.isDiscountStartDateExceeded
        ? moment(this.discount_start_date).format('YYYY/MM/DD') <= date &&
            date >= today
        : date >= today
    },
    disableStartDays(date) {
      let month = new Date().getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day =
        new Date().getDate() > 10
          ? new Date().getDate()
          : '0' + new Date().getDate()
      let today = new Date().getFullYear() + '/' + month + '/' + day
      this.checkDiscountStartDateValidity()
      return this.discount_end_date && !this.isDiscountDateExceeded
        ? moment(this.discount_end_date).format('YYYY/MM/DD') >= date &&
            date >= today
        : date >= today
    },
    updatePricingValues() {
      this.price = this.blooprintDetails?.attributes?.price?.toFixed(2)
      this.discount =
        (this.blooprintDetails?.attributes?.discount || 0) > 0 ? true : false
      this.discount_percentage =
        this.discount & (this.blooprintDetails?.attributes?.discount > 0)
          ? this.blooprintDetails?.attributes?.discount
          : ''
      this.discount_end_date = discountDateFormat(
        this.blooprintDetails?.attributes?.discountEndDate
      )
      this.discount_start_date = discountDateFormat(
        this.blooprintDetails?.attributes?.discountStartDate
      )
      this.onDiscountPercentageChange()
      this.checkDiscountEndDateValidity()
      // this.checkDiscountStartDateValidity()
    },
    checkDiscountEndDateValidity() {
      if (this.discount_end_date) {
        let currentDate = discountDateFormat(new Date())
        if (Date.parse(this.discount_end_date) < Date.parse(currentDate)) {
          this.isDiscountDateExceeded = true
        } else {
          if (this.discount_end_date && this.discount_start_date) {
            if (
              Date.parse(this.discount_end_date) <
              Date.parse(this.discount_start_date)
            ) {
              this.isDiscountDateExceeded = true
            } else {
              this.isDiscountDateExceeded = false
            }
          } else {
            this.isDiscountDateExceeded = false
          }
        }
      } else {
        this.isDiscountDateExceeded = false
      }
    },
    checkDiscountStartDateValidity() {
      if (this.discount_end_date && this.discount_start_date) {
        if (
          Date.parse(this.discount_start_date) >
          Date.parse(this.discount_end_date)
        ) {
          this.isDiscountStartDateExceeded = true
        } else {
          this.isDiscountStartDateExceeded = false
        }
      } else {
        this.isDiscountStartDateExceeded = false
      }
      // if (this.discount_start_date) {
      //   let discountDate = this.discount_start_date.split('/')
      //   let currentDate = new Date()
      //   if (
      //     Number(discountDate[0]) < currentDate.getDate() &&
      //     Number(discountDate[1]) <= currentDate.getMonth() + 1 &&
      //     Number(discountDate[2]) <= currentDate.getFullYear()
      //   ) {
      //     this.isDiscountStartDateExceeded = true
      //   } else {
      //     this.isDiscountStartDateExceeded = false
      //   }
      // }
    },
    onPriceChange() {
      if (this.price >= 0.5) {
        if (this.discount_percentage != 0.0 && this.discount_percentage != '') {
          this.onDiscountPercentageChange()
        }
      }
    },
    onDiscountPercentageChange() {
      if (this.price >= 0.5 && this.discount_percentage > 0) {
        this.discount_price = (
          this.price -
          this.price * (this.discount_percentage / 100)
        ).toFixed(2)
      } else {
        this.discount_price = 0
      }
    },
    updateBlooprintPricingInfo() {
      this.$refs.price.validate()
      if (this.discount) {
        this.$refs.discount_price.validate()
        this.$refs.discount_percentage.validate()
        this.checkDiscountEndDateValidity()
        this.checkDiscountStartDateValidity()
      }
      this.$refs.priceForm.validate().then(success => {
        if (success) {
          if (this.discount) {
            if (this.discount_price >= 1) {
              if (
                !this.isDiscountDateExceeded &&
                !this.isDiscountStartDateExceeded
              ) {
                this.callUpdateAPI()
              }
            }
          } else {
            this.callUpdateAPI()
          }
        }
      })
    },
    async callUpdateAPI() {
      let params = {
        blooprintId: this.blooprintDetails.id,
        ...this.blooprintDetails.attributes
      }
      params['categories'] = []
      params['categoryIDs'].forEach(item => {
        if (item['child']) {
          params['categories'].push(item['child'])
        } else if (item['parent']) {
          params['categories'].push(item['parent'])
        }
      })
      params['price'] = parseFloat(this.price)
      if (this.discount) {
        params['discount'] = parseFloat(this.discount_percentage)
        if (this.discount_end_date && this.discount_end_date != '') {
          let date = this.discount_end_date.split('/')
          params['discountEndDate'] = saveDateFormat(
            date[2] + '-' + date[0] + '-' + date[1] + '23:59:59',
            this.userProfile['timeZone']
          )
        } else {
          params['discountEndDate'] = null
        }
        if (this.discount_start_date && this.discount_start_date != '') {
          let date = this.discount_start_date.split('/')
          params['discountStartDate'] = saveDateFormat(
            date[2] + '-' + date[0] + '-' + date[1] + '00:00:00',
            this.userProfile['timeZone']
          )
        } else {
          params['discountStartDate'] = null
        }
      } else {
        params['discount'] = 0.0
        params['discountEndDate'] = null
        params['discountStartDate'] = null
      }
      let data = await this.updateBlooprint(params)
      if (data['id']) {
        this.$emit('on-blooprint-data-update')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.err-msg {
  font-size: 12px;
  line-height: 1;
  min-height: 20px;
  padding: 8px 12px 0;
  color: #c10015;
}
.price-card-padding {
  padding: 40px 40px 200px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 16px 0px 100px 0px;
  }
}
.price-heading {
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 24px;
  }
}
::v-deep {
  .price-input {
    .q-field__control {
      .q-field__prepend {
        padding-right: 10px;
      }
      .q-field__control-container {
        border-left: 1px solid $ghost;
        padding-left: 14px;
      }
    }
  }
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
  .save-btn {
    border-radius: 10px;
    margin-top: 40px;
    width: 200px;
    height: 50px;
    .q-btn__wrapper {
      padding: 10px 30px !important;
    }
  }
}
.discount-price {
  margin-left: 12px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-left: 0px;
  }
}
.discount-percentage {
  margin-right: 12px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-right: 0px;
  }
}
//for animating elements
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
.error-border {
  border: 1px solid $errorColor !important;
  transition: border 0.5s;
  box-shadow: 0 0 5px $errorColor;
  line-height: 12px !important;
  transition: box-shadow 0.2s;
  caret-color: $errorColor !important;
}
</style>
