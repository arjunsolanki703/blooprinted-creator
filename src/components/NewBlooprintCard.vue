<template>
    <q-card class="new-blooprint-card bg-white cursor-pointer f-w-600 text-fs-16 text-lh-24 text-primary  align-center justify-center self-center" @click="goToBlooprintCreate">
        <q-img src="~assets/Focus Icon.svg" width="80px" height="80px" class="align-center justify-center self-center cursor-pointer"/>
        <div class="align-center justify-center self-center cursor-pointer" style="margin-top:24px">Create new blooprint</div>
    </q-card>
</template>

<script>
export default {
    methods: {
        goToBlooprintCreate() {
            // this.$router.push({
            //     name: 'blooprintCreation'
            // })
            this.$emit('open-popup')
        }
    }
}
</script>


<style lang="scss" scoped>
.new-blooprint-card {
    display: flex;
    flex-direction: column;
    min-width: 319px;
    height: 373px;
    max-width: 466px;
    border: 2px solid #1652F0;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    margin-right: 20px;
    margin-top:24px;

    @media only screen  and (max-width: $breakpoint-xs-max) {
        width: 100%;
        min-width: 100%;
        height: 182px;
    }
}
</style>