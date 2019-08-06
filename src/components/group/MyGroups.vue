<template>
  <v-container>
    <v-flex xs12>
      <!-- 卡片開始 -->
      <v-layout v-if="this.items.length == 0" px-2 py-3 column>
        <v-card style="height:173px; border-radius:15px;">
          <v-flex>
            <div style=" text-align:center;font-size:1.8rem;margin-top:60px">💁‍沒有任何申請中的揪團</div>
          </v-flex>
        </v-card>
      </v-layout>
      <v-layout py-3 px-2 column v-for="(item,index) in items" :key="index">
        <v-hover>
          <v-card
            @click="goToGroupPage(items[index].groupId)"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 8 : 2}`"
            style="cursor: pointer; border-radius:15px "
          >
            <v-expand-transition leave-absolute="true">
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out primary darken-2 v-groupCard--transition white--text"
                style="height: 100%;border-radius:15px "
              >👏前往揪團頁面👏</div>
            </v-expand-transition>
            <v-card-actions>
              <v-layout row wrap>
                <v-flex pa-2>
                  <v-flex
                    class="grey--text"
                    style="font-size:16px"
                  >{{items[index].city}} {{items[index].dist}} {{items[index].address}}</v-flex>

                  <v-flex>
                    <v-flex md12 style="font-size:1.8rem;">
                      <span>{{items[index].name}}</span>

                      <v-flex xs12 style="float:right;">
                        <v-chip
                          v-if="items[index].now < items[index].max"
                          label
                          outline
                          selected
                          color="primary"
                        >
                          <span
                            style=" font-size:16px;"
                          >目前人數: {{items[index].now}} / {{items[index].max}} 人</span>

                          <v-icon right>mdi-account</v-icon>
                        </v-chip>
                        <v-chip v-else label outline selected color="red">
                          <span
                            style="font-size:16px;"
                          >目前人數: {{items[index].now}} / {{items[index].max}} 人</span>

                          <v-icon right>mdi-account</v-icon>
                        </v-chip>
                      </v-flex>
                    </v-flex>
                  </v-flex>

                  <v-flex>
                    <v-chip v-if="items[index].storeName != ''" label outline color="grey darken-3">
                    <v-icon left>mdi-map-marker</v-icon>
                    <span style=" font-size:16px;">桌遊店 : {{items[index].storeName}} </span>
                  </v-chip>
                  <v-chip v-if="items[index].storeName == ''" label outline color="grey darken-3">
                    <v-icon left>mdi-map-marker</v-icon>
                    <span style=" font-size:16px;">桌遊店 : 自訂 </span>
                  </v-chip>
                  </v-flex>

                  <v-flex xs12>
                    <v-chip label outline color="grey darken-3">
                      <v-icon left>mdi-calendar</v-icon>
                      <span style=" font-size:16px;">日期: {{items[index].date}}</span>
                    </v-chip>
                    <v-chip label outline color="grey darken-3">
                      <v-icon left>mdi-clock</v-icon>
                      <span style=" font-size:16px;">開始時間 : {{items[index].start}}</span>
                    </v-chip>
                    <v-chip style="color:white;" v-if="items[index].host" label color="red">
                      <span style=" font-size:16px;">💪&nbsp;&nbsp;&nbsp;我是主揪</span>
                    </v-chip>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-layout>
      <!-- 卡片結束 -->
    </v-flex>
  </v-container>
</template>
          



<script>
import { apiGetUserGroup } from "../../utils/api.js";

export default {
  name: "myGroups",
  data() {
    return {
      isLoading: false,
      errMsg: "",
      items: [],
      groupId: "",
      isHost: ""
    };
  },
  created() {
    // this.$bus.$emit("isLoading:push", true);
    this.fetchGroupList();
  },
  methods: {
    goToGroupPage(id) {
      this.groupId = id;
      this.$router.push(`/group/${this.groupId}`);
    },
    //得到清單開始
    fetchGroupList() {
      this.isLoading = true;
      this.$data.isSearching = false;

      let token = this.getCookie("session");
      apiGetUserGroup({
        headers: { "x-access-token": token }
      })
        .then(res => {
          //接收失敗，輸入錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            //搜尋失敗跳出錯誤訊息

            console.log(this.$data.errMsg);
            this.$bus.$emit("message:push", this.$data.errMsg, "error");
            this.$bus.$emit("isLoading:push", false);
            return;
          }
          //得到接收結果
          console.log("fetch result", res.data);
          this.$data.items = res.data.groups;
          this.$bus.$emit("isLoading:push", false);
          this.$data.isSearching = false;
        })
        .catch(err => {
          //編輯失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit("message:push", err, "error");
          this.$bus.$emit("isLoading:push", false);
        })
        .finally(() => (this.isLoading = false));
    }
    //得到清單結束
  }
};
</script>
<style>
.v-groupCard--transition {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  font-size: 2rem;
}
</style>
