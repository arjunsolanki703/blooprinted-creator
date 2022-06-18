<template>
  <q-page style="overflow-x: hidden; width: 100%">
    <!-- Desktop -->
    <div class="gt-sm" style="margin-top:2px;">
      <q-dialog
        v-model="createBlooprintPopup"
        persistent
        :maximized="$q.screen.lt.sm ? true : false"
      >
        <CreateBlooprintPopup @close-popup="closePopup" />
      </q-dialog>
      <q-dialog v-model="deleteblooprint" persistent>
        <DeleteBlooprint
          :id="deleteBlooprintId"
          @close-delete-popup="closeDeletePopup"
        />
      </q-dialog>
      <q-dialog v-model="publishblooprint" persistent>
        <PublishBlooprintPopup
          :blooprintDetails="blooprintSelected"
          :id="publishBlooprintId"
          @close-publish-popup="closePublishPopup"
        />
      </q-dialog>
      <q-dialog v-model="unpublishblooprint" persistent>
        <UnpublishBlooprintPopup
          :id="unpublishBloorprintId"
          @close-unpublish-popup="closeUnPublishPopup"
        />
      </q-dialog>
      <div
        class="top-banner row bg-regalBlue text-white f-w-600 text-fs-16 text-lh-24"
      >
        <div style="padding: 16px 0px;">
          Get started on your <br />blooprint journey
        </div>
        <div
          class="row align-center justify-center"
          style="padding-top:20px; padding-bottom:20px"
        >
          <q-img
            :style="
              $q.screen.width > 1160 ? 'margin-left:40px;' : 'margin-left:20px;'
            "
            src="~assets/bluecheckcircle.svg"
            width="40px"
            height="40px"
          />
          <div
            class="align-center justify-center header-options"
            style="padding-top:8px; padding-bottom:8px"
          >
            Start Creating
          </div>
        </div>
        <div
          class="row align-center justify-center"
          style="padding-top:20px; padding-bottom:20px"
          v-if="profileCompleted"
        >
          <q-img
            :style="
              $q.screen.width > 1160 ? 'margin-left:40px;' : 'margin-left:20px;'
            "
            src="~assets/bluecheckcircle.svg"
            width="40px"
            height="40px"
          />
          <div
            class="align-center justify-center header-options"
            style="padding-top:8px; padding-bottom:8px"
          >
            Complete Profile
          </div>
        </div>
        <div
          class="row align-center justify-center cursor-pointer"
          style="padding-top:20px; padding-bottom:20px"
          v-else
          @click="goToSettings"
        >
          <q-img
            :style="
              $q.screen.width > 1160 ? 'margin-left:40px;' : 'margin-left:20px;'
            "
            src="~assets/bluecircle.svg"
            width="40px"
            height="40px"
          />
          <div
            class="align-center justify-center header-options"
            style="padding-top:8px; padding-bottom:8px"
          >
            Complete Profile
          </div>
        </div>
        <div
          class="row align-center justify-center"
          style="padding-top:20px; padding-bottom:20px"
        >
          <q-img
            :style="
              $q.screen.width > 1160 ? 'margin-left:40px;' : 'margin-left:20px;'
            "
            v-if="!progressBlooprint.length"
            src="~assets/whitecircle.svg"
            width="40px"
            height="40px"
          />
          <q-img
            :style="
              $q.screen.width > 1160 ? 'margin-left:40px;' : 'margin-left:20px;'
            "
            v-else
            src="~assets/bluecheckcircle.svg"
            width="40px"
            height="40px"
          />
          <div
            class="align-center justify-center header-options"
            style="padding-top:8px; padding-bottom:8px"
          >
            Continue Creating
          </div>
        </div>
        <div
          class="row align-center justify-center"
          style="padding-top:20px; padding-bottom:20px"
        >
          <q-img
            :style="
              $q.screen.width > 1160 ? 'margin-left:40px;' : 'margin-left:20px;'
            "
            v-if="!publishedCount && progressBlooprint.length"
            src="~assets/bluecircle.svg"
            width="40px"
            height="40px"
          />
          <q-img
            :style="
              $q.screen.width > 1160 ? 'margin-left:40px;' : 'margin-left:20px;'
            "
            v-if="!publishedCount && !progressBlooprint.length"
            src="~assets/whitecircle.svg"
            width="40px"
            height="40px"
          />
          <q-img
            :style="
              $q.screen.width > 1160 ? 'margin-left:40px;' : 'margin-left:20px;'
            "
            v-if="publishedCount"
            src="~assets/bluecheckcircle.svg"
            width="40px"
            height="40px"
          />
          <div
            class="align-center justify-center header-options"
            style="padding-top:8px; padding-bottom:8px;"
          >
            Publish blooprint
          </div>
        </div>
      </div>
      <div class="my-blooprints background-class">
        <div class="row full-width justify-between">
          <div class="f-w-600 text-fs-48-lh-56">Creator Studio</div>
          <div class="row">
            <!-- <q-btn
                    label="Done With You blooprint"
                    no-caps
                    unelevated
                    :style="$q.screen.width > 1267 ? 'margin-right:32px;' : 'margin-right:32px;'"
                    class="f-w-600 text-fs-16 text-lh-24 text-primary done-button bg-white"
                    /> -->
            <q-btn
              @click="goToBlooprintCreate"
              label="Create new blooprint"
              no-caps
              class="f-w-600 text-fs-16 text-lh-24  create-button bg-primary text-white"
            >
              <div class="relative-position">
                <div style="margin-left: 8px">
                  <q-img
                    src="~assets/pluscirclemb.svg"
                    width="24px"
                    height="24px"
                  />
                </div>
              </div>
            </q-btn>
          </div>
        </div>
        <!-- <q-skeleton v-if="isLoading" style="margin-top:16px; max-width:480px"></q-skeleton>
                <div v-if="!isLoading" class="f-w-500 text-fs-16 text-lh-24 text-regalBlue" style="margin-top:16px;">{{publishedCount}} published blooprint<span v-if="publishedCount !== 0">s</span>. 1 remaining on Free plan</div> -->
        <div class="in-progress-blooprints" style="margin-top:40px">
          <div class="row">
            <div class="f-w-600 text-fs-16 text-lh-24 text-regalBlue">
              In progress
            </div>
            <q-img
              src="~assets/chevron-down.svg"
              width="24px"
              height="24px"
              style="margin-left:8px;"
            />
          </div>
          <div>
            <div
              v-swiper:mySwiperRef="swiperOption"
              style="height: 400px;"
              class="swiper-container"
            >
              <div class="swiper-wrapper">
                <NewBlooprintCard
                  class="blooprint-cards swiper-slide"
                  @open-popup="goToBlooprintCreate"
                />
                <div class="row">
                  <BlooprintDataCardSkeleton v-if="isLoading" :totalCards="1" />
                </div>
                <div
                  class="swiper-slide"
                  v-for="(blooprint, index) in progressBlooprint"
                  :key="index"
                >
                  <BlooprintDataCard
                    :name="blooprint['attributes']['name']"
                    :image="blooprint['attributes']['thumbnail']"
                    :category="blooprint['attributes']['categories']"
                    :createdDate="
                      convertDate(blooprint['attributes']['createdDate'])
                    "
                    :status="blooprint['attributes']['status']"
                    :id="blooprint['id']"
                    @delete-blooprint="deleteBlooprintPopup"
                    @publish-blooprint="publishBlooprintPopup"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="margin-top:60px;">
            <div class="f-w-600 text-fs-16 text-lh-24 text-regalBlue">
              Published
            </div>
            <q-img
              src="~assets/chevron-down.svg"
              width="24px"
              height="24px"
              style="margin-left:8px;"
            />
          </div>
          <no-published-blooprints
            v-if="publishedCount === 0 && !isLoading"
            class="blooprint-cards"
            style="margin-bottom:120px"
          />
          <BlooprintDataCardSkeleton
            v-if="isLoading"
            :totalCards="1"
            class="lt-lg"
            style="margin-bottom:120px"
          />
          <BlooprintDataCardSkeleton
            v-if="isLoading"
            :totalCards="1"
            class="gt-md"
            style="margin-bottom:120px"
          />
          <PublishedBlooprints
            @unpublish-blooprint="unpublishBlooprintPopup"
            :activeBlooprint="activeBlooprint"
            :publishedCount="publishedCount"
            :isLoading="isLoading"
            v-if="publishedCount"
            @delete-blooprint="deleteBlooprintPopup"
          />
        </div>
      </div>
    </div>
    <!-- Mobile and Tablets -->
    <div class="lt-md">
      <div class="my-blooprints bg-solitudeBlue">
        <div class="text-regalBlue f-w-600 text-fs-32-lh-36">
          Creator Studio
        </div>
        <!-- <q-skeleton v-if="isLoading" style="margin-top:8px; max-width:200px"></q-skeleton> -->
        <!-- <q-skeleton v-if="isLoading" style="margin-top:5px; max-width:200px"></q-skeleton>
                <div v-if="!isLoading" style="margin-top:8px" class="text-regalBlue f-w-500 text-fs-16 text-lh-24">{{publishedCount}} published blooprint<span v-if="publishedCount !== 0">s</span>.<br/>1 remaining on Free plan</div> -->
        <q-btn
          @click="goToBlooprintCreate"
          label="Create new blooprint"
          style="border-radius:10px; margin-top:24px; height:44px;"
          class="bg-primary text-white f-w-600 text-fs-16 text-lh-24 full-width"
          no-caps
          unelevated
        >
          <div class="relative-position">
            <div style="margin-left: 8px">
              <q-img
                src="~assets/pluscirclemb.svg"
                width="24px"
                height="24px"
              />
            </div>
          </div>
        </q-btn>
        <!-- <q-btn
                    label="Done With You blooprint"
                    class="f-w-600 text-fs-16 text-lh-24 text-primary full-width done-button bg-white"
                    no-caps
                    unelevated
                >
                </q-btn> -->
      </div>
      <div class="blooprint-section">
        <div class="row">
          <div class="f-w-600 text-fs-16 text-lh-24 text-regalBlue">
            In progress
          </div>
          <q-img
            src="~assets/chevron-down.svg"
            width="24px"
            height="24px"
            style="margin-left:8px;"
          />
        </div>
        <!-- Tablet InProgess Blooprints -->
        <div class="gt-xs row no-wrap">
          <InProgressBlooprints
            :progressBlooprint="progressBlooprint"
            @open-popup="goToBlooprintCreate"
            @delete-blooprint="deleteBlooprintPopup"
            @publish-blooprint="publishBlooprintPopup"
          />
          <BlooprintDataCardSkeleton v-if="isLoading" :totalCards="1" />
        </div>
        <!-- MObile InProgess Blooprints -->
        <div class="row lt-sm">
          <NewBlooprintCard
            style="margin-top:20px"
            @open-popup="goToBlooprintCreate"
          />
          <BlooprintDataCardSkeleton v-if="isLoading" :totalCards="1" />
          <div v-for="(blooprint, index) in progressBlooprint" :key="index">
            <BlooprintDataCard
              style="margin-top:24px"
              :name="blooprint['attributes']['name']"
              :image="blooprint['attributes']['thumbnail']"
              :category="blooprint['attributes']['categories']"
              :createdDate="convertDate(blooprint['attributes']['createdDate'])"
              :status="blooprint['attributes']['status']"
              :id="blooprint['id']"
              @delete-blooprint="deleteBlooprintPopup"
              @publish-blooprint="publishBlooprintPopup"
            />
          </div>
        </div>
        <div class="row" style="margin-top:40px;">
          <div class="f-w-600 text-fs-16 text-lh-24 text-regalBlue">
            Published
          </div>
          <q-img
            src="~assets/chevron-down.svg"
            width="24px"
            height="24px"
            style="margin-left:8px;"
          />
        </div>
        <!-- Tablet Published Blooprints -->
        <no-published-blooprints
          v-if="publishedCount === 0 && !isLoading"
          class="blooprint-cards gt-xs"
        />
        <BlooprintDataCardSkeleton
          v-if="isLoading"
          :totalCards="1"
          class="gt-xs"
        />
        <PublishedBlooprints
          @unpublish-blooprint="unpublishBlooprintPopup"
          @delete-blooprint="deleteBlooprintPopup"
          :activeBlooprint="activeBlooprint"
          :publishedCount="publishedCount"
          :isLoading="isLoading"
          class="gt-xs"
          v-if="publishedCount"
        />
        <!-- Mobile Published Blooprints -->
        <div class="row lt-sm">
          <BlooprintDataCardSkeleton v-if="isLoading" :totalCards="1" />
          <NoPublishedBlooprints v-if="publishedCount === 0 && !isLoading" />
          <div v-for="(blooprint, index) in activeBlooprint" :key="index">
            <BlooprintDataCard
              style="margin-top:24px"
              :name="blooprint['attributes']['name']"
              :image="blooprint['attributes']['thumbnail']"
              :category="blooprint['attributes']['categories']"
              :createdDate="convertDate(blooprint['attributes']['createdDate'])"
              :status="blooprint['attributes']['status']"
              :id="blooprint['id']"
              @delete-blooprint="deleteBlooprintPopup"
              @unpublish-blooprint="unpublishBlooprintPopup"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import NewBlooprintCard from '../../components/NewBlooprintCard.vue'
import BlooprintDataCard from '../../components/BlooprintDataCard.vue'
import NoPublishedBlooprints from '../../components/NoPublishedBlooprints.vue'
import CreateBlooprintPopup from '../../components/CreateBlooprintPopup.vue'
import BlooprintDataCardSkeleton from '../../components/BlooprintDataCardSkeleton.vue'
import PublishedBlooprints from '../../components/PublishedBlooprints.vue'
import InProgressBlooprints from '../../components/InProgressBlooprints.vue'
import DeleteBlooprint from '../../components/DeleteBlooprint.vue'
import PublishBlooprintPopup from '../../components/PublishBlooprintPopup.vue'
import UnpublishBlooprintPopup from '../../components/UnpublishBlooprintPopup.vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { constants, getUserId } from 'src/utils/common'
export default {
  data() {
    return {
      blooprintList: [],
      publishedCount: 0,
      activeBlooprint: [],
      progressBlooprint: [],
      createBlooprintPopup: false,
      isLoading: true,
      numberOfBlooprints: 0,
      profileCompleted: false,
      deleteblooprint: false,
      publishblooprint: false,
      unpublishblooprint: false,
      deleteBlooprintId: '',
      publishBlooprintId: '',
      unpublishBloorprintId: '',
      blooprintSelected: {},
      swiperOption: {
        slidesPerView: 1,
        freeMode: true,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1630: {
            slidesPerView: 2.99
          },
          1600: {
            slidesPerView: 2.9
          },
          1582: {
            slidesPerView: 2.8
          },
          1450: {
            slidesPerView: 2.4
          },
          1377: {
            slidesPerView: 2.2
          },
          1288: {
            slidesPerView: 2
          },
          1240: {
            slidesPerView: 1.8
          },
          1150: {
            slidesPerView: 1.7
          },
          1102: {
            slidesPerView: 1.6
          },
          1030: {
            slidesPerView: 1.5
          },
          1023: {
            slidesPerView: 1.4
          },
          1008: {
            slidesPerView: 2.8
          },
          905: {
            slidesPerView: 2.5
          },
          872: {
            slidesPerView: 2.4
          },
          837: {
            slidesPerView: 2.3
          },
          750: {
            slidesPerView: 2
          },
          668: {
            slidesPerView: 1.8
          },
          634: {
            slidesPerView: 1.5
          },
          568: {
            slidesPerView: 1.5
          },
          534: {
            slidesPerView: 1.5
          },
          500: {
            slidesPerView: 1.4
          },
          466: {
            slidesPerView: 1.3
          },
          432: {
            slidesPerView: 1.2
          },
          426: {
            slidesPerView: 1.18
          },
          409: {
            slidesPerView: 1.13
          },
          398: {
            slidesPerView: 1.1
          },
          381: {
            slidesPerView: 1.05
          },
          373: {
            slidesPerView: 1.025
          },
          365: {
            slidesPerView: 1
          },
          345: {
            slidesPerView: 1.1
          },
          340: {
            slidesPerView: 1.05
          },
          300: {
            slidesPerView: 1
          }
        }
      }
    }
  },
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    UnpublishBlooprintPopup,
    PublishBlooprintPopup,
    DeleteBlooprint,
    NewBlooprintCard,
    BlooprintDataCard,
    NoPublishedBlooprints,
    CreateBlooprintPopup,
    PublishedBlooprints,
    BlooprintDataCardSkeleton,
    InProgressBlooprints
  },
  mounted() {
    this.getBlooprintList()
    this.getProfileDetails()
  },
  methods: {
    ...mapActions([
      'retrieveAuthorBlooprintList',
      'fetchProfileInfo',
      'getBlooprintDetailsBasedOnId'
    ]),
    deleteBlooprintPopup(id) {
      this.deleteblooprint = true
      this.deleteBlooprintId = id
    },
    async publishBlooprintPopup(id) {
      this.publishblooprint = true
      this.publishBlooprintId = id
      this.blooprintSelected = await this.getBlooprintDetailsBasedOnId(id)
    },
    unpublishBlooprintPopup(id) {
      this.unpublishblooprint = true
      this.unpublishBloorprintId = id
    },
    closePublishPopup(event) {
      this.publishblooprint = false
      this.blooprintSelected = {}
      this.publishBlooprintId = ''
      if (event['isUpdated']) {
        this.getBlooprintList()
      }
    },
    closePopup() {
      this.createBlooprintPopup = false
    },
    closeUnPublishPopup(event) {
      this.unpublishblooprint = false
      this.unpublishBloorprintId = ''
      if (event['isUpdated']) {
        this.getBlooprintList()
      }
    },
    closeDeletePopup(event) {
      this.deleteblooprint = false
      this.deleteBlooprintId = ''
      if (event['isUpdated']) {
        this.getBlooprintList()
      }
    },
    async getProfileDetails() {
      let response = await this.fetchProfileInfo()
      if (response.yourself && response.timeZone) {
        this.profileCompleted = true
      }
    },
    async getBlooprintList() {
      this.activeBlooprint = []
      this.publishedCount = 0
      this.progressBlooprint = []
      this.blooprintList = []
      this.isLoading = true
      let blooprintData = await this.retrieveAuthorBlooprintList()
      this.numberOfBlooprints = blooprintData['data'].length
      this.blooprintList = blooprintData['data']
      this.blooprintList.map(item => {
        if (item['attributes']['status'] === 'active') {
          this.publishedCount++
          this.activeBlooprint.push(item)
        } else if (
          item['attributes']['status'] === 'progress' ||
          item['attributes']['status'] === 'unpublish'
        ) {
          this.progressBlooprint.push(item)
        }
      })
      this.isLoading = false
    },
    goToBlooprintCreate() {
      if (this.numberOfBlooprints > 0) {
        this.createBlooprintPopup = true
      } else {
        this.$router.push({
          name: 'firstBlooprintCreation'
        })
      }
    },
    convertDate(date) {
      let value = moment(date.slice(0, 10), 'YYYY-MM-DD').toString()
      return `${value.slice(0, 3)}, ${value.slice(8, 10)} ${value.slice(
        4,
        8
      )} ${value.slice(11, 15)}`
    },
    goToSettings() {
      this.$router.push({
        name: 'settings'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-banner {
  padding-left: 56px;
  @media only screen and (min-width: 1024px) and (max-width: 1066px) {
    padding-left: 15px;
  }
  @media only screen and (min-width: 1024px) and (max-width: 1025px) {
    padding-left: 10px;
  }
}
.header-options {
  margin-left: 16px;
  @media only screen and (max-width: 1200px) {
    margin-left: 12px !important;
  }
}
.background-class {
  background: linear-gradient(
    to bottom,
    $solitudeBlue 0%,
    $solitudeBlue 500px,
    #ffffff 500px,
    #ffffff 100%
  );
}
.my-blooprints {
  padding: 45px 52px 0px 52px;
  @media only screen and (width: 1024px) {
    padding-bottom: 100px !important;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 30px 15px;
  }
}

.done-button {
  width: 244px;
  height: 44px;
  border: 2px solid #1652f0;
  border-radius: 10px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
  }
}

.create-button {
  width: 254px;
  height: 44px;
  border-radius: 10px;
}

.blooprint-section {
  padding: 20px 15px 100px 15px;
}

.q-dialog__inner--minimized > div {
  max-width: fit-content;
  max-height: fit-content;
}
.swiper-slide {
  width: 319px !important;
}
</style>
