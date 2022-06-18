<template>
    <div>
        <div>
                <div
                    v-swiper:mySwiperRef="swiperOption"
                    style="height: 400px;"
                    class="swiper-container"
                >
                    <div class="swiper-wrapper">
                    <NewBlooprintCard style="margin-top:20px" @open-popup="createNewBlooprint" class="swiper-slide"/>
                    <div class="swiper-slide" v-for="(blooprint,index) in progressBlooprint" :key="index">
                    <BlooprintDataCard
                        :name="blooprint['attributes']['name']"
                        :image="blooprint['attributes']['thumbnail']"
                        :category="blooprint['attributes']['categories']"
                        :createdDate="convertDate(blooprint['attributes']['createdDate'])"
                        :status="blooprint['attributes']['status']"
                        :id="blooprint['id']"
                        @delete-blooprint = "deleteBlooprintPopup"
                        @publish-blooprint = "publishBlooprintPopup"
                    />
            </div>
        </div>
    </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import BlooprintDataCard from './BlooprintDataCard.vue'
import NewBlooprintCard from './NewBlooprintCard.vue'
export default {
    name: "PublishedBlooprints",
    props: ['progressBlooprint','publishedCount','isLoading'],
    components: {BlooprintDataCard,NewBlooprintCard},
    data() {
        return {
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
      },
        }
    },
    methods: {
     convertDate(date) {
        let value =  moment(date.slice(0,10), "YYYY-MM-DD").toString();
        return `${value.slice(0,3)}, ${value.slice(8,10)} ${value.slice(4,8)} ${value.slice(11,15)}`
        },
    createNewBlooprint() {
        this.$emit('open-popup')
    },
    deleteBlooprintPopup(id){
      this.$emit('delete-blooprint',id)
    },
    publishBlooprintPopup(id) {
      this.$emit('publish-blooprint',id)
    }
    }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: 319px !important;
}
</style>