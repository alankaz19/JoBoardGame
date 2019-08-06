<template>
  <v-container row>
    <v-flex
      xs12
      sm10
      md6
      offset-sm1
      offset-md3
      elevation-15
      my-2
      style="border-radius:10px;background: linear-gradient(to top, #2c3e50, #74A9BE); margin-top:-30px"
    >
      <v-hover>
        <v-avatar
          class="mx-auto d-block"
          size="160"
          style="z-index:1; margin-top:60px;"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 15 : 2}`"
          v-model="avatarPath"
        >
          <img :src="avatarPath" />

        </v-avatar>
      </v-hover>

      <v-card>
        <v-img style="margin-top:0px;" height="50px"></v-img>
        <div style="text-align: center;font-size: 2.5rem">{{name}}</div>
        <div class="grey--text" style="text-align:end; margin-right:20px;">
        </div>

        <v-card-title style="margin: auto" primary-title>
          <div style="z-index:0;text-align: center;font-size: 1.5rem ;margin-bottom: 1rem">{{name}} 喜愛的遊戲</div>
        </v-card-title>
        <v-item-group class="px-5" style="z-index:0; margin-bottom: 1rem">
          <v-item  v-model="game" v-for="item in game" :key="item">
            <v-chip>{{item}}</v-chip>
          </v-item>
        </v-item-group>


        <v-spacer></v-spacer>
        <v-card-title style="margin: auto" primary-title>
          <div style="z-index:0;text-align: center;font-size: 1.5rem">自我介紹</div>
        </v-card-title>
        <v-card-text class="px-5" v-model="introduction">{{introduction}}</v-card-text>
        <div style="text-align:end; margin-right:20px;">
          <div></div>
          <v-spacer></v-spacer>
        </div>
        <v-btn icon></v-btn>
      </v-card>
    </v-flex>
  </v-container>
</template>


<script>
import {
  apiCheckUserInfo,
  apiUploadAvatar,
  apiEditUserInfo
} from "../../utils/api.js";

export default {
  components: {
    ProfileEdit: () => import("@/components/user/ProfileEdit"),
    UploadAvatar: () =>
      import("@/components/common/inputComponents/UploadAvatar")
  },
  created() {
    console.log(this.$route.params.id);
    this.$data.memberId = this.$route.params.id;
    this.getUserInfo();
  },
  data: () => ({
    avatarPath: "",
    name: "",
    game: [],
    introduction: "",
    memberId: ""
  }),
  methods: {
    getUserInfo() {
      let token = this.getCookie("session");
      if (token) {
        apiCheckUserInfo(
          this.memberId,
          {
            headers: { "x-access-token": token }
          }
        )
          .then(res => {
            //獲取失敗，token錯誤
            if (res.data.status === 400) {
              this.$data.errMsg = res.data.msg;
              this.$data.isLogin = false;
              //印出錯誤碼
              console.log(this.$data.errMsg);
              //獲取失敗跳出錯誤訊息
              return;
            }
            //獲取成功，得到會員資料
            const userInfo = res.data.info;
            console.log(userInfo);

            this.$data.name = userInfo.name;
            this.$data.avatarPath = userInfo.avatarPath;
            this.$data.game = userInfo.game;
            this.$data.introduction = userInfo.introduction;
            console.log("已獲得使用者資料");
          })
          .catch(err => {
            //獲取失敗，伺服器錯誤
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
  border-radius: 50%;
}
</style>