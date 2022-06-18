<template>
  <div class="row">
      <div  v-for="i in totalCards"
      :key="i" class="row">
        <q-card style="border-radius: 20px" class="blooprint-data-card">
        <q-skeleton class="row" width="100%" height="150px" square />
        <q-card-section>
          <q-skeleton class="q-my-sm" width="50%" />
          <q-skeleton type="QInput" class="q-my-sm" width="100%" />
          <q-skeleton class="q-my-sm" width="50%" />
          <div class="row items-center justify-between no-wrap">
            <div class="row col-6 items-center">
              <q-skeleton class="q-my-sm" width="223px" height="44px"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
      </div>
  </div>
</template>

<script>
export default {
    props: ['totalCards']
}
</script>

<style lang="scss" scoped>
        .blooprint-data-card {
        margin-top:24px;
        height: 373px;
        min-width: 319px;
        width:fit-content;
        border-radius: 20px;
        margin-right:20px;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
         @media only screen  and (max-width: 1023px) and (min-width: 875px) {
             width:46vw !important;
         }
        @media only screen  and (max-width: 874px) and (min-width: 730px) {
             width:40vw;
         }
         @media only screen  and (max-width: 729px) and (min-width: 600px) {
             width: 35vw;
             min-width: 0px;
         }
         @media only screen  and (max-width:  $breakpoint-xs-max) {
             width: 92vw;
             min-width: 0px;
             //width: 100%;
             height: 373px;
             margin-right: 0px;
         }
    }
</style>