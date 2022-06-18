<template>
  <ckeditor
    v-if="showEditor"
    v-model="editorData"
    :config="config"
    @ready="prefill()"
    editorUrl="/ckeditor/ckeditor.js"
    @change="$emit('updateMarkup', val)"
  />
</template>

<script>
import CKEditor from 'ckeditor4-vue'
export default {
  name: 'Ckeditor',
  components: {
    ckeditor: CKEditor.component
  },

  props: ['markup', 'templateTokens'],

  data: () => ({
    editorData: '',
    showEditor: false,
    config: {
      height: 150,
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        {
          name: 'editing',
          groups: ['find', 'selection', 'spellchecker', 'editing']
        },
        {
          name: 'paragraph',
          groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
        },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      extraPlugins: 'token',
      tokenStart: '[',
      tokenEnd: ']',
      clipboard_defaultContentType: 'text',
      availableTokens: [],
      tabSpaces: 4,
      image_previewText: ' ',
      removeButtons:
        'Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Source,CreateDiv,Blockquote,About,Maximize,ShowBlocks,Flash,Smiley,SpecialChar,Iframe,PageBreak,Anchor,BidiLtr,BidiRtl,Language',
      pasteFromWordRemoveFontStyles: false
    }
  }),

  watch: {
    markup(val) {
      this.editorData = val
    },

    editorData(val) {
      this.$emit('setIndex', val)
      this.$emit('updateMarkup', val)
    }
  },

  mounted() {
    this.config.availableTokens = this.templateTokens
    this.showEditor = true
  },

  methods: {
    prefill() {
      this.editorData = this.markup
    }
  }
}
</script>
