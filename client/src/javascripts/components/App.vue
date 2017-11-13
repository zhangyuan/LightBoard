<template>
    <div class="main">
        <medium-editor :text='text' :options='options' v-on:edit='processEditOperation' custom-tag='div'>
        </medium-editor>

    </div>
</template>
<script>
  const vueMediumEditor = require('vue2-medium-editor');
  import board from '../board';
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
      processEditOperation: function (operation) {
        this.text = operation.api.origElements.innerHTML;
        let payload = {
          id: board.id,
          text: this.text
        };
        board.socket.emit('update', payload)
      }
    },
    created () {
      board.socket.emit('hi');
      const self = this;
      board.socket.on('subscribed', function(data){
        self.$router.push(`/b/${data.id}`);
      });
    }
  }
</script>

<style scoped>
    .main {
        margin: 10px;
    }
</style>