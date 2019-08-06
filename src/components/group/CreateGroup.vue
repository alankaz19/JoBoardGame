<template>
  <v-container row>
    <v-flex xs12 sm10 md10 offset-sm1 offset-md1>
      <v-card>
        <v-card-title class="primary lighten-1">
          <span class="ml-4 white--text" style="font-size:1.5rem">🤩創建揪團</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xs id="scroll-target" style="max-height: 480px" class="scroll-y">
            <v-layout wrap>
              <!-- 創團名稱 -->
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="name"
                  label="揪團名稱"
                  v-validate="'required|min:5'"
                  :error-messages="errors.collect('name')"
                  name="name"
                  required
                ></v-text-field>
              </v-flex>
              <!-- 選擇日期 -->
              <v-flex xs12>
                <DatePicker v-on:updateDate="updateDate" />
              </v-flex>
              <!-- 市/區/店名 -->
              <v-flex xs12>
                <AddSelect
                  v-on:updateCity="updateCity"
                  v-on:updateDist="updateDist"
                  v-on:updateStoreName="updateStoreName"
                  v-on:updateStoreAddress="updateStoreAddress"
                />
              </v-flex>
              <!-- 地址 -->
              <v-flex xs12 md6>
                <v-text-field
                  label="地址"
                  v-validate="'required'"
                  :error-messages="errors.collect('address')"
                  name="address"
                  required
                  v-model="address"
                ></v-text-field>
              </v-flex>
              <!-- 選擇時間 -->
              <v-flex xs12>
                <TimePicker
                  v-on:updateStartTime="updateStartTime"
                  v-on:updateEndTime="updateEndTime"
                />
              </v-flex>
              <!-- 內建人數 -->
              <v-flex xs12 sm6 md4>
                <v-subheader class="pl-0">內建人數</v-subheader>
                <v-slider
                  v-model="min"
                  always-dirty
                  thumb-label="always"
                  :thumb-size="24"
                  :min="1"
                  :max="10"
                ></v-slider>
              </v-flex>
              <!-- 上限人數 -->
              <v-flex xs12 sm6 md4 offset-md1>
                <v-subheader class="pl-0">上限人數</v-subheader>
                <v-slider
                  v-model="max"
                  thumb-label="always"
                  :thumb-size="24"
                  :max="20"
                  :min="1"
                  always-dirty
                ></v-slider>
              </v-flex>
              <!-- 新手友善 -->
              <v-flex xs12>
                <template>
                  <v-radio-group
                    name="novice"
                    v-validate="'required'"
                    v-model="novice"
                    row
                    required
                  >
                    <span class="mr-5">新手友善</span>
                    <div>

                    <v-radio
                      color="primary darken-1"
                      label="是"
                      value="true"
                    ></v-radio>
                    <v-radio color="primary darken-1" label="否" value="false"></v-radio>
                    </div>
                  </v-radio-group>
                  <div class="red--text">{{ errors.first('novice') }}</div>
                </template>
              </v-flex>
              <!-- 想玩的遊戲 -->
              <v-flex xs12>
                <InputGameTag :myGame="game" v-on:updateGame="updateGame" />
              </v-flex>
              <!-- 申請限制 -->
              <v-flex xs12>
                <template>
                  <v-radio-group name="apply" v-validate="'required'" v-model="apply" required row>
                    <span class="mr-5">是否限制申請</span>
                    <div>
                    <v-radio color="primary darken-1" label="自由加入" value="false"></v-radio>
                    <v-radio color="primary darken-1" label="審核加入" value="true"></v-radio>
                    </div>
                  </v-radio-group>
                  <div class="red--text">{{ errors.first('apply') }}</div>
                </template>
              </v-flex>
              <!-- 備註 -->
              <v-flex mt-5 xs12>
                <v-textarea outline name="memo" label="團內規定(備註)" height="100" v-model="other"></v-textarea>
              </v-flex>

              <v-layout row justify-center>
                <v-flex class="mx-auto" d-flex xs12 sm4 md2>
                  <v-btn round color="primary lighten-1" @click="submit()">送出</v-btn>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>


<script>
import { apiCreateGroup } from "../../utils/api.js";

export default {
  components: {
    DatePicker: () => import("@/components/common/inputComponents/DatePicker"),
    InputGameTag: () =>
      import("@/components/common/inputComponents/InputGameTag"),
    TimePicker: () => import("@/components/common/inputComponents/TimePicker"),
    AddSelect: () => import("@/components/common/inputComponents/AddSelect")
  },
  data: () => ({
    name: "",
    date: "",
    //地點
    city: "台北市",
    dist: "中正區",
    storeName: "",
    address: "",
    //開始時間
    start: "",
    end: "",
    //遊戲人數
    min: 1,
    max: 10,
    game: [],
    novice: null,
    apply: null,
    other: ""
  }),
  methods: {
    submit() {
      this.$validator.validateAll();
      let token = this.getCookie("session");
      if (!token) {
        //沒有token.跳出提示
        console.log("沒有token");
        this.$bus.$emit("message:push", "請登入", "error");
        this.$router.go("/");
        return;
      }
      apiCreateGroup(
        {
          name: this.$data.name,
          date: this.$data.date,
          city: this.$data.city,
          dist: this.$data.dist,
          address: this.$data.address,
          storeName: this.$data.storeName,
          start: this.$data.start,
          end: this.$data.end,
          min: parseInt(this.$data.min),
          max: parseInt(this.$data.max),
          game: this.$data.game,
          novice: this.$data.novice,
          apply: this.$data.apply,
          other: this.$data.other
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
            if(this.$data.errMsg == 'Bad Request'){
              this.$bus.$emit("message:push", '沒有正確填入資訊', "error");
              return;
            }
            this.$bus.$emit("message:push", this.$data.errMsg, "error");
            return;
          }
          //創團成功，印出資料
          console.log(res.data);

          this.$bus.$emit("message:push", "🎊建立成功");
          //跳轉至揪團頁面
          this.$router.push(`/group/${res.data.group._id}`);
        })
        .catch(err => {
          //登入失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit("message:push", err, "error");
        });
    },
    updateDate: function(value) {
      this.$data.date = value;
    },
    updateStartTime: function(value) {
      console.log(value);
      this.$data.start = value;
    },
    updateEndTime: function(value) {
      console.log(value);
      this.$data.end = value;
    },
    updateCity: function(value) {
      this.$data.city = value;
    },
    updateDist: function(value) {
      this.$data.dist = value;
    },

    updateStoreName: function(value) {
      this.$data.storeName = value;
    },
    updateStoreAddress: function(value) {
      this.$data.address = value;
    },
    updateGame: function(value) {
      this.$data.game = value;
    }
  }
};
</script>