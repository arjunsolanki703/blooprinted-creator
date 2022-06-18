<template>
  <q-page>
    <div class="q-mx-xl q-mt-xl row justify-between">
      <div class="text-nightRider text-h5 text-weight-medium text-capitalize">
        manage categories
        <q-separator width="60%" color="primary" class="q-mt-xs" size="2px" />
      </div>
      <div class="text-nightRider text-h5 text-weight-medium text-capitalize">
        <q-btn
          :to="{ name: 'add_category' }"
          color="primary"
          icon="add"
          label="Add Category"
        />
      </div>
      <q-markup-table class="full-width q-mt-md" bordered flat separator="none">
        <thead style="background:#00308F" class="text-white">
          <tr>
            <th class="text-left">
              <div class="text-subtitle2">
                Categories Name
              </div>
            </th>
            <th class="text-left">
              <div class="text-subtitle2">
                Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white" v-if="loading">
          <tr v-for="i in 10" :key="i">
            <td class="text-left">
              <q-skeleton type="text" height="3vh" width="200px" />
            </td>
            <td class="text-left">
              <q-skeleton type="QBtn" height="3vh" width="100px" />
            </td>
          </tr>
        </tbody>
        <tbody class="bg-white" v-else>
          <div v-if="categoriesList.length <= 0" class="q-pa-lg">
            No Category has been there, Please
            <router-link :to="{ name: 'add_category' }">
              click here
            </router-link>
            to create first Category
          </div>
          <tr v-for="category in categoriesList" :key="category.id">
            <td class="text-left">
              <div
                class="text-grey-7 text-weight-medium text-body2 text-capitalize"
              >
                {{ category.attributes.name.replace(/-/g, ' ') }}
              </div>
            </td>
            <td class="text-left">
              <q-btn-dropdown
                no-caps
                outline
                label="Action"
                color="#D8D8D8"
                text-color="grey-7"
                style="border:#D8D8D8"
                dropdown-icon="keyboard_arrow_down"
                class="text-caption text-weight-medium"
                content-class="text-grey-7 text-caption text-weight-medium"
              >
                <q-list>
                  <q-item
                    clickable
                    v-close-popup
                    :to="{
                      name: 'edit_category',
                      params: {
                        categoryID: category.id
                      }
                    }"
                  >
                    <q-item-section>
                      <q-item-label>Edit</q-item-label></q-item-section
                    >
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    :to="{
                      name: 'delete_category',
                      params: {
                        categoryID: category.id
                      }
                    }"
                  >
                    <q-item-section>
                      <q-item-label>Delete</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'ManageCategories',

  data() {
    return {
      loading: false
    }
  },

  methods: {
    ...mapActions(['getCategoriesList'])
  },

  computed: {
    ...mapGetters(['categoriesList'])
  },

  async mounted() {
    this.loading = true
    await this.getCategoriesList()
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
td,
th {
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
