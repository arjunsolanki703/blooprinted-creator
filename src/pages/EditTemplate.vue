<template>
  <q-page>
    <div class="q-mx-xl q-mt-xl row justify-between">
      <div class="text-nightRider text-h5 text-weight-medium text-capitalize">
        edit template
        <q-separator width="60%" color="primary" class="q-mt-sm" size="2px" />
      </div>
      <div class="row justify-end">
        <q-btn
          color="white"
          class="text-grey-7"
          outline
          no-caps
          @click="$router.push({ name: 'manage templates' })"
        >
          <div class="back-icon"></div>
          Back
        </q-btn>
      </div>
    </div>
    <div class="q-mx-xl q-mt-md row justify-center bg-white form">
      <div class="col-8" v-if="!showEditor">
        <div
          class="flex flex-center q-pt-md-lg q-pb-md-xs q-pa-sm-md q-pa-xs-sm"
        >
          <q-skeleton type="text" width="200px" />
        </div>
        <div class="flex flex-center">
          <q-skeleton type="text" width="300px" />
        </div>
        <div class="q-py-xs text-grey-8 text-weight-regular">
          <div class="q-py-sm text-capitalize">subject</div>
          <q-skeleton type="QInput" height="4vh" />
        </div>
        <div class="q-py-xs text-capitalize text-grey-8 text-weight-regular">
          <div class="q-py-sm">template body</div>
          <q-skeleton height="25vh" />
        </div>
        <div class="q-pa-lg row justify-center">
          <div class="q-ma-sm">
            <q-skeleton type="QBtn" height="5vh" width="10vw" />
          </div>
          <div class="q-ma-sm">
            <q-skeleton type="QBtn" height="5vh" width="10vw" />
          </div>
        </div>
      </div>
      <div class="col-8" v-if="showEditor">
        <div
          class="text-h6 text-grey-8 text-capitalize text-center q-pt-md-lg q-pb-md-xs q-pa-sm-md q-pa-xs-sm"
        >
          {{ name !== undefined ? name.replaceAll('-', ' ') : '' }}
        </div>
        <div class="text center text-body2 q-mb-lg text-center text-grey-8">
          {{ title !== undefined ? title : '' }}
        </div>
        <div class="q-py-xs text-grey-8 text-weight-regular">
          <div class="q-py-sm text-capitalize">subject</div>
          <q-input
            outlined
            v-model.trim="subject"
            lazy-rules
            ref="subject"
            :rules="[val => (val && val.length > 0) || 'Subject is mandatory']"
            dense
          />
        </div>
        <div class="q-py-xs text-capitalize text-grey-8 text-weight-regular">
          <div class="q-py-sm">template body</div>
          <Ckeditor
            :markup="body"
            :templateTokens="tokens"
            @updateMarkup="updateMarkup"
          ></Ckeditor>
        </div>
        <div class="q-pa-lg row justify-center">
          <q-btn
            outline
            style="color: white"
            color="primary"
            label="Cancel"
            no-caps
            class="col-md-2 q-ma-sm text-h6"
            to="manage-templates"
          />
          <q-btn
            color="primary"
            class="text-white col-md-2 q-ma-sm text-h6"
            label="Update"
            no-caps
            @click="updateTemplate"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Ckeditor from 'src/components/Ckeditor'
import { mapActions, mapGetters } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  name: 'EditTemplate',
  props: ['title'],
  components: { Ckeditor },

  data() {
    return {
      name: '',
      body: '',
      subject: '',
      tokens: [],
      showEditor: false
    }
  },

  async created() {
    await this.getEmailTemplateById(this.$route.query.id)
    this.setFields()
  },

  async mounted() {
    await this.getTemplateTokens()
    this.setTokens()
  },

  methods: {
    ...mapActions([
      'getEmailTemplateById',
      'getTemplateTokens',
      'updateEmailTemplate',
      'setToastMessage'
    ]),

    updateTemplate() {
      let validSubject = this.$refs.subject.validate()
      let validBody = !!this.body.length
      if (!validBody) {
        this.setToastMessage({
          type: 'negative',
          message: 'Template body is mandatory!'
        })
        return
      }
      if (validBody && validSubject) {
        let templateData = {
          id: this.$route.query.id,
          attributes: {
            name: this.name,
            subject: this.subject,
            body: this.body
          }
        }
        this.updateEmailTemplate(templateData)
      }
    },

    updateMarkup(val) {
      this.body = val
    },

    setTokens() {
      this.templateTokens.forEach(token => {
        var tokenName = token.name
        tokenName = tokenName.replaceAll('[', '')
        tokenName = tokenName.replaceAll(']', '')
        this.tokens.push([token.description, tokenName])
      })
      this.showEditor = true
    },

    setFields() {
      this.name = this.emailTemplate.name
      this.subject = this.emailTemplate.subject
      this.body = this.emailTemplate.body
    }
  },
  computed: {
    ...mapGetters(['templateTokens', 'emailTemplate'])
  }
}
</script>

<style lang="scss" scoped>
.form {
  border: 1px solid #d8d8d8;
  min-height: 60vh;
}
</style>
