<template >
  <v-layout row v-model="editType">
    <v-flex v-model="editGroupId">
      <v-card v-model="editGroupInfo">
        <v-card-title v-model="editHostId" class="primary darken-2">
          <span class="ml-2" style="font-size:1.5rem;color:white">{{editName}}</span>
          <v-spacer></v-spacer>
          <div class="text-xs-center">
            <v-badge  v-if="editType === 0"  overlap right color="red">
              <template v-if="groupData.waits.length > 0" v-slot:badge>
                <span>{{groupData.waits.length}}</span>
              </template>
              <ApplyDialog :groupId="groupId" :waits="groupData.waits"  v-if="editType === 0" />
            </v-badge>
          </div>
          <div>
            <!-- 對話框 -->
            <Dialog
              :type="editType"
              :showDialog="showDialog"
              v-on:updateDialog="updateDialog"
              v-on:updateJoin="updateJoin"
              v-on:updateQuit="updateQuit"
            />
            <!-- 各種狀態不同時按鈕顯示 -->
            <v-btn
              v-if="editType === 0"
              round
              color="primary lighten-1"
              @click="showDialog = !showDialog;"
            >結束揪團</v-btn>
            <EditDialog
              :editDialog="editDialog"
              v-on:updateSubmit="updateSubmit"
              v-on:updateIsEditable="updateIsEditable"
              v-if="editType === 0"
            />
            <v-btn
              v-if="editType === 1"
              round
              color="primary lighten-1"
              @click="showDialog = !showDialog;"
            >離開此團</v-btn>
            <v-btn
              v-if="editType === 2"
              round
              color="primary lighten-1"
              @click="showDialog = !showDialog;"
            >取消等待</v-btn>
          </div>
            <v-btn
              v-if="editType === 3"
              round
              color="primary lighten-1"
              @click="showDialog = !showDialog;"
            >加入揪團</v-btn>
        </v-card-title>
        <div></div>
        <v-container grid-list-xs id="scroll-target" style="max-height: 435px" class="scroll-y">
          <v-flex xs12>
            <v-text-field
              v-if="isEditable"
              :readonly="!isEditable"
              color="primary"
              label="團名"
              required
              v-model="editName"
            ></v-text-field>
          </v-flex>
          <v-layout wrap>
            <!-- 選擇日期 -->
            <v-flex v-if="isEditable" xs12>
              <DatePicker
                :isEditable="isEditable"
                :myDate="groupData.date"
                v-on:updateDate="updateDate"
              />
            </v-flex>
            <!-- 編輯日期 -->

            <!-- 顯示日期 -->
            <v-flex v-if="!isEditable" xs12>
              <v-text-field v-model="groupData.date" label="揪團日期" prepend-icon="event" readonly></v-text-field>
            </v-flex>
            <!-- 顯示日期 -->
            <!-- 顯示店家  如果不是編輯編輯或是沒有設定桌遊店家-->
            <v-flex xs12>
              <v-text-field
                v-if="!isEditable || groupData.storeName == ''"
                readonly
                prepend-inner-icon
                color="primary"
                label="桌遊店"
                v-model="groupData.storeName"
              ></v-text-field>
            </v-flex>
            <!-- 顯示店家結束 -->

            <!-- 編輯市/區/店名 -->
            <AddSelect
              v-if="isEditable"
              class="mb-3"
              :isEditable="isEditable"
              :myCity="groupData.city"
              :myDist="groupData.dist"
              :myStore="groupData.storeName"
              v-on:updateCity="updateCity"
              v-on:updateDist="updateDist"
              v-on:updateStoreName="updateStoreName"
              v-on:updateStoreAddress="updateStoreAddress"
            />

            <!-- 顯示地址 -->
            <v-flex xs12>
              <v-text-field
                v-if="!isEditable"
                :readonly="!isEditable"
                color="primary"
                label="地址"
                required
                v-model="groupData.city +'  ' + groupData.dist + '  ' +groupData.address"
              ></v-text-field>
            </v-flex>
            <!-- 顯示地址結束 -->

            <!-- 編輯地址 -->
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-if="isEditable"
                :readonly="!isEditable"
                color="primary"
                label="地址"
                required
                v-model="address"
              ></v-text-field>
            </v-flex>
            <!-- 編輯地址結束 -->
            <!-- 選擇時間 -->
            <v-flex xs12>
              <TimePicker
                v-if="isEditable"
                :isEditable="isEditable"
                :myStart="groupData.start"
                :myEnd="groupData.end"
                v-on:updateStartTime="updateStartTime"
                v-on:updateEndTime="updateEndTime"
              />
            </v-flex>
            <!-- 選擇時間結束 -->

            <!-- 顯示開始時間 -->
            <v-flex xs12 sm6 md2>
              <v-text-field
                v-if="!isEditable"
                :readonly="!isEditable"
                color="primary"
                label="開始時間"
                required
                v-model="groupData.start"
              ></v-text-field>
            </v-flex>
            <!-- 顯示開始時間結束 -->
            <!-- 顯示結束時間 -->
            <v-flex xs12 sm6 md2>
              <v-text-field
                v-if="!isEditable"
                :readonly="!isEditable"
                color="primary"
                label="結束時間"
                required
                v-model="groupData.end"
              ></v-text-field>
            </v-flex>
            <!-- 顯示結束時間結束 -->

            <v-spacer></v-spacer>
            <!-- 內建人數 -->
            <v-flex xs12 sm6 md3 v-if="editMin == groupData.now">
              <v-subheader class="pl-0">內建人數</v-subheader>
              <v-slider
                :readonly="!isEditable"
                v-model="editMin"
                thumb-label="always"
                :thumb-size="24"
                :max="10"
                color="primary"
              ></v-slider>
            </v-flex>
            <!-- 現在人數 -->
             <v-flex xs12 sm6 md3 v-else>
              <v-subheader class="pl-0">現在人數</v-subheader>
              <v-slider
                :readonly="!isEditable"
                v-model="groupData.now"
                thumb-label="always"
                :thumb-size="24"
                :max="10"
                color="primary"
              ></v-slider>
            </v-flex>
            <!-- 上限人數 -->
            <v-flex xs12 sm6 md3 offset-md1>
              <v-subheader class="pl-0">上限人數</v-subheader>
              <v-slider
                :readonly="!isEditable"
                v-model="editMax"
                thumb-label="always"
                :thumb-size="24"
                :max="20"
                color="primary"
              ></v-slider>
            </v-flex>
            <!-- 新手友善 -->
            <v-flex xs12>
              <template>
                <v-radio-group :readonly="!isEditable" v-model="editNovice" row required>
                  <span class="mr-5">新手友善</span>
                  <div>
                    <v-radio color="primary" label="歡迎新手同遊" :value="true"></v-radio>
                    <v-radio color="primary" label="希望有經驗玩家" :value="false"></v-radio>
                  </div>
                </v-radio-group>
              </template>
            </v-flex>
            <!-- 想玩的遊戲 -->
            <v-flex xs12>
              <InputGameTag
                :isEditable="isEditable"
                :myGame="groupData.game"
                v-on:updateGame="updateGame"
              />
            </v-flex>
            <!-- 申請限制 -->
            <v-flex xs12>
              <template>
                <v-radio-group :readonly="!isEditable" v-model="editApply" row required>
                  <span class="mr-5">是否限制申請</span>
                  <div>
                    <v-radio color="primary" label="允許自由加入" :value="false"></v-radio>
                    <v-radio color="primary" label="需要審核加入" :value="true"></v-radio>
                  </div>
                </v-radio-group>
              </template>
            </v-flex>
            <!-- 備註 -->
            <v-flex mt-4 xs12>
              <v-textarea
                :readonly="!isEditable"
                color="primary"
                outline
                name="memo"
                label="團內規定(備註)"
                height="100%"
                v-model="editMemo"
              ></v-textarea>
            </v-flex>
            <v-layout row justify-center></v-layout>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import { apiJoinGroup, apiQuitGroup, apiUpdateGroup } from "../../utils/api.js";
import { async } from "q";

export default {
  props: {
    groupData: {
      type: Object,
      required: true
    },
    hostId: {
      type: String,
      required: true
    },
    myType: {
      type: Number,
      required: true
    }
  },
  inject: ["reload"],
  components: {
    DatePicker: () => import("@/components/common/inputComponents/DatePicker"),
    InputGameTag: () =>
      import("@/components/common/inputComponents/InputGameTag"),
    TimePicker: () => import("@/components/common/inputComponents/TimePicker"),
    AddSelect: () => import("@/components/common/inputComponents/AddSelect"),
    ApplyDialog: () => import("@/components/common/ApplyDialog"),
    EditDialog: () => import("@/components/common/EditDialog"),
    Dialog: () => import("@/components/common/Dialog")
  },
  data() {
    return {
      isHost: false,
      isEditable: false,
      showDialog: false,
      editDialog: false,
      submit: false,
      join: false,
      quit: false,
      type: null,
      name: "",
      date: "",
      city: "",
      dist: "",
      address: "",
      storeName: "",
      start: "",
      end: "",
      min: 5,
      max: 10,
      game: [],
      novice: "true",
      apply: "true",
      memo: "",
      groupInfo: {},
      groupHostId: "",
      groupId: ""
    };
  },
  mounted() {
    let type = this.myType;
    this.type = type;
  },
  methods: {
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
    },
    updateDialog: function(value) {
      this.$data.showDialog = value;
    },
    updateEditDialog: function(value) {
      this.$data.editDialog = value;
    },
    updateIsEditable: function(value) {
      this.$data.isEditable = value;
    },
    updateSubmit: function(value) {
      this.$data.submit = value;
    },
    updateJoin: function(value) {
      this.$data.join = value;
    },
    updateQuit: function(value) {
      this.$data.quit = value;
    },
    //新刪修查
    joinGroup() {
      let token = this.getCookie("session");
      if (!token) {
        //沒有token.跳出提示
        console.log("沒有token");
        this.$bus.$emit("message:push", "請登入", "error");
        this.$router.push("/");
        return;
      }
      this.join = false;
      apiJoinGroup(
        this.groupId, 
        {
          headers: {"x-access-token": token }
      },
      )
        .then(res => {
          //創建失敗，輸入錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            //創建失敗跳出錯誤訊息
            console.log(this.$data.errMsg);
            if (this.$data.errMsg == "Account no Verified") {
              this.$bus.$emit("message:push", "帳號還沒驗證哦", "error");
              return;
            }
            this.$bus.$emit("message:push", this.$data.errMsg, "error");
            return;
          }
          //退出成功，印出資料
          console.log("加入成功如下", res.data);
          this.$bus.$emit("message:push", "🎉加入成功🎉");
          //跳轉至揪團頁面
          this.reload();
        })
        .catch(err => {
          //登入失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit("message:push", err, "error");
        });
    },
    quitGroup() {
      let token = this.getCookie("session");
      if (!token) {
        //沒有token.跳出提示
        console.log("沒有token");
        this.$bus.$emit("message:push", "請登入", "error");
        this.$router.push("/");
        return;
      }
      this.quit = false;
      console.log('退出token',token)
      console.log('退出id',this.groupId)
      apiQuitGroup(
        this.groupId,
        {
          headers: {"x-access-token": token }
        },
      )
        .then(res => {
          //創建失敗，輸入錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            //創建失敗跳出錯誤訊息
            console.log(this.$data.errMsg);
            if (this.$data.errMsg == "Account no Verified") {
              this.$bus.$emit("message:push", "帳號還沒驗證哦", "error");
              return;
            }
            this.$bus.$emit("message:push", this.$data.errMsg, "error");
            return;
          }
          //退出成功，印出資料
          console.log("退出成功如下", res.data);
          this.$bus.$emit("message:push", "😭已經退出");
          //跳轉至揪團頁面
          if(this.$data.isHost){
            this.$router.push("/");
            return;
          }
          this.reload();
        })
        .catch(err => {
          //登入失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit("message:push", err, "error");
        });
    },
    editGroup() {
      this.$validator.validateAll();
      let token = this.getCookie("session");
      if (!token) {
        //沒有token.跳出提示
        console.log("沒有token");
        this.$bus.$emit("message:push", "請登入", "error");
        this.$router.push("/");
        return;
      }
      this.submit = false;
      apiUpdateGroup(
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
          other: this.$data.memo,
          groupId: this.$data.groupId
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
          //修改成功，印出資料
          console.log("更改資料成功如下", res.data);
          this.$bus.$emit("message:push", "👏修改成功");
          //跳轉至揪團頁面
          this.reload();
        })
        .catch(err => {
          //登入失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit("message:push", err, "error");
        });
    }
  },
  computed: {
    editGroupInfo: {
      get: function() {
        this.groupInfo = this.groupData;
        return this.groupData;
      },
      set: function(newValue) {
        this.groupInfo = newValue;
      }
    },
    editHostId: {
      get: function() {
        this.groupHostId = this.groupData.host.memberId;
        return this.groupData.host.memberId;
      },
      set: function(newValue) {
        this.groupHostId = newValue;
      }
    },
    editGroupId: {
      get: function() {
        this.groupId = this.groupData._id;
        return this.groupData._Id;
      },
      set: function(newValue) {
        this.groupId = newValue;
      }
    },
    editType: {
      get: function() {
        this.type = this.myType;
        return this.myType;
      },
      set: function(newValue) {
        this.type = newValue;
      }
    },
    editName: {
      get: function() {
        this.name = this.groupData.name;
        return this.groupData.name;
      },
      set: function(newValue) {
        this.name = newValue;
      }
    },
    editAddress: {
      get: function() {
        this.address = this.groupData.address;
        return this.groupData.address;
      },
      set: function(newValue) {
        this.address = newValue;
      }
    },
    editMin: {
      get: function() {
        this.min = this.groupData.min;
        return this.groupData.min;
      },
      set: function(newValue) {
        this.min = newValue;
      }
    },
    editMax: {
      get: function() {
        this.max = this.groupData.max;
        return this.groupData.max;
      },
      set: function(newValue) {
        this.max = newValue;
      }
    },
    editNovice: {
      get: function() {
        this.novice = this.groupData.novice;
        return this.groupData.novice;
      },
      set: function(newValue) {
        this.novice = newValue;
      }
    },
    editApply: {
      get: function() {
        this.apply = this.groupData.apply;
        return this.groupData.apply;
      },
      set: function(newValue) {
        this.apply = newValue;
      }
    },
    editMemo: {
      get: function() {
        this.memo = this.groupData.other;
        return this.groupData.other;
      },
      set: function(newValue) {
        this.memo = newValue;
      }
    }
  },
  watch: {
    groupHostId(val) {
      console.log(1,this.$store.state.memberId)
      console.log(3,this.groupHostId)

      let memberId = this.$store.state.memberId;
      if (memberId == this.groupHostId) {
        console.log(4,memberId)
        this.$data.isHost = true;
      }
    },
    type(val) {
      console.log("my type is" + val);
    },
    submit(val) {
      console.log("修改", this.submit);
      if (this.submit) {
        this.editGroup();
      }
    },
    join(val) {
      console.log("加入", this.join);
      if (this.join) {
        this.joinGroup();
      }
    },
    quit(val) {
      console.log("退出", this.quit);
      if (this.quit) {
        this.quitGroup();
      }
    }
  }
};
</script>