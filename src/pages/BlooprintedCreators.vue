<template>
  <div class="q-mx-xl">
    <div class="q-mt-lg row justify-between">
      <div class="text-nightRider text-h5 text-weight-medium">
        Blooprinted Creators
        <q-separator width="50%" color="primary" size="2px" />
      </div>
      <div class="text-dimGrey text-right">
        Selected {{ selectedCreatorsList.length }} out of
        {{ creatorsList.length }}
      </div>
    </div>
    <div class="text-dimGrey q-mt-sm text-body2">
      Select authors to make it popular
    </div>
    <!-- ********************* Skeleton For Creators *********************************** -->
    <div
      class="q-pa-md row q-mt-md q-mx-lg items-start justify-between"
      v-if="isLoading"
    >
      <q-card
        flat
        class="col-md-3 q-pa-md col-sm-6 col-xs-12 q-mb-xl q-my-sm bg-whiteSmoke"
        v-for="i in 12"
        :key="i"
      >
        <q-card-section class="bg-white">
          <div class="flex flex-center" style="position: relative; bottom:65px">
            <q-skeleton type="circle" size="100px" />
          </div>
          <div class="flex flex-center">
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle1 q-gutter-y-xl"
            />
          </div>
          <div class="flex flex-center">
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle1 q-gutter-y-md"
            />
          </div>
          <div class="flex flex-center">
            <q-skeleton
              type="text"
              width="50%"
              class="text-subtitle1 q-gutter-y-sm"
            />
          </div>
          <q-skeleton height="100px" />
        </q-card-section>
      </q-card>
    </div>
    <!-- ********************* Data For Creators *********************************** -->
    <q-infinite-scroll
      v-else
      @load="loadMoreRecords"
      :offset="250"
      ref="infiniteScroll"
    >
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <div class="row q-mt-xl items-start">
        <q-card
          flat
          class="col-md-3 q-pa-md col-sm-6 col-xs-12 q-mb-xl q-my-sm bg-whiteSmoke"
          v-for="(creatorData, index) in creatorsList"
          :key="index"
          :id="index + 1"
        >
          <q-card-section
            class="bg-white cursor-pointer relative-position"
            :class="creatorData['isSelected'] ? 'card-selected' : null"
            @click="onCardSelect(creatorData)"
          >
            <div
              v-if="creatorData['selectionCount'] != 0"
              class="absolute selection-shape"
            ></div>
            <div
              v-if="creatorData['selectionCount'] != 0"
              class="absolute text-white select-count"
            >
              {{ creatorData['selectionCount'] }}
            </div>
            <div
              class="flex flex-center"
              style="position: relative; bottom:65px"
            >
              <q-avatar class="flex flex-center" size="100px" font-size="52px">
                <q-img
                  :src="creatorData['attributes']['picture']"
                  class="full-height full-width"
                >
                  <template v-slot:error>
                    <q-img src="~assets/UserProfile.svg" class="full-width" />
                  </template>
                </q-img>
              </q-avatar>
            </div>
            <div class="text-center q-gutter-y-xl ellipsis">
              {{ creatorData['attributes']['firstName'] }}
              {{ creatorData['attributes']['lastName'] }}
            </div>
            <div class="text-center ellipsis">
              {{ creatorData['attributes']['location'] }}
            </div>
            <div class="text-center">
              {{ creatorData['attributes']['rating'].toFixed(1) }}
              <q-rating
                :value="creatorData['attributes']['rating']"
                size="18px"
                color="primary"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
                :readonly="true"
                class="q-mb-xs"
              />
              <!-- (120) -->
            </div>
            <div class="text-center ellipsis-3-lines" style="height: 65px">
              {{ creatorData['attributes']['yourself'] }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div
        class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
        v-if="noMoreResults && creatorsList.length != 0"
      >
        <span class="bg-whiteSmoke q-px-sm">No more results</span>
      </div>
    </q-infinite-scroll>
    <div
      class="fixed-bottom text-center q-pa-md"
      style="background: #00000080;bottom:8vh;"
    >
      <q-btn
        color="secondary"
        text-color="primary"
        size="16px"
        class="q-mr-md button-width"
        no-caps
        label="Clear"
        @click="clearSelectedItems"
      ></q-btn>
      <q-btn
        color="primary"
        size="16px"
        no-caps
        class="button-width"
        label="Save"
        @click="saveAuthorsToPopular"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const CREATORS_SHOW_LIMIT = 8

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      isLoading: true,
      selectedCreatorsList: [],
      authorSelected: {},
      creatorsList: [],
      noMoreResults: false,
      popularAuthorsList: []
    }
  },
  mounted() {
    this.getPopularAuthors()
    this.getAllBlooprintCreators()
  },
  methods: {
    ...mapActions([
      'fetchAllAuthorsList',
      'addAuthorsToPopular',
      'fetchPopularAuthorsList',
      'setToastMessage'
    ]),
    onSeeAllClick() {
      this.$router.push('/user/explore/creators')
    },
    async getAllBlooprintCreators() {
      let params = {
        limit: CREATORS_SHOW_LIMIT,
        offset: 0
      }
      this.isLoading = true
      let authorsData = await this.fetchAllAuthorsList(params)
      this.isLoading = false
      this.creatorsList = authorsData
      this.displayPopularMark()
    },
    // ************ On Scroll Pagination Load Authors Records *****************************
    async loadMoreRecords(index, done) {
      let creatorsLengthBeforeLoad = this.creatorsList.length

      let params = {
        limit: CREATORS_SHOW_LIMIT,
        offset: index * CREATORS_SHOW_LIMIT
      }

      let data = await this.fetchAllAuthorsList(params)
      if (data.length > 0) {
        this.creatorsList = this.creatorsList.concat(data)
        this.displayPopularMark()
      }
      let creatorsLengthAfterLoad = this.creatorsList.length
      if (index != 1) {
        document
          .getElementById(index * CREATORS_SHOW_LIMIT - CREATORS_SHOW_LIMIT)
          .scrollIntoView()
      }
      if (creatorsLengthBeforeLoad == creatorsLengthAfterLoad) {
        if (creatorsLengthBeforeLoad > 0) {
          this.noMoreResults = true
        }
        this.$refs.infiniteScroll.stop()
      }
      done()
    },
    onCardSelect(author) {
      author['isSelected'] = !author['isSelected']
      this.authorSelected = author
      if (author['isSelected']) {
        author['selectionCount'] = this.selectedCreatorsList.length + 1
        this.selectedCreatorsList.push(author)
      } else {
        author['selectionCount'] = 0
        let data = this.selectedCreatorsList.findIndex(
          item => item.id == this.authorSelected.id
        )
        this.selectedCreatorsList.splice(data, 1)
        // ********* Updating the Selection Count when an Blooprint is unselected **********************
        this.selectedCreatorsList.map((selected, index) => {
          this.creatorsList.map(authors => {
            if (authors['id'] == selected['id']) {
              authors['isSelected'] = true
              authors['selectionCount'] = index + 1
            }
          })
        })
      }
    },
    // ******* Triggers when Cancel Button is Clicked, clear the selection list ****************************
    clearSelectedItems() {
      this.selectedCreatorsList = []
      this.popularAuthorsList = []
      this.creatorsList.map(authors => {
        authors['isSelected'] = false
        authors['selectionCount'] = 0
      })
    },
    // ******* Triggers when Save Button is Clicked, Add Blooprints to Popular ****************************
    async saveAuthorsToPopular() {
      let filterSelection = []
      this.selectedCreatorsList.map((item, index) => {
        filterSelection.push({
          type: 'featured authors',
          attributes: {
            profileID: item['id'],
            order: index + 1
          }
        })
      })
      let params = {
        data: filterSelection
      }
      await this.addAuthorsToPopular(params)
    },
    // ************* Method to retrieve Popular Authors List **********************
    async getPopularAuthors() {
      let response = await this.fetchPopularAuthorsList()
      this.popularAuthorsList = response
      this.selectedCreatorsList = response
      this.selectedCreatorsList.forEach((item, index) => {
        item['selectionCount'] = index + 1
        item['isSelected'] = true
      })
      this.displayPopularMark()
    },
    // ***************** MEthod to Display the Mark on the Popular Authors List *****************
    displayPopularMark() {
      this.popularAuthorsList.map((popular, index) => {
        this.creatorsList.map(author => {
          if (author['id'] == popular['id']) {
            author['isSelected'] = true
            author['selectionCount'] = index + 1
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card-selected {
  border: 2px solid green !important;
}
.selection-shape {
  top: -1px;
  left: -1px;
  border-top: 60px solid green;
  border-right: 60px solid transparent;
}
.select-count {
  top: 10px;
  left: 10px;
  font-size: 15px;
}
.button-width {
  width: 18%;
  @media only screen and (max-width: $breakpoint-md-max) {
    width: 18%;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 25%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 30%;
  }
}
</style>
