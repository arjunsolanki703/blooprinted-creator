<template>
  <q-page>
    <!-- Desktop -->
    <div class="category-banner gt-sm" style="margin-top:2px;">
      <div class="row">
        <div class="col-md-6">
          <div class="title header-letterspace">
            Select a category for your blooprint
          </div>
          <div class="subtitle subtitle-letterspace" style="margin-top:16px;">
            Choose the category that you would like for your blooprint to
            listed.
          </div>
          <div
            class="category subtitle-letterspace"
            style="margin-top:32px; margin-bottom:4px;"
          >
            Category
            <span class="text-errorColor">*</span>
          </div>
          <q-form @submit="saveBlooprintCategory">
            <CategoryDropdownField
              class="dropdown-style"
              :existingSelectedCategory="existedCategory"
              :class="isCategoryInvalid ? 'no-category' : null"
              @on-category-update="onCategoryUpdate"
            />
            <div class="f-w-500 err-msg" v-if="isCategoryInvalid">
              Category Name is required
            </div>
            <div class="row" style="margin-top:32px">
              <q-btn
                class="back-button subtitle-letterspace"
                label="Back"
                no-caps
                unelevated
                @click="redirectToBlooprintNamePage"
              />
              <q-btn
                type="submit"
                color="primary"
                label="Continue"
                no-caps
                no-wrap
                class="continue-button subtitle-letterspace"
              >
                <div class="relative-position">
                  <div class="arrow" style="margin-left: 17px">
                    <q-img
                      src="~assets/chevron-right.svg"
                      width="6px"
                      height="12px"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
          </q-form>
        </div>
        <div class="col-md-6">
          <div class="card-style">
            <div class="row" style="margin-bottom:30px">
              <q-img
                class="col-4 reveal fade-in active"
                src="~assets/bluecheckcircle.svg"
                width="40px"
                height="40px"
              ></q-img>
              <div
                class="col align-center justify-center self-center subtitle-letterspace"
                style="margin-left:16px;"
              >
                Get started
              </div>
            </div>
            <div class="row" style="margin-bottom:30px">
              <q-img
                src="~assets/bluecheckcircle.svg"
                width="40px"
                height="40px"
              ></q-img>
              <div
                class="col align-center justify-center self-center subtitle-letterspace"
                style="margin-left:16px;"
              >
                Name your blooprint
              </div>
            </div>
            <div class="row">
              <q-img
                src="~assets/bluecircle.svg"
                width="40px"
                height="40px"
              ></q-img>
              <div
                class="col align-center justify-center self-center subtitle-letterspace"
                style="margin-left:16px;"
              >
                Select category
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gt-sm" style="height:210px;"></div>
    <!-- Mobile/Tablet -->
    <div class="lt-md" style="margin-bottom:131px;">
      <div class="card-style">
        <div class="row" style="margin-bottom:8px">
          <q-img
            class="col-4"
            src="~assets/bluecheckcirclemobile.svg"
            width="20px"
            height="20px"
          ></q-img>
          <div
            class="col align-center justify-center self-center subtitle-letterspace"
            style="margin-left:8px;"
          >
            Get started
          </div>
        </div>
        <div class="row" style="margin-bottom:8px">
          <q-img
            src="~assets/bluecheckcirclemobile.svg"
            width="20px"
            height="20px"
          ></q-img>
          <div
            class="col align-center justify-center self-center subtitle-letterspace"
            style="margin-left:8px;"
          >
            Name your blooprint
          </div>
        </div>
        <div class="row">
          <q-img
            src="~assets/bluecirclemobile.svg"
            width="20px"
            height="20px"
          ></q-img>
          <div
            class="col align-center justify-center self-center subtitle-letterspace"
            style="margin-left:8px;"
          >
            Select category
          </div>
        </div>
      </div>
      <div class="category-banner">
        <div class="title header-letterspace">
          Select a category for your blooprint
        </div>
        <div class="subtitle subtitle-letterspace" style="margin-top:16px;">
          Choose the category that you would like for your blooprint to listed.
        </div>
        <div
          class="category subtitle-letterspace"
          style="margin-top:16px; margin-bottom:4px;"
        >
          Category
          <span class="text-errorColor">*</span>
        </div>
        <q-form @submit="saveBlooprintCategory">
          <CategoryDropdownField
            class="dropdown-style"
            :existingSelectedCategory="existedCategory"
            :class="isCategoryInvalid ? 'no-category' : null"
            @on-category-update="onCategoryUpdate"
          />
          <div class="f-w-500 err-msg" v-if="isCategoryInvalid">
            Category Name is required
          </div>
          <div class="row" style="margin-top:32px;">
            <q-btn
              class="back-button subtitle-letterspace"
              label="Back"
              no-caps
              unelevated
              @click="redirectToBlooprintNamePage"
            />
            <q-btn
              type="submit"
              color="primary"
              label="Continue"
              no-caps
              no-wrap
              class="continue-button subtitle-letterspace"
            >
              <div class="relative-position">
                <div class="arrow" style="margin-left: 15px">
                  <q-img
                    src="~assets/chevron-right.svg"
                    width="6px"
                    height="12px"
                  />
                </div>
              </div>
            </q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import CategoryDropdownField from 'components/CategoryDropdownField.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      name: '',
      isCategoryInvalid: false,
      blooprintDetails: {},
      categorySelected: {},
      existedCategory: null
    }
  },
  components: {
    CategoryDropdownField
  },
  methods: {
    ...mapActions([
      'updateBlooprint',
      'retrieveAuthorBlooprintList',
      'getBlooprintDetailsById'
    ]),
    redirectToBlooprintNamePage() {
      this.$router.push({ name: 'firstBlooprintCreationName' })
    },
    onCategoryUpdate(event) {
      this.categorySelected = event
      if (!event['value']) {
        this.isCategoryInvalid = true
      } else {
        this.isCategoryInvalid = false
      }
    },
    async saveBlooprintCategory() {
      if (this.categorySelected.value) {
        this.isCategoryInvalid = false
        let blooprintData = {
          categories: [this.categorySelected.value],
          name: this.name,
          blooprintId: this.$router.history.current.params.blooprintId
        }
        let value = await this.updateBlooprint(blooprintData)
        if (value['type'] === 'blooprints') {
          this.$router.push({
            name: 'getstarted'
          })
        }
      } else {
        this.isCategoryInvalid = true
      }
    },
    async getBlooprintDetails() {
      let response = await this.getBlooprintDetailsById()
      this.blooprintDetails = response.attributes
      this.name = response.attributes.name
      this.existedCategory = response.attributes.categoryIDs
    }
  },
  mounted() {
    this.getBlooprintDetails()
  },
  computed: {
    dropDownBehavior() {
      return window.innerWidth > 1023 ? 'menu' : 'dialog'
    }
  }
}
</script>

<style lang="scss" scoped>
.q-page {
  font-family: Poppins;
}
.category-banner {
  background-color: #e8edf2;
  padding: 60px 165px 76px 165px;
  @media only screen and (min-width: 1024px) and (max-width: 1100px) {
    padding: 60px 165px 76px 100px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px 112px 15px;
  }
}
.dropdown-style {
  background-color: #ffffff;
  padding: 0px 14px;
  border: 1px solid #b9bcc6;
  box-sizing: border-box;
  border-radius: 8px;
}

.title {
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
  }
}

.subtitle {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #152141;
}

.category {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #152141;
}

.q-select {
  max-width: 400px;
  height: 44px;
}

.back-button {
  width: 101px;
  height: 50px;
  background: #ffffff;
  border: 2px solid #1652f0;
  box-sizing: border-box;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1652f0;
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 40px;
    border-radius: 5px;
    display: row;
    align-items: center;
    justify-content: center;
    align-self: center;
  }
}

.continue-button {
  margin-left: 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  width: 157px;
  height: 50px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 137px;
    height: 40px;
    border-radius: 5px;
  }
}

.card-style {
  background-color: #152141;
  border-radius: 20px;
  padding: 48px 0px 48px 48px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  max-width: 545px;
  min-width: 400px;
  margin-left: 20px;
  @media only screen and (min-width: 1024px) and (max-width: 1300px) {
    margin-left: 50px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 15px 0px 15px 15px;
    margin-left: 0px;
    border-radius: 0px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    min-width: 100%;
  }
}

@supports (-moz-appearance: none) {
  .arrow {
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding-bottom: 2px !important;
    }
  }
}
.err-msg {
  font-size: 12px;
  line-height: 1;
  min-height: 20px;
  padding: 8px 12px 0;
  color: #c10015;
}
.no-category {
  border: 1px solid $errorColor !important;
  transition: border 0.5s;
  box-shadow: 0 0 5px $errorColor;
  transition: box-shadow 0.2s;
}
::v-deep {
  .q-field__messages {
    line-height: 12px;
  }
  .q-field--float,
  .q-field__focused {
    .q-field__label {
      display: none;
    }
  }

  .q-field__control-container {
    line-height: 24px;
    font-size: 16px;
    padding: 20px 0px 5px 0px !important;
    min-height: none !important;
  }
  .q-field--auto-height.q-field--dense.q-field--labeled
    .q-field__control-container {
    padding-top: 0px !important;
  }
}

.q-field--error,
.q-field--error:focus,
.q-field--error:active,
.q-field--error:hover {
  border: 1px solid $errorColor !important;
  transition: border 0.5s;
  box-shadow: 0 0 5px $errorColor;
  transition: box-shadow 0.2s;
  font-weight: 500;
  caret-color: $errorColor !important;
}
</style>
