<template>
  <form>
    <div>
      <v-card flat>
        <v-card-title class="ml-4" style="font-size:2rem">
          <span>歡迎回來</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="Email(登入帳號)"
                  type="email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  data-vv-name="email"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="password"
                  label="密碼"
                  type="password"
                  v-validate="'required|min:6'"
                  :error-messages="errors.collect('password')"
                  name="password"
                  required
                ></v-text-field>
                <v-btn flat :to="'/password'" style="margin-bottom:1rem;" color="primary">忘記密碼？</v-btn>
              </v-flex>
              <v-layout row justify-center xs8 sm4 md2 mt-3>
                <v-btn round class="primary" @click="submit();">登入</v-btn>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </form>
</template>


<script>
import { apiUserLogin } from "../../utils/api.js";

export default {
  name: "LoginForm",
  data: () => ({
    email: "",
    password: "",
    success: null,
    errMsg: ""
  }),

  methods: {
    submit() {
      this.$validator.validateAll(),
        apiUserLogin({
          account: this.$data.email,
          password: this.$data.password,
          userToken:'123',
          type: 0,
        })
          .then(res => {
            //登入失敗，輸入錯誤
            if (res.data.status === 400) {
              this.$data.errMsg = res.data.msg;
              this.$data.success = false;
            this.$bus.$emit('message:push',this.$data.errMsg , 'error')
              //登入失敗跳出錯誤訊息

              return;
            }
            //登入成功，得到token
            console.log(res.data);
            let expireDays = 1000 * 60 * 60 * 24 * 1;
            this.setCookie("session", res.data.token, expireDays);
            // 測試有無得到token
            console.log(res.data.token);

            // 測試有無得到cookie
            this.$data.success = true;
            //更新使用者登入狀態以及使用者資料
            this.$store.commit("updateLoginState", this.$data.success);
            this.$store.commit("updateUserInfo", res.data);
            this.$store.commit("updateDrawer", this.$data.success);

            //關閉登入窗
            this.$emit("closeDialog");
            this.$bus.$emit('message:push','🎊登入成功')

          })
          .catch(err => {
            //登入失敗，伺服器錯誤
            console.log(err);
            this.$data.success = false;
            this.$bus.$emit('message:push',err, 'error')
          });
    },
    clear() {
      this.email = "";
      this.password = "";
      this.$validator.reset();
    }
  },
  mounted() {}
};
</script>

