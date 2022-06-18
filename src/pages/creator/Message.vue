<template>
  <q-page>
    <div class="msg-view-styles overflow-hidden">
      <chat
        v-if="currentUser"
        :currentUser="currentUser"
        :onSearch="getUsersList"
        :getProfileInfo="getProfileInfo"
        :globalConfiguration="globalConfig"
        :inboxConfiguration="inboxConfiguration"
        :chatHeaderConfiguration="chatHeaderConfiguration"
      />
    </div>
  </q-page>
</template>

<script>
import { firebaseAuth } from 'boot/firebase'
import { mapActions } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      auth: firebaseAuth,
      globalConfig: {
        loadingIconColor: 'primary',
        height: '80vh',
        allowNewChats: false
      },
      inboxConfiguration: {
        activeChatColor: '#F2F7FF',
        activeChatTextColor: '#0052CD',
        unreadIndicatorColor: '#80B3FF'
      },
      chatHeaderConfiguration: {
        onlineIndicatorColor: '#12B76A',
        onlineIndicatorBgColor: '#ECFDF3',
        offlineIndicatorColor: '#D0D5DD',
        offlineIndicatorBgColor: '#F9FAFB',
        captionColor: '#667085'
      }
    }
  },
  computed: {
    currentUser() {
      return this.auth.currentUser
    }
  },
  methods: {
    ...mapActions(['setLoading', 'getProfileDetailsList']),
    async getUsersList(search = '', page = 1, limit = 10) {
      // ....
      // return an object with paginated list of users
    },
    async getProfileInfo(userIDs) {
      if (!Array.isArray(userIDs) || userIDs.length < 1) {
        return
      } else {
        let userData = {}
        let params = {
          data: []
        }
        userIDs.map(item => {
          params['data'].push({
            type: 'featured authors',
            id: item,
            attributes: {}
          })
        })
        let data = await this.getProfileDetailsList(params)
        userData = {
          ...data
        }
        return userData
      }
    }
    // ....
    // return profile information (like photoURL, name and caption) of all the uids provided
  }
}
</script>
<style lang="scss" scoped>
.msg-view-styles {
  margin: 48px 52px 48px 52px;
  border-radius: 8px !important;
  border: 1px solid $grey-200;
  border: 1px solid $grey-200;
  box-shadow: 0px 4px 8px -2px rgba($grey-900, 0.1),
    0px 2px 4px -2px rgba($grey-900, 0.06);
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 20px 15px 20px 15px;
  }
}
</style>
