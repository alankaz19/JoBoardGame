<template>
  <div>
    <form>
      <v-card flat>
        <v-card-title class="ml-4" style="font-size:2rem">
          <span>用戶註冊</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="名字(暱稱)"
                  type="text"
                  v-validate="'required|min:2'"
                  :error-messages="errors.collect('name')"
                  name="name"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="Email(登入帳號)"
                  type="email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  name="email"
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
              </v-flex>
              <v-layout row justify-center xs8 sm4 md2 mt-3>
                <v-btn round color="primary" @click="submit();">送出</v-btn>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import { apiUserRegister } from "../../utils/api.js";

export default {
  name: "RegisterForm",
  data: () => ({
    name: "",
    email: "",
    password: "",
    success: null,
    errMsg: ""
  }),

  methods: {
    submit() {
      this.$validator.validateAll();
      this.$bus.$emit('isLoading:push',true)
      
      apiUserRegister({
        name: this.$data.name,
        account: this.$data.email,
        password: this.$data.password,
        userToken:'',
        type: 0,
      })
        .then(res => {
          //註冊失敗，輸入錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            this.$data.success = false;
            //註冊失敗跳出錯誤訊息
            this.$bus.$emit('message:push',this.$data.errMsg)
            this.$bus.$emit('isLoading:push',false)

            return;
          }
          //註冊成功，得到token，尚未驗證
          let expireDays = 1000 * 60 * 60 * 24 * 1;
          this.setCookie("session", res.data.token, expireDays);
          this.$data.success = true;
          //更新使用者登入狀態以及使用者資料
          this.$store.commit("updateLoginState", this.$data.success);
          this.$store.commit("updateUserInfo", res.data);
          this.$store.commit("updateDrawer", this.$data.success);
          //關閉登入窗
          this.$bus.$emit('isLoading:push',false)
          this.$emit("closeDialog");
          this.$router.go("/");
          this.$bus.$emit('message:push','🎊註冊成功')

        })
        .catch(err => {
          //註冊失敗，伺服器錯誤
          console.log(err);
          this.$data.success = false;
          this.$bus.$emit('isLoading:push',false)
          this.$bus.$emit('message:push','伺服器錯誤','error')
        });
    },
    clear() {
      this.email = "";
      this.password = "";
      this.name = "";
      this.$validator.reset();
    }
  }
};
</script>
