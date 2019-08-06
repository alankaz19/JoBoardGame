<template>
  <v-container>
    <v-flex my-2 mb-5 sm8 offset-sm2>
      <v-window v-model="onboarding">
        <v-window-item v-for="(n,index) in length" :key="index">
          <v-card v-if="index === 0">
            <GroupInfo v-if="!isLoading" :group-data="groupInfo" :host-id="hostId" :my-type="myType" />
          </v-card>

          <v-card v-if="index === 1">
            <PlayerList :players="players" />
          </v-card>

          <v-card v-if="index === 2">
            <ChatRoom :groupId="groupId" />
          </v-card>
        </v-window-item>
      </v-window>
      <v-flex>
        <v-card class="transparent">
          <v-bottom-nav :active.sync="onboarding" :color="this.colors()" absolute dark shift>
            <v-btn dark>
              <span>揪團資訊</span>
              <v-icon>mdi-view-list</v-icon>
            </v-btn>

            <v-btn dark>
              <span>成員列表</span>
              <v-icon>mdi-account-multiple</v-icon>
            </v-btn>

            <v-btn dark>
              <span>聊天室</span>
              <v-icon>mdi-message-text</v-icon>
            </v-btn>
          </v-bottom-nav>
        </v-card>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
// type 0 = 主揪
// type 1 = 已加入的人
// type 2 = 等待中的人
// type 3 = 是會員但未加入
// type 4 = 訪客



import { apiGetGroupInfo } from "../../utils/api.js";

export default {
  components: {
    GroupInfo: () => import("@/components/group/GroupInfo"),
    PlayerList: () => import("@/components/group/PlayerList"),
    ChatRoom: () => import("@/components/group/ChatRoom")
  },
  data() {
    return {
      isLoading: true,
      memberId: "",
      hostId: '',
      groupId: "",
      length: 3,
      onboarding: 0,
      items: ["group", "list", "chat"],
      groupInfo: {},
      players: [],
      waits: [],
      myType: 0
    };
  },
  methods: {
    //底層導覽列切換
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    //取得團體資料
    getGroupInfo() {
      this.$bus.$emit('isLoading:push',true)
      let vm = this;
      this.isLoading = true;
        apiGetGroupInfo(this.groupId, this.memberId)
          .then(res => {
            //獲取失敗，token錯誤
            if (res.data.status === 400) {
              vm.$data.errMsg = res.data.msg;
              vm.$data.isLogin = false;
              //印出錯誤碼
              console.log(vm.$data.errMsg);
              //獲取失敗跳出錯誤訊息
              this.$bus.$emit('isLoading:push',false)
              return;
            }
            //獲取成功，得到團體資料
            console.log(res.data);
            const groupData = res.data.group;
            vm.myType = res.data.type;
            vm.groupInfo = groupData;
            vm.players = groupData.players;
            vm.waits = groupData.waits;
            vm.hostId = groupData.host.memberId;
            console.log("已獲得團體資料");
            this.$bus.$emit('isLoading:push',false)
          })
          .catch(err => {
            //獲取失敗，伺服器錯誤
            console.log(err);
          }).finally(vm.isLoading = false);
          this.$bus.$emit('isLoading:push',false)
    },
    //切換導覽列顏色
    colors() {
      switch (this.onboarding) {
        case 0:
          return "primary darken-2";
        case 1:
          return "primary lighten-1";
        case 2:
          return "brown lighten-1 ";
      }
    }
  },
  computed: {},
  created() {
    this.$data.groupId = this.$route.params.id;
    this.$data.memberId = this.$store.state.memberId;
    this.getGroupInfo();
  },
  
};
</script>

