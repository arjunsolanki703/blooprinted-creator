<template>
  <q-page style="font-family:Poppins">
    <div class="gt-sm get-started-banner" style="margin-top:2px;">
      <div class="row">
        <div class="col-md-6">
          <div class="title header-letterspace">
            Get started with your blooprint
          </div>
          <div v-if="loading">
            <q-skeleton
              type="rect"
              style="margin-top:32px; height:24px; width:60%"
            />
            <q-skeleton
              type="rect"
              style="margin-top:16px; height:24px; width:60%"
            />
          </div>
          <div v-else>
            <div
              class="text-regalBlue f-s-16 text-lh-24 f-w-500"
              style="margin-top:32px;word-break: break-word;"
            >
              blooprint name: <span class="f-w-700">{{ name }}</span>
            </div>
            <div
              class="text-regalBlue f-s-16 text-lh-24 f-w-500"
              style="margin-top:16px"
            >
              blooprint category: <span class="f-w-700">{{ category[0] }}</span>
            </div>
          </div>
          <div
            :class="$q.screen.width > 1177 ? 'row' : 'column'"
            style="margin-top: 32px;"
          >
            <router-link
              :to="{ name: 'my-blooprints' }"
              class="router-link"
            >
              <q-btn
                label="Explore Studio"
                class="explore-button text-primary f-w-600 f-s-16 text-lh-24 bg-white"
                no-caps
                unelevated
              />
            </router-link>
            <q-btn
              label="Continue Creating"
              class="text-white f-w-600 f-s-16 text-lh-24 bg-primary continue-button"
              no-caps
              @click="continueCreating"
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
        </div>
        <div class="col-md-6">
          <div
            class="bg-regalBlue card-style f-w-600 f-s-16 text-lh-24 text-white"
          >
            <div class="row" style="margin-bottom:30px">
              <q-img
                class="col-4 reveal fade-in active"
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
                src="~assets/bluecheckcircle.svg"
                width="40px"
                height="40px"
                class="reveal fade-in active"
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
                src="~assets/bluecheckcircle.svg"
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
    <div class="gt-sm" style="height:255px"></div>
    <div class="lt-md">
      <div
        class="card-style bg-regalBlue card-style f-w-500 f-s-14 text-lh-20 text-white"
      >
        <div class="row" style="margin-bottom:8px">
          <q-img
            class="col-4"
            src="~assets/bluecheckcirclemobile.svg"
            width="20px"
            height="20px"
          ></q-img>
          <div
            class="col align-center justify-center self-center subtitle-letterspace"
            style="margin-left:16px;"
          >
            Get started
          </div>
        </div>
        <div class="row" style="margin-bottom:8px">
          <q-img
            src="~assets/bluecheckcirclemobile.svg"
            width="20px"
            height="20px"
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
            src="~assets/bluecheckcirclemobile.svg"
            width="20px"
            height="20px"
          ></q-img>
          <div
            class="col align-center justify-center self-center subtitle-letterspace"
            style="margin-left:16px;"
          >
            Select category
          </div>
        </div>
      </div>
      <div class="get-started-banner">
        <div class="f-w-600 f-s-32 text-lh-36 header-letterspace">
          Get started with your blooprint
        </div>
        <div v-if="loading">
          <q-skeleton
            type="rect"
            style="margin-top:32px; height:24px; width:60%;"
          />
          <q-skeleton
            type="rect"
            style="margin-top:16px; height:24px; width:60%;"
          />
        </div>
        <div v-else>
          <div
            class="text-regalBlue f-s-16 text-lh-24 f-w-500"
            style="margin-top:16px;word-break: break-word;"
          >
            blooprint name: <span class="f-w-700">{{ name }}</span>
          </div>
          <div
            class="text-regalBlue f-s-16 text-lh-24 f-w-500"
            style="margin-top:16px"
          >
            blooprint category: <span class="f-w-700">{{ category[0] }}</span>
          </div>
        </div>
        <div :class="$q.screen.gt.xs ? 'row' : 'column'">
          <router-link :to="{ name: 'my-blooprints' }">
            <q-btn
              label="Explore Studio"
              class="explore-button text-primary f-w-600 f-s-16 text-lh-24 bg-white"
              no-caps
              unelevated
            />
          </router-link>
          <q-btn
            label="Continue Creating"
            class="text-white f-w-600 f-s-16 text-lh-24 bg-primary continue-button"
            no-caps
            @click="continueCreating"
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      name: '',
      category: '',
      loading: true
    }
  },
  mounted() {
    this.retrieveBlooprint()
  },
  methods: {
    ...mapActions(['getBlooprintDetailsById']),
    async retrieveBlooprint() {
      this.loading = true
      let data = await this.getBlooprintDetailsById()
      if (data['attributes']['categories'].length === 0) {
        this.$router.push({
          name: 'firstBlooprintCreationCategory',
          params: {
            blooprintId: this.$route.params.blooprintId
          }
        })
      } else {
        this.name = data['attributes']['name']
        this.category = data['attributes']['categories']
        this.loading = false
      }
    },
    // exploreStudio() {
    //   this.$router.push({
    //     name: 'home'
    //   })
    // },
    continueCreating() {
      this.$router.push({
        name: 'blooprintCreation',
        params: { blooprintId: this.$route.params.blooprintId }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.get-started-banner {
  background-color: #e8edf2;
  padding: 60px 165px 103px 165px;
  @media only screen and (min-width: 1024px) and (max-width: 1100px) {
    padding: 60px 165px 103px 100px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 20px 15px 112px 15px;
    margin-bottom: 131px !important;
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

.explore-button {
  width: 175px;
  height: 50px;
  border: 2px solid #1652f0;

  border-radius: 10px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 32px;
    border-radius: 5px;
    height: 40px;
    display: row;
    align-items: center;
    justify-content: center;
  }
}

.continue-button {
  width: 233px;
  height: 50px;
  border-radius: 10px;
  margin-left: 16px;
  @media only screen and (min-width: 1024px) and (max-width: 1177px) {
    margin-left: 0px;
    margin-top: 16px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 40px;
    border-radius: 5px;
    margin-top: 32px;
    margin-left: 16px;
  }

  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 16px;
    margin-left: 0px;
  }
}

.card-style {
  margin-left: 20px;
  padding: 48px 0px 48px 48px;
  max-width: 545px;
  min-width: 400px;
  border-radius: 20px;
  @media only screen and (min-width: 1024px) and (max-width: 1300px) {
    margin-left: 50px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 15px 0px 15px 15px;
    margin-left: 0px;
    border-radius: 0px;
    min-width: 100%;
  }
}

a {
  text-decoration: none;
}
</style>
