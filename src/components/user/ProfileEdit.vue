<template>
  <v-container row>
    <div>
      <v-card>
        <v-card-title>
          <span style="font-size: 1.5rem">編輯個人資料</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  color="primary"
                  label="名字(暱稱)"
                  v-model="editUserName"
                  v-validate="'required'"
                  :error-messages="errors.collect('name')"
                  name="name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  color="primary"
                  disabled
                  label="密碼"
                  type="password"
                  v-model="editPassword"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field color="primary" label="聯絡方式" type="tel" v-model="editFirstContact"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <BirthdayPicker :myBirthday="birthday" v-on:updateBirthday="updateBirthday" />
              </v-flex>
              <v-flex xs12>
                <SexRadios :myGender="gender" v-on:updateGender="updateGender" />
              </v-flex>
              <v-flex xs12>
                <InputGameTag :myGame="game" v-on:updateGame="updateGame" />
              </v-flex>
              <v-flex mt-5 xs12>
                <v-textarea
                  color="primary"
                  outline
                  name="introduction"
                  label="自我介紹"
                  height="150"
                  v-model="editIntroduction"
                ></v-textarea>
              </v-flex>

              <v-layout row justify-center>
                <v-flex d-flex xs12 sm4 md2>
                  <v-btn round color="primary" @click="submit();">送出</v-btn>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>


<script>
import { apiEditUserInfo } from "../../utils/api.js";
import { async } from "q";

export default {
  name: "profileEdit",
  props: {
    userName: String,
    password: String,
    firstContact: String,
    birthday: String,
    game: Array,
    introduction: String,
    gender: String
  },
  data: function() {
    return {
      myUserName: "",
      myPassword: "",
      myFirstContact: "",
      myBirthday: "",
      myGender: "",
      myGame: [],
      myIntroduction: "",
      errMsg: ""
    };
  },
  components: {
    BirthdayPicker: () =>
      import("@/components/common/inputComponents/BirthdayPicker"),
    InputGameTag: () =>
      import("@/components/common/inputComponents/InputGameTag"),
    SexRadios: () => import("@/components/common/inputComponents/SexRadios")
  },
  inject: ["reload"],
  methods: {
    submit() {
      this.$validator.validateAll();
      this.$bus.$emit('isLoading:push',true)
      let token = this.getCookie("session");
      if (!token) {
        //沒有token.跳出提示

        console.log("沒有token");
        this.$bus.$emit('isLoading:push',false)
        return;
      }

      apiEditUserInfo(
        {
          name: this.$data.myUserName,
          password: this.$data.myPassword,
          gender: parseInt(this.$data.myGender),
          birthday: this.$data.myBirthday,
          firstContact: this.$data.myFirstContact,
          game: this.$data.myGame,
          introduction: this.$data.myIntroduction
        },
        {
          headers: { "x-access-token": token }
        }
      )
        .then(res => {
          //編輯失敗，輸入錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            //編輯失敗跳出錯誤訊息

            console.log(this.$data.errMsg);
            this.$bus.$emit('message:push',this.$data.errMsg , 'error')
            this.$bus.$emit('isLoading:push',false)
            return;
          }
          //更新使用者登入狀態以及使用者資料
          let newUserInfo = {
            avatarPath: res.data.member.avatarPath,
            name: res.data.member.name,
            verify: res.data.member.verify
          };
          this.$store.commit("updateUserInfo", newUserInfo);
          this.$bus.$emit('isLoading:push',false)
          console.log(res.data);
          this.reload();
          this.$bus.$emit('message:push','修改成功')

          
        })
        .catch(err => {
          //編輯失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit('message:push',err,'error')
          this.$bus.$emit('isLoading:push',false)
        });
    },
    updateGender: function(value) {
      this.myGender = value;
    },
    updateBirthday: function(value) {
      this.myBirthday = value;
    },
    updateGame: function(value) {
      this.myGame = value;
    },
    fetchUser: async function() {
      let fetchUserName = await this.userName;
      let fetchPassword = await this.password;
      let fetchFirstContact = await this.firstContact;
      let fetchGame = await this.game;
      let fetchGender = await this.gender;
      let fetchBirthday = await this.birthday;
      let fetchIntroduction = await this.introduction;

      this.myUserName = fetchUserName;
      this.myPassword = fetchPassword;
      this.myFirstContact = fetchFirstContact;
      this.myGame = fetchGame;
      this.myGender = fetchGender;
      this.myBirthday = fetchBirthday;
      this.myIntroduction = fetchIntroduction;
    }
  },
  computed: {
    editUserName: {
      get: function() {
        return this.userName;
      },
      set: function(newValue) {
        this.myUserName = newValue;
      }
    },
    editPassword: {
      get: function() {
        return this.password;
      },
      set: function(newValue) {
        this.myPassword = newValue;
      }
    },
    editFirstContact: {
      get: function() {
        return this.firstContact;
      },
      set: function(newValue) {
        this.myFirstContact = newValue;
      }
    },
    editBirthday: {
      get: function() {
        return this.birthday;
      },
      set: function(newValue) {
        this.myBirthday = newValue;
      }
    },
    editGender: {
      get: function() {
        return this.gender;
      },
      set: function(newValue) {
        this.myGender = newValue;
      }
    },
    editGame: {
      get: function() {
        return this.game;
      },
      set: function(newValue) {
        this.myGame = newValue;
      }
    },
    editIntroduction: {
      get: function() {
        return this.introduction;
      },
      set: function(newValue) {
        this.myIntroduction = newValue;
      }
    }
  }
};
</script>