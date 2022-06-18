<template>
  <div class="blooprint-data-card bg-white" style="margin-top:24px;">
    <q-img v-if="!image" src="~assets/NoImage.png" class="cursor-pointer" height="150px" @click="$router.push(`/blooprint/create/${id}`)">
      <div
        v-if="status === 'progress' || status === 'unpublish'"
        class="text-regalBlue f-w-400 text-fs-12 text-lh-18 draft-label relative-position"
      >
        Draft
      </div>
      <div
        v-if="status === 'active'"
        class="text-regalBlue f-w-400 text-fs-12 text-lh-18 published-label relative-position"
      >
        Published
      </div>
    </q-img>
    <q-img v-if="image" :src="image" class="cursor-pointer" height="150px" @click="$router.push(`/blooprint/create/${id}`)">
      <div
        v-if="status === 'progress' || status === 'unpublish'"
        class="text-regalBlue f-w-400 text-fs-12 text-lh-18 draft-label relative-position"
      >
        Draft
      </div>
      <div
        v-if="status === 'active'"
        class="text-regalBlue f-w-400 text-fs-12 text-lh-18 published-label relative-position"
      >
        Published
      </div>
    </q-img>
    <div class="blooprint-content">
      <div @click="$router.push(`/blooprint/create/${id}`)" class="cursor-pointer">
        <q-badge class="category-tag text-regalBlue" v-if="category[0]">
          <span>
            {{ category[0] }}
          </span>
        </q-badge>
        <div
          class="f-w-600 text-lh-24 f-s-20 text-regalBlue  ellipsis-3-lines"
          style="margin-top:10px; word-break:break-word; height:72px;"
        >
          {{ name }}
        </div>
        <div class="f-w-400 text-regalBlue timestamp" style="margin-top:5px">
          Created: {{ createdDate }}
        </div>
      </div>
      <div
        class="row align-center justify-center self-center"
        style="margin-top:10px;"
      >
        <div class="row justify-between full-width">
          <q-btn
            label="Continue Creating"
            no-caps
            class="bg-primary text-white f-w-600 text-fs-16 text-lh-24 continue-button col-auto"
            @click="goToCreate"
          />
          <q-btn-dropdown
          dropdown-icon="img:more-vertical.svg"
          content-class="user-dropdown-content menu-box-shadow border-radius-lg"
          size="14px"
          flat
          no-icon-animation
          :menu-offset="$q.screen.gt.xs  ? [150, 90] : [-5, 90]"
          :menu-anchor="$q.screen.gt.xs  ? 'bottom right' : 'bottom left'"
          :menu-self="$q.screen.gt.xs  ? 'bottom right' : 'bottom left'"
          auto-close
          unelevated
          :ripple="false"
          class="cursor-pointer col-auto dropdown-button"
        > 
          <q-card style="overflow-x: hidden !important">
            <q-card-section
              class="card-section text-regalBlue f-w-600"
              style="
               max-height: 140px; padding: 22px; min-width: max-content !important; overflow-x: hidden !important"
            >
              <div v-if="status === 'progress' || status === 'unpublish'" class="q-mb-md cursor-pointer hover-effect" @click="publishBlooprint">Publish blooprint</div>
              <div v-if="status === 'active'" class="q-mb-md cursor-pointer hover-effect" @click="unpublishBlooprint">Unpublish blooprint</div>
              <div class="cursor-pointer hover-effect" @click="deleteBlooprint">Delete blooprint</div>
            </q-card-section>
          </q-card>
          </q-btn-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'category', 'createdDate', 'status', 'image', 'id'],
  methods: {
    goToCreate() {
      this.$router.push({
        name: 'blooprintCreation',
        params: {
          blooprintId: this.id
        }
      })
    },
    deleteBlooprint() {
      this.$emit('delete-blooprint', this.id)
    },
    publishBlooprint() {
      this.$emit('publish-blooprint', this.id)
    },
    unpublishBlooprint() {
      this.$emit('unpublish-blooprint', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.blooprint-data-card {
  height: 373px;
  width: 319px;
  border-radius: 20px;
  margin-right: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 92vw;
    //width: 100%;
    height: 373px;
    margin-right: 0px;
  }
}

.q-img {
  object-fit: contain;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.blooprint-content {
  padding: 20px;
}

.category-tag {
  width: max-content;
  max-width: 92%;
  display: flex;
  align-items: left;
  justify-content: left;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 8px;
  background: linear-gradient(
      0deg,
      rgba(0, 163, 255, 0.2),
      rgba(0, 163, 255, 0.2)
    ),
    #ffffff;
  border-radius: 5px;
  overflow: hidden;
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 100%;
  }
  span{
    width: min-content;
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
    max-width: 100%;
  }
}

.timestamp {
  font-size: 12px;
  line-height: 18px;
}

.continue-button {
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 223px !important;
  height: 44px;
  @media only screen and (max-width: 599px) and (min-width: 345px) {
    width: 249px !important;
  }
  @media only screen and (max-width: 344px) {
    width: 225px !important;
  }
  @media only screen and (max-width: 330px) {
    margin-right: 3px;
  }
}

.draft-label {
  width: max-content;
  height: 24px;
  padding: 3px 8px;
  border: 1px solid #b9bcc6;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 20px;
  color: $regalBlue;
  background: #e8e9ec;
  display: flex;
  align-items: center;
  justify-content: center;
}

.published-label {
  background: #039855;
  border: 1px solid #d1fadf;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 20px;
  width: max-content;
  height: 24px;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

::v-deep {
  .q-btn--actionable {
    .q-focus-helper {
      visibility: hidden;
    }
  }
  .q-btn__wrapper {
    padding: 0px !important;
  }
}

.card-section .hover-effect {
  transition: color 0.3s;
  &:hover {
    color: $primary;
  }
}
</style>
