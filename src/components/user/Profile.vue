<template>
  <v-container row >
    <v-flex
      xs12
      sm10
      md6
      offset-sm1
      offset-md3
      elevation-15
      mb-4
      
      style="border-radius:10px 10px 0px 0px;background: linear-gradient(to top, #2c3e50, #74A9BE); margin-top:-30px "
    >
      <v-hover>
        <v-avatar
          class="mx-auto d-block"
          size="160"
          style="z-index:1; margin-top:60px; cursor: pointer"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 15 : 2}`"
          v-model="avatarPath"
        >
          <img :src="avatarPath" />

          <v-scale-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out white v-card--reveal display-1 cyan--text font-weight-bold"
              style="height: 100%; ;z-index:100;"
            >
              <div>
                <UploadAvatar v-on:updateAvatar="updateAvatar" />
              </div>
            </div>
          </v-scale-transition>
        </v-avatar>
      </v-hover>

      <v-card>
        <v-img style="margin-top:0px;" height="50px"></v-img>
        <div style="text-align: center;font-size: 2.5rem">{{name}}</div>
        <div class="grey--text" style="text-align:end; margin-right:20px;">
          <v-chip v-if="isVerify" style="z-index:0" outline color="primary">已驗證帳號</v-chip>
          <v-chip v-else style="z-index:0" outline color="red">未驗證帳號</v-chip>
        </div>

        <v-card-title style="margin: auto" primary-title>
          <div style="z-index:0;text-align: center;font-size: 1.5rem ;margin-bottom: 1rem">您喜愛的遊戲</div>
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
          <v-btn v-if="!isVerify" flat>補發驗證信</v-btn>
          <v-btn v-if="editable" flat color="primary" @click="show = !show; editProfile()">
            <v-icon>edit</v-icon>編輯資料
          </v-btn>
        </div>
        <v-btn icon></v-btn>
      </v-card>
      <v-slide-y-transition>
        <ProfileEdit
          child
          ref="child"
          :userName="name"
          :password="password"
          :firstContact="firstContact"
          :birthday="birthday"
          :gender="gender"
          :game="game"
          :introduction="introduction"
          v-show="show"
        ></ProfileEdit>
      </v-slide-y-transition>
    </v-flex>
  </v-container>
</template>


<script>
import {
  apiGetUserInfo,
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
    this.fetchUserInfo();
  },
  data: () => ({
    avatarPath: "",
    name: "",
    password: "",
    firstContact: "",
    birthday: "",
    gender: "",
    game: [],
    introduction: "",
    memberId:'',
    show: false,
    isVerify: false,
    editable: false
  }),
  methods: {
    fetchUserInfo() {
      let token = this.getCookie("session");
      if (token) {
        this.$data.editable = true;
        apiGetUserInfo({
          headers: { "x-access-token": token }
        })
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
            const userInfo = res.data.member;
            console.log(userInfo);
            if (userInfo.verify) {
              this.$data.isVerify = true;
            }
            this.$store.commit("updateVerifyState", this.$data.isVerify);
            if (this.$data.isVerify) {
              console.log("已驗證帳號");
            } else {
              console.log("未驗證帳號");
            }

            this.$data.name = userInfo.name;
            this.$data.memberId = userInfo._id;
            this.$data.password = userInfo.password;
            this.$data.avatarPath = userInfo.avatarPath;
            this.$store.commit("updateAvatar", this.$data.avatarPath);
            //遊戲格式-----------
            this.$data.game = userInfo.game;
            console.log(this.$data.game)

            //--------
            this.$data.introduction = userInfo.introduction;
            this.$data.firstContact = userInfo.firstContact;
            this.$data.gender = userInfo.gender.toString();
            this.$data.birthday = userInfo.birthday;
            console.log("已獲得使用者資料");
          })
          .catch(err => {
            //獲取失敗，伺服器錯誤
            console.log(err);
          });
      }
    },
    editProfile() {
      this.$refs.child.fetchUser();
    },
    updateAvatar: function(value) {
      this.avatarPath = value;
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