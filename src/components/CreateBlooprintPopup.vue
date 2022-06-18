<template>
  <q-card class="bg-white blooprint-popup">
    <q-img
      src="~assets/closepopup.svg"
      width="30px"
      height="30px"
      class="close-icon cursor-pointer"
      ref="close"
      v-close-popup
    />
    <div
      class="text-regalBlue f-w-600 text-lh-36 text-fs-32 header-letterspace"
    >
      Create a new blooprint
    </div>
    <div
      class="q-mt-sm f-w-500 text-fs-16 text-lh-24 text-comet subtitle-letterspace"
    >
     Fill out the fields below to begin creating your new blooprint.
    </div>
    <q-form @submit="planDetails">
      <div
        class="q-mt-lg text-fs-16 text-lh-24 text-regalBlue f-w-600 subtitle-letterspace"
      >
        blooprint name
      </div>
      <q-input
        v-model.trim="name"
        style="margin-top:4px;"
        type="text"
        input-class="input-field-style"
        class="border-input-field subtitle-letterspace name-field q-mt-xs q-mb-lg  q-pb-none name-input"
        borderless
        placeholder="Enter blooprint name"
        :rules="[
          val => (val && val.length > 0) || 'blooprint name is required'
        ]"
      ></q-input>
      <div
        class="q-mt-lg text-fs-16 text-lh-24 text-regalBlue f-w-600 subtitle-letterspace"
      >
        blooprint category
      </div>
      <CategoryDropdownField
        class="dropdown-style subtitle-letterspace"
        :class="isCategoryInvalid ? 'no-category' : null"
        @on-category-update="onCategoryUpdate"
      />
      <div
        class="f-w-500 err-msg subtitle-letterspace"
        v-if="isCategoryInvalid"
      >
        blooprint category is required
      </div>

      <div
        class="row reverse-wrap align-center justify-between"
        style="margin-top:60px"
      >
        <q-btn
          unelevated
          no-caps
          v-close-popup
          label="Cancel"
          class="bg-white subtitle-letterspace text-primary text-fs-16 text-lh-24 f-w-600  cancel-button"
        />
        <q-btn
          unelevated
          no-wrap
          no-caps
          ref="createBtn"
          type="submit"
          label="Start Creating"
          class="bg-primary text-white subtitle-letterspace text-fs-16 text-lh-24 f-w-600  create-button"
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
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import CategoryDropdownField from './CategoryDropdownField.vue'
export default {
  data() {
    return {
      name: '',
      categories: [],
      categorySelected: '',
      isCategoryInvalid: false,
    }
  },
  components: { CategoryDropdownField },
  methods: {
    ...mapActions(['createBlooprint', 'getCurrentPlanInfo','setLoading']),
    onCategoryUpdate(event) {
      this.categorySelected = event
      if (!event['value']) {
        this.isCategoryInvalid = true
      } else {
        this.isCategoryInvalid = false
      }
    },
    isValid() {
      return !this.name.length
    },
    async planDetails(e) {
      if (this.categorySelected.value) {
        this.setLoading(true)
        this.getCurrentPlanInfo()
          .then(() => {
            this.createNewBlooprint()
          })
          .catch(() => {})
      } else {
        this.isCategoryInvalid = true
      }
    },
    async createNewBlooprint() {
      if (this.categorySelected.value) {
        this.isCategoryInvalid = false
        let blooprintData = {
          name: this.name,
          categories: [this.categorySelected.value]
        }
        let data = await this.createBlooprint(blooprintData)
        if (data['type'] === 'blooprints') {
          this.$router.push({
            name: 'blooprintCreation',
            params: {
              blooprintId: data.id
            }
          })
        }
      } else {
        this.isCategoryInvalid = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blooprint-popup {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 60px 30px 30px 38px;
}
.close-icon {
  position: absolute;
  top: 30px;
  right: 30px;
}

.q-input {
  padding: 0px 14px;
  width: 590px;
  max-height: 44px;
  @media only screen and (max-width: 738px) {
    width: 100% !important;
  }
}

.dropdown-style {
  background-color: #ffffff;
  padding: 0px 14px;
  border: 1px solid #b9bcc6;
  box-sizing: border-box;
  border-radius: 8px !important;

  width: 100%;
}

.cancel-button {
  border: 2px solid $primary;
  border-radius: 10px;
  width: 118px;
  height: 50px;
  margin-right: 24px;
  @media only screen and (max-width: 569px) {
    width: 100%;
    margin-top: 16px;
    margin-right: 0px;
  }
}

.create-button {
  border-radius: 10px;
  width: 311px;
  height: 50px;
  @media only screen and (max-width: 569px) {
    width: 100%;
  }
}

.border-input-field {
  background-color: white;
  width: 590px;
  height: 44px;
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
  .q-field__native {
    padding: 0px !important;
    font-weight: 500;
    margin: 10px 0px;
    font-size: 16px !important;

    line-height: 24px !important;
    height: 24px;
  }
  .name-field {
    .material-icons {
      margin-bottom: 12px !important;
      padding-left: 0px;
    }
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
  margin: 30px 0px;
}

::v-deep {
  .input-placeholder {
    .q-placeholder {
      color: $manateeGrey !important;
      opacity: 1;
    }
  }
  .input-text-style {
    .q-field__native {
      color: #152141 !important;
    }
  }
}
</style>
