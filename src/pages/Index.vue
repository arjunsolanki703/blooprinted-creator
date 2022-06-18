<template>
  <q-page>
    <div class="q-pa-lg flex flex-center">
      <q-btn color="primary" label="Login" no-caps :to="{ name: 'login' }" />
    </div>
    <div class="q-pa-sm row justify-center" v-if="showSkeleton">
      <div
        :class="'col-md-3 col-sm-5 col-xs-10 q-py-lg q-ma-md box'"
        v-for="i in 4"
        :key="i"
      >
        <q-card-section>
          <div
            class="
              q-pa-md text-h5 flex flex-center
            "
          >
            <q-skeleton type="text" width="150px" />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex flex-center">
            <div class="text-nightRider text-h4 text-weight-medium">
              <q-skeleton type="text" width="80px" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-grey-7 text-center q-px-lg">
            <q-skeleton type="text" />
          </div>
          <div class="text-grey-7 text-center q-px-sm q-pt-lg q-pb-xl">
            <q-skeleton type="text" />
          </div>
          <div class="flex flex-center q-my-xl">
            <q-skeleton type="QBtn" width="150px" height="50px" />
          </div>
        </q-card-section>
      </div>
    </div>
    <div class="q-pa-sm row justify-center" v-else>
      <div
        :class="'col-md-3 col-sm-5 col-xs-10 q-py-lg q-ma-md text-black box'"
        v-for="plan in allPlans"
        :key="plan['planID']"
      >
        <q-card-section>
          <div
            class="
              q-pa-md text-nightRider text-h5 text-weight-medium text-center text-capitalize
            "
          >
            {{ plan['name'] }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex flex-center items-baseline">
            <div class="text-nightRider text-h4 text-weight-medium">
              ${{ plan['amount'] }}
            </div>
            <div class="text-body1">
              {{ planAmountPrefix(plan['interval']) }}
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-grey-7 text-center">
            Number of Blooprints -
            {{
              plan['accessibleBlooprints'] === -1
                ? 'Unlimited'
                : plan['accessibleBlooprints']
            }}
          </div>
          <div class="text-grey-7 text-center q-px-lg q-pt-lg q-pb-xl">
            {{ plan['description'] }}
          </div>
          <div class="text-center">
            <q-btn
              class="bg-primary q-px-lg q-py-md q-mt-lg line text-white text-capitalize"
              padding="none"
              :to="{ name: 'signup', params: { plan: plan['name'] } }"
              unelevated
              flat
              style="border-radius:5px"
            >
              Get Started Now
            </q-btn>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      showSkeleton: true
    }
  },

  async mounted() {
    await this.getPlans()
    this.showSkeleton = false
  },

  methods: {
    ...mapActions(['getPlans']),
    planAmountPrefix(duration) {
      if (duration === 'month') {
        return '/mo'
      } else if (duration === 'year') {
        return '/yr'
      }

      return ''
    }
  },
  computed: {
    ...mapGetters(['allPlans'])
  }
}
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid $secondary;
  border-radius: 8px;
  width: 280px;
}
</style>
