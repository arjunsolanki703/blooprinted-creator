<template>
  <q-header class="bg-white" style="position: static">
    <q-toolbar :class="isUserLoggedIn ? 'home-toolbar' : 'home-toolbar'">
      <div class="logo-icon-wrapper">
        <q-img
          @click="onLogoClick"
          class="cursor-pointer"
          src="~assets/AppName.svg"
          contain
        />
      </div>

      <div class="col flex items-center justify-end text-black">
        <div v-if="!isUserLoggedIn">
          <div v-if="$q.screen.gt.sm" class="reveal fade-left active">
            <q-btn
              label="Login"
              no-caps
              no-wrap
              flat
              @click="$router.push({ name: 'login' })"
              class="login-btn-text text-letter-space f-w-600 text-fs-16 text-lh-24"
            >
            </q-btn>
            <q-btn
              flat
              label="Become a Creator"
              no-caps
              no-wrap
              @click="
                $router.push({
                  name: 'signup-plan',
                  params: { planName: 'self' }
                })
              "
              class="become-creator-btn bg-primary text-letter-space f-w-600 text-white text-fs-16 text-lh-24"
            >
            </q-btn>
          </div>

          <div v-else>
            <q-btn
              class="menu-btn"
              flat
              round
              dense
              @click="displayDrawerMenu = !displayDrawerMenu"
              size="lg"
              color="primary"
              icon="menu"
            />

            <q-drawer
              v-model="displayDrawerMenu"
              :breakpoint="1023"
              :width="1023"
              overlay
              bordered
              class="menu-drawer"
            >
              <div :class="'logout-toolbar'" class="row items-center">
                <div class="logo-icon-wrapper">
                  <q-img
                    @click="onLogoClick"
                    class="cursor-pointer"
                    src="~assets/AppName.svg"
                    contain
                  />
                </div>
                <div class="col flex items-center justify-end text-black">
                  <q-btn
                    flat
                    @click="displayDrawerMenu = !displayDrawerMenu"
                    round
                    dense
                    size="lg"
                    color="primary"
                    class="cursor-pointer"
                    icon="close"
                  />
                </div>
              </div>
              <q-separator
                inset
                class="col-12 bg-solitudeBlue q-ma-none"
                style="height: 2px"
              />
              <q-list class="col-12 list-margin">
                <div v-for="(menu, i) in menuList" :key="menu.label">
                  <q-separator
                    inset
                    v-if="i !== 0"
                    class="bg-solitudeBlue q-ma-none"
                    style="height: 2px"
                  />
                  <q-item
                    class="q-px-none q-py-md cursor-pointer"
                    :to="menu.route"
                  >
                    <q-item-section>
                      <div
                        exact
                        class="remove-underline text-regalBlue f-w-600 text-fs-20-lh-28"
                        :label="menu.label"
                      >
                        {{ menu.label }}
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </q-drawer>
          </div>
        </div>
        <div
          class="col flex justify-end text-black"
          v-else
          style="margin-right: 30px"
        >
          <q-space />
          <div
            class="gt-xs text-regalBlue f-w-600 text-fs-16 text-lh-24 cursor-pointer"
            style="margin-right:30px"
            @click="
              $route.name == 'my-blooprints'
                ? null
                : $router.push('/my-blooprints')
            "
          >
            Creator Studio
          </div>
          <div
            class="gt-xs text-regalBlue f-w-600 text-fs-16 text-lh-24 cursor-pointer"
            style="margin-right:30px"
            @click="
              $route.name == 'settings' ? null : $router.push('/settings')
            "
          >
            My Profile
          </div>
          <q-btn flat :ripple="false" @click="openChatMessage">
            <q-img
              style="width: 24px; height: 24px"
              class="cursor-pointer"
              src="~assets/Message.svg"
            >
            </q-img>
            <q-badge
              v-if="unreadMessagesCount > 0"
              floating
              rounded
              style="background-color: #D92D20"
            >
              {{ unreadMessagesCount }}
            </q-badge>
          </q-btn>
        </div>
        <UserMenu @onLogout="isUserLoggedIn = false" />
      </div>
    </q-toolbar>
    <GetStartedMessage class="gt-sm" v-if="this.$route.name == 'home'" />
    <preview-banner
      v-if="
        this.$route.name == 'prePurchaseBlooprint' ||
          this.$route.name == 'postPurchaseBlooprint'
      "
    />
  </q-header>
</template>
<script>
import UserMenu from './UserMenu.vue'
import { constants, isLogin } from '../utils/common'
import GetStartedMessage from 'components/GetStartedMessage.vue'
import PreviewBanner from './PreviewBanner.vue'
import { mapGetters, mapMutations } from 'vuex'
import { firebaseAuth } from 'src/boot/firebase'

export default {
  data() {
    return {
      isHomeRoute: false,
      displayDrawerMenu: false,
      isUserLoggedIn: isLogin(),
      menuList: [
        {
          label: 'Login',
          route: 'login'
        },
        {
          label: 'Become a Creator',
          route: 'signup/self'
        }
      ]
    }
  },
  components: {
    UserMenu,
    GetStartedMessage,
    PreviewBanner
  },
  computed: {
    ...mapGetters(['unreadMessagesCount'])
  },
  methods: {
    // *************** Triggers when Blooprinted Logo Is Clicked ****************************
    ...mapMutations(['setUnreadMessagesCount']),
    onLogoClick() {
      this.$router.push({ name: constants.PAGE_HOME }, () => {})
    },
    openChatMessage() {
      this.$router.push({ name: 'message' }, () => {})
    }
  },
  created() {
    if (firebaseAuth.currentUser?.uid) {
      this.unreadUnscubscribe = this.$getUnreadCount(
        this.setUnreadMessagesCount,
        firebaseAuth.currentUser.uid
      )
    }
  },
  destroyed() {
    // messages unread count unsubscribe
    if (this.unreadUnscubscribe) {
      this.unreadUnscubscribe()
    }
  }
}
</script>
<style lang="scss" scoped>
.login-toolbar {
  padding: 25px 52px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 15px 15px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 15px 15px !important;
  }
}
.home-toolbar {
  padding: 25px 52px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 18px 15px !important;
  }
}
.logout-toolbar {
  padding: 21px 52px !important;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 15px 15px !important;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 15px 15px !important;
  }
}
.list-margin {
  padding: 0px 30px 0px 15px;
}
.logo-icon-wrapper {
  width: 184px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 138px;
  }
}
.my-blooprint-menu-link {
  @media only screen and (max-width: 1300px) {
    display: none;
  }
}
.notif-logo {
  left: 2px;
  bottom: 6px;
}
.login-btn-text {
  border-radius: 5px;
  height: 40px;
  width: 84px;
  border: 2px solid #1652f0;
  color: #1652f0;
  margin-right: 30px;
}
.become-creator-btn {
  border-radius: 5px;
  height: 40px;
  width: 188px;
}
::v-deep {
  .menu-btn {
    .q-btn__wrapper {
      min-width: 32px !important;
      min-height: 32px !important;
      width: 32px;
      height: 32px;
    }
  }

  .menu-drawer .q-drawer {
    width: 100vw !important;
  }
  .q-btn__wrapper {
    padding: 0px;
    min-height: unset;
  }
}
</style>
