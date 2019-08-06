<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar flat color="brown lighten-1" dark>
          <v-toolbar-title>聊天室</v-toolbar-title>
        </v-toolbar>
        <v-flex
          style="max-height:466px; height:466px"
          id="scroll-target"
          class="scroll-y goToBottom"
        >
          <v-container grid-list-xs>
            <v-layout column wrap>
              <!-- 沒有訊息 -->
              <v-flex v-if="!chatLog.length">
                <v-card style="text-align:center;border-radius:15px;" color="grey lighten-3">
                  <v-card-title>
                    <h2>沒有任何聊天訊息嗎?🤷‍♂️</h2>
                  </v-card-title>
                  <v-card-text>
                    <h5>快點發送你們的第一句話吧!🤟</h5>
                  </v-card-text>
                </v-card>
              </v-flex>
              <!-- 沒有訊息結束 -->
              <!-- 訊息開始 -->
              <v-flex my-2 v-else v-for="(message,index) in chatLog" :key="index">
                <!-- 對方訊息 -->
                <v-layout v-if="message.memberId != memberId">
                  <!-- //大頭貼 -->
                  <v-avatar style>
                    <img :src="message.avatarPath" />
                  </v-avatar>
                  <!-- //名字 -->
                  <div>
                    <span>{{ message.name }}</span>
                    <!-- //對話卡片 -->
                    <v-flex>
                      <v-card
                        class="speech-bubble elevation-8"
                        color="grey lighten-3"
                        style="border-radius:15px;"
                      >{{ message.msg }}</v-card>
                    </v-flex>
                  </div>
                </v-layout>
                <!-- 對方訊息結束 -->
                <!-- 我方訊息 -->
                <!-- 下面這行要加v-else -->
                <v-layout v-else style="float:right" align-end mt-4 mb-3>
                  <div>
                    <!-- //對話卡片 -->
                    <v-flex>
                      <v-card
                        class="speech-bubble elevation-8"
                        color="brown lighten-4"
                        style="border-radius:15px;"
                      >{{ message.msg }}</v-card>
                    </v-flex>
                  </div>
                  <!-- //大頭貼 -->
                  <v-avatar style="margin-left:5px;">
                    <img :src="message.avatarPath" />
                  </v-avatar>
                </v-layout>
                <!-- 我方結束 -->
              </v-flex>
            </v-layout>
            <v-btn color="primary" dark small absolute bottom right fab @click="toBottom()">
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
            <v-footer>
              <v-layout mt-5 row wrap>
                <v-flex class="my-2" xs12 sm8 md8 offset-md4 offset-sm4>
                  <v-text-field
                    color="brown lighten-1"
                    v-model="editText"
                    label="輸入訊息..."
                    clearable
                    clear-icon="mdi-send"
                    style
                    @click:clear="sendMessage(editText);toBottom()"
                    v-on:keyup.enter="sendMessage(editText);editText = '';toBottom()"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-footer>
          </v-container>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
@import url();
.speech-bubble {
  background: #ffffff;
  color: rgb(32, 30, 30);
  -webkit-border-radius: 4px;
  border-radius: 4px;
  font-size: 1rem;
  margin: 0 auto;
  max-width: 250px;
  padding: 15px;
  margin-left: 10px;
  word-wrap: break-word;
}

.goToBottom {
  margin: 0 auto;
}
</style>


<script>
export default {
  props: {
    groupId: String
  },
  name: "chatRoom",
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    record: function(data) {
      //取得歷史聊天紀錄
      this.chatLog = data.record;
    },
    msg: function(data) {
      //接收訊息
      let temp = [];
      temp = this.chatLog;
      temp.push(data);
      this.chatLog = temp;
      //時間轉換
      // console.log(this.timeFormat(data.createdAt))
      // this.timeFormat(timestamp)
    }
  },
  data() {
    return {
      memberId: "",
      editText: "",
      chatLog: [],
      time: ""
    };
  },
  methods: {
    sendMessage: function(data) {
      // $socket is socket.io-client instance
      this.$socket.emit("send", {
        groupId: this.groupId,
        token: this.getCookie("session"),
        msg: this.editText
      });
    },
    toBottom() {
      document
        .querySelector(".goToBottom")
        .scrollTo({ top: 999999, behavior: "auto" });
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    timeFormat(timestamp) {
      let time = new Date(timestamp);
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      return (
        y +
        "/" +
        this.add0(m) +
        "/" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s)
      );
    }
  },
  created() {
    this.memberId = this.$store.state.memberId;
    this.$socket.emit("join", { groupId: this.groupId });
  },
  mounted() {
    // console.log('old: new Date(1504509461000): ' + old)
    // console.log('Date.parse(new Date(1504509461000)): ' + Date.parse(old))
    this.toBottom();
  },
  updated() {
    // 保持滾動到底部
    document
      .querySelector(".goToBottom")
      .scrollTo({ top: 99999999, behavior: "smooth" });
  }
};

//       talk () {
//         this.socket.removeAllListeners()
//         let that = this
//         this.socket.on('joinToRoom', function (data) {
//           let chat = data
//           chat.chatTime = that.timeFormat(chat.chatTime)
//           that.chatLog.push(chat)
//         })
//         this.socket.on('leaveToRoom', function (data) {
//           let chat = data
//           chat.chatTime = that.timeFormat(chat.chatTime)
//           that.chatLog.push(chat)
//         })
//         this.socket.on('updateGroupNumber', function (data) {
//           let groupNumber = data
//           that.groupNumber = groupNumber
//         })
//         this.socket.on('userQuit', function (data) {
//           let chat = data
//           chat.chatTime = that.timeFormat(chat.chatTime)
// //          that.chatLog.push(chat)
//         })
//         this.socket.on('broadChat', function (data) {
//           let chat = data
//           chat.chatTime = that.timeFormat(chat.chatTime)
//           that.chatLog.push(chat)
//         })
//       },
//       // 時間格式化
//
//
//     beforeDestroy () {
//       let chat = {
//         account: this.account,
//         nickName: this.nickName,
//         chatTime: Date.parse(new Date()),
//         chatMes: 'off-line',
//         chatToGroup: this.groupState.groupAccount,
//         chatType: 'tips'     // chat/tips
//       }
//       // 3.on-line在线 room发送消息
//       this.socket.removeAllListeners()
//       // 延时，解决中文乱码问题，刚connect;emit chat时候又不会乱码啊
//       let that = this
//       setTimeout(function () {
//         that.socket.emit('leaveToRoom', chat)
//       }, 200)
//     }

// };
</script>
