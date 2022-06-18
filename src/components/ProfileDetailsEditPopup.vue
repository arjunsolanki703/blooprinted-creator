<template>
  <q-dialog v-model="showEditProfilePopup" persistent>
    <q-card style="width: 874px; max-width: 80vw;">
      <q-card-section>
        <div class="row">
          <div class="text-h6 text-dimGrey q-ml-md">Profile Details</div>
          <q-space />
          <q-btn
            icon="close"
            class="text-dimGrey"
            flat
            round
            dense
            @click="closePopup"
          />
        </div>
        <q-separator color="grey-4" class="q-my-sm full-width no-padding" />
      </q-card-section>

      <q-card-section
        class="q-pt-none row q-mx-md-xl q-mx-sm-md q-mx-xs-xs q-px-md-xl q-px-sm-sm q-px-xs-xs"
      >
        <div class="col"></div>
        <q-form class="col-md-9 col-sm-10 col-xs-10" ref="userProfileForm">
          <label class="text-grey">First Name *</label>
          <q-input
            borderless
            ref="firstname"
            v-model.trim="profileForm.firstName"
            input-class="text-grey"
            class="border-secondary bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
            maxlength="50"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'First Name is required',
              val =>
                (val && checkUserNameValidity(val)) ||
                'Please input valid First Name'
            ]"
          />
          <label class="text-grey">Last Name</label>
          <q-input
            borderless
            ref="lastname"
            v-model.trim="profileForm.lastName"
            input-class="text-grey"
            class="border-secondary bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
            maxlength="50"
            lazy-rules
            :rules="[
              val =>
                checkUserNameValidity(val) || 'Please input valid Last Name'
            ]"
          />
          <label class="text-grey q-mt-lg">Email</label>
          <q-input
            borderless
            ref="email"
            v-model.trim="profileForm.email"
            maxlength="50"
            input-class="text-grey"
            disable
            class="border-secondary bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
          />
          <label class="text-grey">Timezone</label>
          <q-select
            borderless
            v-model="profileForm.timeZone"
            hide-selected
            fill-input
            input-debounce="0"
            :options="timezoneOptions"
            @filter="filterTimezone"
            use-input
            input-class="text-grey"
            class="border-secondary bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <label class="text-grey">Location</label>
          <q-select
            borderless
            v-model="profileForm.location"
            use-input
            fill-input
            hide-selected
            input-debounce="0"
            :options="locationOptions"
            @filter="filterFn"
            input-class="text-charcoal"
            class="border-secondary bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <label class="text-grey">Video</label>
          <div
            v-if="profileForm.video != null && profileForm.video != ''"
            class="relative-position q-mb-sm"
            style="width:100%"
          >
            <q-video :ratio="16 / 9" :src="profileForm.video" />
            <!-- <video id="video" width="100%" controls muted>
              <source :src="profileForm.video" type="video/mp4" />
            </video> -->
            <q-avatar
              class="video-edit-after-upload"
              @click="profileForm.video = ''"
              square
              color="primary"
              size="24px"
              text-color="white"
              icon="close"
            ></q-avatar>
          </div>
          <q-file
            v-else
            v-model="profileForm.video"
            borderless
            color="primary"
            label-color="grey"
            input-class="text-grey"
            class="
            borderAll
            bg-white
            rounded-borders
            text-primary
            q-mb-sm q-px-md q-pb-none
          "
            style="height: 150px; width: 100%; position: relative"
            accept=".mp4"
            max-files="1"
            max-file-size="400000000"
            @input="onVideoUpload"
            @rejected="onFileRejected"
          >
            <div
              class="q-pa-auto q-px-xs text-grey text-secondary items-center"
              :class="[
                profileForm.video
                  ? 'file-after-upload'
                  : 'promo-before-upload file-before-upload'
              ]"
            >
              <q-avatar
                @click.stop
                square
                size="md"
                class="borderAccent "
                text-color="accent"
                icon="add"
              ></q-avatar>
            </div>
          </q-file>
          <div class="text-grey q-mb-lg">
            Allowed type: mp4, Max size: 400 MB
          </div>

          <label class="text-grey">About Yourself*</label>
          <q-input
            borderless
            v-model.trim="profileForm.yourself"
            type="textarea"
            maxlength="1500"
            counter
            ref="about"
            input-class="text-grey"
            placeholder="A brief about yourself"
            class="border-secondary bg-white rounded-borders q-mb-xs q-px-md q-pb-none q-mb-md"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please tell us about yourself'
            ]"
          />
          <label class="text-grey">Social Links</label>
          <div class="q-mt-sm">
            <div class="text-grey">
              Twitter
            </div>
            <q-input
              borderless
              v-model.trim="profileForm.socialMediaLinks.twitter"
              input-class="text-grey"
              placeholder="twitter"
              class="border-secondary bg-white rounded-borders q-mb-md q-px-md q-pb-none"
              lazy-rules
              :rules="[isValidTwitterUrl]"
              ref="twitter"
            />
            <div class="text-grey">
              Instagram
            </div>
            <q-input
              borderless
              v-model.trim="profileForm.socialMediaLinks.instagram"
              input-class="text-grey"
              placeholder="instagram"
              class="border-secondary bg-white rounded-borders q-mb-md q-px-md q-pb-none"
              ref="instagram"
              lazy-rules
              :rules="[isValidInstagramUrl]"
            />
            <div class="text-grey">
              Facebook
            </div>
            <q-input
              borderless
              v-model.trim="profileForm.socialMediaLinks.facebook"
              input-class="text-grey"
              placeholder="facebook"
              ref="facebook"
              class="border-secondary bg-white rounded-borders q-mb-md q-px-md q-pb-none"
              lazy-rules
              :rules="[isValidFacebookUrl]"
            />
            <div class="text-grey">
              Linkedin
            </div>
            <q-input
              borderless
              v-model.trim="profileForm.socialMediaLinks.linkedIn"
              input-class="text-grey"
              placeholder="linkedin"
              ref="linkedin"
              class="border-secondary bg-white rounded-borders q-mb-md q-px-md q-pb-none"
              lazy-rules
              :rules="[isValidLinkedinUrl]"
            />
          </div>
        </q-form>
        <div class="col"></div>
      </q-card-section>
      <q-card-actions align="center" class="q-mb-md">
        <q-btn
          no-caps
          color="primary"
          size="16px"
          flat
          class="bg-white border-primary"
          label="Cancel"
          style="width: 25%"
          @click="closePopup"
        />
        <q-btn
          no-caps
          color="white"
          size="16px"
          flat
          class="bg-primary "
          label="Save"
          style="width: 25%"
          @click="updateUserDetails"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import csc from 'country-region-data'
import { mapActions, mapGetters } from 'vuex'
import { userNamePattern, urlPattern } from '../utils/common'

export default {
  data() {
    return {
      showEditProfilePopup: true,
      isDataUpdated: false,
      options: [],
      timezoneData: [],
      timezoneOptions: [],
      locationOptions: [],
      profileForm: {
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        yourself: '',
        video: '',
        timeZone: '',
        socialMediaLinks: {
          linkedIn: '',
          instagram: '',
          facebook: '',
          twitter: ''
        }
      }
    }
  },

  props: ['profileData'],
  async mounted() {
    let countryList = csc
    countryList.map(item => {
      this.locationOptions.push({
        label: item['countryName'],
        value: item['countryName']
      })
    })
    this.options = this.locationOptions
    this.profileForm = { ...this.profileData }
    this.timezoneData = await this.getTimezoneNames()
  },
  computed: {
    ...mapGetters(['fileUrl'])
  },
  watch: {
    fileUrl(data) {
      if (data['type'] == 'video') {
        this.profileForm.video = data['url']
      }
    },
    allPlans(plans) {
      this.allPlansList = plans
      this.fetchCurrentPlanDetails()
    },
    planInfo(data) {
      this.fetchCurrentPlanDetails()
    }
  },
  methods: {
    ...mapActions([
      'fileUploadToFirebase',
      'getTimezoneNames',
      'setToastMessage'
    ]),
    checkUserNameValidity(val) {
      return userNamePattern.test(val)
    },
    isValidLinkedinUrl(val) {
      if (val) return urlPattern.linkedin.test(val) || 'Url must be valid!'
      return true
    },
    isValidTwitterUrl(val) {
      if (val) return urlPattern.twitter.test(val) || 'Url must be valid!'
      return true
    },
    isValidInstagramUrl(val) {
      if (val) return urlPattern.instagram.test(val) || 'Url must be valid!'
      return true
    },
    isValidFacebookUrl(val) {
      if (val) return urlPattern.facebook.test(val) || 'Url must be valid!'
      return true
    },
    //   ************ Triggers when a popup is closed *****************************
    closePopup() {
      this.showEditProfilePopup = false
      this.isDataUpdated = false
      this.$emit('on-edit-popup-close', { isDataUpdated: this.isDataUpdated })
    },
    // ************ Dropdown Filter for location ********************************
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.locationOptions = this.options.filter(
          v => v.label.toLocaleLowerCase().indexOf(needle) > -1
        )
      })
    },
    // ************ Dropdown Filter for timezone ********************************
    filterTimezone(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.timezoneOptions = this.timezoneData.filter(
          v => v.toLocaleLowerCase().indexOf(needle) > -1
        )
      })
    },
    // **************** Update User Details ***********************
    updateUserDetails() {
      this.isDataUpdated = true
      let success =
        this.$refs.firstname.validate() &
        this.$refs.lastname.validate() &
        this.$refs.about.validate() &
        this.$refs.linkedin.validate() &
        this.$refs.facebook.validate() &
        this.$refs.twitter.validate() &
        this.$refs.instagram.validate()

      if (success) {
        this.showEditProfilePopup = false
        this.$emit('on-update-user-data', {
          isDataUpdated: this.isDataUpdated,
          userData: this.profileForm
        })
      }
    },
    onFileRejected(event) {
      this.setToastMessage({
        type: 'negative',
        message: 'File size should be less than 400 MB'
      })
    },
    onVideoUpload(event) {
      let videoAdded = event
      let fileName = videoAdded['name'].toLowerCase()
      this.profileForm.video = null
      if (fileName.endsWith('mp4')) {
        let data = {
          file: videoAdded,
          type: 'video',
          from: 'blooprint/'
        }
        this.fileUploadToFirebase(data, 'video')
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Upload valid Video File'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.file-before-upload {
  position: absolute;
  top: 75%;
  display: block;
  font-size: 30px;
}
</style>
