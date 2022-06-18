<template>
  <q-page>
    <div class="q-mx-xl q-mt-xl row justify-between">
      <div class="text-nightRider text-h5 text-weight-medium text-capitalize">
        Add Category
        <q-separator width="60%" color="primary" class="q-mt-sm" size="2px" />
      </div>
      <div class="row justify-end">
        <q-btn
          color="white"
          class="text-grey-7"
          outline
          no-caps
          @click="$router.push({ name: 'manage_categories' })"
        >
          <div class="back-icon"></div>
          Back
        </q-btn>
      </div>
    </div>
    <div class="q-mx-xl q-mt-lg row justify-center bg-white form">
      <div class="col-md-5 q-mt-xl" v-if="!showEditor">
        <div class="q-py-xs text-grey-8 text-weight-regular">
          <div class="q-py-sm q-mt-xl text-capitalize">Name</div>
          <q-skeleton type="QInput" height="5vh" />
        </div>
        <div class="q-pa-lg row justify-center">
          <div class="q-ma-sm">
            <q-skeleton type="QBtn" height="6vh" width="10vw" />
          </div>
          <div class="q-ma-sm">
            <q-skeleton type="QBtn" height="6vh" width="10vw" />
          </div>
        </div>
      </div>
      <div class="col-md-5" v-if="showEditor">
        <div class="q-py-xs text-grey-8 text-weight-regular">
          <div class="q-py-sm q-mt-xl text-capitalize">Name</div>
          <q-input
            outlined
            v-model.trim="name"
            lazy-rules
            ref="name"
            :rules="[val => (val && val.length > 0) || 'Name is mandatory']"
            dense
          />
        </div>

        <div class="q-py-sm text-capitalize">File</div>
        <div
          v-if="image != null && image != ''"
          class="relative-position q-mb-lg"
          style="height: 200px;"
        >
          <q-img :ratio="4 / 3" contain :src="image" style="height: 200px;" />
          <q-avatar
            class="image-edit-after-upload"
            @click="image = null"
            square
            color="primary"
            size="24px"
            text-color="white"
            icon="close"
          ></q-avatar>
        </div>
        <q-file
          v-else
          v-model="image"
          ref="image"
          borderless
          color="primary cursor-pointer"
          label-color="grey"
          input-class="text-grey"
          class="
                borderAll
                bg-white
                rounded-borders
                text-primary
                q-mb-lg q-px-md q-pb-none
              "
          style="height: 200px; position: relative"
          accept=".jpg, .jpeg, .png"
          max-files="1"
          @input="onImageUpload($event)"
        >
          <div
            class="q-pa-auto q-px-xs text-grey text-secondary"
            :class="[
              image
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

        <div class="q-py-xs text-grey-8 text-weight-regular">
          <div class="q-py-sm q-mt-xs text-capitalize">Weight</div>
          <q-input
            v-model.number="weight"
            type="number"
            style="max-width: 200px"
            ref="weight"
            class="border-secondary q-px-md"
            borderless
          />

          <div class="q-py-sm q-mt-xs text-capitalize">Parent</div>
          <q-select
            borderless
            v-model="parent"
            :options="parentCategories"
            input-class="text-grey"
            label="select"
            class="border-secondary bg-white rounded-borders q-px-md q-pb-none"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="q-py-xs text-grey-8 text-weight-regular">
          <div class="q-py-sm q-mt-xs text-capitalize"></div>
          <q-toggle v-model="favourite" label="Make it favourite" />
        </div>

        <div class="q-pa-lg row justify-center">
          <q-btn
            outline
            style="color: white"
            color="primary"
            label="Cancel"
            no-caps
            class="col-md-3 q-ma-sm text-h6"
            :to="{ name: 'manage_categories' }"
          />
          <q-btn
            color="primary"
            class="text-white col-md-3 q-ma-sm text-h6"
            label="Save"
            no-caps
            @click="createCategory"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'AddCategories',

  data() {
    return {
      image: null,
      name: '',
      weight: 0,
      parent: '',
      parentCategories: [],
      showEditor: false,
      favourite: false
    }
  },

  created() {
    this.getParentCategoriesList().then(() => {
      this.parentCategories = this.parentCategoriesList.map(category => {
        return { value: category.id, label: category.attributes.name }
      })
    })
  },
  async mounted() {
    this.setTokens()
  },

  methods: {
    ...mapActions([
      'saveCategory',
      'setToastMessage',
      'fileUploadToFirebase',
      'getParentCategoriesList'
    ]),

    createCategory() {
      let categoryData = {
        name: this.name,
        image: this.image,
        weight: this.weight,
        parent: this.parent.value,
        favourite: this.favourite
      }
      this.saveCategory(categoryData)
    },

    setTokens() {
      this.showEditor = true
    },

    onImageUpload(event) {
      let imageAdded = event
      let fileName = imageAdded['name'].toLowerCase()
      this.image = null
      if (
        fileName.endsWith('jpg') ||
        fileName.endsWith('jpeg') ||
        fileName.endsWith('png')
      ) {
        let data = {
          file: imageAdded,
          type: 'categories',
          from: 'blooprint/'
        }
        this.fileUploadToFirebase(data)
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'Upload valid image File'
        })
      }
    }
  },
  computed: {
    ...mapGetters(['fileUrl', 'parentCategoriesList'])
  },
  watch: {
    fileUrl(data) {
      this.image = data['url']
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  border: 1px solid #d8d8d8;
  min-height: 60vh;
}
.file-before-upload {
  position: absolute;
  top: 125%;
  display: block;
  font-size: 30px;
  left: 45%;
}
.image-edit-after-upload {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
