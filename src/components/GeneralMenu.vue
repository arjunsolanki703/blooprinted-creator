<template>
  <div class="general-card-padding">
    <div class="text-regalBlue f-w-600 general-heading">General</div>
    <q-form ref="generalForm">
      <div>
        <label class="text-regalBlue f-w-600 text-body1">
          blooprint description
          <span class="text-errorColor">*</span>
        </label>
        <q-input
          borderless
          ref="description"
          v-model.trim="description"
          type="textarea"
          placeholder="Enter blooprint description"
          class="border-input-field input-text-area-style text-regalBlue subtitle-letterspace q-mt-xs q-mb-lg q-pb-none"
          :rules="[
            val =>
              (val && val.length > 0) || 'blooprint description is required'
          ]"
        />
      </div>
      <div class="row">
        <div class="col-12 relative-position">
          <label class="text-regalBlue f-w-600 text-body1">
            blooprint image
            <span class="text-errorColor">*</span>
          </label>
          <div
            class="img-video-container relative-position q-mt-sm q-mb-sm"
            v-if="bannerImage != null && bannerImage != ''"
          >
            <q-img
              class="img-video-iframe"
              :src="bannerImage"
              cover
              style="border-radius: 8px;"
            />
            <q-avatar
              class="video-edit-after-upload"
              @click="bannerImage = null"
              square
              color="primary"
              size="24px"
              text-color="white"
              icon="close"
            />
          </div>
          <div v-else>
            <q-file
              v-model="bannerImage"
              ref="bannerImage"
              borderless
              color="primary"
              class="banner-image-style bg-white text-primary q-mt-sm q-px-md q-pb-none"
              accept=".jpg, .jpeg, .png"
              max-files="1"
              @input="onImageUpload($event, 'bannerImage')"
              @rejected="onImageRejected"
              :rules="[val => (val && val.length > 0) || 'Image is required']"
              style="margin-bottom: 20px"
            >
              <div
                class="q-pa-auto q-px-xs text-grey text-secondary"
                :class="[
                  bannerImage ? 'file-after-upload' : 'file-before-upload'
                ]"
              >
                <template>
                  <div class="row">
                    <q-icon
                      @click.stop
                      square
                      size="24px"
                      name="img:plus-circle.svg"
                    >
                    </q-icon>
                    <div
                      class="f-w-500 text-fs-14-lh-20 text-comet"
                      style="margin-left: 5px;margin-top: 2px"
                    >
                      upload file
                    </div>
                  </div>
                </template>
              </div>
            </q-file>
          </div>
        </div>
        <div
          v-if="bannerImage == null || bannerImage == ''"
          class="f-w-500 text-comet text-fs-14-lh-20"
        >
          <div>Recommended dimensions: 1280 x 720</div>
          <div>Allowed types: jpg, jpeg, png</div>
        </div>
      </div>
      <div class="row q-mt-lg">
        <div class="col-12 relative-position">
          <label class="text-body1">
            <span class="text-regalBlue f-w-600">Intro video </span>
            <span class="f-w-400 text-manateeGrey" style="font-style: italic;">
              — Optional
            </span>
          </label>
          <div
            class="img-video-container relative-position q-my-sm"
            v-if="promoVideo != null && promoVideo != ''"
          >
            <video
              id="video"
              class="img-video-iframe"
              controls
              muted
              style="border-radius: 8px;"
            >
              <source :src="promoVideo" />
            </video>
            <q-avatar
              class="video-edit-after-upload"
              @click="promoVideo = null"
              square
              color="primary"
              size="24px"
              text-color="white"
              icon="close"
            />
          </div>
          <q-file
            v-else
            v-model="promoVideo"
            borderless
            color="primary"
            label-color="grey"
            input-class="text-grey"
            class="banner-image-style bg-white text-primary q-mt-sm q-mb-sm q-px-md q-pb-none"
            accept=".mp4,.mov,.MOV"
            max-files="1"
            max-file-size="400000000"
            @input="onVideoUpload"
            @rejected="onFileRejected"
          >
            <div
              class="q-pa-auto q-px-xs text-grey text-secondary items-center"
              :class="[promoVideo ? 'file-after-upload' : 'file-before-upload']"
            >
              <div class="row">
                <q-icon
                  @click.stop
                  square
                  size="24px"
                  name="img:plus-circle.svg"
                >
                </q-icon>
                <div
                  class="f-w-500 text-fs-14-lh-20 text-comet"
                  style="margin-left: 5px;margin-top: 2px"
                >
                  upload file
                </div>
              </div>
            </div>
          </q-file>
        </div>
        <div class="text-dimGrey">
          <div>Recommended dimensions: 1280 x 720</div>
          <div>Allowed type: .mp4, .mov, .MOV, Max size: 400 MB</div>
        </div>
      </div>
      <!-- <div class="q-mt-lg">
        <label class="text-regalBlue f-w-600 text-body1">
          blooprint category
          <span class="text-errorColor">*</span>
        </label>
        <q-select
          ref="blooprintCategory"
          placeholder="Select a category"
          borderless
          v-model="categorySelected"
          class="border-input-field input-style text-regalBlue subtitle-letterspace q-mt-xs q-mb-lg q-pb-none"
          :options="allCategoriesList"
          :stack-label="false"
          use-input
          hide-selected
          fill-input
          emit-value
          map-options
          transition-hide="fade"
          transition-show="fade"
          :behavior="dropDownBehavior"
          input-debounce="0"
          :rules="[val => (val && val.length > 0) || 'Category is required']"
        />
      </div> -->
      <!-- <div class="q-mt-lg">
        <label class="text-regalBlue f-w-600 text-body1">
          blooprint sub-category
        </label>
        <q-select
          borderless
          placeholder="Select a sub-category"
          v-model="subCategorySelected"
          class="border-input-field input-style text-regalBlue subtitle-letterspace q-mt-xs q-mb-lg q-pb-none"
          :options="subCategoryList"
          :stack-label="false"
          use-input
          hide-selected
          fill-input
          emit-value
          map-options
          transition-hide="fade"
          transition-show="fade"
          :behavior="dropDownBehavior"
          input-debounce="0"
        />
      </div> -->
      <div class="q-mt-lg">
        <label class="text-regalBlue f-w-600 text-body1">
          blooprint difficulty level
          <span class="text-errorColor">*</span>
        </label>
        <div class="row q-mt-sm">
          <div
            class="diff-style q-mr-10 cursor-pointer q-mb-md-none q-mb-md-sm-none q-mb-xs-sm"
            :class="
              difficultyLevelSelected == 'beginner'
                ? 'diff-level-selected'
                : null
            "
            @click="onDifficultyLevelSelct('beginner')"
            @mouseout="onMouseOut('beginner')"
            @mouseover="onMouseOver('beginner')"
          >
            <q-img
              v-if="
                difficultyLevelSelected == 'beginner' ||
                  (levelHoverd['level'] == 'beginner' && levelHoverd['hovered'])
              "
              class="diff-level-img-style"
              src="~assets/beginner-level.svg"
            />
            <q-img
              v-else
              class="diff-level-img-style"
              src="~assets/Beginner.svg"
            />
            <span class="q-mt-10 f-w-600 text-body1">
              Beginner
            </span>
          </div>
          <div
            class="diff-style q-mr-10 cursor-pointer q-mb-md-none q-mb-md-sm-none q-mb-xs-sm"
            :class="
              difficultyLevelSelected == 'intermediate'
                ? 'diff-level-selected'
                : null
            "
            @click="onDifficultyLevelSelct('intermediate')"
            @mouseout="onMouseOut('intermediate')"
            @mouseover="onMouseOver('intermediate')"
          >
            <q-img
              v-if="
                difficultyLevelSelected == 'intermediate' ||
                  (levelHoverd['level'] == 'intermediate' &&
                    levelHoverd['hovered'])
              "
              class="diff-level-img-style"
              src="~assets/intermediate-level.svg"
            />
            <q-img
              v-else
              class="diff-level-img-style"
              src="~assets/Intermediate.svg"
            />
            <span class="q-mt-10 f-w-600 text-body1">
              Intermediate
            </span>
          </div>
          <div
            class="diff-style cursor-pointer"
            :class="
              difficultyLevelSelected == 'advanced'
                ? 'diff-level-selected'
                : null
            "
            @click="onDifficultyLevelSelct('advanced')"
            @mouseout="onMouseOut('advanced')"
            @mouseover="onMouseOver('advanced')"
          >
            <q-img
              v-if="
                difficultyLevelSelected == 'advanced' ||
                  (levelHoverd['level'] == 'advanced' && levelHoverd['hovered'])
              "
              class="diff-level-img-style"
              src="~assets/advanced-level.svg"
            />
            <q-img
              v-else
              class="diff-level-img-style"
              src="~assets/Advanced.svg"
            />
            <span class="q-mt-10 f-w-600 text-body1">
              Advanced
            </span>
          </div>
        </div>
      </div>
      <div class="q-mt-lg">
        <div class="row">
          <label class="text-regalBlue f-w-600 text-body1 q-mr-md">
            blooprint key-points
          </label>
          <q-icon style="margin-top:2px" size="20px" name="img:info.svg" />
        </div>
        <div
          class="f-w-500 text-fs-14-lh-20 text-comet"
          style="margin-top: 4px"
        >
          Describe 3 life changing benefits for a person who is considering the
          purchase of your blooprint.
        </div>
        <div class="q-mt-md" v-for="(key, i) of keyPoints" :key="i">
          <label class="text-regalBlue f-w-600 text-body1">
            Key-point {{ i + 1 }}
          </label>
          <q-input
            type="text"
            :ref="key['labelKey']"
            placeholder="key-point title"
            borderless
            v-model.trim="key['label']"
            :rules="[val => checkTitleValidity(i) || '']"
            class="border-input-field input-style text-regalBlue subtitle-letterspace q-mt-xs q-pb-none"
            @change="onKeyTitleChange(i)"
          />
          <q-input
            type="textarea"
            :ref="key['valueKey']"
            placeholder="Description"
            borderless
            v-model.trim="key['value']"
            :rules="[
              val => checkDescriptionValidity(i) || 'Description is required'
            ]"
            class="border-input-field input-text-area-style text-regalBlue subtitle-letterspace q-mt-xs q-pb-none"
            @change="onKeyDescriptionChange(i)"
          />
        </div>
      </div>
      <div>
        <q-btn
          color="primary"
          class="save-btn text-body1 f-w-600"
          text-color="white"
          label="Save"
          no-caps
          unelevated
          @click="updateBlooprintGeneralInfo()"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'GeneralMenu',
  data() {
    return {
      description: '',
      bannerImage: null,
      promoVideo: null,
      categorySelected: '',
      subCategorySelected: '',
      allCategoriesList: [],
      subCategoryList: [],
      difficultyLevelSelected: 'beginner',
      levelHoverd: { level: '', hovered: false },
      keyPoints: [
        {
          labelKey: 'label0',
          valueKey: 'value0',
          label: '',
          value: ''
        },
        {
          labelKey: 'label1',
          valueKey: 'value1',
          label: '',
          value: ''
        },
        {
          labelKey: 'label2',
          valueKey: 'value2',
          label: '',
          value: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['fileUrl']),
    dropDownBehavior() {
      return window.innerWidth > 1023 ? 'menu' : 'dialog'
    }
  },
  props: ['blooprintDetails', 'isSaveDraftClicked'],
  watch: {
    fileUrl(data) {
      if (data['type'] == 'video') {
        this.promoVideo = data['url']
      }
      if (data['type'] == 'bannerImage') {
        this.bannerImage = data['url']
      }
    },
    categorySelected(data) {
      this.onCategoryChange('categorySelected')
    },
    blooprintDetails(data) {
      this.bindFormFields()
    },
    isSaveDraftClicked(isClicked) {
      if (isClicked) {
        this.updateBlooprintGeneralInfo()
      }
    }
  },
  mounted() {
    this.getCategoryDetails()
    this.bindFormFields()
  },
  methods: {
    ...mapActions([
      'fileUploadToFirebase',
      'updateBlooprint',
      'setToastMessage',
      'fetchCategorySubCategoryList'
    ]),
    isSaved(){
      if(this.description == (this.blooprintDetails.attributes.description ? this.blooprintDetails.attributes.description : undefined)
          && this.bannerImage == (this.blooprintDetails.attributes.thumbnail ? this.blooprintDetails.attributes.thumbnail : undefined)  &&
          this.promoVideo == (this.blooprintDetails.attributes.video ? this.blooprintDetails.attributes.video : undefined) &&
          this.difficultyLevelSelected == (this.blooprintDetails.attributes.level ? this.blooprintDetails.attributes.level : 'beginner') &&
          this.checkKeyPoints()
      ){
        return true
      }
      else{
        return false
      }
    },
    checkKeyPoints(){
      if(this.blooprintDetails.attributes.keypoints && this.blooprintDetails.attributes.keypoints.length > 0){
        let val = this.blooprintDetails.attributes.keypoints
        if(val.length == this.keyPoints.length){
          for(let i=0; i<val.length; i++ ){
            if(val[i].label != this.keyPoints[i].label || val[i].value != this.keyPoints[i].value){
              return false
            }
          }
        }
        else{
          let isEqual = true
          for(let i=0; i< val.length; i++){
            console.log(val[i].value, this.keyPoints[i].value)
            if(val[i].label != this.keyPoints[i].label || val[i].value != this.keyPoints[i].value){
              isEqual = false
            }
          }
          let isKeyPointsSame = true
          for(let i = val.length; i< this.keyPoints.length; i++){
            if(this.keyPoints[i].value != '' || this.keyPoints[i].label != ''){
              isKeyPointsSame = false
            }
          }
          return isEqual && isKeyPointsSame
        }
      }
      else{
        for(let i = 0; i< this.keyPoints.length; i++){
          if(this.keyPoints[i].value != '' && this.keyPoints[i].label != ''){
            return false
          }
        }
        // return this.keyPoints.every(val => val.label != '' && val.value != '')
      }
      
      return true
    },
    onMouseOver(type) {
      this.levelHoverd = { level: type, hovered: true }
    },
    onMouseOut(type) {
      this.levelHoverd = { level: type, hovered: false }
    },
    bindFormFields() {
      let details = this.blooprintDetails['attributes']
      if (this.blooprintDetails['attributes']) {
        this.description = details['description']
        this.bannerImage = details['thumbnail']
        this.promoVideo = details['video']
        this.categorySelected =
          details['categoryIDs'] &&
          details['categoryIDs'][0] &&
          details['categoryIDs'][0]['parent']
            ? details['categoryIDs'][0]['parent']
            : ''
        this.subCategorySelected =
          details['categoryIDs'] &&
          details['categoryIDs'][0] &&
          details['categoryIDs'][0]['child']
            ? details['categoryIDs'][0]['child']
            : ''
            ? details['categoryIDs'][0]['child']
            : ''
        if (details['level'] != '') {
          this.difficultyLevelSelected = details['level']
        }
        this.keyPoints.forEach(item => {
          item['label'] = ''
          item['value'] = ''
        })
        if (details['keypoints']) {
          details['keypoints'].forEach((item, index) => {
            this.keyPoints[index]['label'] = item['label']
            this.keyPoints[index]['value'] = item['value']
          })
        }
        if (this.categorySelected != '') {
          this.onCategoryChange('bindFormFields')
        }
      }
    },
    async getCategoryDetails() {
      this.allCategoriesList = []
      let data = await this.fetchCategorySubCategoryList()
      this.allCategoriesList = this.allCategoriesList.concat(data)
      if (this.categorySelected != '') {
        let details = this.blooprintDetails['attributes']
        this.subCategorySelected = details['categoryIDs'][0]['child']
          ? details['categoryIDs'][0]['child']
          : ''
        this.onCategoryChange('getCategoryDetails')
      }
    },
    checkTitleValidity(index) {
      if (this.keyPoints[index]['value'] != '') {
        return this.keyPoints[index]['label'] != ''
      }
      return true
    },
    checkDescriptionValidity(index) {
      if (this.keyPoints[index]['label'] != '') {
        return this.keyPoints[index]['value'] != ''
      }
      return true
    },
    onKeyTitleChange(index) {
      if (index == 0) {
        this.$refs.value0[0].validate()
      } else if (index == 1) {
        this.$refs.value1[0].validate()
      } else if (index == 2) {
        this.$refs.value2[0].validate()
      }
    },
    onKeyDescriptionChange(index) {
      if (index == 0) {
        this.$refs.label0[0].validate()
      } else if (index == 1) {
        this.$refs.label1[0].validate()
      } else if (index == 2) {
        this.$refs.label2[0].validate()
      }
    },
    onImageUpload(event, fileType) {
      let imageAdded = event
      let fileName = imageAdded['name'].toLowerCase()
      if (fileType == 'bannerImage') {
        this.bannerImage = null
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
    onImageRejected(event) {
      this.setToastMessage({
        type: 'negative',
        message: 'Upload valid image File'
      })
    },
    onFileRejected(event) {
      this.setToastMessage({
        type: 'negative',
        message: 'Upload video in the recommended format and size'
      })
    },
    onVideoUpload(event) {
      let videoAdded = event
      let fileName = videoAdded['name'].toLowerCase()
      this.promoVideo = null
      if (
        fileName.endsWith('mp4') ||
        fileName.endsWith('mov') ||
        fileName.endsWith('MOV')
      ) {
        let data = {
          file: videoAdded,
          type: 'video',
          from: 'blooprint/'
        }
        this.fileUploadToFirebase(data, 'video')
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Upload video in the recommended format and size'
        })
      }
    },
    onCategoryChange(from) {
      this.allCategoriesList.map(category => {
        if (category['value'] == this.categorySelected) {
          this.subCategoryList = []
          if (category['subCategory']) {
            this.subCategoryList = this.subCategoryList.concat(
              category['subCategory']
            )
          }
        }
      })
      if (from == 'categorySelected') {
        this.subCategorySelected = ''
      }
    },
    onDifficultyLevelSelct(level) {
      this.difficultyLevelSelected = level
    },
    async updateBlooprintGeneralInfo() {
      this.$refs.description.validate()
      if (this.$refs.bannerImage) {
        this.$refs.bannerImage.validate()
      }
      // this.$refs.blooprintCategory.validate()
      this.$refs.value0[0].validate()
      this.$refs.value1[0].validate()
      this.$refs.value2[0].validate()
      this.$refs.label0[0].validate()
      this.$refs.label1[0].validate()
      this.$refs.label2[0].validate()
      this.$refs.generalForm.validate().then(async success => {
        if (success) {
          let params = {
            blooprintId: this.blooprintDetails.id,
            ...this.blooprintDetails.attributes
          }
          params['description'] = this.description
          params['video'] = this.promoVideo
          params['thumbnail'] = this.bannerImage
          params['categories'] =
            this.subCategorySelected != ''
              ? [this.subCategorySelected]
              : [this.categorySelected]
          params['level'] = this.difficultyLevelSelected
          let keys = []
          this.keyPoints.map(item => {
            if (item['label'] != '' && item['value'] != '') {
              keys.push({
                label: item['label'],
                value: item['value']
              })
            }
          })
          params['keypoints'] = keys

          let data = await this.updateBlooprint(params)
          if (data['id']) {
            this.$emit('on-blooprint-data-update')
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.q-mr-10 {
  margin-right: 10px;
}
.q-mt-10 {
  margin-top: 10px;
}
.general-card-padding {
  padding: 40px 40px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 16px 0px 40px 0px;
  }
}
.general-heading {
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 24px;
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
  .input-text-area-style {
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
.video-edit-after-upload {
  position: absolute;
  top: 0px;
  right: 0px;
}
.file-before-upload {
  position: absolute;
  top: 43%;
  display: block;
  font-size: 30px;
  left: 45%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    left: 35%;
  }
}
.file-after-upload {
  display: none;
}
.banner-image-style {
  height: 120px;
  position: relative;
  border: 1px solid $ghost;
  border-radius: 8px;
}
::v-deep{
  .q-field__control{
    min-height: 120px !important;
  }
}
.diff-level-img-style {
  width: 20px;
  height: 20px;
  overflow: initial !important;
}
.diff-style {
  width: 150px;
  height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 10px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 10px;
  transition: border 0s;
  color: $manateeGrey;
  &:hover {
    border: 2px solid $primary !important;
    color: $primary;
  }
  border: 1px solid $ghost;
}
.diff-level-selected {
  border: 2px solid $primary !important;
  color: $primary;
}
.img-video-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    // padding-top: 75%; /* 4:3 Aspect Ratio */
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
}
.img-video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
