<template>
  <div class="row bg-solitudeBlue justify-center section">
    <div class="col-md-11 col-sm-12 col-xs-12">
      <!-- desk -->
      <div class="gt-sm section-items row items-center justify-around reveal fade-bottom active">
        <div>
          <div class="item bg-white relative-position">
            <q-img class="level-1 absolute-center" src="~assets/Level1.svg" />
          </div>
        </div>
        <div class="col gt-xs">
          <q-separator class="separator" size="2px" color="primary" />
        </div>
        <div>
          <div class="item bg-white relative-position">
            <q-img class="level-2 absolute-center" src="~assets/Level2.svg" />
          </div>
        </div>
        <div class="col gt-xs">
          <q-separator class="separator" size="2px" color="primary" />
        </div>
        <div>
          <div class="item bg-white relative-position">
            <q-img class="level-3 absolute-center" src="~assets/Level3.svg" />
          </div>
        </div>
      </div>
      <div class="gt-sm row headings items-center justify-around reveal fade-bottom active">
        <div>
          <div class="heading-text text-primary f-w-600">
            100+
          </div>
          <div class="subheading-text text-regalBlue f-w-600">
            blooprint architects
          </div>
        </div>
        <div class="col gt-xs">
          <q-separator color="solitudeBlue" />
        </div>
        <div>
          <div class="heading-text text-primary f-w-600">
            100,000
          </div>
          <div class="subheading-text text-regalBlue f-w-600">
            blooprints
          </div>
        </div>
        <div class="col gt-xs">
          <q-separator color="solitudeBlue" />
        </div>
        <div>
          <div class="heading-text text-primary f-w-600">
            Millions
          </div>
          <div class="subheading-text text-regalBlue f-w-600">
            of lives transforms
          </div>
        </div>
      </div>
      <!-- mo -->
      <div class="section-items lt-md row justify-around">
        <div class="col-12">
          <div class="row justify-center">
            <div class="item bg-white relative-position">
              <q-img class="level-1 absolute-center" src="~assets/Level1.svg" />
            </div>
            <div class="col-12">
              <div class="heading-text text-primary f-w-600">
                100+
              </div>
              <div class="subheading-text text-regalBlue f-w-600">
                blooprint architects
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="row justify-center">
            <div class="item bg-white relative-position">
              <q-img class="level-2 absolute-center" src="~assets/Level2.svg" />
            </div>
            <div class="col-12">
              <div class="heading-text text-primary f-w-600">
                100,000
              </div>
              <div class="subheading-text text-regalBlue f-w-600">
                blooprints
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="row justify-center">
            <div class="item bg-white relative-position">
              <q-img class="level-3 absolute-center" src="~assets/Level3.svg" />
            </div>
            <div class="col-12">
              <div class="heading-text text-primary f-w-600">
                Millions
              </div>
              <div class="subheading-text text-regalBlue f-w-600">
                of lives transforms
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.section-items {
  padding-top: 140px;
  margin: 0px 92px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 70px;
    margin: 0px 35px;
  }
  .item {
    width: 200px;
    height: 200px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 120px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 160px;
      height: 160px;
      border-radius: 80px;
    }
  }
  .separator {
    margin: 0px 30px;
  }
  .level-1 {
    width: 107.69px;
    height: 100px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 86.15px;
      height: 80px;
    }
  }
  .level-2 {
    width: 107.69px;
    height: 100px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 86.15px;
      height: 80px;
    }
  }
  .level-3 {
    width: 135.01px;
    height: 90px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 105.01px;
      height: 70px;
    }
  }
}
.headings {
  margin: 0px 92px;
}
.heading-text {
  font-size: 48px;
  line-height: 56px;
  margin-top: 40px;
  text-align: center;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
    margin-top: 20px;
  }
}
.subheading-text {
  margin-top: 10px;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 40px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 24px;
    margin-top: 5px;
    margin-bottom: 40px;
  }
}
.section {
  padding-bottom: 100px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-bottom: 20px;
  }
}
</style>
