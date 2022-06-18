import {
  isLogin,
  categoryRouteNavigation,
  checkNumberOfBlooprints,
  checkPlanExistsOrNot,
  routeRedirection,
  adminRouteRedirection
} from '../utils/common'
const routes = [
  {
    path: '/',
    component: () => import('layouts/FullFooterDisplayLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Home.vue'),
        meta: { title: 'Studio - blooprinted' }
      },
      {
        path: 'home',
        name: 'homePage',
        component: () => import('pages/Home.vue'),
        meta: { title: 'Studio - blooprinted' },
        beforeEnter: (to, from, next) => {
          next('/')
        }
      },
      {
        path: 'faqs',
        name: 'faqs',
        component: () => import('pages/creator/FAQDisplayScreen.vue'),
        meta: { title: 'FAQs - blooprinted' }
      },
      {
        path: '/terms',
        name: 'terms-and-conditions',
        component: () => import('pages/creator/Terms.vue'),
        meta: { title: 'Terms and conditions - blooprinted' }
      },
      {
        path: '/privacy',
        name: 'privacy-policy',
        component: () => import('pages/creator/PrivacyPolicy.vue'),
        meta: { title: 'Privacy policy - blooprinted' }
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('src/pages/creator/Message.vue'),
        meta: { title: 'Message - blooprinted' },
        beforeEnter: (to, from, next) => {
          if (isLogin()) {
            next()
          } else {
            next('/')
          }
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MediumFooterDisplayLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (isLogin()) {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'checkout/:planName',
        name: 'plan-checkout',
        component: () => import('pages/creator/BlooprintSignupScreen.vue'),
        meta: { title: 'Checkout - blooprinted' }
      },
      {
        path: 'plan-update/:planName',
        name: 'plan-update',
        component: () => import('pages/creator/BlooprintSignupScreen.vue'),
        meta: { title: 'Checkout - blooprinted' }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/creator/Settings.vue'),
        meta: { title: 'Settings - blooprinted' }
      },
      // {
      //   path: 'dashboard',
      //   name: 'dashboard',
      //   component: () => import('pages/Dashboard.vue'),
      //   meta: { title: 'Dashboard - blooprinted' }
      // },
      {
        path: 'blooprint/create/first',
        name: 'firstBlooprintCreation',
        component: () => import('src/pages/creator/CreateFirstBlooprint.vue'),
        meta: { title: 'Create blooprint - blooprinted' },
        async beforeEnter(to, from, next) {
          if (!isLogin()) {
            next('/')
          } else {
            let result = await checkNumberOfBlooprints()
            if (!result || from.name === 'firstBlooprintCreationName') {
              next()
            } else {
              next({ name: 'my-blooprints' })
            }
          }
        }
      },
      {
        path: 'blooprint/create/first/blooprintName',
        name: 'firstBlooprintCreationName',
        component: () => import('src/pages/creator/CreateBlooprintName.vue'),
        meta: { title: 'Create blooprint - blooprinted' },
        async beforeEnter(to, from, next) {
          if (!isLogin()) {
            next('/')
          } else {
            let result = await checkNumberOfBlooprints()
            if (
              !result ||
              from.name === 'firstBlooprintCreationCategory' ||
              from.name === 'firstBlooprintCreation'
            ) {
              next()
            } else {
              next({ name: 'my-blooprints' })
            }
          }
        }
      },
      {
        path: 'blooprint/create/first/:blooprintId',
        name: 'firstBlooprintCreationCategory',
        component: () =>
          import('src/pages/creator/CreateBlooprintCategory.vue'),
        meta: { title: 'Create blooprint - blooprinted' },
        beforeEnter(to, from, next) {
          if (!isLogin()) {
            next('/')
          } else {
            if (
              from.name === 'firstBlooprintCreationName' ||
              from.name === 'getstarted' ||
              from.name === 'firstBlooprintCreationCategory' ||
              from.name === null
            )
              next()
            // if (
            //   categoryRouteNavigation() ||
            //   from.name === 'firstBlooprintCreationName'
            // ) {
            //   next()
            // } else {
            //   next({ name: 'firstBlooprintCreationName' })
            // }
            else {
              next('/')
            }
          }
        }
      },
      {
        path: 'blooprint/create/first/getstarted/:blooprintId',
        name: 'getstarted',
        component: () => import('src/pages/creator/GetStarted.vue'),
        meta: { title: 'Create blooprint - blooprinted' }
      },
      {
        path: 'blooprint/create/:blooprintId',
        name: 'blooprintCreation',
        component: () =>
          import('pages/creator/BlooprintCreationLandingPage.vue')
      },
      {
        path: 'my-blooprints',
        name: 'my-blooprints',
        component: () => import('pages/creator/MyBlooprints.vue'),
        meta: { title: 'Creator studio - blooprinted' },
        beforeEnter(to, from, next) {
          if (!isLogin()) {
            next('/')
          } else {
            next()
          }
        }
      },
      {
        path: 'blooprint/pre-purchase/:blooprintId',
        name: 'prePurchaseBlooprint',
        component: () => import('pages/creator/PrePurchaseBlooprint.vue'),
        meta: { title: 'Pre Purchase Blooprint' }
      },
      {
        path: 'blooprint/post-purchase/:blooprintId',
        name: 'postPurchaseBlooprint',
        component: () => import('pages/creator/PostPurchaseBlooprint.vue'),
        meta: { title: 'Post Purchase Blooprint' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/SingleFooterDisplayLayout.vue'),
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('pages/Index.vue'),
        beforeEnter: (to, from, next) => {
          routeRedirection(next)
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login.vue'),
        meta: { title: 'Login - blooprinted' },
        beforeEnter(to, from, next) {
          if (!isLogin()) {
            next()
          } else {
            next('/')
          }
        }
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('pages/creator/BlooprintSignupScreen.vue'),
        meta: { title: 'Signup - blooprinted' },
        beforeEnter(to, from, next) {
          if (!isLogin()) {
            next({ name: 'signup-plan', params: { planName: 'self' } })
          } else {
            next('/')
          }
        }
      },
      {
        path: 'signup/:planName',
        name: 'signup-plan',
        component: () => import('pages/creator/BlooprintSignupScreen.vue'),
        meta: { title: 'Signup - blooprinted' },
        beforeEnter(to, from, next) {
          !isLogin() ? next() : next('/')
        }
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('src/pages/creator/ForgotPassword.vue'),
        beforeEnter: (to, from, next) => {
          !isLogin() ? next() : next('/')
        },
        meta: { title: 'Forgot password - blooprinted' }
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/creator/ResetPassword.vue'),
        meta: { title: 'Reset password - blooprinted' },
        beforeEnter: (to, from, next) => {
          if (!isLogin()) {
            if (to.query.secure) {
              if (from.name === 'login') {
                next({ name: 'login' })
              } else {
                next()
              }
            } else {
              next('/')
            }
          } else {
            next('/')
          }
        }
      },
      {
        path: 'account-activation',
        name: 'account-activation',
        component: () => import('pages/UserAccountActivation.vue'),
        meta: { title: 'Account activation - blooprinted' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // {
      //   path: 'blooprint/:blooprintId/edit',
      //   name: 'editblooprint',
      //   component: () => import('pages/CreateBlooprint.vue'),
      //   meta: { title: 'Edit Blooprint - blooprinted' },
      //   beforeEnter(to, from, next) {
      //     if (!isLogin()) {
      //       next('/')
      //     } else {
      //       next()
      //     }
      //   }
      // },
      // {
      //   path: ':blooprintId/milestone',
      //   name: 'blooprints-milestone',
      //   component: () => import('pages/Milestone.vue'),
      //   meta: { title: 'Milestone - blooprinted' },
      //   beforeEnter(to, from, next) {
      //     if (!isLogin()) {
      //       next('/')
      //     } else {
      //       next()
      //     }
      //   }
      // },
      // {
      //   path: 'blooprint/list',
      //   name: 'blooprints-list',
      //   component: () => import('pages/UserBlooprintList.vue'),
      //   meta: { title: 'Blooprints List - blooprinted' },
      //   beforeEnter(to, from, next) {
      //     if (!isLogin()) {
      //       next('/')
      //     } else {
      //       next()
      //     }
      //   }
      // },
      // {
      //   path: 'my-plan',
      //   component: () => import('pages/MyPlan.vue'),
      //   name: 'my plan',
      //   meta: { title: 'My Plan - blooprinted' },
      //   beforeEnter(to, from, next) {
      //     if (!isLogin()) {
      //       next('/')
      //     } else {
      //       next()
      //     }
      //   }
      // },
      // {
      //   path: 'my-profile',
      //   component: () => import('pages/MyProfile.vue'),
      //   name: 'my profile',
      //   meta: { title: 'My Profile - blooprinted' },
      //   beforeEnter(to, from, next) {
      //     if (!isLogin()) {
      //       next('/')
      //     } else {
      //       next()
      //     }
      //   }
      // },
      // {
      //   path: '/payment-success',
      //   name: 'Payment Success',
      //   component: () => import('src/pages/PaymentSuccess.vue'),
      //   meta: { title: 'Payment Success - blooprinted' },
      //   beforeEnter(to, from, next) {
      //     if (!isLogin()) {
      //       next('/')
      //     } else {
      //       next()
      //     }
      //   }
      // },
      // {
      //   path: '/payment-decline',
      //   name: 'Payment Decline',
      //   component: () => import('pages/PaymentDecline.vue'),
      //   meta: { title: 'Payment Decline - blooprinted' },
      //   beforeEnter(to, from, next) {
      //     if (!isLogin()) {
      //       next('/')
      //     } else {
      //       next()
      //     }
      //   }
      // },
      // {
      //   path: 'delete-account',
      //   component: () => import('pages/DeleteAccountConfirmation.vue'),
      //   name: 'delete account',
      //   meta: { title: 'Delete Account - blooprinted' },
      //   beforeEnter(to, from, next) {
      //     if (!isLogin()) {
      //       next('/')
      //     } else {
      //       next()
      //     }
      //   }
      // },
      {
        path: 'manage-templates',
        name: 'manage templates',
        meta: { title: 'Manage templates - blooprinted' },
        component: () => import('pages/ManageTemplates.vue'),
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'popular-blooprints',
        name: 'popular_blooprints',
        component: () => import('pages/BlooprintLibrary.vue'),
        meta: { title: 'Popular blooprints - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'featured-blooprints',
        name: 'featured_blooprints',
        component: () => import('pages/FeaturedBlooprints.vue'),
        meta: { title: 'Featured blooprints - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'popular-creators',
        name: 'popular_creators',
        component: () => import('pages/BlooprintedCreators.vue'),
        meta: { title: 'Popular creators - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'manage-categories',
        name: 'manage_categories',
        component: () => import('src/pages/admin/ManageCategories.vue'),
        meta: { title: 'Manage categories - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'manage-categories/add',
        name: 'add_category',
        component: () => import('src/pages/admin/AddCategories.vue'),
        meta: { title: 'Add categories - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'manage-categories/:categoryID/edit',
        name: 'edit_category',
        component: () => import('src/pages/admin/EditCategories.vue'),
        meta: { title: 'Edit categories - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'manage-categories/:categoryID/delete',
        name: 'delete_category',
        component: () => import('src/pages/admin/DeleteCategories.vue'),
        meta: { title: 'Delete categories - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'create-template',
        name: 'create template',
        component: () => import('pages/CreateTemplate.vue'),
        props: true,
        meta: { title: 'Create template - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      },
      {
        path: 'edit-template',
        name: 'edit template',
        component: () => import('pages/EditTemplate.vue'),
        props: true,
        meta: { title: 'Edit template - blooprinted' },
        beforeEnter(to, from, next) {
          adminRouteRedirection(next)
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    name: 'error-screen',
    meta: { title: 'Page not found - blooprinted' }
  }
]

export default routes
