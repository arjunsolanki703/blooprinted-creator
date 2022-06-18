<template>
  <div class="column main q-mt-lg" style="margin:0 auto;">
    <q-form ref="blooprintForm" class="q-mt-md">
      <label class="text-dimGrey">Name*</label>
      <q-input
        borderless
        ref="name"
        v-model.trim="blooprintData.name"
        input-class="text-grey"
        class="inputFields borderAll bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
        :rules="[val => (val && val.length > 0) || 'Name is required']"
      />
      <label class="text-dimGrey">Description*</label>
      <q-input
        borderless
        ref="description"
        v-model.trim="blooprintData.description"
        type="textarea"
        input-class="text-grey"
        class="inputFields borderAll bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
        :rules="[val => (val && val.length > 0) || 'Description is required']"
      />
      <div class="row">
        <div class="col-12 q-mb-lg relative-position">
          <label class="text-dimGrey">Thumbnail Image*</label>
          <div
            v-if="
              blooprintData.thumbnailImage != null &&
                blooprintData.thumbnailImage != ''
            "
            class="relative-position q-mb-lg"
            style="height: 250px;"
          >
            <q-img
              :ratio="1"
              fit="contain"
              :src="blooprintData.thumbnailImage"
              style="height: 250px;"
            />
            <q-avatar
              class="video-edit-after-upload"
              @click="blooprintData.thumbnailImage = null"
              square
              color="primary"
              size="24px"
              text-color="white"
              icon="close"
            ></q-avatar>
          </div>
          <q-file
            v-else
            v-model="blooprintData.thumbnailImage"
            ref="thumbnailImage"
            borderless
            color="primary"
            label-color="grey"
            input-class="text-grey"
            class="
                borderAll
                bg-white
                rounded-borders
                text-primary
                q-mb-lg q-px-md q-pb-none
              "
            style="height: 250px; position: relative"
            accept=".jpg, .jpeg, .png"
            max-files="1"
            @input="onImageUpload($event, 'thumbnailImage')"
            :rules="[
              val => (val && val.length > 0) || 'Thumbnail image is required'
            ]"
          >
            <div
              class="q-pa-auto q-px-xs text-grey text-secondary"
              :class="[
                blooprintData.thumbnailImage
                  ? 'file-after-upload'
                  : 'thumbnail-before-upload file-before-upload'
              ]"
            >
              <template>
                <q-avatar
                  @click.stop
                  square
                  size="md"
                  class="borderAccent"
                  text-color="accent"
                  icon="add"
                ></q-avatar>
              </template>
            </div>
          </q-file>
          <div class="absolute-bottom text-dimGrey" style="bottom: -15px">
            Allowed types: jpg, jpeg, png
          </div>
        </div>
      </div>
      <div class="col-12 q-mb-xl q-mt-sm relative-position">
        <label class="text-dimGrey">Welcome / Promo Video</label>
        <div
          v-if="
            blooprintData.promoVideo != null && blooprintData.promoVideo != ''
          "
          class="relative-position q-mb-lg"
        >
          <video controls muted style="width:100%; height: 300px;">
            <source :src="blooprintData.promoVideo" type="video/mp4" />
          </video>

          <q-avatar
            class="video-edit-after-upload"
            @click="blooprintData.promoVideo = null"
            square
            color="primary"
            size="24px"
            text-color="white"
            icon="close"
          ></q-avatar>
        </div>
        <q-file
          v-else
          v-model="blooprintData.promoVideo"
          borderless
          color="primary"
          label-color="grey"
          input-class="text-grey"
          class="
            borderAll
            bg-white
            rounded-borders
            text-primary
            q-mb-lg q-px-md q-pb-none
          "
          style="height: 250px; position: relative"
          accept=".mp4"
          max-files="1"
          max-file-size="400000000"
          @input="onVideoUpload"
          @rejected="onFileRejected"
        >
          <div
            class="q-pa-auto q-px-xs text-grey text-secondary items-center"
            :class="[
              blooprintData.promoVideo
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
        <div class="absolute-bottom text-dimGrey" style="bottom: -30px">
          Allowed type: mp4, Max size: 400 MB
        </div>
      </div>
      <div>
        <label class="text-dimGrey q-mb-xl">Category</label>

        <q-select
          v-model="chosenCategory"
          outlined
          :options="categoriesListOptions"
          emit-value
          map-options
          :rules="[val => (val && val.length > 0) || 'Category is required']"
        />
      </div>
      <div>
        <label class="text-dimGrey q-mb-xl">SubCategory</label>

        <q-select
          outlined
          v-model="chosenSubcategory"
          :options="subCategories"
          emit-value
          map-options
         
        />
      </div>

      <div class="q-mb-md">
        <div class="q-mb-xs">blooprint key-points*</div>
        <label class="text-dimGrey">
          Describe 3 life changing benefits for a person who is considering the
          purchase of your blooprint.
        </label>
      </div>
      <div v-for="index in 3" :key="index">
        <label class="text-dimGrey">Key-Point {{ index }}</label>
        <q-input
          type="text"
          placeholder="key-point title"
          outlined
          v-model.trim="blooprintData.keyPoints[index - 1]['label']"
          :rules="[val => (val && val.length > 0) || 'required']"
          class="q-pb-md"
        />
        <q-input
          type="textarea"
          placeholder="Description"
          outlined
          v-model.trim="blooprintData.keyPoints[index - 1]['value']"
          :rules="[val => (val && val.length > 0) || 'required']"
          class="q-pb-lg"
        />
      </div>

      <label class="text-dimGrey">Level</label>
      <q-select
        outlined
        v-model="blooprintData.level"
        :options="levelOptions"
        class="q-pb-md"
        :rules="[val => (val && val.length > 0) || 'Level is required']"
      />

      <label class="text-dimGrey">Price*</label>
      <q-input
        borderless
        ref="price"
        v-model.trim="blooprintData.price"
        type="text"
        fill-mask="0"
        mask="#.##"
        reverse-fill-mask
        label-color="#F7F7F7"
        input-class="text-grey"
        class="inputFields borderAll bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
        lazy-rules
        :rules="[
          val => (val && isPriceValid(val)) || 'Price is required',
          val =>
            (val && minPriceValidation(val)) ||
            'Price should not be less than 0.5',
          val =>
            (val && maxPriceValidation(val)) ||
            'Price should not be greater than 10,000'
        ]"
      >
        <template v-slot:prepend>
          <div class="text-grey text-body1">$</div>
        </template>
      </q-input>
      <div class="flex justify-center q-mb-md">
        <q-btn
          outline
          color="white"
          size="16px"
          class="save-button"
          text-color="primary"
          label="Cancel"
          :to="{ name: 'dashboard' }"
        />
        <q-btn
          no-caps
          color="primary"
          size="16px"
          class="q-mx-md save-button"
          text-color="white"
          :label="isEditScreen ? 'Update' : 'Save'"
          @click="onSaveClick()"
        />
      </div>
    </q-form>
    <UpgradePlan
      v-if="showPlanPopup"
      :currentPlan="currentPlanInfo"
      @on-upgrade-plan-popup-close="onUpgradePlanPopupClose"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UpgradePlan from 'components/UpgradePlan.vue'

export default {
  name: 'BlooprintDetails',
  data() {
    return {
      blooprintData: {
        name: '',
        description: '',
        bannerImage: null,
        thumbnailImage: null,
        promoVideo: null,
        price: '',
        level: '',
        keyPoints: [
          {
            label: '',
            value: ''
          },
          {
            label: '',
            value: ''
          },
          {
            label: '',
            value: ''
          }
        ],
        categories: [],
        categoryIDs: []
      },
      isEditScreen: false,
      existingBlooprintCount: 0,
      existingBlooprintList: [],
      showPlanPopup: false,
      allPlansList: [],
      currentPlanInfo: {},
      levelOptions: ['beginner', 'intermediate', 'advanced'],
      chosenSubcategory: '',
      categoriesListOptions: [],
      chosenCategory: '',
      subCategories: [],
      allCategories: []
    }
  },
  components: { UpgradePlan },
  computed: {
    ...mapGetters([
      'fileUrl',
      'allPlans',
      'planInfo',
      'categoriesList',
      'parentCategoriesList'
    ])
  },
  watch: {
    fileUrl(data) {
      if (data['type'] == 'video') {
        this.blooprintData.promoVideo = data['url']
      }
      if (data['type'] == 'bannerImage') {
        this.blooprintData.bannerImage = data['url']
      }
      if (data['type'] == 'thumbnailImage') {
        this.blooprintData.thumbnailImage = data['url']
      }
    },
    allPlans(plans) {
      this.allPlansList = plans
      this.fetchCurrentPlanDetails()
    },
    planInfo(data) {
      this.fetchCurrentPlanDetails()
    },
    parentCategoriesList(data) {
      data.map(item => {
        this.categoriesListOptions.push({
          label: item.attributes.name,
          value: item.id
        })
      })
    },
    chosenCategory(data) {
      if (!this.isEditScreen) {
        this.chosenSubcategory = ''
      }
      this.subCategories = []
      this.allCategories.map(item => {
        if (item['attributes']['parent'] === data) {
          this.subCategories.push({
            label: item.attributes.name,
            value: item.id
          })
        }
      })
    },
    categoriesList(data) {
      this.allCategories = data
    }
  },
  async mounted() {
    this.getParentCategoriesList()
    this.getCategoriesList()
    this.getPlans()
    this.getCurrentPlanInfo()
    let blooprint = this.$router.history.current.params
    if (blooprint['blooprintId']) {
      this.isEditScreen = true
      this.fetchBlooprintDetails()
    }
    let date = new Date()
    let unixDate = new Date(date.setDate(date.getDate() - 30)).getTime() / 1000
    let response = await this.retrieveAuthorBlooprintList({
      // since: unixDate.toFixed()
    })
    this.existingBlooprintList = response['data']
    this.existingBlooprintCount = response['meta']['count']
  },
  methods: {
    ...mapActions([
      'fileUploadToFirebase',
      'createBlooprint',
      'updateBlooprint',
      'setToastMessage',
      'getBlooprintDetailsById',
      'retrieveAuthorBlooprintList',
      'getPlans',
      'getCurrentPlanInfo',
      'getParentCategoriesList',
      'getCategoriesList'
    ]),
    isPriceValid(val) {
      return !(val == 0.0 || val == '')
    },
    minPriceValidation(val) {
      return !(val != 0.0 && val != '' && val < 0.5)
    },
    maxPriceValidation(val) {
      return !(val != 0.0 && val != '' && val > 10000)
    },
    async fetchBlooprintDetails() {
      let data = await this.getBlooprintDetailsById()
      this.blooprintData = {
        name: data['attributes']['name'],
        description: data['attributes']['description'],
        bannerImage: data['attributes']['banner'],
        thumbnailImage: data['attributes']['thumbnail'],
        promoVideo: data['attributes']['video'],
        price: data['attributes']['price']
          ? data['attributes']['price'].toFixed(2)
          : 0.0,
        level: data['attributes']['level'],
        keyPoints: data['attributes']['keypoints'],
        categories:  data['attributes']['categories'],
        categoryIDs: data['attributes']['categoryIDs']
      }
      this.chosenCategory = data['attributes']['categoryIDs'][0]['parent']
      this.chosenSubcategory = data['attributes']['categoryIDs'][0]['child']
    },
    async onSaveClick() {
      this.$refs.name.validate()
      this.$refs.description.validate()
      if (this.$refs.bannerImage) {
        this.$refs.bannerImage.validate()
      }
      if (this.$refs.thumbnailImage) {
        this.$refs.thumbnailImage.validate()
      }
      this.$refs.price.validate()
      this.blooprintData.categories.push(this.chosenSubcategory.toString())
      this.$refs.blooprintForm.validate().then(async success => {
        if (success) {
          let createData = {
            name: this.blooprintData.name,
            description: this.blooprintData.description,
            thumbnail: this.blooprintData.thumbnailImage,
            video: this.blooprintData.promoVideo,
            price: parseFloat(this.blooprintData.price),
            level: this.blooprintData.level.toString(),
            keyPoints: this.blooprintData.keyPoints,
            categories: this.blooprintData.categories
          }

          let data
          if (this.isEditScreen) {
            data = await this.updateBlooprint(createData)
            this.$router.push({
              name: 'blooprints-milestone',
              params: { blooprintId: data.id }
            })
          } else {
            // *************** Show the Plan Popup if the Blooprints in the Plan got exceeded *****************
            if (
              this.currentPlanInfo['accessibleBlooprints'] > 0 &&
              this.existingBlooprintList.length >=
                this.currentPlanInfo['accessibleBlooprints']
            ) {
              this.showPlanPopup = true
            } else {
              data = await this.createBlooprint(createData)
              this.$router.push({
                name: 'blooprints-milestone',
                params: { blooprintId: data.id }
              })
            }
          }
        }
      })
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
      this.blooprintData.promoVideo = null
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
    },
    onImageUpload(event, fileType) {
      let imageAdded = event
      let fileName = imageAdded['name'].toLowerCase()
      if (fileType == 'bannerImage') {
        this.blooprintData.bannerImage = null
      }
      if (fileType == 'thumbnailImage') {
        this.blooprintData.thumbnailImage = null
      }

      if (
        fileName.endsWith('jpg') ||
        fileName.endsWith('jpeg') ||
        fileName.endsWith('png')
      ) {
        let data = {
          file: imageAdded,
          type: fileType,
          from: 'blooprint/'
        }
        this.fileUploadToFirebase(data)
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Upload valid image File'
        })
      }
    },
    fetchCurrentPlanDetails() {
      let selectedPlan = this.allPlansList.filter(
        plan => plan.planID == this.planInfo['Id']
      )
      if (selectedPlan.length > 0) {
        this.currentPlanInfo = selectedPlan[0]
      }
    },
    onUpgradePlanPopupClose(event) {
      this.showPlanPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 600px;
}
.save-button {
  width: 160px;
  height: 40px;
}
.file-before-upload {
  position: absolute;
  top: 175%;
  display: block;
  font-size: 30px;
  left: 45%;
}
.banner-before-upload {
  left: 45%;
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
}
.inputFields {
  width: 600px;
}
</style>
