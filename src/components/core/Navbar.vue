<template>
  <v-toolbar absolute dark style="position:sticky;"  class="bg">
    <v-img class="mr-2 ml-5" contain height="48" width="48" max-width="48" />
    <v-toolbar-title @click="tiltleToHome"><img style="height:26px; width:32px" src="../../assets/logo.png" alt="">揪桌遊</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="ml-0 hidden-xs-only">
      <v-btn flat :to="'/'">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn  flat :to="'/main'">
        <span style="font-size:1.2rem">找團</span>
      </v-btn>
      <v-btn v-if="isLogin" flat :to="'/createGroup'">
        <span style="font-size:1.2rem">開團</span>
      </v-btn>
      <v-btn v-if="isLogin" flat :to="'/group'">
        <span style="font-size:1.2rem">我的揪團</span>
      </v-btn>
      <v-btn v-if="isLogin" flat @click="logout">
        <span style="font-size:1.2rem">登出</span>
      </v-btn>
      <v-btn v-if="isLogin" flat :to="'/user'">
        <v-avatar size="36px">
          <img  :src="showAvatar" alt="Avatar" />
        </v-avatar>
      </v-btn>
      <div v-else style="width:15rem"></div>
    </v-toolbar-items>

    <v-toolbar-side-icon class="hidden-sm-and-up" @click="toggleDrawer"></v-toolbar-side-icon>
  </v-toolbar>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
import { userInfo } from 'os';

export default {
  data: () => ({
    avatarPath: ''

  }),

  computed: {
    ...mapGetters(["links"]),
    isLogin() {
      return this.$store.state.isLogin;
    },
    showAvatar() {
      let user = JSON.parse(localStorage.getItem("userInfo"));
      console.log(user)
      this.$data.avatarPath = user.avatarPath;
      console.log(this.$data.avatarPath)
      return this.$data.avatarPath;
    }
  },

  methods: {
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();

      if (item.to || !item.href) return;

      this.$vuetify.goTo(item.href);
    },
    tiltleToHome() {
      this.$router.push("/");
    },
    logout() {
      this.$bus.$emit('isLoading:push',true)
      localStorage.removeItem(userInfo);
      this.delCookie("session");
      this.$router.push("/");
      this.$router.go("/"); 
      this.$bus.$emit('isLoading:push',false)
    }

  },
};
</script>

<style scoped>
.bg {
  background: linear-gradient(to right top, #4a5b6e, #74a9be);
}
</style>