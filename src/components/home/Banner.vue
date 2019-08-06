<template>
  <v-card>
    <v-parallax style="height:660px"
      src="https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <v-layout align-center row justify-center>
        <v-flex xs12 justify-center mt-5>
          <div>
            <v-img
                :src="require('@/assets/logo.png')"
                contain
                height="96"
                width="96"
                max-width="192"
                style=" margin-left: auto; margin-right: auto;"
                @click="$vuetify.goTo(0)"

              />
            <h1 class="font-weight-regular" style="color:black; font-size:5rem; text-align:center; margin-top:-10px">
              揪桌遊
            </h1>
            <div v-if="!isLogin" class="subheading text-uppercase mb-5" style="color:black; text-align:center">揪你一起玩桌遊</div>
            <div v-else :="syncName" class="subheading text-uppercase mb-5" style="color:black; text-align:center;"><div style="font-size: 2rem">🎉😍 {{userName}}😍🎉 <div>一起來玩桌遊吧</div></div></div>
          </div>
          <Login v-if="!isLogin" />
          <div v-else style="height:2rem"></div>
          <div style="margin-top:5rem"></div>
        </v-flex>
      </v-layout>
    </v-parallax>
  </v-card>
</template>

<script>

export default {
  name: "Banner",
  data : () =>({
    userName:'',
  }),
  components: {
    Login: () => import("@/components/login/LoginRegiDialog")
  },
  computed: {
    isLogin () {
    return this.$store.getters.isLogin
  },
  syncName() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) {
          this.$data.userName = user.name
        }
  }
  }
};
</script>