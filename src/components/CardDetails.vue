<template>
  <div class="q-px-md q-pt-md">
    <!-- card icon -->
    <div>
      <q-img
        src="~/assets/chip.svg"
        spinner-color="white"
        height="28px"
        width="42px"
      />
      <cardLogo :brand="userCardDetails.brand" />
    </div>
    <!-- card number -->
    <div class="text-white text-h6 q-my-lg justify-center flex">
      <span class="q-mr-xs">
        XXXX XXXX XXXX
      </span>
      <span> {{ userCardDetails.last4 }}</span>
    </div>
    <!-- card user detail -->
    <div class="row text-white justify-between">
      <!-- card holder name -->

      <div>
        {{
          getCardUserName.length > 20
            ? getCardUserName.substring(0, 20) + '...'
            : getCardUserName
        }}
      </div>
      <!-- Card Expiary -->
      <div class="row float-right">
        <div class="expiryDate">VALID THRU</div>
        <div>
          {{
            ('0' + userCardDetails.expMonth).slice(-2) +
              '/' +
              userCardDetails.expYear.toString().substr(-2)
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import cardLogo from './CardLogo.vue'
export default {
  props: ['userCardDetails'],
  components: {
    cardLogo
  },
  computed: {
    ...mapGetters(['userProfile']),
    getCardUserName() {
      return this.userCardDetails.name === ''
        ? this.userProfile.firstName +
            ' ' +
            (this.userProfile.lastName === undefined
              ? ''
              : this.userProfile.lastName)
        : this.userCardDetails.name
    }
  }
}
</script>
<style lang="scss" scoped>
.expiryDate {
  width: 40px;
  font-size: 8px;
}
</style>
