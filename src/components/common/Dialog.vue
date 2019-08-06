<template>
    <v-dialog v-model="show" persistent max-width="290">
      <v-card>
        <v-card-title style="font-size:1.8rem;">{{title[type]}}</v-card-title>
        <v-card-text>{{content[type]}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click="show = false">取消</v-btn>
          <!-- 退出揪團 -->
          <v-btn v-if="type != 3" color="primary darken-1" flat @click="show = false;quit = true;updateQuit()">確定</v-btn>
          <!-- 加入揪團 -->
          <v-btn v-if="type == 3" color="primary darken-1" flat @click="show = false;join = true;updateJoin()">確定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props:{
      type : Number,
      showDialog: Boolean,
    },
    data () {
      return {
        show: false,
        join:false,
        quit:false,
        title:['確定結束揪團?😮','確定離開此團?😭','確定取消等待?😥','是否加入此團?😍',],
        content:[
          '確定後此揪團將會解散，您可以隨時再建立新的揪團，謝謝您的使用。😁👌',
          '確定後將會退出此揪團，退出後您可以再重新加入，謝謝您的使用。😁👌',
          '確定後將會退出等待佇列，退出後您可以再重新申請，謝謝您的使用。😁👌',
          '確定後將會加入揪團，利用聊天室跟大家聊聊吧，請務必遵守揪團規範。🎉🙌',]
      }
    },
    watch: {
      showDialog(val) {
        this.show = val;
      },
      show(val) {
        this.$emit('updateDialog',this.show)
      }
    },
     methods: {
      updateJoin() {
        this.$emit('updateJoin',true)
      },
      updateQuit() {
        this.$emit('updateQuit',true)
      },
    },
  
  }
</script>