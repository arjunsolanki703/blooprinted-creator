<template>
  <div :class="isFAQRoute ? 'faq-screen' : 'faq-section'">
    <div class="row justify-center">
      <div
        :class="
          isFAQRoute
            ? 'col-md-8 col-sm-10 col-xs-12'
            : 'col-md-7 col-sm-10 col-xs-12'
        "
      >
        <div
          :class="isFAQRoute ? '' : 'reveal fade-bottom'"
          class="text-heading text-regalBlue text-letter-space"
        >
          FAQs
        </div>
        <q-list
          bordered
          class="faq-list"
          :class="isFAQRoute ? '' : 'reveal fade-bottom'"
        >
          <q-expansion-item
            expand-separator
            :icon="$q.screen.lt.md ? 'help' : 'img:question-mark.svg'"
            label="Can I set my own blooprint price?"
            class="text-sub-heading text-regalBlue"
          >
            <q-card>
              <q-card-section>
                <div class="text-description">
                  Yes! We've designed your Creator studio to allow for any price
                  you'd like to charge. We have blooprints selling for as little
                  as $1 and some selling for multiple thousands of dollars. The
                  choice is yours!
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <q-list
          bordered
          class="faq-list"
          :class="isFAQRoute ? '' : 'reveal fade-bottom'"
        >
          <q-expansion-item
            expand-separator
            :icon="$q.screen.lt.md ? 'help' : 'img:question-mark.svg'"
            label="Do my blooprints ever expire?"
            class="text-sub-heading text-regalBlue"
          >
            <q-card>
              <q-card-section>
                <div class="text-description">
                  Never! As long as your membership is up to date, your
                  blooprints are on the marketplace. If your membership does not
                  renew, your blooprints will remain in the library for the
                  users that had already purchased them.
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <q-list bordered class="faq-list" v-if="isFAQRoute">
          <q-expansion-item
            expand-separator
            :icon="$q.screen.lt.md ? 'help' : 'img:question-mark.svg'"
            label="What categories does blooprint feature?"
            class="text-sub-heading text-regalBlue"
          >
            <q-card>
              <q-card-section>
                <div class="text-description">
                  Health & Fitness, Business, Finance—and a lot more to come.
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <q-list
          bordered
          class="faq-list"
          :class="isFAQRoute ? '' : 'reveal fade-bottom'"
        >
          <q-expansion-item
            expand-separator
            :icon="$q.screen.lt.md ? 'help' : 'img:question-mark.svg'"
            label="How do I keep track of my templates and following?"
            class="text-sub-heading text-regalBlue"
          >
            <q-card>
              <q-card-section>
                <div class="text-description">
                  Find everything in your dashboard—blooprints, amount of
                  followers on each, and visible data to track progress and
                  usage.
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <q-list bordered class="faq-list" v-if="isFAQRoute">
          <q-expansion-item
            expand-separator
            :icon="$q.screen.lt.md ? 'help' : 'img:question-mark.svg'"
            label="Can I message creators on the platform?"
            class="text-sub-heading text-regalBlue"
          >
            <q-card>
              <q-card-section>
                <div class="text-description">
                  We allow blooprinted creators the liberty to choose messaging
                  abilities for their profile. Not every Creator will opt in for
                  that feature.
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <q-list bordered class="faq-list" v-if="isFAQRoute">
          <q-expansion-item
            expand-separator
            :icon="$q.screen.lt.md ? 'help' : 'img:question-mark.svg'"
            label="What forms of payment are accepted?"
            class="text-sub-heading text-regalBlue"
          >
            <q-card>
              <q-card-section>
                <div class="text-description">
                  Currently, we only accept credit card transactions.
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <div
        class="col-12 text-center"
        style="margin-top: 18px"
        v-if="!isFAQRoute"
      >
        <q-btn
          color="primary"
          label="View all questions"
          no-caps
          no-wrap
          @click="onViewAllQuestionsClick"
          class="text-body1 f-w-600 creator-btn q-pl-sm reveal fade-bottom"
          style="border-radius: 10px; height: 50px; width: 230px"
        >
          <div class="col q-py-xs text-left relative-position">
            <q-avatar class="arrow" style="margin-left: 15px" size="18px">
              <img src="~assets/chevron-right.svg" />
            </q-avatar>
          </div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isFAQRoute'],
  methods: {
    onViewAllQuestionsClick() {
      this.$router.push({ name: 'faqs' })
    }
  }
}
</script>
<style lang="scss" scoped>
.faq-section {
  margin-bottom: 150px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 100px;
  }
}
.faq-screen {
  padding: 80px 52px 200px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 40px 15px 100px 15px;
  }
}
.text-heading {
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 30px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 28px;
    line-height: 36px;
    color: black;
  }
}
.text-sub-heading {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 16px;
    line-height: 24px;
    color: black;
  }
}
.text-description {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding: 4px 30px 30px 64px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0px 30px 30px 64px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-weight: 400;
    color: black;
    padding: 0px 30px 30px 64px;
  }
}

.faq-list {
  border-radius: 10px;
  margin-bottom: 16px;
  border: 2px solid #e8edf2;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 12px;
    border-radius: 5px;
    border: 2px solid #dddddd;
  }
}
::v-deep {
  .q-expansion-item__toggle-icon {
    color: $primary !important;
  }
  .q-item__label {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px !important;
    @media only screen and (max-width: $breakpoint-xs-max) {
      font-size: 16px;
      line-height: 24px !important;
    }
  }
  .q-item {
    padding: 20px;
  }
  .q-item__section--side {
    padding-right: 0px;
    padding-left: 0px;
  }
  .q-card__section--vert {
    padding: 0;
  }
  .q-item__section--avatar {
    width: 24px;
    min-width: 24px;
    justify-content: inherit;
    color: $primary;
  }
  .q-item__section--main {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
