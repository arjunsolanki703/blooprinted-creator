<template>
  <q-page>
    <div class="q-mx-xl q-mt-xl row justify-between">
      <div class="text-nightRider text-h5 text-weight-medium text-capitalize">
        create template
        <q-separator width="60%" color="primary" class="q-mt-sm" size="2px" />
      </div>
      <div class="row justify-end">
        <q-btn
          color="white"
          class="text-grey-7"
          outline
          no-caps
          to="manage-templates"
        >
          <div class="back-icon"></div>
          Back
        </q-btn>
      </div>
    </div>
    <div class="q-mx-xl q-mt-md row justify-center bg-white form">
      <div class="col-8">
        <div
          class="text-h6 text-grey-8 text-capitalize text-center q-pt-md-lg q-pb-md-xs q-pa-sm-md q-pa-xs-sm"
        >
          {{
            name !== undefined
              ? name.replaceAll('-', ' ')
              : $route.query.name.replaceAll('-', ' ')
          }}
        </div>
        <div class="text center text-body2 q-mb-lg text-center text-grey-8">
          {{ title !== undefined ? title : '' }}
        </div>
        <div class="q-py-xs text-grey-8 text-weight-regular">
          <div class="q-py-sm text-capitalize">subject</div>
          <q-input
            outlined
            v-model.trim="subject"
            dense
            lazy-rules
            ref="subject"
            :rules="[val => (val && val.length > 0) || 'Subject is mandatory']"
          />
        </div>
        <div
          v-if="loadEditor"
          class="q-py-xs text-capitalize text-grey-8 text-weight-regular"
        >
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
            label="Save"
            no-caps
            @click="createTemplate"
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
  name: 'CreateTemplate',
  props: ['name', 'title'],
  components: { Ckeditor },

  data() {
    return {
      body: '',
      subject: '',
      tokens: [],
      loadEditor: false
    }
  },
  async mounted() {
    await this.getTemplateTokens()
    this.setTokens()
  },
  methods: {
    ...mapActions([
      'createEmailTemplate',
      'getTemplateTokens',
      'setToastMessage'
    ]),

    createTemplate() {
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
        let name = this.name
        name = this.$route.query.name
        let templateData = {
          name: name,
          subject: this.subject,
          body: this.body
        }
        this.createEmailTemplate(templateData)
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
      this.loadEditor = true
    }
  },
  computed: {
    ...mapGetters(['templateTokens'])
  }
}
</script>

<style lang="scss" scoped>
.form {
  border: 1px solid #d8d8d8;
  min-height: 60vh;
}
</style>
