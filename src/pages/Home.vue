<template>
  <q-page>
    <DoneForYouSection />
    <LevelsSection />
    <WhatACreatorSection />
    <ProcessSimpleSection />
    <PaymentPlanSection />
    <ExpertPlanSection />
    <MoneyToMakeSection />
    <BecomeACreatorSection />
    <FAQSection />
  </q-page>
</template>

<script>
import DoneForYouSection from 'components/DoneForYouSection.vue'
import LevelsSection from 'components/LevelsSection.vue'
import WhatACreatorSection from 'components/WhatACreatorSection.vue'
import ProcessSimpleSection from 'components/ProcessSimpleSection.vue'
import PaymentPlanSection from 'components/PaymentPlanSection.vue'
import ExpertPlanSection from 'components/ExpertPlanSection.vue'
import MoneyToMakeSection from 'components/MoneyToMakeSection.vue'
import BecomeACreatorSection from 'components/BecomeACreatorSection.vue'
import FAQSection from 'components/FAQSection.vue'
export default {
  name: 'Home',
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    DoneForYouSection,
    LevelsSection,
    WhatACreatorSection,
    ProcessSimpleSection,
    PaymentPlanSection,
    ExpertPlanSection,
    MoneyToMakeSection,
    BecomeACreatorSection,
    FAQSection
  },
  mounted() {
    //Adding event for animation purpose
    window.addEventListener('scroll', this.reveal)
  },
  methods: {
    reveal() {
      var reveals = document.querySelectorAll('.reveal')
      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight
        var elementTop = reveals[i].getBoundingClientRect().top
        var elementVisible = 150
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
