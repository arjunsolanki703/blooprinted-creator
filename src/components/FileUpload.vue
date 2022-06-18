<template>
  <div>
    <q-file
      v-if="(model == null || model == '') && fileType != 'attachment'"
      borderless
      bottom-slots
      color="primary"
      label-color="grey"
      input-class="text-grey"
      class="
            file-border
            bg-white            
            text-primary
            q-px-md q-pb-none
          "
      :accept="accept"
      max-files="1"
      max-file-size="400000000"
      @rejected="onFileRejected"
      @input="onFileUpload($event, fileType, elementData, index)"
    >
      <div
        class="q-pa-auto q-px-xs text-grey text-secondary"
        :class="[
          model ? 'file-after-upload' : 'file-before-upload cursor-pointer'
        ]"
      >
        <div class="row flex flex-center">
          <q-avatar
            @click.stop
            square
            size="xl"
            class="borderAll text-smalt"
            style="border-radius: 8px"
            :icon="icon"
          />
          <div
            class="f-w-500 text-fs-14-lh-20 text-comet"
            style="margin-left: 10px"
          >
            upload {{ fileType }}
          </div>
        </div>
      </div>
    </q-file>
    <!-- <q-tooltip
      v-if="
        (model == null || model == '') &&
          (fileType == 'video' || fileType == 'audio')
      "
    >
      Max size: 400 MB
    </q-tooltip> -->

    <div
      class="img-video-container"
      v-if="model != '' && model != null && fileType == 'video'"
    >
      <video
        id="video"
        class="img-video-iframe"
        controls
        muted
        style="border-radius: 20px;"
      >
        <source :src="model" />
      </video>
    </div>
    <div class="img-video-container" v-if="model != '' && fileType == 'image'">
      <q-img
        class="img-video-iframe"
        :src="model"
        cover
        style="border-radius: 20px;"
      />
    </div>
    <audio
      id="audio"
      class="full-width"
      v-if="model != '' && fileType == 'audio'"
      controls
      muted
    >
      <source :src="model" type="audio/mpeg" />
    </audio>

    <q-file
      v-if="fileType == 'attachment'"
      borderless
      bottom-slots
      :display-value="this.getFileName(model)"
      label-color="regalBlue"
      accept=".pdf, .doc, .docx, .xlsx, .xls "
      class="file-border
            bg-white text-body1           
            text-regalBlue word-break-break-word ellipsis-3-lines
            q-px-md q-pb-none"
      input-class="q-mt-md"
      max-files="1"
      style="min-height: 90px; position: relative"
      @rejected="onAttachmentRejected"
      @input="onFileUpload($event, fileType, elementData, index)"
    >
      <div
        class="q-pa-auto q-px-xs text-grey text-secondary"
        :class="[
          model ? 'file-after-upload' : 'file-before-upload cursor-pointer'
        ]"
      >
        <div class="row flex flex-center">
          <q-avatar
            @click.stop
            square
            size="xl"
            class="borderAll text-smalt"
            style="border-radius: 8px"
            :icon="icon"
          />
          <div
            class="f-w-500 text-fs-14-lh-20 text-comet"
            style="margin-left: 10px"
          >
            upload file
          </div>
        </div>
      </div>
    </q-file>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: [
    'model',
    'label',
    'index',
    'accept',
    'elementData',
    'fileType',
    'icon'
  ],
  data() {
    return {
      attachmentModel: this.elementData
    }
  },
  methods: {
    ...mapActions(['fileUploadToFirebase', 'setToastMessage']),
    // ************** File Upload ********************************
    async onFileUpload(event, fileType, element, index) {
      let fileData = new FormData()
      fileData.append('file', event)
      let fileAdded = event
      let data = {
        file: fileAdded,
        type: fileType,
        from: 'blooprint/task/',
        index: index
      }
      if (fileType == 'attachment') {
        element['attachmentName'] = event
        this.attachmentModel = element
        this.$emit('on-fileUpload', element)
      }
      this.fileUploadToFirebase(data)
    },

    getFileName(url) {
      let fileURL = url.substring(url.lastIndexOf('%2F') + 3, url.length)
      let fileName = fileURL.split('?alt')
      let decodedFileName = decodeURIComponent(fileName[0])
      return decodedFileName
    },
    onFileRejected(event) {
      this.setToastMessage({
        type: 'negative',
        message: 'Upload a file in the recommended format and size'
      })
    },
    onAttachmentRejected() {
      this.setToastMessage({
        type: 'negative',
        message: 'Upload a file in the recommended format and size'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.file-border {
  border: 1px solid #b9bcc6;
  box-sizing: border-box;
  border-radius: 8px;
  height: 145px;
  width: 100%;
  position: relative;
}
::v-deep{
  .q-field__control{
    min-height: 145px !important;
  }
}
.file-before-upload {
  position: absolute;
  left: 40%;
  top: 38%;
  display: block;
  font-size: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    left: 40%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    left: 30%;
  }
  @media only screen and (max-width: 420px) {
    left: 20%;
  }
}
.file-after-upload {
  display: none;
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
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    // padding-top: 75%; /* 4:3 Aspect Ratio */
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
::v-deep {
  .q-file .q-field__native {
    word-break: break-word !important;
    -webkit-line-clamp: 5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    padding-bottom: 0px;
  }
}
</style>
