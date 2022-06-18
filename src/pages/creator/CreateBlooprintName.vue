<template>
  <q-page>
    <!-- Desktop -->
    <div class="create-blooprint-banner gt-sm" style="margin-top:2px;">
      <div class="row">
        <div class="col-md-6">
          <div class="title header-letterspace">
            Create your first blooprint
          </div>
          <div class="subtitle subtitle-letterspace" style="margin-top:16px;">
            Write the name of your blooprint below so we can start bringing your
            blooprint to life.
          </div>
          <div
            class="blooprint-name subtitle-letterspace"
            style="margin-top:32px;"
          >
            blooprint name
            <span class="text-errorColor">*</span>
          </div>
          <q-form @submit="saveBlooprintName">
            <q-input
              v-model.trim="name"
              style="margin-top:4px;"
              type="text"
              input-class="input-field-style"
              class="border-input-field subtitle-letterspace  q-mt-xs q-mb-lg  q-pb-none"
              borderless
              placeholder="Enter blooprint name"
              :rules="[
                val => (val && val.length > 0) || 'blooprint name is required'
              ]"
            ></q-input>
            <div class="row">
              <q-btn
                type="submit"
                color="primary"
                label="Continue"
                no-caps
                no-wrap
                class="continue-button subtitle-letterspace"
              >
                <div class="relative-position">
                  <div class="arrow" style="margin-left: 17px">
                    <q-img
                      src="~assets/chevron-right.svg"
                      width="6px"
                      height="12px"
                    />
                  </div>
                </div>
              </q-btn>
            </div>
          </q-form>
        </div>
        <div class="col-md-6">
          <div class="card-style">
            <div class="row" style="margin-bottom:30px">
              <q-img
                class="col-4"
                src="~assets/bluecheckcircle.svg"
                width="40px"
                height="40px"
              ></q-img>
              <div
                class="col align-center justify-center self-center subtitle-letterspace"
                style="margin-left:16px;"
              >
                Get started
              </div>
            </div>
            <div class="row" style="margin-bottom:30px">
              <q-img
                src="~assets/bluecircle.svg"
                width="40px"
                height="40px"
              ></q-img>
              <div
                class="col align-center justify-center self-center subtitle-letterspace"
                style="margin-left:16px;"
              >
                Name your blooprint
              </div>
            </div>
            <div class="row">
              <q-img
                src="~assets/whitecircle.svg"
                width="40px"
                height="40px"
              ></q-img>
              <div
                class="col align-center justify-center self-center subtitle-letterspace"
                style="margin-left:16px;"
              >
                Select category
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gt-sm" style="height:210px;"></div>
    <div class="lt-md" style="margin-bottom:131px;">
      <div class="card-style">
        <div class="row" style="margin-bottom:8px">
          <q-img
            class="col-4"
            src="~assets/bluecheckcirclemobile.svg"
            width="20px"
            height="20px"
          ></q-img>
          <div
            class="col align-center justify-center self-center subtitle-letterspace"
            style="margin-left:8px;"
          >
            Get started
          </div>
        </div>
        <div class="row" style="margin-bottom:8px">
          <q-img
            src="~assets/bluecirclemobile.svg"
            width="20px"
            height="20px"
          ></q-img>
          <div
            class="col align-center justify-center self-center subtitle-letterspace"
            style="margin-left:8px;"
          >
            Name your blooprint
          </div>
        </div>
        <div class="row">
          <q-img
            src="~assets/whitecirclemobile.svg"
            width="20px"
            height="20px"
          ></q-img>
          <div
            class="col align-center justify-center self-center subtitle-letterspace"
            style="margin-left:8px;"
          >
            Select category
          </div>
        </div>
      </div>
      <div class="create-blooprint-banner">
        <div class="title header-letterspace">Create your first blooprint</div>
        <div class="subtitle subtitle-letterspace" style="margin-top:16px;">
          Write the name of your blooprint below so we can start bringing your
          blooprint to life.
        </div>
        <div
          class="blooprint-name subtitle-letterspace"
          style="margin-top:16px;"
        >
          blooprint name
          <span class="text-errorColor">*</span>
        </div>
        <q-form @submit="saveBlooprintName">
          <q-input
            v-model.trim="name"
            style="margin-top:4px;"
            type="text"
            input-class="input-field-style"
            class="border-input-field subtitle-letterspace q-mt-xs q-mb-lg  q-pb-none"
            borderless
            placeholder="Enter blooprint name"
            :rules="[
              val => (val && val.length > 0) || 'blooprint name is required'
            ]"
          ></q-input>
          <div class="row">
            <q-btn
              type="submit"
              color="primary"
              label="Continue"
              no-caps
              no-wrap
              class="continue-button subtitle-letterspace"
            >
              <div class="relative-position">
                <div class="arrow" style="margin-left: 15px">
                  <q-img
                    src="~assets/chevron-right.svg"
                    width="6px"
                    height="12px"
                  />
                </div>
              </div>
            </q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import categories from 'src/store/categories'
import { mapActions } from 'vuex'
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      name: '',
      from: null,
      categories: [],
      categoryIDs: [],
      blooprintDetails: {},
      blooprintExists: false,
      id: null
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from
    })
  },
  methods: {
    ...mapActions([
      'createBlooprint',
      'retrieveAuthorBlooprintList',
      'updateBlooprint'
    ]),
    async saveBlooprintName() {
      if (this.blooprintExists) {
        let data = {
          blooprintId: this.id,
          name: this.name,
          categories: this.categories
        }
        let response = await this.updateBlooprint(data)
        if (response['type'] === 'blooprints') {
          this.$router.push({
            name: 'firstBlooprintCreationCategory',
            params: {
              blooprintId: this.id
            }
          })
        }
      } else {
        let blooprintData = {
          name: this.name
        }
        let data = await this.createBlooprint(blooprintData)
        if (data['type'] === 'blooprints') {
          this.$router.push({
            name: 'firstBlooprintCreationCategory',
            params: {
              blooprintId: data.id
            }
          })
        }
      }
    },
    async checkRouteConfig() {
      let response = await this.retrieveAuthorBlooprintList()
      if (response.meta.count != 0) {
        this.blooprintExists = true
        let data = response['data']

        this.id = data[0].id
        this.name = data[0].attributes.name
        if (data[0].attributes.categoryIDs[0].child) {
          this.categories = [data[0].attributes.categoryIDs[0].child]
        } else {
          this.categories = [data[0].attributes.categoryIDs[0].parent]
        }
      }
    }
  },
  mounted() {
    this.checkRouteConfig()
  }
}
</script>

<style lang="scss" scoped>
.q-page {
  font-family: Poppins;
}
.create-blooprint-banner {
  background-color: #e8edf2;
  padding: 60px 165px 76px 165px;
  @media only screen and (min-width: 1024px) and (max-width: 1100px) {
    padding: 60px 165px 76px 100px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px 112px 15px;
  }
}

.title {
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
  }
}

.subtitle {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #152141;
}
.blooprint-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #152141;
}

.border-input-field {
  background-color: white;
  max-width: 400px;
  margin-bottom: 32px;
  height: 44px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 100%;
  }
}
::v-deep {
  .q-field__native {
    padding: 0px !important;
    font-weight: 500;
    margin: 10px 14px;
    font-size: 16px !important;
    line-height: 24px !important;
    height: 24px;
  }
  .material-icons {
    margin-bottom: 12px !important;
    margin-right: 14px;
    padding-left: 0px;
  }

  .q-field__messages {
    padding-left: 14px;
  }
}

.continue-button {
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  width: 157px;
  height: 50px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    border-radius: 5px;
    width: 137px;
    height: 40px;
  }
}

.card-style {
  background-color: #152141;
  border-radius: 20px;
  padding: 48px 0px 48px 48px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  max-width: 545px;
  min-width: 400px;
  margin-left: 20px;
  @media only screen and (min-width: 1024px) and (max-width: 1300px) {
    margin-left: 50px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-left: 0px;
    min-width: 100%;
    padding: 15px 0px 15px 15px;
    border-radius: 0px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
}

@supports (-moz-appearance: none) {
  .arrow {
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding-bottom: 2px !important;
    }
  }
}
</style>
