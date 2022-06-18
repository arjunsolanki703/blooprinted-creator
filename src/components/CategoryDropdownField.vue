<template>
  <q-skeleton
    v-if="isCategoryLoading"
    class="q-mt-md skeleton-width"
    type="QSlider"
  />
  <q-btn-dropdown
    v-else
    :label="exploreBtnLabel()"
    split
    flat
    no-caps
    unelevated
    :ripple="false"
    v-model="showFilterDropdown"
    content-class="border-radius-lg menu-options"
    content-style="margin-top: 10px !important;"
    class="explore-dropdown text-body1 word-break-break-all f-w-500 category-dropdown-scroll"
    :class="!showFilterDropdown ? 'border-class' : ''"
    no-icon-animation
    :text-color="
      exploreBtnLabel() == 'Select blooprint category'
        ? 'manateeGrey'
        : 'regalBlue'
    "
    :menu-offset="$q.screen.gt.xs ? menuOffset : [5, 20]"
    menu-anchor="bottom left"
    menu-self="top left"
    size="16px"
    dropdown-icon="expand_more"
    @click="showExploreMenu"
    @before-hide="animationEnterClass = ''"
  >
    <span
      v-if="Object.keys(categorySelected).length"
      @click="resetCategoryFilter"
      class="
            q-py-md q-pr-lg
            absolute-right
            text-body2 text-primary
            cursor-pointer
            z-top
          "
      >Clear
    </span>
    <div
      class="f-w-500 text-body1"
      style="width: fit-content"
      :class="showCategory ? 'category-menu' : 'sub-category-menu'"
    >
      <div class="row no-wrap">
        <div class="column">
          <transition-group
            :class="showCategory ? animationEnterClass : animationLeaveClass"
          >
            <div class="row" key="1" v-if="showCategory">
              <div
                v-for="(category, index) in allCategoriesList"
                :key="category.value"
                class="
                        col-md-6 col-sm-6 col-xs-12
                        category-item
                        cursor-pointer
                        text-regalBlue
                        remove-underline
                      "
                :class="[
                  index + 1 != allCategoriesList.length ? 'q-mb-md' : null,
                  $q.screen.gt.xs && (index + 1) % 2 == 0 ? 'q-pl-md' : null
                ]"
                @click="onCategorySelect(category)"
              >
                <span
                  :key="index"
                  class="word-break-break-word"
                  :class="
                    categorySelected &&
                    categorySelected['label'] == category.label
                      ? 'text-primary f-w-600'
                      : null
                  "
                  >{{ category.label }}
                </span>
              </div>
            </div>
            <div class="row" key="2" v-else>
              <div
                class="
                        f-w-600
                        full-width
                        text-body1 text-regalBlue
                        cursor-pointer
                      "
                style="margin-bottom: 14px"
                key="test"
                @click="backToCategoriesList"
              >
                <q-icon
                  size="24px"
                  name="chevron_left"
                  class="text-regalBlue"
                  style="margin-bottom: 2px"
                />
                {{ subCategories.label }}
              </div>
              <div
                v-for="(subCategory, index) in subCategories.subCategory"
                :key="subCategory['value']"
                class="
                        col-md-6 col-sm-6 col-xs-12
                        category-item
                        cursor-pointer
                        text-regalBlue
                        remove-underline
                        sub-category-label
                      "
                :class="
                  index + 1 != subCategories.subCategory.length
                    ? 'q-mb-md'
                    : null
                "
                @click="onSubCategorySelect(subCategory, subCategories)"
              >
                <span
                  class="word-break-break-word"
                  :key="index"
                  :class="
                    subCategorySelected &&
                    subCategorySelected['label'] == subCategory['label']
                      ? 'text-primary f-w-600'
                      : null
                  "
                  >{{ subCategory['label'] }}
                </span>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </q-btn-dropdown>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'CategoryDropdownField',
  data() {
    return {
      isCategoryLoading: true,
      menuOffset: Array(0, 20),
      showFilterDropdown: false,
      animationEnterClass: '',
      animationLeaveClass: 'reveal fade-right active',
      allCategoriesList: [],
      subCategories: {},
      categorySelected: {},
      subCategorySelected: {},
      showCategory: true,
      thumbStyle: {
        borderRadius: '10px'
      },
      barStyle: {
        width: '10px'
      }
    }
  },
  watch: {
    existingSelectedCategory(data) {
      if (data) {
        this.checkForSelectedCategory()
      }
    }
  },
  mounted() {
    this.getCategoryDetails()
  },
  props: ['existingSelectedCategory'],
  methods: {
    ...mapActions(['fetchCategorySubCategoryList']),
    async getCategoryDetails() {
      this.isCategoryLoading = true
      let data = await this.fetchCategorySubCategoryList({ sort: 'name' })
      this.isCategoryLoading = false
      this.allCategoriesList = data
      this.checkForSelectedCategory()
    },
    checkForSelectedCategory() {
      if (
        this.existingSelectedCategory &&
        this.existingSelectedCategory.length > 0
      ) {
        this.allCategoriesList.forEach(category => {
          if (category['value'] == this.existingSelectedCategory[0]['parent']) {
            this.categorySelected = category
            this.$emit('on-category-update', this.categorySelected)
            if (this.existingSelectedCategory[0]['child']) {
              category.subCategory.map(subCategory => {
                if (
                  subCategory['value'] ==
                  this.existingSelectedCategory[0]['child']
                ) {
                  this.subCategorySelected = subCategory
                  this.$emit('on-category-update', this.subCategorySelected)
                }
              })
            }
          }
        })
      }
    },
    showExploreMenu() {
      this.showFilterDropdown = true
    },
    exploreBtnLabel() {
      if (this.categorySelected && this.categorySelected['label']) {
        return (
          this.categorySelected['label'] +
          (this.subCategorySelected['label']
            ? ' - ' + this.subCategorySelected['label']
            : '')
        ).trim()
      } else {
        return 'Select blooprint category'
      }
    },
    resetCategoryFilter() {
      this.showFilterDropdown = false
      this.categorySelected = {}
      this.subCategorySelected = {}
      this.showCategory = true
      this.$emit('on-category-update', {})
    },
    backToCategoriesList() {
      this.subCategories = {}
      this.showCategory = true
    },
    onCategorySelect(data) {
      this.subCategorySelected = {}
      this.animationEnterClass = 'reveal fade-left active'
      if (data.subCategory.length > 0) {
        this.subCategories = data
        this.showCategory = false
      }
      this.categorySelected = data
      this.$emit('on-category-update', this.categorySelected)
    },
    onSubCategorySelect(subCategory, category) {
      this.showFilterDropdown = false
      this.categorySelected = category
      this.subCategorySelected = subCategory
      this.$emit('on-category-update', this.subCategorySelected)
    }
  }
}
</script>
<style lang="scss" scoped>
.skeleton-width {
  width: 452px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: auto;
  }
}
.menu-options {
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 10px !important;
    margin-top: 0px !important;
    margin-right: 10px !important;
  }
}

::v-deep {
  .scroll {
    display: none;
  }
}

.category-menu {
  max-width: 600px;
  height: 410px;
  padding: 30px;
  overflow: hidden;
  @media only screen and (max-width: $breakpoint-sm-max) {
    // max-width: 100%;
    //width: 100%;
    width: fit-content;
    height: auto;
  }
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.sub-category-menu {
  max-width: 600px;
  height: 410px;
  padding: 30px;
  overflow: hidden;
  @media only screen and (max-width: $breakpoint-sm-max) {
    // max-width: 100%;
    // width: 100%;
    width: fit-content;
    height: auto;
  }
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.category-item {
  &:hover {
    color: $primary;
    font-weight: 600 !important;
  }
}
.sub-category-label {
  padding-left: 30px;
}
.explore-dropdown[aria-expanded='true'] {
  color: $primary;
}
</style>
<style lang="scss">
.menu-drawer .q-drawer {
  width: 100vw !important;
}
.explore-dropdown {
  width: 452px;
  padding-left: 14px;
  padding-right: 14px;
  .q-item {
    padding-left: 0;
  }
  &:active .q-focus-helper,
  &:focus .q-focus-helper,
  &:hover .q-focus-helper {
    background: transparent !important;
  }
  .q-btn-dropdown--current {
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 24px;
    .q-btn__content {
      max-width: 510px !important;
      text-align: left;
      align-items: left !important;
      justify-content: left !important;
      @media only screen and (max-width: $breakpoint-md-max) {
        max-width: 400px !important;
      }
      @media only screen and (max-width: $breakpoint-sm-max) {
        max-width: 510px !important;
      }
    }
  }

  .border-class {
    // border: 1px solid $ghost !important;
    // border-radius: 8px;
    background-color: pink;
  }

  .q-btn-item {
    .q-btn__wrapper {
      padding: 0px !important;
    }
    .q-btn__content {
      .q-icon {
        font-size: 24px !important;
        color: $regalBlue;
      }
    }
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    .q-btn__content {
      text-align: left;
      align-items: left !important;
      justify-content: left !important;
      // width: 100%;
      word-break: break-word;
      .q-btn-dropdown__arrow {
        text-align: right !important;
      }
    }
    .q-btn-dropdown__arrow-container {
      margin-right: 10px !important;
    }
    width: 100%;
  }
  .q-focus-helper {
    background: white !important;
    opacity: 0.15;
  }
  .q-btn__wrapper {
    padding: 0px !important;
  }
  .q-btn__content {
    justify-content: start;
  }
}
.category-dropdown-scrol {
  ::-webkit-scrollbar {
    //width: 10px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    //background: $secondary;
    border-radius: 10px;
  }
  // ::-webkit-scrollbar-track {
  //   margin: 30px 0px;
  // }
}

.menu-options {
  .q-menu {
    //left:197px !important;
    @media only screen and (max-width: 738px) and (min-width: 600px) {
      left: 91px !important;
    }
    @media only screen and (max-width: 400px) {
      left: 10px !important;
    }
  }
}
</style>
