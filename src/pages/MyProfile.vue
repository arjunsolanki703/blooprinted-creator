<template>
  <q-page
    class="q-mt-xl q-px-md-xl q-px-sm-lg q-px-xs-md"
    :class="
      errorInGettingUserDetails.length ? 'page-mid-height' : 'page-full-height'
    "
  >
    <div class="row">
      <div
        class="
          text-h5 text-nightRider
          q-mb-md
          text-weight-bold
          full-width
          text-md-left text-sm-center text-xs-center
        "
      >
        {{ isLoggedInUser ? 'My Profile' : 'Profile' }}
        <q-separator width="110px" color="primary" class="q-mt-sm" size="2px" />
      </div>
      <div
        v-if="!errorInGettingUserDetails.length"
        class="col-md-2 col-sm-12 col-xs-12 relative-position"
      >
        <q-skeleton
          class="img-skeleton q-mt-md"
          size="150px"
          v-if="profile.loading"
        />
        <!-- *************** User Image Display ******************************* -->
        <div v-else class="flex flex-center">
          <input
            type="file"
            @change="onImageUpload"
            accept=".jpg, image/*"
            ref="file"
            style="display: none"
          />
          <q-avatar
            square
            class="rounded-borders"
            size="150px"
            v-if="
              profile.picture != null &&
                profile.picture != '' &&
                !profile.loading
            "
          >
            <img :src="profile.picture" />
            <q-btn
              v-if="isLoggedInUser"
              round
              padding="xs"
              color="white"
              text-color="primary"
              icon="photo_camera"
              size="sm"
              class="camIcon"
              @click="$refs.file.click()"
            />
          </q-avatar>
          <q-avatar square class="rounded-borders" size="150px" v-else>
            <img src="~assets/UserImage.svg" />
            <q-btn
              v-if="isLoggedInUser"
              round
              padding="xs"
              color="white"
              text-color="primary"
              icon="photo_camera"
              size="sm"
              class="camIcon"
              style="bottom: 5px; right: 10px"
              @click="$refs.file.click()"
            />
          </q-avatar>
        </div>
      </div>
      <!-- ************************ User Details Block ************************* -->
      <div
        v-if="!errorInGettingUserDetails.length"
        class="
          col-md-5 col-sm-12 col-xs-12
          q-mt-sm-none q-mt-xs-md
          relative-position
        "
      >
        <!-- Edit btn -->
        <q-btn
          v-if="isLoggedInUser"
          padding="xs"
          color="smalt"
          icon="edit"
          size="xs"
          class="fixed-top-right, absolute-top-right q-mr-md"
          @click="showEditProfilePopup = true"
        />
        <!-- User Details -->
        <div class="q-mx-md">
          <q-skeleton width="30%" v-if="profile.loading" />
          <q-skeleton class="q-mt-sm" width="50%" v-if="profile.loading" />
          <p v-else class="profile text-nightRider word-break-break-all">
            {{ profile.firstName }} {{ profile.lastName }}
            <span>{{ profile.email }}</span>
            <span>{{ profile.location }}</span>
            <span>{{ profile.timeZone }}</span>
          </p>
        </div>

        <!-- ********* Follow Skeleton Block **************** -->
        <div class="row q-pl-md q-my-sm" v-if="profile.loading">
          <q-skeleton
            v-for="i in 3"
            :key="i"
            type="QInput"
            class="col-3 q-pa-md q-mr-sm"
            width="30%"
          />
        </div>
        <!-- ********* Follow Data Block **************** -->
        <div class="row q-pl-md" v-else>
          <div class="col-4 q-my-xs followStyle q-pa-sm q-mr-md bg-white">
            <div class="text-h6">
              {{ profile.followers }}
              <span class="text-grey text-body1 q-ml-sm"> Followers </span>
            </div>
          </div>
          <div class="col-4 q-my-xs q-pa-sm q-mr-md followStyle bg-white">
            <div class="text-h6">
              {{ profile.following }}
              <span class="text-grey text-body1 q-ml-sm"> Following </span>
            </div>
          </div>
          <div class="col-3 q-my-xs">
            <q-btn
              v-if="!isAuthorLoggedInUser && !isLoggedInUser"
              class="full-height full-width"
              color="primary"
              size="md"
              :label="profile.currentUserFollowing ? 'Following' : 'Follow'"
              no-caps
              @click="onFollowClick"
            />
          </div>
        </div>

        <!-- about me div -->
        <div class="q-px-md q-mt-md" v-if="profile.loading">
          <div class="q-mt-sm">
            <q-skeleton class="q-pa-md q-mb-md" width="400px" height="120px" />
          </div>
        </div>
        <div
          class="q-px-md q-mt-md"
          v-if="
            profile.yourself != '' &&
              profile.yourself != null &&
              !profile.loading
          "
        >
          <span class="text-nightRider"> About Me* </span>
          <div class="q-mt-sm bg-white">
            <p
              class="border-secondary border-style q-pa-md word-break-break-all"
              style="min-height: 150px"
            >
              {{ profile.yourself }}
            </p>
          </div>
          <span class="text-nightRider"> Social links </span>
          <div class="q-mt-sm bg-white" v-if="profile.socialMediaLinks.twitter">
            Twitter
            <p
              class="border-secondary border-style q-pa-md word-break-break-all"
            >
              {{ profile.socialMediaLinks.twitter }}
            </p>
          </div>
          <div
            class="q-mt-sm bg-white"
            v-if="profile.socialMediaLinks.instagram"
          >
            Instagram
            <p
              class="border-secondary border-style q-pa-md word-break-break-all"
            >
              {{ profile.socialMediaLinks.instagram }}
            </p>
          </div>
          <div
            class="q-mt-sm bg-white"
            v-if="profile.socialMediaLinks.facebook"
          >
            Facebook
            <p
              class="border-secondary border-style q-pa-md word-break-break-all"
            >
              {{ profile.socialMediaLinks.facebook }}
            </p>
          </div>
          <div
            class="q-mt-sm bg-white"
            v-if="profile.socialMediaLinks.linkedIn"
          >
            Linkedin
            <p
              class="border-secondary border-style q-pa-md word-break-break-all"
            >
              {{ profile.socialMediaLinks.linkedIn }}
            </p>
          </div>
        </div>
        <!-- my blooprint div-->
        <!-- <div class="row followStyle q-mx-md q-mt-sm q-pa-sm bg-white">
          <div class="col text-left text-grey text-body2 q-py-xs q-px-sm">
            My Blooprints
          </div>
          <q-skeleton
            class="col-4 q-my-xs q-pa-md text-right"
            width="40px"
            height="20px"
            v-if="profile.loading"
          />
          <div v-else class="col text-right text-nightRider text-h6 q-px-sm">
            {{ profile.blooprintCount }}
          </div>
        </div> -->

        <!-- video div -->
        <div class="row q-mx-md q-mt-md relative-position">
          <div
            v-if="profile.video != null && profile.video != ''"
            class="relative-position q-mb-lg full-width"
          >
            <q-video :ratio="16 / 9" :src="profile.video" />
            <!-- <video id="video" width="100%" controls muted >
              <source :src="profile.video" type="video/mp4" />
            </video> -->
          </div>
        </div>
        <!-- video end -->
      </div>
      <!-- review sec -->
      <div
        class="col-md-5 col-sm-12 col-xs-12"
        v-if="!errorInGettingUserDetails.length"
      >
        <div class="q-mx-md q-mb-lg" v-if="isLoggedInUser">
          <!-- card view -->
          <q-skeleton
            class="q-pa-xs row q-mb-md"
            width="300px"
            height="170px"
            v-if="profile.loading"
          />
          <div v-else-if="showCardInfo" class="cardDesign relative-position">
            <q-btn
              padding="xs"
              color="smalt"
              icon="edit"
              size="xs"
              class="cardEdit"
              @click="openCardEditDialog()"
            />
            <CardDetails :userCardDetails="cardDetails" />
          </div>
        </div>
        <!-- <div class="row">
          ------This Section Belongs to Reviews--------
          <div class="col q-mx-md">
            <q-skeleton
              class="q-pa-xs row"
              width="400px"
              height="30px"
              v-if="profile.loading"
            />
            <div v-else class="q-pa-xs row border-secondary bg-white">
              <div class="text-left q-pa-xs text-nightRider">Reviews</div>
              <div class="q-pa-xs text-nightRider text-weight-bold">
                {{ profile.totalReviews }}
              </div>
            </div>
            <div class="q-my-lg">
              <q-skeleton
                class="q-pa-xs"
                width="150px"
                height="30px"
                v-if="profile.loading"
              />
              <div v-else class="q-pa-xs text-nightRider">
                {{ getDateFormat(profile.date) }}
              </div>
              <q-skeleton
                class="q-pa-xs q-mt-xs row"
                width="400px"
                height="30px"
                v-if="profile.loading"
              />
              <div v-else class="row q-pa-xs">
                <div class="col text-nightRider text-weight-bold">
                  {{ profile.reviewerName }}
                </div>
                 <div class="col text-right">
                  <RatingIcon
                    v-if="profile.rating != ''"
                    ratingClass="q-mb-xs"
                    color="primary"
                    :ratingValue="profile.rating"
                    iconSize="16px"
                    :isReadOnly="isRatingReadOnly"
                    isListView="list"
                  />
                </div> 
              </div>
              <q-skeleton
                class="q-pa-xs q-my-xs"
                width="400px"
                height="100px"
                v-if="profile.loading"
              />
              <div v-else class="q-pa-xs q-my-xs text-nightRider">
                {{ profile.reviewDesc }}
              </div>
              <div
                v-if="!profile.loading"
                class="border-bottom-secondary"
              ></div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="row" v-if="!errorInGettingUserDetails.length">
      <div
        class="
          col-md-2 col-sm-10 col-xs-10
          q-py-md-md q-my-none-xs q-my-none-sm
        "
      >
        <div class="flex q-mb-lg justify-center" v-if="isLoggedInUser">
          <q-btn
            color="white"
            text-color="red"
            class="border-secondary bg-white"
            no-caps
            flat
            @click="onDeleteAccountClick"
          >
            <div class="delete-icon"></div>
            Delete Account
          </q-btn>
        </div>
      </div>
    </div>
    <div
      class="col-12 text-subtitle1 absolute-center text-center"
      v-if="errorInGettingUserDetails.length"
    >
      {{ errorInGettingUserDetails }}
    </div>
    <ProfileDetailsEditPopup
      v-if="showEditProfilePopup"
      :profileData="profile"
      @on-edit-popup-close="closeEditPopup"
      @on-update-user-data="updateUserDetails"
    />
    <!-- card edit popup -->
    <q-dialog v-model="cardEditDialog" persistent>
      <q-card class="editCardStyle">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-body1 text-bold">Card Details</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section
          class="q-pt-none q-mx-md-xl q-mx-sm-md q-mx-xs-sm"
          align="center"
        >
          <UpdateCard @closeUpdateCardPopup="cardEditDialog = false" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import { file10MB } from '../utils/common'
import UpdateCard from '../components/UpdateCard'
import CardDetails from '../components/CardDetails.vue'
import ProfileDetailsEditPopup from '../components/ProfileDetailsEditPopup.vue'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      isRatingReadOnly: true,
      profile: this.getProfileObj(),
      cardEditDialog: false,
      isLoggedInUser: true,
      isAuthorLoggedInUser: false,
      showEditProfilePopup: false,
      showCardInfo: false
    }
  },
  components: {
    UpdateCard,
    CardDetails,
    ProfileDetailsEditPopup
    // RatingIcon
  },
  computed: {
    ...mapGetters([
      'userProfile',
      'fileUrl',
      'cardDetails',
      'errorInGettingUserDetails'
    ])
  },
  watch: {
    $route: 'checkUserType',
    userProfile(data) {
      if (data['email']) {
        this.profile = {
          ...this.getProfileObj(),
          ...data
        }
        this.profile.loading = false
      }
    },
    fileUrl(data) {
      if (data['type'] == 'image') {
        this.profile.picture = data['url']
        this.updateUserImageandVideo({ requestFrom: 'file' })
      }
    },
    cardDetails(data) {
      if (data.last4 !== undefined) {
        this.showCardInfo = true
      }
    }
  },

  mounted() {
    this.checkUserType()
  },
  methods: {
    ...mapActions([
      'fetchProfileInfo',
      'getAuthorRating',
      'fileUploadToFirebase',
      'unFollowAuthor',
      'getCardDetails',
      'followAuthor',
      'updateProfileInfo',
      'setToastMessage'
    ]),
    getDateFormat(value) {
      return date.formatDate(new Date(value), 'DD/MM/YYYY, HH:MM')
    },
    getProfileObj() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        followers: 0,
        following: 0,
        blooprintCount: 0,
        totalReviews: 0,
        blooprintRatingModel: 0,
        authorRatingModel: 0,
        loading: true,
        picture: null,
        video: '',
        yourself: '',
        reviewDesc:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet neque tellus. Nam gravida purus turpis, at interdum arcu fringilla vel. Donec scelerisque neque ex, a cursus magna malesuada sit amet. Aliquam efficitur urna vitae ex placerat, in rhoncus diam tincidunt.',
        rating: 0,
        reviewerName: 'Umang Gupta',
        date: '02/09/2021, 10:30'
      }
    },
    // *************** Method to Check whether the User is Logged In user or not *********************
    checkUserType() {
      let currentUrl = this.$router.history.current.fullPath
      if (currentUrl.includes('/my-profile')) {
        this.isLoggedInUser = true
        this.fetchProfileInfo()
        this.getCardDetails()
      } else {
        this.isLoggedInUser = false
        this.getAuthorDetails()
      }
      this.getReviewRatingCount()
      let profileId = this.$router.history.current.params.profileId
      if (profileId) {
        this.isAuthorLoggedInUser = profileId == localStorage.getItem('userId')
      }
    },
    // ******** API to fetch the Author Details (Other than the logged in user) *******************************
    async getAuthorDetails() {
      let data = {
        showLoader: false
      }
      let authorData = await this.fetchProfileInfo(data)
      if (authorData['email']) {
        this.profile = {
          ...this.getProfileObj(),
          ...authorData
        }
        this.profile.loading = false
      }
    },
    // *************** API to fetch the Reveiw and Rating Count of the Author ******************************
    async getReviewRatingCount() {
      let ratingResponse = await this.getAuthorRating({
        from: 'desktop',
        isLoggedInUser: this.isLoggedInUser
      })
      if (!ratingResponse['isError']) {
        this.profile.totalReviews = ratingResponse['data']['totalReviews']
        this.profile.rating = ratingResponse['data']['blooprintRating']
      }
    },
    // ****************** Triggers when an Image is uploaded *********************************
    onImageUpload(event) {
      if (event.target.files && event.target.files.length > 0) {
        let imageAdded = event.target.files[0]
        let fileName = imageAdded['name'].toLowerCase()
        if (
          fileName.endsWith('jpg') ||
          fileName.endsWith('jpeg') ||
          fileName.endsWith('png')
        ) {
          if (imageAdded['size'] > file10MB) {
            this.setToastMessage({
              type: 'negative',
              message: 'File size should not be greater than 10MB'
            })
          } else {
            let data = {
              file: imageAdded,
              type: 'image',
              from: 'profile'
            }
            this.fileUploadToFirebase(data)
          }
        } else {
          this.setToastMessage({
            type: 'negative',
            message: 'Upload valid Image File'
          })
        }
      }
    },
    // ************* Triggeres Follow API when a Follow Button is Clicked ***************************
    async onFollowClick() {
      if (this.profile['currentUserFollowing']) {
        // ************ API to Un-Follow ********************
        let followResponse = await this.unFollowAuthor({
          authorID: this.profile['id']
        })
        if (followResponse) {
          this.profile.currentUserFollowing = !followResponse
        }
      } else {
        // ************ API to Follow ********************
        let followResponse = await this.followAuthor({
          authorID: this.profile['id']
        })
        if (followResponse) {
          this.profile.currentUserFollowing = followResponse
        }
      }
    },
    // **************** Triggers when the Delete Button is clicked ****************************
    onDeleteAccountClick() {
      this.$router.push('/delete-account')
    },
    // *************** Triggers when image or video is uploaded *********************************8
    async updateUserImageandVideo(type) {
      let data = {
        data: {
          type: 'profiles',
          attributes: {}
        },
        profileId: localStorage.getItem('userId')
      }
      if (type['requestFrom'] == 'file') {
        data['data']['attributes'] = { ...this.profile }
      } else {
        data['data']['attributes'] = type['profileData']
        data['data']['attributes']['location'] = type['profileData']['location']
          ? type['profileData']['location']['value']
            ? type['profileData']['location']['value']
            : type['profileData']['location']
          : ''
      }

      delete data['data']['attributes']['email']
      delete data['data']['attributes']['firebaseUID']

      let response = await this.updateProfileInfo(data)
      if (response && type['requestFrom'] == 'profileDetails') {
        this.profile = {
          ...this.profile,
          ...type['profileData']
        }
        this.profile.loading = false
      }
      if (response && type['requestFrom'] == 'file') {
        this.profile.loading = true
        this.profile.loading = false
      }
    },
    // ************ Triggers when Edit Popup is closed ***************************
    closeEditPopup(event) {
      this.showEditProfilePopup = false
    },
    // ************ Triggers when Update Button is clicked in Edit Popup ***************************
    updateUserDetails(event) {
      this.showEditProfilePopup = false
      this.updateUserImageandVideo({
        requestFrom: 'profileDetails',
        profileData: event['userData']
      })
    },
    // ************ Triggers when Edit icon is clicked on Card ***************************
    openCardEditDialog() {
      this.cardEditDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
.editCardStyle {
  min-width: 600px;
  @media only screen and (max-width: $breakpoint-md-max) {
    min-width: 600px !important;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: 0px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    min-width: 0px !important;
  }
}
</style>
<style lang="scss">
.img-skeleton {
  margin: 0 auto;
}
.border-style {
  border-radius: 4px;
}
.followStyle {
  border: 1px solid $secondary;
  border-radius: 4px;
  opacity: 1;
}
.profile {
  span {
    display: block;
  }
}

.page-full-height {
  min-height: 85vh !important;
}
.page-mid-height {
  min-height: 80vh !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    min-height: 70vh !important;
  }
}
body.desktop .q-focus-helper {
  width: 0%;
}
.q-ripple {
  width: 0%;
}
.file-before-upload {
  position: absolute;
  left: 40%;
  top: 15%;
  display: block;
  font-size: 16px;
}
.file-after-upload {
  display: none;
}
.video-edit {
  left: 17px;
  bottom: 63px;
}
.video-edit-after-upload {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
}
.camIcon {
  position: absolute;
  bottom: -5px;
  right: -5px;
  z-index: 1;
}
.videoEdit {
  position: absolute;
  top: -46px;
  right: 0;
  z-index: 1;
}
.save-button {
  width: 160px;
  height: 40px;
}
.cardEdit {
  position: absolute;
  top: 0;
  right: -35px;
  z-index: 1;
}
.title {
  text-decoration: underline;
  text-decoration-color: #00308f;
}
.cardDesign {
  border-radius: 4px;
  height: 162px;
  width: 298px;
  background-image: linear-gradient(to left, #1652f0, #00308f);
}
@media only screen and (max-width: $breakpoint-xs-max) {
  .cardDesign {
    width: 250px;
  }
  .cardEdit {
    right: -25px;
  }
}
</style>
