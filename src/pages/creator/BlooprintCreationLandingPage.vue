<template>
  <q-page>
    <div class="bg-regalBlue text-white q-py-sm back-option">
      <div class="row">
        <img
          class="cursor-pointer"
          @click="navigateToDashboard"
          src="~assets/backleftArrow.svg"
        />
        <div
          class="q-ml-sm flex flex-center cursor-pointer"
          @click="navigateToDashboard"
        >
          Back to dashboard
        </div>
      </div>
    </div>
    <div class="screen-bg">
      <div style="padding-bottom: 32px" v-if="isLoading">
        <div class="row gt-sm">
          <q-skeleton type="rect" width="20%" />
          <q-skeleton type="QBadge" class="q-mt-sm q-ml-md q-mx-xs" />
          <div class="col flex justify-end">
            <q-skeleton type="QBtn" class="q-mx-md" />
            <!-- <q-skeleton type="QBtn" class="q-mx-md" /> -->
            <q-skeleton type="QBtn" />
          </div>
        </div>
        <div class="lt-md">
          <div class="row">
            <q-skeleton type="rect" width="70%" />
            <q-skeleton type="QBadge" class="q-mt-xs q-ml-md" />
          </div>
          <q-skeleton type="QSlider" class="q-my-md" />

          <!-- <q-skeleton
            type="text"
            class="q-mb-sm"
            width="80%"
            style="visibility: hidden"
          /> -->

          <div class="col flex q-mt-sm q-mb-sm">
            <q-skeleton
              type="QBtn"
              :class="$q.screen.width < 340 ? 'q-mr-sm' : 'q-mr-md'"
            />
            <!-- <q-skeleton
              type="QBtn"
              :class="$q.screen.width < 340 ? 'q-mr-sm' : 'q-mr-md'"
            /> -->
            <q-skeleton type="QBtn" />
          </div>
        </div>
      </div>
      <div class="row gt-sm" style="padding-bottom: 32px" v-else>
        <div class="f-w-600 text-regalBlue header-letterspace blooprint-name">
          <span class="ellipsis word-break-break-word">
            {{ blooprintDetails['attributes']['name'] }}
          </span>
          <q-tooltip anchor="bottom middle" self="top middle">
            <div class="word-break-break-word">
              {{ blooprintDetails['attributes']['name'] }}
            </div>
          </q-tooltip>
        </div>
        <div class="draft-style q-my-sm text-regalBlue f-w-400">
          {{
            blooprintDetails['attributes']['status'] == 'progress'
              ? 'Draft'
              : blooprintDetails['attributes']['status'] == 'unpublish'
              ? 'Unpublished'
              : 'Published'
          }}
        </div>
        <div class="col flex justify-end">
          <div class="text-body1 f-w-500 text-comet q-my-sm auto-save-txt">
            <!-- Auto saved at 13:00ET -->
          </div>
          <q-btn-dropdown
            class="border-radius-5 preview-btn bg-selectiveYellow q-mr-md text-regalBlue f-w-600"
            content-class="user-dropdown-content menu-box-shadow border-radius-lg"
            label="Preview"
            no-caps
            unelevated
            :dropdown-icon="`img:${dropDownIcon}`"
            size="14px"
            flat
            no-icon-animation
            :menu-offset="[0, 10]"
            :menu-anchor="'bottom left'"
            :menu-self="'top left'"
            auto-close
            :ripple="false"
          >
            <q-card>
              <q-card-section
                class="card-section text-regalBlue f-w-600 f-s-16 text-lh-24"
                style="
               max-height: 140px; padding: 30px"
              >
                <div
                  class="q-mb-md cursor-pointer hover-effect"
                  @click="
                    onClick(
                      `/blooprint/pre-purchase/${$route.params.blooprintId}`
                    )
                  "
                >
                  Pre-Purchase blooprint
                </div>
                <q-separator
                  inset
                  class="col-12 q-ma-none"
                  style="height: 2px; background: #e8e9ec"
                />
                <div class="cursor-pointer hover-effect q-mt-md"
                  @click="
                    onClick(
                      `/blooprint/post-purchase/${$route.params.blooprintId}`
                    )
                  "
                >
                  Post-Purchase blooprint
                </div>
              </q-card-section>
            </q-card>
          </q-btn-dropdown>
          <!-- <q-btn
            color="primary"
            class="border-radius-5 save-draft-btn f-w-600 q-mx-md"
            text-color="white"
            label="Save Draft"
            no-caps
            unelevated
            @click="onSaveDraftClick"
          /> -->
          <q-btn
            class="publish-btn f-w-400"
            text-color="black"
            label="Publish"
            no-caps
            unelevated
            @click="onPublishClick"
            v-if="
              blooprintDetails['attributes']['status'] == 'progress' ||
                blooprintDetails['attributes']['status'] == 'unpublish'
            "
          />
          <q-btn
            class="publish-btn f-w-400"
            text-color="black"
            label="Unpublish"
            no-caps
            unelevated
            @click="onUnPublishClick"
            v-if="blooprintDetails['attributes']['status'] == 'active'"
          />
        </div>
      </div>
      <div class="col lt-md" style="padding-bottom: 24px" v-if="!isLoading">
        <div class="row">
          <div
            class="f-w-600 text-regalBlue header-letterspace blooprint-name "
          >
            <span class="ellipsis word-break-break-word">
              {{ blooprintDetails['attributes']['name'] }}
            </span>
            <q-tooltip anchor="bottom middle" self="top middle">
              <div class="word-break-break-word">
                {{ blooprintDetails['attributes']['name'] }}
              </div>
            </q-tooltip>
          </div>
          <div class="draft-style q-my-sm text-regalBlue f-w-400">
            {{
              blooprintDetails['attributes']['status'] == 'progress'
                ? 'Draft'
                : blooprintDetails['attributes']['status'] == 'unpublish'
                ? 'Unpublished'
                : 'Published'
            }}
          </div>
        </div>
        <q-select
          borderless
          v-model="selectedOption"
          class="border-input-field input-style bg-white q-mt-sm q-mb-md"
          :options="menuOptionsList"
          transition-show="jump-up"
          transition-hide="jump-up"
          dropdown-icon="img:chevrondown.svg"
          emit-value
          map-options
          @input="onMenuItemSelect(selectedOption)"
        />
        <!-- <div
          class="f-w-500 text-comet q-mb-sm auto-save-txt"
        >
          Auto saved at
        </div> -->
        <div class="row">
          <q-btn-dropdown
            class="border-radius-5 preview-btn bg-selectiveYellow q-mr-md text-regalBlue f-w-600"
            content-class="user-dropdown-content menu-box-shadow border-radius-lg"
            label="Preview"
            no-caps
            unelevated
            :dropdown-icon="`img:${dropDownIcon}`"
            size="14px"
            flat
            no-icon-animation
            :menu-offset="$q.screen.width > 360 ? [0, 10] : [0, 10]"
            :menu-anchor="
              $q.screen.width > 360 ? 'bottom left' : 'bottom right'
            "
            :menu-self="$q.screen.width > 360 ? 'top left' : 'top right'"
            auto-close
            :ripple="false"
          >
            <q-card>
              <q-card-section
                class="card-section text-regalBlue f-w-600 f-s-16 text-lh-24"
                style="
               max-height: 140px; padding: 30px"
              >
                <div
                  class="q-mb-md cursor-pointer hover-effect"
                  @click="
                    onClick(
                      `/blooprint/pre-purchase/${$route.params.blooprintId}`
                    )
                  "
                >
                  Pre-Purchase blooprint
                </div>
                <q-separator
                  inset
                  class="col-12 q-ma-none"
                  style="height: 2px; background: #e8e9ec"
                />
                <div class="cursor-pointer hover-effect q-mt-md"
                  @click="
                    onClick(
                      `/blooprint/post-purchase/${$route.params.blooprintId}`
                    )
                  "
                >
                  Post-Purchase blooprint
                </div>
              </q-card-section>
            </q-card>
          </q-btn-dropdown>

          <!-- <q-btn
            color="primary"
            class="border-radius-5 save-draft-btn f-w-600 q-mx-md"
            text-color="white"
            label="Save Draft"
            no-caps
            unelevated
          /> -->
          <q-btn
            class="publish-btn f-w-400"
            text-color="black"
            label="Publish"
            no-caps
            unelevated
            @click="onPublishClick"
            v-if="
              blooprintDetails['attributes']['status'] == 'progress' ||
                blooprintDetails['attributes']['status'] == 'unpublish'
            "
          />
          <q-btn
            class="publish-btn f-w-400"
            text-color="black"
            label="Unpublish"
            no-caps
            unelevated
            @click="onUnPublishClick"
            v-if="blooprintDetails['attributes']['status'] == 'active'"
          />
        </div>
      </div>
      <div class="flex no-wrap" v-if="$q.screen.gt.sm">
        <div class="left-container">
          <q-card class="menu-card flex column bg-white">
            <div class="full-width">
              <div
                class="flex cursor-pointer no-wrap"
                v-for="menu in menuOptionsList"
                :key="menu.value"
                :class="
                  selectedMenu === menu.value
                    ? 'selected-menu-option full-width'
                    : 'menu-options'
                "
                @click="onMenuItemSelect(menu.value)"
              >
                <label
                  class="menu-option-text cursor-pointer text-regalBlue full-width"
                >
                  <div class="subtitle-letterspace">
                    {{ menu.label }}
                  </div>
                </label>
                <q-space />
                <img src="~assets/chevron-right-blue.svg" id="right" />
              </div>
            </div>
          </q-card>
          <div style="margin-top: 30px" class="f-w-500 text-body1">
            Need help?
            <a href="mailto:team@blooprinted.com" target="_blank" class="text-primary">
              Email us
            </a>
            <!-- <span class="text-primary text-underline"></span> -->
          </div>
        </div>
        <div class="full-width right-container">
          <q-card class="right-card" style="margin-bottom: 160px">
            <BasicInformationMenu
              ref="basic"
              :blooprintDetails="blooprintDetails"
              @on-blooprint-data-update="onBlooprintDetailsUpdate('basic')"
              v-if="selectedMenu === 'basic'"
              :isSaveDraftClicked="isSaveDraftClicked"
            />
            <MilestonesMenu
              ref="milestone"
              :blooprintDetails="blooprintDetails"
              @on-blooprint-data-update="onBlooprintDetailsUpdate('milestone')"
              v-if="selectedMenu === 'milestone'"
              :isSaveDraftClicked="isSaveDraftClicked"
            />
            <GeneralMenu
              ref="general"
              :blooprintDetails="blooprintDetails"
              @on-blooprint-data-update="onBlooprintDetailsUpdate('general')"
              v-if="selectedMenu === 'general'"
              :isSaveDraftClicked="isSaveDraftClicked"
            />
            <PricingMenu
              ref="pricing"
              :blooprintDetails="blooprintDetails"
              @on-blooprint-data-update="onBlooprintDetailsUpdate('pricing')"
              v-if="selectedMenu === 'pricing'"
              :isSaveDraftClicked="isSaveDraftClicked"
            />
          </q-card>
        </div>
      </div>
      <div v-if="$q.screen.lt.md" class="bg-white">
        <BasicInformationMenu
          ref="basic"
          :blooprintDetails="blooprintDetails"
          @on-blooprint-data-update="onBlooprintDetailsUpdate('basic')"
          v-if="selectedMenu === 'basic'"
          :isSaveDraftClicked="isSaveDraftClicked"
        />
        <MilestonesMenu
          ref="milestone"
          :blooprintDetails="blooprintDetails"
          @on-blooprint-data-update="onBlooprintDetailsUpdate('milestone')"
          v-if="selectedMenu === 'milestone'"
          :isSaveDraftClicked="isSaveDraftClicked"
        />
        <GeneralMenu
          ref="general"
          :blooprintDetails="blooprintDetails"
          @on-blooprint-data-update="onBlooprintDetailsUpdate('general')"
          v-if="selectedMenu === 'general'"
          :isSaveDraftClicked="isSaveDraftClicked"
        />
        <PricingMenu
          ref="pricing"
          :blooprintDetails="blooprintDetails"
          @on-blooprint-data-update="onBlooprintDetailsUpdate('pricing')"
          v-if="selectedMenu === 'pricing'"
          :isSaveDraftClicked="isSaveDraftClicked"
        />
      </div>
    </div>
    <q-dialog v-model="showPublishPopup" persistent>
      <PublishBlooprintPopup
        :blooprintDetails="blooprintDetails"
        :id="blooprintDetails['id']"
        @close-publish-popup="closePublishPopup"
      />
    </q-dialog>
    <q-dialog v-model="showUnPublishPopup" persistent>
      <UnpublishBlooprintPopup
        :id="blooprintDetails['id']"
        @close-unpublish-popup="closeUnPublishPopup"
      />
    </q-dialog>
    <q-dialog v-model="showAlertPopup" persistent>
      <alert-popup
        @onConfirm="onConfirm"
        @close-popup="val => $q.screen.lt.md ? onClosePopup(val) : showAlertPopup = val"
       />
    </q-dialog>
  </q-page>
</template>
<script>
import BasicInformationMenu from 'components/BasicInformationMenu.vue'
import MilestonesMenu from 'components/MilestonesMenu.vue'
import GeneralMenu from 'components/GeneralMenu.vue'
import PricingMenu from 'components/PricingMenu.vue'
import PublishBlooprintPopup from 'components/PublishBlooprintPopup.vue'
import UnpublishBlooprintPopup from 'components/UnpublishBlooprintPopup.vue'
import AlertPopup from 'src/components/AlertPopup.vue'

import { mapActions } from 'vuex'

export default {
  name: 'BlooprintCreationLandingPage',
  data() {
    return {
      menuOptionsList: [
        { label: 'Basic Information', value: 'basic' },
        { label: 'Milestones', value: 'milestone' },
        { label: 'General', value: 'general' },
        { label: 'Pricing', value: 'pricing' }
      ],
      selectedMenu: '',
      blooprintDetails: {},
      isLoading: true,
      isSaveDraftClicked: false,
      from: null,
      showPublishPopup: false,
      showUnPublishPopup: false,
      dropDownIcon: require('src/assets/chevron-down-black.svg'),
      showAlertPopup: false,
      selectedOption: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from
    })
  },
  meta() {
    return {
      title: this.metaTitle
    }
  },
  components: {
    BasicInformationMenu,
    MilestonesMenu,
    GeneralMenu,
    PricingMenu,
    PublishBlooprintPopup,
    UnpublishBlooprintPopup,
    AlertPopup
  },
  computed: {
    metaTitle() {
      return this.blooprintDetails['attributes'] !== undefined
        ? this.blooprintDetails['attributes']['name'] + ' - blooprinted'
        : 'blooprinted'
    }
  },
  mounted() {
    this.checkDefaultMenu()
    this.fetchBlooprintDetailsById()
  },
  methods: {
    ...mapActions(['getBlooprintDetailsById', 'publishBlooprint']),
    checkDefaultMenu() {
      if (this.from && this.from.name === 'getstarted') {
        this.selectedMenu = 'milestone'
        this.selectedOption = 'milestone'
      } else {
        this.selectedMenu = 'basic'
        this.selectedOption = 'basic'
      }
    },
    onMenuItemSelect(menu) {
      if(this.selectedMenu != menu){
        let val = this.$refs[this.selectedMenu].isSaved()
        if(val){
          this.selectedMenu = menu
          this.selectedOption = menu
        }
        else{
          this.showAlertPopup = true
          this.selectedOption = menu
        }
      }
    },
    onConfirm(val){
      this.selectedMenu = this.selectedOption
    },
    onClosePopup(val){
      this.showAlertPopup = val
      this.selectedOption = this.selectedMenu

    },
    async fetchBlooprintDetailsById() {
      this.isLoading = true
      let data = await this.getBlooprintDetailsById()
      this.isLoading = false
      this.blooprintDetails = data
    },
    onBlooprintDetailsUpdate(menuType) {
      if (menuType == 'basic') {
        this.selectedMenu = 'milestone'
        this.selectedOption = 'milestone'
      } else if (menuType == 'milestone') {
        this.selectedMenu = 'general'
         this.selectedOption = 'general'
      } else if (menuType == 'general') {
        this.selectedMenu = 'pricing'
        this.selectedOption = 'pricing'
      }
      this.fetchBlooprintDetailsById()
    },
    navigateToDashboard() {
      this.$router.push({ name: 'my-blooprints' })
    },
    onSaveDraftClick() {
      this.isSaveDraftClicked = true
      let interval = setTimeout(() => {
        this.isSaveDraftClicked = false
        clearTimeout(interval)
      }, 1000)
    },
    onPublishClick() {
      this.showPublishPopup = true
    },
    onUnPublishClick() {
      this.showUnPublishPopup = true
    },
    closeUnPublishPopup(event) {
      this.showUnPublishPopup = false
    },
    onClick(url){
      window.open(url, '_blank')
    },
    closePublishPopup() {
      this.showPublishPopup = false
    }
    // async closeConfirmationPopup(type) {
    //   this.confirmationPopup = false
    //   if (type == 'yes') {
    //     let isPublishSuccess = await this.publishBlooprint(
    //       this.$router.history.current.params.blooprintId
    //     )
    //     if (isPublishSuccess) {
    //       this.fetchBlooprintDetailsById()
    //     }
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.back-option {
  padding-left: 56px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-left: 15px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
}
.screen-bg {
  padding: 48px 52px 0px 52px;
  background: linear-gradient(
    to bottom,
    $solitudeBlue 0%,
    $solitudeBlue 310px,
    #ffffff 310px,
    #ffffff 100%
  );
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px 0px 15px;
    background: linear-gradient(
      to bottom,
      $solitudeBlue 0%,
      $solitudeBlue 190px,
      #ffffff 190px,
      #ffffff 100%
    );
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 20px 15px 0px 15px;
    background: linear-gradient(
      to bottom,
      $solitudeBlue 0%,
      $solitudeBlue 180px,
      #ffffff 180px,
      #ffffff 100%
    );
  }
}
.blooprint-name {
  font-size: 32px;
  line-height: 40px;
  max-width: 300px;
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media only screen and (max-width: 1080px) {
    font-size: 24px;
    line-height: 28px;
    max-width: 200px;
    margin-right: 16px;
  }
  @media only screen and (max-width: $breakpoint-sm) {
    font-size: 24px;
    line-height: 28px;
    max-width: 80%;
    margin-right: 16px;
  }
  @media only screen and (max-width: $breakpoint-xs) {
    max-width: 60%;
  }
}
.draft-style {
  // width: 46px;
  height: 24px;
  border: 1px solid $ghost;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 3px 8px;
  background: $solitude;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  line-height: 18px;
}

::v-deep {
  .publish-btn {
    background: rgba(22, 82, 240, 0.1);
    border-radius: 2px;
    font-size: 16px;
    line-height: 24px;
    .q-btn__wrapper {
      padding: 8px 20px;
      min-height: 0px;
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 4px 8px;
      }
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 14px;
      line-height: 21px;
    }
  }
  .save-draft-btn {
    font-size: 16px;
    line-height: 24px;
    .q-btn__wrapper {
      padding: 8px 20px;
      min-height: 0px;
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 4px 8px;
      }
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 14px;
      line-height: 21px;
    }
  }
  .preview-btn {
    font-size: 16px !important;
    line-height: 24px !important;
    .q-btn__wrapper {
      padding: 8px 20px;
      min-height: 0px;
      .q-btn__content {
        .q-icon {
          font-size: 24px !important;
          @media only screen and (max-width: $breakpoint-xs-max) {
            font-size: 20px !important;
          }
        }
        .on-right {
          margin-left: 8px;
        }
      }
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 4px 8px;
      }
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      font-size: 14px !important;
      line-height: 21px !important;
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
}
.left-container {
  @media only screen and (max-width: $breakpoint-sm) {
    width: 100%;
    margin-right: 0;
  }
  margin-right: 20px;
  width: 40%;
}
.right-container {
  max-width: 72% !important;
  @media only screen and (max-width: $breakpoint-sm) {
    display: none;
    max-width: 60% !important;
  }
}
.menu-card {
  align-items: flex-start;
  padding: 24px 24px 8px 24px;
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px;
    box-shadow: none;
    border-radius: 0;
  }
}
.menu-options {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px !important;
  height: 48px;
  background: #ffffff;
  border: 2px solid $solitudeBlue !important;
  box-sizing: border-box;
  border-radius: 8px !important;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 0px 16px 0px !important;
  transition: box-shadow 0.2s linear;
}
#right {
  left: 0;
  position: relative;
  transition: left 0.3s linear;
}
.menu-options {
  transition: box-shadow 0.2s;

  &:hover {
    border-color: $dodgerBlue !important;
    box-shadow: 0 0 5px $dodgerBlue;
    #right {
      left: 5px;
      transition: left 0.3s linear;
    }
  }
}
.menu-option-text {
  font-weight: 500 !important;
  font-size: 16px;
  line-height: 24px;
  display: block;
  align-items: center;
}

.selected-menu-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px !important;
  height: 48px;
  order: 1 !important;
  background: #e8eefd;
  border: 2px solid #5c86f5 !important;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 4px #e8eefd !important;
  border-radius: 8px !important;
  margin: 0px 0px 16px 0px !important;
}
.menu-icon {
  margin-left: 0px !important;
  margin-right: 10px !important;
  margin-top: 2px !important;
  margin-bottom: 2px !important;
  height: 20px !important;
  width: 20px !important;
}
.right-card {
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;
}
.auto-save-txt {
  margin-right: 16px;
  font-size: 16px;
  line-height: 24px;
  @media only screen and (max-width: 1070px) {
    margin-right: 10px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 14px;
    line-height: 20px;
  }
}
.confirmation-popup {
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.cross-icon {
  position: absolute;
  top: 25px;
  right: 25px;
}
.switch-popup {
  padding: 30px 0px 8px 0;
  @media screen and (max-width: 490px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    label {
      font-size: 26px;
    }
  }
}
.no-btn {
  height: 50px;
  width: 118px;
  border: 2px solid $primary;
  color: $primary !important;
  border-radius: 10px;
  border-width: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  @media screen and (max-width: 490px) {
    width: 100%;
  }
}
.yes-btn {
  padding-top: 4px;
  padding-bottom: 4px;
  width: 176px;
  height: 50px;
  background: $primary;
  border-radius: 10px;
  @media screen and (max-width: 490px) {
    width: 100%;
    margin-left: 0 !important;
    margin-bottom: 16px;
  }
}
.card-section .hover-effect {
  transition: color 0.3s;
  &:hover {
    color: $primary;
  }
}
</style>
