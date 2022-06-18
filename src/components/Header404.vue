<template>
  <q-header bordered elevated class="bg-primary">
    <q-toolbar class="q-my-sm">
      <div class="q-mx-md-lg q-mx-sm-lg q-mx-xs-md">
        <q-img
          class="cursor-pointer"
          @click="onLogoClick"
          style="width: 200px"
          src="~assets/AppNameHeader.svg"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
import { isLogin, constants } from '../utils/common'

export default {
  name: 'Header404',
  methods: {
    // ************ Navigate back to default page *****************************8
    onLogoClick() {
      this.$router.push({ name: constants.PAGE_HOME }, () => {})
    }
  }
}
</script>
