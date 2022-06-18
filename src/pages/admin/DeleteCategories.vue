<template>
  <q-page
    class="q-ma-md-xl q-ma-sm-xl q-ma-xs-lg page-height column border-secondary bg-white flex flex-center"
  >
    <div class="img-width">
      <q-img class="q-my-md-md q-my-sm-xl q-my-xs-md" src="~assets/fail.svg" />
    </div>
    <div
      class="text-dimGrey text-h6 text-weight-medium text-center q-mx-lg q-my-md"
    >
      Are you sure?
    </div>
    <div class="text-dimGrey text-body1 text-center description">
      Do you really want to delete
      <b
        ><i>{{ name }}</i></b
      >
      category? This process cannot be undone.
    </div>
    <div class="row q-mx-md q-mt-lg q-mb-md">
      <q-btn
        no-caps
        size="16px"
        style="border: 2px solid #00308F"
        class="white text-smalt col q-mr-md-lg q-mr-sm-md q-mr-xs-sm border-smalt btn-width"
        label="Cancel"
        @click="onCancelClick"
      />
      <q-btn
        no-caps
        color="white"
        size="16px"
        flat
        class="col bg-smalt rounded-borders btn-width"
        label="Confirm"
        @click="onConfirmClick"
      />
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
  name: 'DeleteCategories',

  data() {
    return {
      name: '',
      showEditor: false
    }
  },

  async created() {
    await this.getCategory(this.$route.params.categoryID)
    this.name = this.category.attributes.name
  },

  async mounted() {
    this.setTokens()
  },

  methods: {
    ...mapActions(['getCategory', 'deleteCategory', 'setToastMessage']),

    // **************** Triggers when Cancel Button is clicked ********************
    onCancelClick() {
      this.$router.push({ name: 'manage_categories' })
    },
    // **************** Triggers when Confirm Button is clicked to Delete the User ********************
    onConfirmClick() {
      this.removeCategory()
    },

    removeCategory() {
      let categoryData = {
        id: this.$route.params.categoryID,
        name: this.name
      }
      this.deleteCategory(categoryData)
    },

    setTokens() {
      this.showEditor = true
    }
  },
  computed: {
    ...mapGetters(['category'])
  }
}
</script>

<style lang="scss" scoped>
.page-height {
  min-height: 70vh !important;
}
.btn-width {
  width: 150px;
}
.img-width {
  width: 10%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 20%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 30%;
  }
}
.description {
  width: 40%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 60%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 80%;
  }
}
</style>
