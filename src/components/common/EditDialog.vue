<template>
    <v-dialog v-model="show" max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn round color="primary lighten-1" dark v-on="on">{{botton[changeBotton]}}</v-btn>
      </template>
      <v-card>
        <v-card-title v-if="!isEditable" style="font-size:1.8rem;">{{title[4]}}</v-card-title>
        <v-card-text  v-if="!isEditable" >{{content[4]}}</v-card-text>
        <v-card-title v-if="isEditable" style="font-size:1.8rem;">{{title[5]}}</v-card-title>
        <v-card-text  v-if="isEditable" >{{content[5]}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!isEditable" color="primary darken-1" flat @click="show = false;isEditable = false">取消</v-btn>
          <v-btn v-if="!isEditable" color="primary darken-1" flat @click="show = false;isEditable = true">確定</v-btn>
          <v-btn v-if="isEditable" color="primary darken-1" flat @click="show = false;isEditable = false">取消</v-btn>
          <!-- 確定更新 -->
          <v-btn v-if="isEditable" color="primary darken-1" flat @click="show = false;submit = true;updateSubmit()">更新</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { apiUpdateGroup } from "../../utils/api.js";
  export default {
    props:{
      type : Number,
      editDialog: { type : Boolean, default : false},
    },
    data () {
      return {
        show: false,
        isEditable: false,
        submit:false,
        update:0,
        botton:['編輯揪團','儲存編輯'],
        title:['確定結束揪團?😮','確定取消等待?😥','確定離開此團?😭','是否加入此團?😍','是否編輯揪團資訊?🤔','是否更新揪團資訊?😉'],
        content:[
          '確定後此揪團將會解散，您可以隨時再建立新的揪團，謝謝您的使用。😁👌',
          '確定後將會退出等待佇列，退出後您可以再重新申請，謝謝您的使用。😁👌',
          '確定後將會退出此揪團，退出後您可以再重新加入，謝謝您的使用。😁👌',
          '確定後將會加入揪團，利用聊天室跟大家聊聊吧，請務必遵守揪團規範。🎉🙌',
          '確定後將會開啟編輯模式，請填妥表格，並按下表單底下送出鍵送出。😁👌',
          '更新後將會關閉編輯模式，如果未正確填寫表單，揪團內容不會改動。😁👌']
      }
    },
    computed: {
      changeBotton() {
        if(this.isEditable){
          return 1;
        }
        return 0;
      }
    },
    watch: {
      editDialog(val) {
        this.show = val;
      },
      show(val) {
        this.$emit('updateEditDialog',this.show)
        this.$emit('updateIsEditable',this.isEditable)
      },
      
    },
    methods: {
      updateSubmit() {
        this.$emit('updateSubmit',true)
      },
    },
  
  }
</script>