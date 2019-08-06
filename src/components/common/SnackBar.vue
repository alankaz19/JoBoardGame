<template>
  <div>
     <v-snackbar
      v-model="snackbar"
      :multi-line="true"
      :timeout="timeout"
      :top="true"
      :right="true"
      :color="color"
    >
      {{ message }}
      <v-btn
        color="white"
        flat
        @click="snackbar = false"
      >
        關閉
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        color: null,
        snackbar: false,
        y: null,
        x: null,
        mode: '',
        timeout: 4000,
        message: 'Hello, I\'m a snackbar,Hello, I\'m a snackbar'
      }
    },
    methods: {
      updateMessage(message,status,show){
        this.$data.message = message;
        this.$data.color = status;
        this.$data.snackbar = show;
      }
    },
    created() {
      const vm = this;
      vm.$bus.$on('message:push', (message, status = 'primary') =>{
      vm.updateMessage(message, status, true);
      })
    },
  }
</script>