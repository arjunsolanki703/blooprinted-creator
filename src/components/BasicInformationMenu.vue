<template>
  <div class="basic-card-padding">
    <div class="f-w-600 basic-heading text-regalBlue">Basic Information</div>
    <div v-if="!blooprintDetails.id">
      <q-skeleton type="QSlider" />
      <q-skeleton class="q-mt-md" type="QSlider" />
      <q-skeleton class="save-btn" type="QBtn" />
    </div>
    <q-form v-else ref="basicInfoForm">
      <div>
        <label class="f-w-600 text-body1 text-regalBlue">
          blooprint name
          <span class="text-errorColor">*</span>
        </label>
        <q-input
          v-model.trim="blooprintName"
          style="margin-top:4px;"
          type="text"
          ref="name"
          class="border-input-field input-style text-regalBlue subtitle-letterspace q-mt-xs q-mb-lg q-pb-none"
          borderless
          placeholder="Enter blooprint name"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'blooprint name is required'
          ]"
        >
        </q-input>
      </div>
      <div class="q-mt-lg">
        <label class="f-w-600 text-body1 text-regalBlue">
          blooprint category
          <span class="text-errorColor">*</span>
        </label>
      </div>
      <div>
        <CategoryDropdownField
          class="border-input-field q-mt-xs"
          :class="isCategoryInvalid ? 'no-category' : null"
          :existingSelectedCategory="existingSelectedCategory"
          @on-category-update="onCategoryUpdate"
        />
        <div class="f-w-500 err-msg" v-if="isCategoryInvalid">
          blooprint category is required
        </div>
      </div>
      <q-btn
        color="primary"
        class="save-btn text-body1 f-w-600"
        text-color="white"
        label="Save"
        no-caps
        unelevated
        @click="updateBlooprintBasicInfo()"
      />
    </q-form>
  </div>
</template>
<script>
import CategoryDropdownField from 'components/CategoryDropdownField.vue'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      blooprintName: this.blooprintDetails?.attributes?.name,
      category: '',
      categoryList: [{ label: 'Select a Category', value: '' }],
      existingSelectedCategory: [],
      categorySelected: {},
      isCategoryInvalid: false
    }
  },
  props: ['blooprintDetails', 'isSaveDraftClicked'],
  components: {
    CategoryDropdownField
  },
  watch: {
    blooprintDetails(data) {
      this.blooprintName = data?.attributes?.name
      this.existingSelectedCategory = data?.attributes?.categoryIDs
    },
    isSaveDraftClicked(isClicked) {
      if (isClicked) {
        this.updateBlooprintBasicInfo()
      }
    }
  },
  mounted() {
    this.blooprintName = this.blooprintDetails?.attributes?.name
    this.existingSelectedCategory = this.blooprintDetails?.attributes?.categoryIDs
  },
  methods: {
    ...mapActions(['updateBlooprint']),
    async updateBlooprintBasicInfo() {
      this.$refs.name.validate()
      if (!this.categorySelected['value']) {
        this.isCategoryInvalid = true
      }
      this.$refs.basicInfoForm.validate().then(async success => {
        if (success) {
          if (this.categorySelected['value']) {
            this.isCategoryInvalid = false
            let params = {
              blooprintId: this.blooprintDetails.id,
              ...this.blooprintDetails.attributes
            }
            params['name'] = this.blooprintName
            // params['categoryIDs'] = [this.categorySelected.value]
            params['categories'] = [this.categorySelected.value]
            let data = await this.updateBlooprint(params)
            if (data['id']) {
              this.$emit('on-blooprint-data-update')
            }
          }
        }
      })
    },
    onCategoryUpdate(event) {
      this.categorySelected = event
      if (!event['value']) {
        this.isCategoryInvalid = true
      } else {
        this.isCategoryInvalid = false
      }
    },
    isSaved() {
      if (
        this.blooprintDetails.attributes &&
        this.categorySelected &&
        this.categorySelected.label
      ) {
        if (
          this.blooprintDetails.attributes.name == this.blooprintName &&
          this.categorySelected.label ==
            this.blooprintDetails.attributes.categories[0]
        ) {
          return true
        } else {
          return false
        }
      }
      return true
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
.basic-card-padding {
  padding: 40px 40px 200px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 16px 0px 100px 0px;
  }
}
.basic-heading {
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 32px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 24px;
  }
}
::v-deep {
  .input-style {
    height: 44px;
    width: 452px;
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
.no-category {
  border: 1px solid $errorColor !important;
  transition: border 0.5s;
  box-shadow: 0 0 5px $errorColor;
  transition: box-shadow 0.2s;
}
</style>
