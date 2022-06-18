<template>
  <q-dialog v-model="showSocailMediaPopup" persistent>
    <q-card class="media-card">
      <div class="scroll-area">
        <div
          class="lt-md  flex flex-center relative-position"
          style="background: #F2F7FF;"
        >
          <q-img class="img-style" src="~assets/social-mobile.svg" />
          <q-icon
            name="img:closeIcon.svg"
            class="cursor-pointer text-right absolute"
            style="top: 20px; right: 15px"
            size="15px"
            @click="closePopup()"
          />
        </div>
        <div class="row">
          <div
            class="col-md gt-sm flex flex-center"
            style="background: #F2F7FF;"
          >
            <q-img src="~assets/socialImage.svg" />
          </div>
          <div class="col-md-8 col-sm-12 col-xs-12 flex column">
            <q-card-section>
              <div class="text-right gt-sm">
                <q-icon
                  name="img:closeIcon.svg"
                  class="cursor-pointer"
                  size="15px"
                  @click="closePopup()"
                />
              </div>
              <div class="f-w-600 text-fs-32-lh-34 text-regalBlue">
                Let's get you connected!
              </div>
              <div
                class="q-mt-sm social-heading text-regalBlue"
                :class="$q.screen.gt.xs ? 'f-w-500' : 'f-w-400'"
              >
                Connect your socials and get featured on our feed
              </div>
              <div class="social-fields">
                <q-form ref="profileForm">
                  <div
                    class="row"
                    v-for="(profile, i) in profileFieldsList"
                    :key="i"
                  >
                    <div class="profile-list col-md col-sm col-xs-11">
                      <label class="text-regalBlue text-body1 f-w-600">
                        Social Profile
                      </label>
                      <q-select
                        ref="profileDropdown"
                        borderless
                        v-model="profile.profileType"
                        :options="profile.profileOptions"
                        placeholder="Select to add"
                        :stack-label="false"
                        use-input
                        hide-selected
                        fill-input
                        emit-value
                        map-options
                        transition-hide="fade"
                        transition-show="fade"
                        dropdown-icon="img:chevrondown.svg"
                        input-debounce="0"
                        behavior="menu"
                        class="border-input-field input-style f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
                        style="padding-right: 14px !important; padding-left: 14px !important;"
                        popup-content-class="profile-dropdown"
                        popup-content-style="border-radius: 20px !important;
                     background: #ffffff !important; border: 2px solid #E8E9EC;
                     box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1) !important;
                     "
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Social profile is required'
                        ]"
                      >
                        <template
                          v-slot:prepend
                          v-if="profileFieldsList[i]['icon'] != ''"
                        >
                          <q-icon
                            size="20px"
                            :name="profileFieldsList[i]['icon']"
                          />
                        </template>
                        <template v-slot:option="scope">
                          <q-item
                            v-bind="scope.itemProps"
                            @click="onItemSelect(scope, i)"
                            v-close-popup
                          >
                            <q-item-section>
                              <div class="row items-center">
                                <q-icon size="20px" :name="scope.opt.icon" />
                                <q-item-label
                                  class="q-ml-md f-w-500 text-fs-14-lh-20"
                                  style="line-height: 20px !important;"
                                >
                                  {{ scope.opt.label }}
                                </q-item-label>
                              </div>
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                    <div
                      class="col-md-7 col-sm-7 col-xs-11"
                      :style="
                        $q.screen.lt.sm
                          ? 'margin-top: 16px'
                          : 'padding-left: 12px'
                      "
                    >
                      <label class="text-regalBlue text-body1 f-w-600">
                        Username or URL
                      </label>
                      <q-input
                        ref="profileUrl"
                        v-model.trim="profile.url"
                        type="text"
                        input-class="input-field-style"
                        class="border-input-field input-style subtitle-letterspace q-mt-xs q-mb-lg  q-pb-none"
                        style="padding-right: 14px !important; padding-left: 14px !important;"
                        borderless
                        placeholder="Social profile username or link"
                        :disable="profile.profileType == ''"
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Username or url is required',
                          val =>
                            (val && socialUrlValidity(profile)) ||
                            'Enter valid Username or url'
                        ]"
                      />
                    </div>
                    <div
                      style="width: 25px; height: 20px;"
                      v-if="profileFieldsList.length <= 1"
                    >
                      <q-img
                        class="cursor-pointer invisible"
                        :style="
                          $q.screen.lt.sm
                            ? 'margin-top: 60px'
                            : 'margin-top:40px'
                        "
                        src="~assets/deletepicture.svg"
                        width="20px"
                        height="20px"
                        @click="onDeleteClick(i)"
                      />
                    </div>
                    <div
                      style="width: 20px; height: 20px;"
                      v-if="profileFieldsList.length > 1"
                    >
                      <q-img
                        class="q-ml-sm cursor-pointer"
                        :style="
                          $q.screen.lt.sm
                            ? 'margin-top: 60px'
                            : 'margin-top:40px'
                        "
                        src="~assets/deletepicture.svg"
                        width="20px"
                        height="20px"
                        @click="onDeleteClick(i)"
                      />
                    </div>
                  </div>
                </q-form>
              </div>
              <q-btn
                class="add-more-btn q-mt-sm"
                icon="add_circle_outline"
                label="Add more social profile"
                no-caps
                unelevated
                :disable="profileFieldsList.length == 4"
                @click="addNewSocialProfile"
              />
              <div class="row lt-md q-mt-xl q-pb-sm-none">
                <div class="col">
                  <q-btn
                    class="text-primary f-w-600 text-body1 skip-btn"
                    label="Skip"
                    no-caps
                    unelevated
                    @click="onSkipClick"
                  />
                </div>
                <div class="col text-right">
                  <q-btn
                    label="Save"
                    class="text-white f-w-600 text-body1 save-btn"
                    color="primary"
                    no-caps
                    unelevated
                    @click="onSaveClick"
                  />
                </div>
              </div>
            </q-card-section>
            <q-space />
            <div class="row btns-padding gt-sm">
              <div class="col">
                <q-btn
                  class="text-primary f-w-600 text-body1 skip-btn"
                  label="Skip"
                  no-caps
                  unelevated
                  @click="onSkipClick"
                />
              </div>
              <div class="col text-right">
                <q-btn
                  label="Save"
                  class="text-white f-w-600 text-body1 save-btn"
                  color="primary"
                  no-caps
                  unelevated
                  @click="onSaveClick"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      showSocailMediaPopup: false,
      profileType: '',
      userName: '',
      options: [
        {
          label: 'Facebook',
          value: 'facebook',
          icon: 'img:facebook-logo.svg'
        },
        {
          label: 'Twitter',
          value: 'twitter',
          icon: 'img:twitter-logo.svg'
        },
        {
          label: 'Instagram',
          value: 'instagram',
          icon: 'img:InstagramBlack.svg'
        },
        {
          label: 'Linkedin',
          value: 'linkedin',
          icon: 'img:linkedin-logo.svg'
        }
      ],
      profileFieldsList: []
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  mounted() {
    this.showSocailMediaPopup = true
    this.profileFieldsList = [
      { profileType: '', url: '', profileOptions: this.options, icon: '' }
    ]
  },
  methods: {
    ...mapActions(['updateProfileInfo']),
    socialUrlValidity(profile) {
      if (profile['profileType'] != '') {
        if (
          profile['url'].includes(profile['profileType']) ||
          profile['url'].includes('https://')
        ) {
          let url = `${profile['profileType']}.com/`
          let domain = `${profile['profileType']}.com/`
          if (
            profile['url'].includes(url) &&
            profile['url'].includes('https://')
          ) {
            let userName = profile['url'].split(domain)
            if (userName[1].length >= 1) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        } else {
          if (!profile['url'].includes(':') && !profile['url'].includes('/')) {
            return true
          }
        }
      } else {
        return false
      }
    },
    onItemSelect(scope, index) {
      this.profileFieldsList[index]['profileType'] = scope['opt']['value']
      this.profileFieldsList[index]['icon'] = scope['opt']['icon']

      this.updateProfileOptions()
    },
    updateProfileOptions() {
      let selectedList = []
      this.profileFieldsList.forEach(item => {
        if (item['profileType'] != '') {
          selectedList.push(item['profileType'])
        }
      })
      this.profileFieldsList.forEach(item => {
        let filterOptions = []
        this.options.map((option, index) => {
          if (selectedList.includes(option['value'])) {
            if (option['value'] == item['profileType']) {
              filterOptions.push(option)
            }
          } else {
            filterOptions.push(option)
          }
        })
        item['profileOptions'] = filterOptions
      })
    },
    addNewSocialProfile() {
      if (this.profileFieldsList.length < this.options.length) {
        let data = {
          profileType: '',
          url: '',
          profileOptions: this.options,
          icon: ''
        }
        this.profileFieldsList.push(data)
        this.updateProfileOptions()
      }
    },
    onDeleteClick(index) {
      this.profileFieldsList.splice(index, 1)
      this.updateProfileOptions()
    },
    onSaveClick() {
      if (this.$refs.profileDropdown.length > 0) {
        this.$refs.profileDropdown.forEach(item => {
          item.validate()
        })
      }
      if (this.$refs.profileUrl.length > 0) {
        this.$refs.profileUrl.forEach(item => {
          item.validate()
        })
      }
      this.$refs.profileForm.validate().then(success => {
        if (success) {
          let params = {
            ...this.userProfile
          }
          params['showOnboardingForm'] = true
          params['socialMediaLinks'] = {
            linkedIn: '',
            instagram: '',
            facebook: '',
            twitter: ''
          }
          this.profileFieldsList.forEach(item => {
            switch (item['profileType']) {
              case 'linkedin':
                params['socialMediaLinks']['linkedIn'] = item['url'].includes(
                  'https://'
                )
                  ? item['url']
                  : `https://in.linkedin.com/in/${item['url']}`
                break
              case 'instagram':
                params['socialMediaLinks']['instagram'] = item['url'].includes(
                  'https://'
                )
                  ? item['url']
                  : `https://instagram.com/${item['url']}`
                break
              case 'facebook':
                params['socialMediaLinks']['facebook'] = item['url'].includes(
                  'https://'
                )
                  ? item['url']
                  : `https://facebook.com/${item['url']}`
                break
              case 'twitter':
                params['socialMediaLinks']['twitter'] = item['url'].includes(
                  'https://'
                )
                  ? item['url']
                  : `https://twitter.com/${item['url']}`
                break
            }
          })
          this.updateUserProfile(params)
        }
      })
    },
    async updateUserProfile(params) {
      let data = {
        data: {
          type: 'profiles',
          attributes: params
        },
        profileId: localStorage.getItem('userId'),
        requestFrom: 'socialMediaSkip'
      }
      delete data['data']['attributes']['email']
      delete data['data']['attributes']['firebaseUID']

      let response = await this.updateProfileInfo(data)
      if (response) {
        this.closePopup()
      }
    },
    onSkipClick() {
      let params = {
        ...this.userProfile
      }
      params['showOnboardingForm'] = true
      params['socialMediaLinks'] = {
        linkedIn: '',
        instagram: '',
        facebook: '',
        twitter: ''
      }
      this.updateUserProfile(params)
    },
    closePopup() {
      this.showSocailMediaPopup = false
      this.$emit('on-social-media-close')
    }
  }
}
</script>
<style lang="scss" scoped>
.img-style {
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 343px;
    height: 248px;
  }
}
.text-fs-32-lh-34 {
  font-size: 32px;
  line-height: 34px;
}
.social-heading {
  font-size: 20px;
  line-height: 34px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 16px;
    line-height: 20px;
  }
}
.media-card {
  width: 60%;
  max-width: 80vh;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  overflow-y: hidden;
  .q-card__section {
    width: 100%;
    padding: 25px 25px 25px 15px;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 30px 16px;
    }
  }
  @media only screen and (max-width: $breakpoint-xl-max) {
    width: 60%;
    max-width: 1500px !important;
  }
  @media only screen and (max-width: $breakpoint-lg-max) {
    width: 85%;
    max-width: 60vw !important;
  }
  @media only screen and (max-width: $breakpoint-md-max) {
    width: 85%;
    max-width: 95vw !important;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 85%;
  }
  @media only screen and (max-width: 700px) {
    width: 90%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
  }
}
.scroll-area {
  max-height: 90vh;
  overflow-y: auto;
  @media only screen and (max-width: $breakpoint-xl-max) {
    max-height: 60vh;
  }
  @media only screen and (max-width: $breakpoint-lg-max) {
    max-height: 70vh;
  }
  @media only screen and (max-width: $breakpoint-md-max) {
    max-height: 65vh;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-height: 85vh !important;
  }
}
.profile-list {
  @media only screen and (min-width: $breakpoint-xs-max) {
    // max-width: 190px;
  }
}
.social-fields {
  margin-top: 48px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px;
  }
}
::v-deep {
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
  .add-more-btn {
    background: #f2f7ff;
    border: 1px solid #f2f7ff;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #0052cd;
    .q-btn__wrapper {
      padding: 8px 14px !important;
      .q-btn__content {
        .on-left {
          margin-right: 8px;
        }
      }
    }
  }
  .skip-btn {
    width: 95px;
    height: 50px;
    background: #ffffff;
    border: 2px solid $primary;
    box-sizing: border-box;
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 10px 30px !important;
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 8px 20px !important;
      }
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 75px !important;
      height: 45px !important;
    }
  }
  .save-btn {
    width: 115px;
    height: 50px;
    border-radius: 10px;
    .q-btn__wrapper {
      padding: 10px 30px !important;
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 8px 20px !important;
      }
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 95px !important;
      height: 45px !important;
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
  margin: 10px 0px;
}
.btns-padding {
  margin: 60px 30px 30px 23px;
  @media only screen and (min-width: 600px) and (max-width: $breakpoint-sm-max) {
    margin-bottom: 0px !important;
  }
}
</style>
<style lang="scss">
.q-dialog {
  .q-dialog__backdrop {
    background: $regalBlue !important;
    opacity: 0.7 !important;
  }
  .q-dialog__inner--minimized {
    padding: 16px !important;
  }
}
.q-menu.profile-dropdown {
  width: 200px;
}
</style>
