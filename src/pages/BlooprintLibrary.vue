<template>
  <q-page class="bg-whiteSmoke">
    <div class="q-mx-xl q-pt-xl row justify-between ">
      <div class="text-nightRider text-h5 text-weight-medium">
        Blooprints Library
        <q-separator width="60%" color="primary" size="2px" />
      </div>
      <div class="text-dimGrey text-right">
        Selected {{ selectedList.length }} out of {{ totalBlooprintCount }}
      </div>
    </div>
    <div class="q-mx-xl q-mt-sm text-nightRider">
      Select blooprints to make it popular
    </div>
    <div
      class="q-pa-md row q-mt-md q-mx-lg items-start justify-between"
      v-if="isLoading"
    >
      <q-card
        flat
        class="col-md-4 q-pa-md col-sm-6 col-xs-12 q-mb-md bg-whiteSmoke"
        v-for="i in 9"
        :key="i"
      >
        <q-skeleton height="200px" square />
        <q-card-section class="border-secondary bg-white">
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="100%" class="text-subtitle1" />
          <q-skeleton type="text" width="100%" class="text-subtitle1" />
        </q-card-section>
      </q-card>
    </div>
    <q-infinite-scroll
      @load="loadMoreRecords"
      :offset="250"
      ref="infiniteScroll"
      v-if="!isLoading"
    >
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <div class="row q-mx-lg q-mt-md items-start">
        <div
          v-for="(blooprint, index) in blooprintLibraryList"
          :key="blooprint.id"
          :id="index + 1"
          flat
          class="col-md-4 q-pa-md col-sm-6 col-xs-12 q-mb-md bg-whiteSmoke"
        >
          <div
            class="shadow-1 relative-position"
            :class="blooprint['isSelected'] ? 'card-selected' : null"
            @click="onCardSelect(blooprint)"
          >
            <img
              class="cursor-pointer full-width"
              style="height: 200px"
              :src="blooprint['attributes']['thumbnail']"
            />

            <div
              v-if="blooprint['selectionCount'] != 0"
              class="absolute selection-shape"
            ></div>
            <div
              v-if="blooprint['selectionCount'] != 0"
              class="absolute text-white select-count"
            >
              {{ blooprint['selectionCount'] }}
            </div>
            <q-card-section class="bg-white cursor-pointer">
              <div class="text-nightRider ellipsis">
                {{
                  blooprint['attributes']['authorName']
                    ? blooprint['attributes']['authorName'].trim() != ''
                      ? blooprint['attributes']['authorName']
                      : '--'
                    : '--'
                }}
              </div>
              <div class="text-h6 text-nightRider ellipsis">
                {{
                  blooprint['attributes']['name']
                    ? blooprint['attributes']['name'].trim() != ''
                      ? blooprint['attributes']['name']
                      : '--'
                    : '--'
                }}
              </div>
              <div class="row q-mt-xs">
                <div class="col text-left text-primary">
                  {{ blooprint['attributes']['currency'] }}
                  {{ blooprint['attributes']['price'] }}
                </div>
                <div class="col text-right">
                  {{ blooprint['attributes']['rating'].toFixed(1) }}
                  <q-rating
                    :value="blooprint['attributes']['rating']"
                    size="16px"
                    color="primary"
                    icon="star_border"
                    icon-selected="star"
                    icon-half="star_half"
                    :readonly="true"
                    class="q-mb-xs q-mx-xs"
                  />
                  <!-- (120) -->
                </div>
              </div>
            </q-card-section>
          </div>
        </div>
      </div>
      <div style="padding-bottom: 90px">
        <div
          class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
          v-if="noMoreResults && blooprintLibraryList.length != 0"
        >
          <span class="bg-whiteSmoke">No more results</span>
        </div>
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
        @click="saveBlooprintsToPopular"
      ></q-btn>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'

const BLOOPRINT_SHOW_LIMIT = 10
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      isLoading: true,
      noMoreResults: false,
      blooprintLibraryList: [],
      blooprintSelected: {},
      selectedList: [],
      popularBlooprintList: [],
      totalBlooprintCount: 0
    }
  },
  mounted() {
    this.fetchBlooprintsList()
    this.getPopularBlooprints()
  },

  methods: {
    ...mapActions([
      'retrieveBlooprintList',
      'addBlooprintsToPopular',
      'fetchPopularBlooprintsList',
      'setToastMessage'
    ]),
    // *************** Method to fetch the Blooprint List *********************
    async fetchBlooprintsList() {
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: 0
      }
      this.isLoading = true
      let data = await this.retrieveBlooprintList(params)
      this.isLoading = false
      this.totalBlooprintCount = data['totalCount']
      if (data['blooprintList'].length > 0) {
        this.isLoading = false
        this.blooprintLibraryList.push(...data['blooprintList'])
        this.displayPopularMark()
      }
    },
    // ************ On Scroll Pagination Load Blooprint Records *****************************
    async loadMoreRecords(index, done) {
      let blooprintListLengthBeforeLoad = this.blooprintLibraryList.length

      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: index * BLOOPRINT_SHOW_LIMIT
      }
      if (this.blooprintLibraryList.length >= BLOOPRINT_SHOW_LIMIT) {
        let data = await this.retrieveBlooprintList(params)
        if (data['blooprintList'].length > 0) {
          this.isLoading = false
          this.blooprintLibraryList.push(...data['blooprintList'])
          this.displayPopularMark()
        }
      }
      let blooprintListLengthAfterLoad = this.blooprintLibraryList.length
      if (index != 1) {
        document
          .getElementById(index * BLOOPRINT_SHOW_LIMIT - BLOOPRINT_SHOW_LIMIT)
          .scrollIntoView()
      }
      if (
        blooprintListLengthBeforeLoad == blooprintListLengthAfterLoad ||
        blooprintListLengthAfterLoad - blooprintListLengthBeforeLoad <
          BLOOPRINT_SHOW_LIMIT
      ) {
        if (blooprintListLengthBeforeLoad > 0) {
          this.noMoreResults = true
        }
        this.$refs.infiniteScroll.stop()
      }
      done()
    },
    // *************** Triggers when a Blooprint is selected ******************************
    onCardSelect(blooprint) {
      blooprint['isSelected'] = !blooprint['isSelected']
      this.blooprintSelected = blooprint
      if (blooprint['isSelected']) {
        blooprint['selectionCount'] = this.selectedList.length + 1
        this.selectedList.push(blooprint)
      } else {
        blooprint['selectionCount'] = 0
        let data = this.selectedList.findIndex(
          item => item.id == this.blooprintSelected.id
        )
        this.selectedList.splice(data, 1)
        // ********* Updating the Selection Count when an Blooprint is unselected **********************
        this.selectedList.map((selected, index) => {
          this.blooprintLibraryList.map(blooprint => {
            if (blooprint['id'] == selected['id']) {
              blooprint['isSelected'] = true
              blooprint['selectionCount'] = index + 1
            }
          })
        })
      }
    },
    // ******* Triggers when Cancel Button is Clicked, clear the selection list ****************************
    clearSelectedItems() {
      this.selectedList = []
      this.popularBlooprintList = []
      this.blooprintLibraryList.map(blooprint => {
        blooprint['isSelected'] = false
        blooprint['selectionCount'] = 0
      })
    },
    // ******* Triggers when Save Button is Clicked, Add Blooprints to Popular ****************************
    async saveBlooprintsToPopular() {
      let filterSelection = []
      this.selectedList.map((item, index) => {
        filterSelection.push({
          type: 'blooprints',
          attributes: {
            blooprintID: item['id'],
            order: index + 1
          }
        })
      })
      let params = {
        data: filterSelection
      }
      await this.addBlooprintsToPopular(params)
    },
    // ************* Method to retrieve Popular Blooprints List **********************
    async getPopularBlooprints() {
      let response = await this.fetchPopularBlooprintsList()
      this.popularBlooprintList = response
      this.selectedList = response
      this.selectedList.forEach((item, index) => {
        item['selectionCount'] = index + 1
        item['isSelected'] = true
      })
      this.displayPopularMark()
    },
    // ***************** MEthod to Display the Mark on the Popular Blooprints List *****************
    displayPopularMark() {
      this.popularBlooprintList.map((popular, index) => {
        this.blooprintLibraryList.map(blooprint => {
          if (blooprint['id'] == popular['id']) {
            blooprint['isSelected'] = true
            blooprint['selectionCount'] = index + 1
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card-selected {
  border: 2px solid green;
}
.selection-shape {
  top: -1px;
  left: -1px;
  border-top: 50px solid green;
  border-right: 50px solid transparent;
}
.select-count {
  top: 5px;
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
