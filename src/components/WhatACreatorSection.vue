<template>
  <div class="section">
    <div class="row justify-between relative-position overflow-hidden">
      <div class="text-section col-md-5 col-sm-12 col-xs-12">
        <div
          class="f-w-600 heading text-regalBlue reveal fade-bottom text-letter-space"
        >
          What is a Creator?
        </div>
        <div
          class="subheading f-w-600 text-regalBlue f-s-20 text-lh-28 reveal fade-bottom"
        >
          Your opportunity to share your expertise with the world.
        </div>
        <div
          class="description f-w-400 text-regalBlue f-s-20 text-lh-28 reveal fade-bottom"
        >
          As a creator on blooprinted, we will take your success and
          reverse-engineer it into specific steps and tasks that someone else
          can follow and create the same outcome you have. <br /><br />
          Here are just a few categories on the platform that many on the
          platform are looking for:
        </div>
        <div class="list-items row justify-between reveal fade-bottom">
          <div class="col-md-5 col-sm-5 col-xs-5">
            <div
              class="row no-wrap"
              :class="i < list1.length - 1 ? 'list-margin' : ''"
              v-for="(item, i) in list1"
              :key="i"
            >
              <q-icon name="img:coolicon.svg" size="20px" />
              <div class="label f-w-500 text-regalBlue">{{ item }}</div>
            </div>
          </div>
          <div class="col-md-5 col-sm-5 col-xs-6">
            <div
              class="row no-wrap"
              :class="i < list2.length - 1 ? 'list-margin' : ''"
              v-for="(item, i) in list2"
              :key="i"
            >
              <q-icon name="img:coolicon.svg" size="20px" />
              <div class="label f-w-500 text-regalBlue">{{ item }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-md-6 col-sm-12 col-xs-12 relative-position reveal fade-right"
      >
        <div class="image-container">
          <q-img src="~assets/whatACreatorBanner.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: ['Business', 'Real Estate', 'Health & Fitness', 'Marketing'],
      list2: ['Art & Design', 'Travel', 'Photography & Film', 'And more...']
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: linear-gradient(to bottom, $solitudeBlue 80px, white 80px);
  @media only screen and (max-width: $breakpoint-sm-max) {
    background: white;
  }
}
.heading {
  font-size: 48px;
  line-height: 56px;
  margin-bottom: 30px;
  margin-top: 140px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 60px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
    color: black;
    margin-bottom: 20px;
  }
}
.subheading {
  margin-bottom: 20px;
}
.description {
  margin-bottom: 30px;
}
.label {
  font-size: 16px;
  line-height: 24px;
  margin-left: 17px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    color: black;
  }
}
.list-margin {
  margin-bottom: 20px;
}
.image-container {
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 90px;
    padding-left: 18px;
  }
}
.text-section {
  min-width: 480px;
  padding-left: 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0px 52px;
    min-width: unset;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-left: 16px;
    padding-right: 14px;
  }
}
</style>
