<template>
  <q-page class="page bg-whiteSmoke column q-px-md-xl q-px-sm-sm">
    <div class="row justify-between q-mb-md q-px-md-xl q-px-sm-sm">
      <div class="col-sm-6 q-ml-xs-lg col-xs-10 q-pl-sm-sm self-center">
        <h1 class="text-nightRider text-bold text-h4 q-mt-xl">Add Blooprint</h1>
        <h4 class="text-dimGrey text-subtitle1 q-mb-md">
          Create a new Blooprint. Collaborate your work. <br />
          Directory to your local projects
        </h4>
        <div class="row">
          <q-btn
            round
            class="bg-smalt self-center"
            text-color="white"
            dense
            size="sm"
            icon="add"
            style="width:24px; height:24px"
            @click="goToCreateBlooprint()"
          />
          <h4 class="text-smalt text-subtitle2 q-ml-md">
            <a @click="goToCreateBlooprint()" class="text-smalt cursor-pointer">
              CREATE NEW BLOOPRINT
            </a>
          </h4>
        </div>
      </div>
      <div
        class="col-sm-4 col-xs-12 mobile-hide gt-xs q-pr-sm-sm q-pt-xl q-pr-sm-sm"
      >
        <!-- first card -->
        <a class="cursor-pointer" @click="goToMyBlooprints()">
          <q-card rounded class="card float-right">
            <q-card-section
              class="flex column q-px-lg text-bold text-nightRider position-relative full-height"
            >
              <div class="text-nightRider text-h1 absolute-center">
                <Number :number="this.myBlooprintCount"></Number>
              </div>
              <div class="absolute-bottom text-center q-pa-md">
                My Blooprints
              </div>
            </q-card-section>
          </q-card>
        </a>
      </div>
    </div>
    <div class="row items-center q-mb-md q-px-md-xl q-px-sm-sm">
      <div class="q-px-md q-pt-md full-width q-px-sm-none">
        <!-- Table for recent blooprint -->
        <div v-if="!loading">
          <div v-if="data.length > 0" class="full-width text-nightRider">
            <div class="flex row full-width text-nightRider q-pa-md q-mt-xs">
              <div class="col-6 text-subtitle2 text-capitalize">
                recent blooprints
              </div>
              <div class="col-4 text-subtitle2 text-capitalize">created on</div>
              <div class="col-2 text-subtitle2 text-capitalize">
                status
              </div>
            </div>
            <div
              v-for="item in data"
              :key="item.id"
              class="flex row  bg-white q-mb-sm q-pa-md item"
            >
              <div class="col-6 text-subtitle1 q-pr-xl word-break-break-all">
                {{ item.name }}
              </div>
              <div class="col-4 text-subtitle1">{{ item.created }}</div>
              <div class="col-2 text-subtitle1">
                <div
                  class="q-px-md statusDiv text-bold text-uppercase"
                  :class="
                    item.status == 'active'
                      ? 'bg-lime text-green'
                      : 'bg-papayaWhip text-orange'
                  "
                >
                  {{ item.status === 'progress' ? 'in progress' : item.status }}
                </div>
              </div>
            </div>
            <div>
              <router-link
                class="remove-underline float-right text-body2"
                :to="{ name: 'blooprints-list' }"
                >more...</router-link
              >
            </div>
          </div>
          <div
            v-else-if="errorInGettingAuthorBlooprintList"
            class="text-nightRider text-h6"
          >
            {{ errorInGettingAuthorBlooprintList }}
          </div>
          <div v-else class="text-nightRider text-h6">
            No Recent Blooprint Available
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { constants, getUserId } from 'src/utils/common'
import { mapActions, mapGetters } from 'vuex'
import Number from 'src/components/Number'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  props: ['number'],
  components: { Number },

  data() {
    return {
      myBlooprintCount: '',
      data: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['userProfile', 'errorInGettingAuthorBlooprintList'])
  },
  watch: {
    userProfile() {
      this.getBlooprintData()
    }
  },
  mounted() {
    if (getUserId()) {
      this.getBlooprintData()
    }
  },
  methods: {
    ...mapActions(['retrieveAuthorBlooprintList']),
    goToCreateBlooprint() {
      this.$router.replace({ path: 'blooprint/create' })
    },
    async getBlooprintData() {
      let params = {
        limit: 4,
        offset: 0
      }
      const blooprintData = await this.retrieveAuthorBlooprintList(params)
      if (blooprintData) {
        this.myBlooprintCount = blooprintData['meta']['count']
        let tableData = []
        blooprintData['data'].forEach((element, i = 0) => {
          if (i <= 3) {
            let dateObj = new Date(element.attributes.createdDate.slice(0, -10))
            let date = dateObj.toDateString()
            let blooprintDate = date.split(' ')
            let elementData = {
              id: element.id,
              name: element.attributes.name,
              created:
                blooprintDate[0] +
                ', ' +
                blooprintDate[2] +
                ' ' +
                blooprintDate[1] +
                ' ' +
                blooprintDate[3],
              status: element.attributes.status
            }
            tableData.push(elementData)
            i++
          }
        })
        this.data = tableData
      }
      this.loading = false
    },
    goToMyBlooprints() {
      this.$router.replace({ name: constants.PAGE_USER_BLOOPRINT_LIST })
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  height: 378px;
  width: 265px;
  box-shadow: 3px 3px 10px #ccc;
  border-radius: 30px;
}
.statusDiv {
  border-radius: 5px;
  display: inline-block;
}
.item {
  border: 1px solid $secondary;
}
.test {
  left: -5px;
  z-index: 1;
}
</style>
