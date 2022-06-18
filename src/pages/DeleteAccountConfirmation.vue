<template>
  <q-page
    class="q-ma-md-xl q-ma-sm-xl q-ma-xs-lg page-height column border-secondary bg-white flex flex-center"
  >
    <div
      class="text-dimGrey text-h5 text-weight-medium text-center q-mx-lg q-my-md"
    >
      Oh no! What could I have done differently?
    </div>
    <q-img
      class="q-my-md-xl q-my-sm-xl q-my-xs-md img-width"
      src="~assets/AuthLogo1.svg"
    />
    <div class="text-dimGrey text-body1 text-center description">
      Well, the good news is that you are ALWAYS welcome to return when the time
      is right. We value every person in our ecosystem and we would LOVE for you
      to join us again soon. Best of luck - I will be thinking about you!
    </div>
    <div class="row q-mx-md q-mt-lg q-mb-md">
      <q-btn
        no-caps
        size="16px"
        style="border: 2px solid #00308F"
        class="white text-smalt col q-mr-md-lg q-mr-sm-md q-mr-xs-sm border-smalt btn-width"
        label="Cancel"
        @click="onCancelClick"
      />
      <q-btn
        no-caps
        color="white"
        size="16px"
        flat
        class="col bg-smalt rounded-borders btn-width"
        label="Confirm"
        @click="onConfirmClick"
      />
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  methods: {
    ...mapActions(['deleteUser']),
    // **************** Triggers when Cancel Button is clicked ********************
    onCancelClick() {
      this.$router.push('/my-profile')
    },
    // **************** Triggers when Confirm Button is clicked to Delete the User ********************
    onConfirmClick() {
      this.deleteUser()
    }
  }
}
</script>
<style lang="scss" scoped>
.page-height {
  min-height: 70vh !important;
}
.btn-width {
  width: 150px;
}
.img-width {
  width: 13%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 20%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 30%;
  }
}
.text-width {
  width: 60%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 70%;
  }
}
.description {
  width: 40%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 60%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 80%;
  }
}
</style>
