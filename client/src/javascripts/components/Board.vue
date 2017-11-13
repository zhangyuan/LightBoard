<template>
    <div class="main">
        <medium-editor ref="editor" :text='text' :options='options' v-on:edit='onEdit' custom-tag='div'>
        </medium-editor>
    </div>
</template>
<script>
  const vueMediumEditor = require('vue2-medium-editor');
  import board from '../board';

  function hideMediumEditorPlaceHolder(editor) {
    let el = editor.$el;
    el.classList.remove('medium-editor-placeholder');
    el.classList.remove('medium-editor-placeholder-relative');
  }

  export default {
    data() {
      return {
        text: '',
        options: {},
      }
    },
    components: {
      'medium-editor': vueMediumEditor.default
    },
    methods: {
      onEdit: function (operation) {
        this.text = operation.api.origElements.innerHTML;
        let payload = {
          id: board.id,
          text: this.text
        };
        board.socket.emit('update', payload)
      }
    },
    created() {
      let id = this.$route.params.id;
      const self = this;

      board.socket.emit('subscribe', {id: id});
      board.socket.on('updated', (data) => {
        hideMediumEditorPlaceHolder(self.$refs.editor);
        self.text = data.text;
      })
    }
  }
</script>

<style scoped>
    .main {
        margin: 10px;
    }
</style>