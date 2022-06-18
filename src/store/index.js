import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import payment from './payment'
import user from './user'
import template from './template'
import review_rating from './review_rating'
import blooprint from './blooprint'
import categories from './categories'
import billing from './billing'
import notifications from './notifications'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const Store = new Vuex.Store({
  modules: {
    user,
    common,
    payment,
    template,
    review_rating,
    categories,
    blooprint,
    billing,
    notifications
  }
})

export { Store }

export default function(/* { ssrContext } */) {
  // enable strict mode (adds overhead!)
  // for dev mode only
  // strict: process.env.DEV
  return Store
}
