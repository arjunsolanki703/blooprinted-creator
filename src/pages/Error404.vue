<template>
  <q-layout
    class="page bg-whiteSmoke"
    view="lHh lpr lFf"
    style="min-height: inherit"
  >
    <Header />

    <q-page-container style="padding: 0px !important">
      <q-page
        class="flex column flex-center full-width full-height page-padding-style"
        style="background: #E8EDF2;"
      >
        <div class="error-message">
          404 Error. Page not found.
        </div>
        <div class="error-caption">
          Sorry, the content you are looking for doesn’t exist. Either it was
          removed or you’ve mistyped the link.
        </div>
        <div class="navigation-btn-container">
          <q-btn
            dense
            no-caps
            class="homepage-btn"
            label="Go to Homepage"
            to="home"
          />
          <q-btn
            dense
            flat
            no-caps
            class="contact-us-btn"
            @click="onContactUsClick"
            label="Contact Us"
          />
        </div>
      </q-page>
    </q-page-container>
    <Footer
      :singleLineFooter="false"
      :mediumFooter="false"
      :fullFooter="true"
    />
  </q-layout>
</template>

<script>
import Header from 'components/Header.vue'
import Footer from 'components/Footer.vue'
export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'Error404',
  components: {
    Header,
    Footer
  },
  methods: {
    // ************ Navigate back to default page *****************************8
    onLogoClick() {
      this.$router.push('/', () => {})
    },
    onContactUsClick() {
      window.HubSpotConversations.widget.open()
    }
  }
}
</script>
<style lang="scss" scoped>
.page-height {
  min-height: 79vh !important;
}
.page-padding-style {
  padding: 180px 52px 220px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 80px 15px 100px 15px;
  }
}
.margin {
  margin-bottom: 0px !important;
}
.error-message {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #152141;
  margin: 20px 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
  }
}
.error-caption {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: #152141;
  margin-bottom: 50px;
  max-width: 553px;
}
.navigation-btn-container {
  display: flex;
  @media only screen and (max-width: $breakpoint-xs-max) {
    flex-direction: column;
  }
}
.homepage-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  height: 40px;
  background: #1652f0;
  border-radius: 5px;
  margin-right: 30px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100% !important;
    margin-bottom: 30px !important;
    margin-right: 0px !important;
  }
}
.contact-us-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  height: 40px;
  border: 2px solid #1652f0;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1652f0;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100% !important;
    margin-bottom: 30px;
  }
}
</style>
