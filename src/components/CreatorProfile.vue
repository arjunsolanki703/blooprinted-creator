<template>
  <div>
    <div class="full-width full-height main-container">
      <label class="profile-heading text-letter-space">
        <img src="../assets/profile-blue-icon.svg" class="lt-md profile-icon" />
        My Profile</label
      >
      <div v-if="!profileData.id">
        <div class="first-name">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="last-name q-mt-lg">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="last-name q-mt-lg">
          <div class="row items-center justify-between">
            <div style="width: 48%">
              <div>
                <q-skeleton type="text" class="q-my-sm" width="42%" />
              </div>
              <div>
                <q-skeleton type="QRange" />
              </div>
            </div>
            <div style="width: 48%">
              <div>
                <q-skeleton type="text" class="q-my-sm" width="42%" />
              </div>
              <div>
                <q-skeleton type="QRange" />
              </div>
            </div>
          </div>
        </div>
        <div class="last-name q-mt-lg">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="last-name q-mt-lg">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="last-name q-mt-lg">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="last-name q-mt-lg">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="last-name q-mt-lg">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="row items-center justify-between">
          <q-skeleton type="rect" class="q-mt-lg" width="20%" />
          <q-skeleton type="QBtn" class="q-my-sm q-mt-lg" width="30%" />
        </div>
      </div>

      <q-form
        class="full-width"
        @submit.prevent="onSubmit"
        ref="userProfile"
        v-if="profileData.id"
      >
        <div class="first-name" style="">
          <label class="flex field-heading"
            >First Name <span class="text-red q-ml-xs">*</span></label
          >
          <q-input
            borderless
            dense
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
            placeholder="Enter First Name"
            v-model.trim="profileDetails.firstName"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'First name is required',
              val => checkUserNameValidity(val) || 'Enter valid First Name'
            ]"
            maxlength="50"
            style="max-height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
            ref="fname"
          />
        </div>
        <div class="" style="margin-top: 24px">
          <label class="flex field-heading"
            >Last Name <span class="text-red q-ml-xs">*</span></label
          >
          <q-input
            borderless
            dense
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
            v-model.trim="profileDetails.lastName"
            placeholder="Enter Last Name"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Last name is required',
              val => checkUserNameValidity(val) || 'Enter valid Last Name'
            ]"
            maxlength="50"
            style="max-height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
            ref="lname"
          />
        </div>
        <div
          class="flex justify-between no-wrap company-job"
          style="margin-top: 24px"
        >
          <div style="margin-right: 24px !important; " class="full-width">
            <label class="flex field-heading"
              >Company Name
              <span
                class="text-manateeGrey text-italic q-ml-xs"
                style="font-weight: normal !important; color: #8A90A0;"
              >
                — Optional</span
              >
            </label>
            <q-input
              dense
              borderless
              class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs  q-pb-none"
              placeholder="Enter Company Name"
              style="padding-right: 14px !important; padding-left: 14px !important;"
              v-model.trim="profileDetails.companyName"
            />
          </div>
          <div style="" class="full-width job-role">
            <label class="flex field-heading"
              >Job Role
              <span
                class="text-manateeGrey text-italic q-ml-xs"
                style="font-weight: normal !important; color: #8A90A0;"
              >
                — Optional</span
              ></label
            >
            <q-input
              dense
              borderless
              class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs  q-pb-none"
              style="padding-right: 14px !important; padding-left: 14px !important;"
              placeholder="Enter Job Role"
              v-model.trim="profileDetails.jobRole"
            />
          </div>
        </div>
        <div style="margin-top: 24px">
          <label class="flex field-heading"
            >Intro Video
            <span
              class="text-manateeGrey text-italic q-ml-xs"
              style="font-weight: normal !important; color: #8A90A0;"
            >
              — Optional</span
            >
          </label>
          <div class="row justify-center" v-if="videoAvailable">
            <div
              class="relative-position q-mb-lg main-video-container"
              style="margin-top: 8px"
            >
              <div class="video-container">
                <video controls="true" class="intro-video" muted>
                  <source :src="profileDetails.video" type="video/mp4" />
                </video>
              </div>
              <q-avatar
                class="video-edit-after-upload"
                @click="onRemove"
                square
                color="primary"
                size="24px"
                text-color="white"
                icon="close"
              ></q-avatar>
            </div>
          </div>
          <div v-else style="margin-top: 8px">
            <q-btn
              flat
              no-caps
              class="upload-file flex flex-center q-px-lg border-input-field q-py-xs"
              @click="onUploadClick"
            >
              <q-img
                :src="addIcon"
                style="width:24px !important; height:24px !important;margin-right: 5px"
              />
              <span>upload file</span>
            </q-btn>
            <q-file
              style="display: none"
              ref="introVideo"
              v-model="introVideo"
              accept=".mp4, .mov, .MOV"
              max-files="1"
              max-file-size="419430400"
              @input="onVideoUpload"
              @rejected="onFileRejected"
            >
              <div>
                <q-img :src="addIcon" />
              </div>
            </q-file>
            <div class="upload-file-caption">
              Recommended file size: 400MB max <br />
              Allowed types: mp4, mov, MOV
            </div>
          </div>
        </div>
        <div style="margin-top: 24px" class="full-width">
          <label class="flex field-heading">Bio </label>
          <q-input
            dense
            borderless
            maxlength="2500"
            counter
            type="textarea"
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs  q-pb-none"
            style="padding-right: 14px !important; padding-left: 14px !important;"
            placeholder="A brief about yourself"
            v-model.trim="profileDetails.yourself"
          />
        </div>
        <div class="" style="margin-top: 24px">
          <label class="flex field-heading"
            >Timezone <span class="text-red q-ml-xs">*</span></label
          >
          <q-select
            dense
            borderless
            :options="timeZoneOptions"
            v-model="timeZone"
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs  q-pb-none"
            style="padding-right: 14px !important; padding-left: 14px !important;"
            placeholder="Select Timezone"
            :stack-label="false"
            :rules="[val => (val && val.length > 0) || 'Timezone is required']"
            use-input
            input-debounce="0"
            hide-selected
            fill-input
            @filter="filterTimezone"
            :dropdown-icon="`img:${dropDownIcon}`"
            transition-hide="jump-up"
            transition-show="jump-up"
            :behavior="dropDownBehavior"
            lazy-rules
          >
            <template v-slot:selected>
              <template v-if="timeZone">
                {{ timeZone }}
              </template>
              <template v-else>
                Select timezone
              </template>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <!-- <div class="" style="margin-top: 24px">
          <label class="flex field-heading">Privacy</label>
          <div
            style="margin-right: 24px !important; margin-top: 8px "
            class="text-regalBlue full-width"
          >
            <q-checkbox
              dense
              class="f-w-500 text-fs-16"
              v-model="profileDetails.privacy"
              label="Make my profile private"
            />
          </div>
          <div
            style="margin-right: 24px !important; margin-top: 16px "
            class="text-regalBlue full-width"
          >
            <q-checkbox
              class="f-w-500 text-fs-16"
              dense
              v-model="profileDetails.privacyOnWebSearch"
              label="Remove my profile from web searches"
            />
          </div>
        </div> -->
        <div>
          <label class="messages-heading">Messages </label>
        </div>
        <div>
          <label class="flex field-heading">Send and Receive</label>
          <label
            class="flex q-mt-xs f-w-500 text-fs-14-lh-20"
            style="color: #5B647A"
            >By turning on this feature, it allows students to communicate with
            you via private message</label
          >
        </div>
        <div class="text-regalBlue" style="margin-top: 16px">
          <q-toggle
            dense
            class="f-w-500 text-fs-16"
            label="Yes, I would like to connect with my blooprinted community"
            v-model="profileDetails.connectToCommunity"
          />
        </div>
        <div>
          <label class="social-links-heading">
            Social links
            <span
              class="text-manateeGrey text-fs-16 text-lh-24 text-italic q-ml-xs"
              style="font-weight: normal !important; color: #8A90A0;"
            >
              — Optional</span
            >
          </label>
        </div>
        <div class="">
          <label class="flex field-heading">Twitter</label>
          <q-input
            borderless
            dense
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
            v-model.trim="twitter"
            placeholder="https://"
            maxlength="50"
            style="height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
            :rules="[
              val => checkSocialLinks('twitter', val) || 'Enter valid url'
            ]"
            lazy-rules
          />
        </div>
        <div class="" style="margin-top: 16px">
          <label class="flex field-heading">Instagram</label>
          <q-input
            borderless
            dense
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
            v-model.trim="instagram"
            placeholder="https://"
            maxlength="50"
            style="max-height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
            :rules="[
              val => checkSocialLinks('instagram', val) || 'Enter valid url'
            ]"
            lazy-rules
          />
        </div>
        <div class="" style="margin-top: 16px">
          <label class="flex field-heading">Facebook</label>
          <q-input
            borderless
            dense
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
            v-model.trim="facebook"
            placeholder="https://"
            maxlength="50"
            style="max-height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
            :rules="[
              val => checkSocialLinks('facebook', val) || 'Enter valid url'
            ]"
            lazy-rules
          />
        </div>
        <div
          class=""
          style="margin-top: 16px;"
          :style="$q.screen.gt.sm ? 'margin-bottom: 20px' : ''"
        >
          <label class="flex field-heading">LinkedIn</label>
          <q-input
            borderless
            dense
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
            v-model.trim="linkedIn"
            placeholder="https://"
            maxlength="50"
            style="max-height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
            :rules="[
              val => checkSocialLinks('linkedin', val) || 'Enter valid url'
            ]"
            lazy-rules
          />
        </div>
        <div class="flex justify-between btn-container">
          <label
            class="cancel-button text-primary cursor-pointer"
            @click="onReset"
            >Reset</label
          >
          <q-btn
            no-caps
            flat
            type="submit"
            label="Update Information"
            class="bg-primary update-button"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import {
  file10MB,
  userNamePattern,
  getTimezones,
  getTimezoneString,
  removeFormatFromTimezoneString
} from '../utils/common'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CreatorProfile',
  props: ['profileData'],
  data() {
    return {
      timeZone: '',
      timeZoneOptions: [],
      timeZones: [],
      profileDetails: {
        yourself: '',
        video: ''
      },
      dropDownIcon: require('../assets/chevron-down-black.svg'),
      addIcon: require('../assets/plus-circle.svg'),
      introVideo: [],
      videoAvailable: false,
      twitter: '',
      facebook: '',
      linkedIn: '',
      instagram: ''
    }
  },
  computed: {
    ...mapGetters(['fileUrl']),
    dropDownBehavior() {
      return window.innerWidth > 1023 ? 'menu' : 'dialog'
    }
  },
  methods: {
    ...mapActions([
      'updateProfileInfo',
      'fileUploadToFirebase',
      'setToastMessage'
    ]),
    checkUserNameValidity(val) {
      return userNamePattern.test(val)
    },
    onSubmit() {
      this.$refs.fname.validate()
      this.$refs.lname.validate()
      this.$refs.userProfile.validate().then(res => {
        if (res) {
          const data = {
            data: {
              attributes: {
                firstName: this.profileDetails.firstName,
                lastName: this.profileDetails.lastName,
                companyName: this.profileDetails.companyName,
                jobRole: this.profileDetails.jobRole,
                timeZone: removeFormatFromTimezoneString(this.timeZone),
                video: this.profileDetails.video,
                socialMediaLinks: {
                  twitter: this.twitter,
                  instagram: this.instagram,
                  facebook: this.facebook,
                  linkedIn: this.linkedIn
                },
                connectToCommunity: this.profileDetails.connectToCommunity,
                privacy: this.profileDetails.privacy,
                privacyOnWebSearch: this.profileDetails.privacyOnWebSearch,
                yourself: this.profileDetails.yourself
              },
              type: 'profiles'
            },
            profileId: this.profileData.id
          }
          this.updateProfileInfo(data)
        }
      })
    },
    onReset() {
      this.profileDetails = { ...this.profileData }
      if (this.profileData.socialMediaLinks) {
        this.twitter = this.profileData.socialMediaLinks.twitter
          ? this.profileData.socialMediaLinks.twitter
          : ''
        this.instagram = this.profileData.socialMediaLinks.instagram
          ? this.profileData.socialMediaLinks.instagram
          : ''
        this.linkedIn = this.profileData.socialMediaLinks.linkedIn
          ? this.profileData.socialMediaLinks.linkedIn
          : ''
        this.facebook = this.profileData.socialMediaLinks.facebook
          ? this.profileData.socialMediaLinks.facebook
          : ''
      }
      // this.profileDetails.socialMediaLinks = {...this.profileData.socialMediaLinks}
      this.videoAvailable =
        this.profileData.video && this.profileData.video != ''
    },
    filterTimezone(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.timeZoneOptions = this.timeZones.filter(
          v => v.toLocaleLowerCase().indexOf(needle) > -1
        )
      })
    },
    onFileRejected(event) {
      this.setToastMessage({
        type: 'negative',
        message: 'Upload valid file format with less than 400 MB'
      })
    },
    async onVideoUpload(event) {
      let videoAdded = event
      let fileName = videoAdded['name'].toLowerCase()
      this.profileDetails.video = null
      if (
        fileName.endsWith('mp4') ||
        fileName.endsWith('mov') ||
        fileName.endsWith('MOV')
      ) {
        if (videoAdded['size'] > 419430400) {
          this.setToastMessage({
            type: 'negative',
            message: 'Upload valid file format with less than 400 MB'
          })
        } else {
          let data = {
            file: videoAdded,
            type: 'video',
            from: 'blooprint/'
          }
          await this.fileUploadToFirebase(data, 'video')
          this.introVideo = []
        }
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Upload valid file format with less than 400 MB'
        })
      }
    },
    onUploadClick() {
      this.$refs.introVideo.pickFiles()
    },
    onRemove() {
      this.profileDetails.video = ''
      this.videoAvailable = false
    },
    checkSocialLinks(media, val) {
      if (val != '') {
        if (val.includes(media) || val.includes('https://')) {
          let url = `${media}.com/`
          let domain = `${media}.com/`
          if (val.includes(url) && val.includes('https://')) {
            let userName = val.split(domain)
            if (userName[1].length >= 1) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return true
      }
    }
  },
  async mounted() {
    this.timeZoneOptions = await getTimezones()
    this.timeZones = this.timeZoneOptions
    this.onReset()
    // this.profileDetails = { ...this.profileData }
    // this.videoAvailable = this.profileData.video && this.profileData.video !=''
    this.timeZone = await getTimezoneString(this.profileDetails.timeZone)
  },
  watch: {
    async profileData() {
      this.onReset()
      // this.profileDetails = { ...this.profileData }
      // this.videoAvailable = this.profileData.video && this.profileData.video !=''
      this.timeZone = await getTimezoneString(this.profileDetails.timeZone)
    },
    fileUrl(data) {
      if (data['type'] == 'video') {
        this.profileDetails.video = data['url']
        this.videoAvailable = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #000000;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding-top: 30px !important;
  }
}
.messages-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
  color: #000000;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 40px !important;
  }
}
.social-links-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
  color: #000000;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 20px !important;
    font-size: 20px;
    line-height: 24px;
  }
}
.field-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: $regalBlue;
}
.update-button {
  // padding: 10px 30px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-top: 30px;
  width: 220px;
  height: 50px;
}
.cancel-button {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 43px;
  align-items: center;
  text-decoration-line: underline;
}
.q-field__bottom {
  font-size: 12px !important;
  line-height: 12px;
}
.company-job {
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: flex;
    flex-direction: column !important;
    .job-role {
      margin-top: 24px;
    }
  }
}
.btn-container {
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: flex;
    flex-direction: column !important;
    justify-content: center !important;
    .cancel-button {
      order: 2;
      align-self: center !important;
      margin-top: 24px;
    }
    .update-button {
      width: 100% !important;
      order: 1;
    }
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    .cancel-button {
      margin-bottom: 100px;
    }
  }
}
.main-container {
  ::placeholder {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #8a90a0;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0 15px !important;
    background: #ffffff !important;
    // box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
}
.profile-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
.first-name {
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px !important;
  }
}
.q-select__dialog {
  margin-top: 5vh !important;
  height: 100vh !important;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: $secondary;
    border-radius: 10px;
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
body.platform-android:not(.native-mobile)
  .q-dialog__inner--top
  .q-select__dialog {
  max-height: 100vh !important;
}

.upload-file {
  // width: 48.7%;
  width: 100%;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #5b647a;
  background: #ffffff;
  border: 1px solid #b9bcc6;
  box-sizing: border-box;
  border-radius: 8px;
  @media only screen and (min-width: 1024px) {
    padding-top: 50px !important;
    padding-bottom: 50px !important;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
  }
}
.upload-file-caption {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #5b647a;
  margin-top: 8px;
}
.video-edit-after-upload {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
}
.main-video-container {
  width: 95%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
  }
  .video-container {
    width: 100%;
    padding-top: 56.25%;
    height: 0px;
    position: relative;
    .intro-video {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
<style lang="scss">
body.platform-android:not(.native-mobile)
  .q-dialog__inner--top
  .q-select__dialog {
  max-height: 100vh !important;
}
body.platform-ios:not(.native-mobile) .q-dialog__inner--top .q-select__dialog {
  max-height: 100vh !important;
}
.main-container {
  .q-field__messages {
    line-height: 1;
    line-height: 12px !important;
    font-size: 12px !important;
    color: #d92d20;
  }
}
</style>
