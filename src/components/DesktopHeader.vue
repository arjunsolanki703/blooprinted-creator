<template>
  <div>
    <q-header bordered class="bg-primary">
      <q-toolbar class="q-my-sm">
        <div class="q-mx-md-lg">
          <q-btn
            class="lt-md q-mr-md"
            flat
            @click="displayDrawerMenu = !displayDrawerMenu"
            round
            dense
            icon="menu"
          />
          <q-img
            @click="onLogoClick"
            style="width: 200px"
            src="~assets/AppNameHeader.svg"
            class="cursor-pointer"
          />
        </div>
        <div class="q-ml-md gt-sm" v-if="isLogin">
          <q-tabs
            narrow-indicator
            v-model="tabSelected"
            indicator-color="transparent"
            align="left"
          >
            <q-route-tab
              v-for="item in tabsList"
              :key="item.name"
              :name="item.name"
              :to="item.routeTo"
              no-caps
            >
              <div class="text-body1 q-mt-xs">
                {{ item.label }}
              </div>
            </q-route-tab>
          </q-tabs>
        </div>
        <div class="col flex items-center justify-end" v-if="!isLogin">
          <div class="row q-mx-xl gt-sm">
            <q-btn
              unelevated
              label="SignIn"
              type="submit"
              :to="{ name: 'login' }"
              class="col q-mr-md flat border-columbia text-white q-px-xl "
            />
            <q-btn
              unelevated
              label="Signup"
              type="submit"
              :to="{ name: 'signup' }"
              class="col flat border-columbia text-white q-px-xl"
            />
          </div>
        </div>
        <div class="col flex items-center justify-end gt-sm" v-if="isLogin">
          <q-avatar v-if="hasProfilePicture(loggedInUserDetails)" size="45px">
            <img :src="loggedInUserDetails.picture" />
          </q-avatar>
          <q-avatar v-else size="45px">
            <img src="~assets/UserProfile.svg" />
          </q-avatar>
          <span
            v-if="userName != ''"
            class="col-md-3 col-sm-2 q-px-md tab-font ellipsis"
            style="max-width: 20%"
          >
            {{ userName }}
          </span>
          <q-btn flat color="dodgerBlue" icon="expand_more">
            <q-menu :offset="[5, 12]">
              <q-list style="min-width: 200px">
                <q-item clickable v-close-popup :to="{ name: 'my profile' }">
                  <q-item-section>My Profile</q-item-section>
                </q-item>
                <q-item
                  v-for="menu in menuItemList"
                  :key="menu.name"
                  :to="menu.routeTo"
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    {{ menu.label }}
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="onSignoutClick">
                  <q-item-section>Signout </q-item-section>
                  <q-item-section avatar>
                    <q-icon color="primary" name="logout" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <!-- ***************** Drawer Menu for Mobile Responsive *************************** -->
    <HeaderDrawer
      v-if="displayDrawerMenu"
      :userName="userName"
      :isLogin="isLogin"
      :tabsList="tabsList"
      :menuItemList="menuItemList"
      :loggedInUserDetails="loggedInUserDetails"
      @on-drawer-close="displayDrawerMenu = false"
      @signout="onSignoutClick"
    />
    <!-- ***************** Logout Popup *************************** -->
    <ConfirmationPopup
      v-if="confirmationPopup"
      :popupMsg="confirmPopupMsg"
      @on-confirm-popup-close="onConfirmationPopupClose"
    />
  </div>
</template>
<script>
import { isLogin } from '../utils/common'
import { mapActions, mapGetters } from 'vuex'
import HeaderDrawer from './HeaderDrawer.vue'
import ConfirmationPopup from './ConfirmationPopup.vue'

export default {
  props: ['isLogin'],
  components: {
    HeaderDrawer,
    ConfirmationPopup
  },
  data() {
    return {
      loggedInUserDetails: {},
      userName: '',
      tabSelected: 'dashboard',
      displayDrawerMenu: false,
      confirmationPopup: false,
      confirmPopupMsg: 'Are you sure you want to logout?',
      menuItemList: [
        { label: 'My Plan', name: 'my plan', routeTo: { name: 'my plan' } }
      ],
      tabsList: [
        {
          label: 'Dashboard',
          name: 'dashboard',
          routeTo: { name: 'dashboard' }
        }
      ]
    }
  },

  mounted() {
    if (isLogin()) {
      this.fetchProfileInfo()
    }
  },

  computed: {
    ...mapGetters(['userProfile'])
  },

  watch: {
    $route: 'getUserData',
    userProfile(data) {
      this.loggedInUserDetails = data
      this.userName = (
        data['firstName'] +
        ' ' +
        (data['lastName'] ? data['lastName'] : '')
      ).trim()
      let menuContent = [
        { label: 'My Plan', name: 'my plan', routeTo: { name: 'my plan' } },
        {
          label: 'Manage Templates',
          name: 'manage templates',
          routeTo: { name: 'manage templates' }
        },
        {
          label: 'Popular Blooprints',
          name: 'popular blooprints',
          routeTo: { name: 'popular_blooprints' }
        },
        {
          label: 'Featured Blooprints',
          name: 'featured blooprints',
          routeTo: { name: 'featured_blooprints' }
        },
        {
          label: 'Popular Creators',
          name: 'popular creators',
          routeTo: { name: 'popular_creators' }
        },
        {
          label: 'Manage Categories',
          name: 'Manage Categories',
          routeTo: { name: 'manage_categories' }
        }
      ]
      if (this.loggedInUserDetails.admin) {
        this.menuItemList = menuContent
      }
    }
  },

  methods: {
    ...mapActions(['userLogout', 'fetchProfileInfo']),
    getUserData() {
      if (isLogin()) {
        this.menuItemList = [
          { label: 'My Plan', name: 'my plan', routeTo: { name: 'my plan' } }
        ]
        this.fetchProfileInfo()
      }
    },

    // *************** Triggers when Blooprinted Logo Is Clicked ****************************
    onLogoClick() {
      this.$router.push({ name: constants.PAGE_HOME }, () => {})
    },

    // ************ Triggers when SignOut Button is Clicked ******************************
    onSignoutClick() {
      this.confirmationPopup = true
    },

    // **************** Triggers when the Confirmation Popup is closed ****************************
    onConfirmationPopupClose(event) {
      if (event['confirmStatus'] == 'yes') {
        this.userLogout({ requestFrom: 'desktop' }).then(() => {
          this.mac.logout({
            email: this.userProfile.email,
            username:
              this.userProfile.firstName +
              (this.userProfile.lastName === undefined
                ? ''
                : ' ' + this.userProfile.lastName)
          })
        })
      }
      this.confirmationPopup = false
    },

    // ************ Method to check the user has Profile picture or not *********************
    hasProfilePicture(userData) {
      if (userData['picture']) {
        return userData['picture'] != '' && userData['picture'] != null
      } else {
        return false
      }
    },

    logoutUser() {
      this.userLogout()
    }
  }
}
</script>
