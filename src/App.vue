<template>
  <v-app id="app" style="font-family: 'Noto Sans TC', sans-serif;">
    <v-flex class="bg">
      <!-- style="background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);" -->
      <CoreDrawer />
      <CoreNavbar />
      <Loading />
      <SnackBar />
      <CoreView v-if="isRouterAlive" />

      <CoreFooter />
    </v-flex>
  </v-app>
</template>

<script>
import { apiGetUserInfo } from "./utils/api.js";

export default {
  name: "App",
  provide() {
    return {
      reload : this.reload
    }
  },
  components: {
    CoreDrawer: () => import("@/components/core/Drawer"),
    CoreFooter: () => import("@/components/core/Footer"),
    CoreNavbar: () => import("@/components/core/Navbar"),
    CoreView: () => import("@/components/core/View"),
    //全域元件
    Loading: () => import("@/components/common/Loading"),
    SnackBar: () => import("@/components/common/SnackBar"),

  },
  created() {
    this.checkLogin();
    this.$bus.$emit('isLoading:push',true)
  },
  mounted() {
    this.$bus.$emit('isLoading:push',false)
  },
  data: () => ({
    isLogin: false,
    isLoading: false,
    isVerify: false,
    loginChecked: false,
    memberId:'',
    errMsg: "",
    isRouterAlive: true
  }),
  methods: {
    checkLogin() {
      //重新整理後檢查是否存在session
      let token = this.getCookie("session");
      if (this.$data.loginChecked) {
        return;
      }
      if (token == undefined) {
        console.log("未登入");
        return;
      }
      this.$data.isLogin = true;
      this.$store.commit("updateLoginState", this.$data.isLogin);
      this.$store.commit("updateDrawer", this.$data.isLogin);
      console.log("已登入");

      //從localStorage裡獲取使用者資料，是否驗證
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        console.log("未獲取使用者資料");
        return;
      }
      this.$data.memberId = user.memberId;
      this.$store.commit("updateMemberId", this.$data.memberId)
      this.$data.isVerify = user.verify;
      console.log("是否驗證" + user.verify);
      this.$store.commit("updateVerifyState", this.$data.isVerify);
      console.log(user);
      this.$data.loginChecked = true;
    },
     reload() {
      this.isRouterAlive = false;
      this.$nextTick(function(){
      this.isRouterAlive = true;
      })
    }
  },
  watch: {
    $route: "checkLogin"
  }
};
</script>

<style>
@import "./static/font/font.css";

.bg {
  background: linear-gradient(to bottom, #f3fbfd, rgba(70, 130, 153, 0.664));
}
</style>