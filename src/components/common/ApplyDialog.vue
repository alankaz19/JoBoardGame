<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="dialog" scrollable max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn round color="primary lighten-1" dark v-on="on">審核名單</v-btn>
      </template>
      <v-card>
        <v-card-title style="font-size:1.5rem">🙆‍♂️選擇通過審核的成員</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <!-- 選單 -->
            <v-card class="center" v-if="waits.length == 0" flat>
              <v-card-title style="font-size:1.2rem">
                沒有成員需要審核🙂
              </v-card-title>
            </v-card>
          <v-hover v-for="(item,index) in waits" :key="index">
            <v-list-tile
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 5 : 0}`"
              avatar
              class="my-2"
              style="margin-left:auto;margin-right:auto;max-width:300px;"
            >
              <v-checkbox color="primary" v-model="members" :value="item"></v-checkbox>
              
              <v-list-tile-title  v-text="item.name"></v-list-tile-title>

              <v-list-tile-avatar @click="goToUserPage(item.memberId)">
                <img :src="item.avatarPath" />
              </v-list-tile-avatar>
            </v-list-tile>
          </v-hover>
          <!-- 選單結束 -->
        </v-card-text>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-card-actions style="margin-left:auto">
          <v-btn color="primary darken-1" flat @click="dialog = false">取消</v-btn>
          <v-btn v-if="waits.length != 0" color="primary darken-1" flat @click="dialog = false;submit()">確定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<style scoped>
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>



<script>
import { apiReplyApplication } from "../../utils/api.js";
export default {
  props: {
    waits: Array,
    groupId: String
  },
  data() {
    return {
      members: [],
      items: [],
      dialog: false
    };
  },
  inject: ["reload"],
  methods: {
    submit() {
      let token = this.getCookie("session");
      if (!token) {
        //沒有token.跳出提示
        console.log("沒有token");
        this.$bus.$emit("message:push", "請登入", "error");
        this.$router.push("/");
        return;
      }
      apiReplyApplication(
        {
          agree: false,
          groupId: this.groupId,
          members: this.members
        },
        {
          headers: { "x-access-token": token }
        }
      )
        .then(res => {
          //創建失敗，輸入錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            //創建失敗跳出錯誤訊息
            console.log(this.$data.errMsg);
            if (this.$data.errMsg == "Bad Request") {
              this.$bus.$emit("message:push", "沒有正確填入資訊", "error");
              return;
            }
            this.$bus.$emit("message:push", this.$data.errMsg, "error");
            return;
          }
          //審核成功，印出資料
          console.log("審核成功", res.data);
          this.$bus.$emit("message:push", "🎊審核成功");
          //跳轉至揪團頁面
          this.reload();
        })
        .catch(err => {
          //登入失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit("message:push", err, "error");
        });
    },
    goToUserPage(id) {
      this.$router.push(`/user/${id}`);
    },
  }
};
</script>