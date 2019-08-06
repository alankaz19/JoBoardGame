<template>
  <v-flex>
    <v-text-field
      ref="search"
      v-model="search"
      :loading="isLoading"
      :search-input.sync="search"
      label="尋找正在揪團..."
      append-icon="search"
      clear-icon="mdi-close-circle"
      clearable
      solo
      @click:clear="this.fetchGroupList"
    ></v-text-field>
    <!-- 搜尋bar結束 -->

    <!-- 卡片開始 -->

    <v-layout py-3 px-2 column v-for="(item,index) in items" :key="index">
      <v-hover>
        <v-card
          @click="goToGroupPage(items[index]._id)"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 8 : 2}`"
          style="cursor: pointer; border-radius:15px "
        >
          <v-expand-transition leave-absolute="true">
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out primary darken-2 v-groupCard--reveal white--text"
            >
              👉準備遊玩 :
              <v-flex xs2 sm2 md1 shrink v-for="game in items[index].game" :key="game">
                <v-chip color="primary" text-color="white">{{game}}</v-chip>
              </v-flex>
            </div>
          </v-expand-transition>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex pa-2>
                <v-flex
                  class="grey--text"
                  style="font-size:16px"
                >{{items[index].city}} {{items[index].dist}}</v-flex>
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
                          style=" font-size:16px;"
                        >目前人數: {{items[index].now}} / {{items[index].max}} 人</span>

                        <v-icon right>mdi-account</v-icon>
                      </v-chip>
                    </v-flex>
                  </v-flex>
                </v-flex>

                <v-flex>
                  <v-chip v-if="items[index].playing" label outline selected color="red">
                    <span style=" font-size:16px;">🔥&nbsp;&nbsp;&nbsp;正在遊玩中</span>
                  </v-chip>
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
                  <v-chip label outline color="grey darken-3">
                    <span style=" font-size:16px;">結束時間 : {{items[index].end}}</span>
                  </v-chip>
                  <v-chip style="color:white;" v-if="items[index].novice" label color="blue">
                    <span style=" font-size:16px;">👍&nbsp;&nbsp;&nbsp;新手友善</span>
                  </v-chip>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-layout>
    <!-- 卡片結束 -->

    <!-- 分頁處理 -->
    <template>
      <v-flex>
        <div class="text-xs-center">
          <v-pagination v-if="!isSearching && items.length != 0" v-model="page" :length="pages"></v-pagination>
        </div>
        <div class="text-xs-center">
          <v-pagination
            v-if="isSearching && items.length != 0"
            v-model="searchPage"
            :length="searchPages"
          ></v-pagination>
        </div>
        <div>
          <v-alert
            v-if="items.length == 0"
            :value="true"
            color="primary"
            icon="priority_high"
            outline
          >沒有任何揪團</v-alert>
        </div>
      </v-flex>
      <v-flex></v-flex>
    </template>
  </v-flex>
</template>
          



<script>
import { apiGetGroupList, apiSearchGroup } from "../../utils/api.js";

export default {
  props: {
    // groups: Object
  },
  data() {
    return {
      search: null,
      isLoading: false,
      isSearching: false,
      errMsg: "",
      page: 1,
      pages: 1,
      searchPage: 1,
      searchPages: 1,
      items: [
        {
          address: "太平路174巷20號1F",
          apply: true,
          city: "新北市",
          createdAt: "2019-07-30T13:46:03.505Z",
          date: "2019/8/2",
          dist: "樹林區",
          end: "16:00",
          expirationDate: "2019-08-02T08:00:00.000Z",
          game: Array(2),
          lat: 24.9767644,
          lng: 121.4177908,
          max: 10,
          memberId: "5d2f2c62cc0b686e1054c8e6",
          min: 3,
          name: "testBBB",
          novice: false,
          now: 3,
          other: "費用150元",
          path: "http://localhost:8080?groupId=5d404a1ba336410be1fbb0bd",
          players: Array(1),
          playing: true,
          start: "09:00",
          storeName: "板橋-漫果子"
        }
      ]
    };
  },
  created() {
    this.$bus.$emit("isLoading:push", true);
    this.fetchGroupList();
  },
  methods: {
    goToGroupPage(id) {
      this.$router.push(`/group/${id}`);
    },
    //得到清單開始
    fetchGroupList() {
      this.isLoading = true;
      this.$data.isSearching = false;

      apiGetGroupList({
        page: this.$data.page,
        isPlaying: true
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
          this.$data.items = res.data.group.docs;
          this.$data.pages = res.data.group.pages;
          this.$data.page = res.data.group.page;
          this.$bus.$emit("isLoading:push", false);
          // this.reload();
          this.$data.isSearching = false;
        })
        .catch(err => {
          //編輯失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit("message:push", err, "error");
          this.$bus.$emit("isLoading:push", false);
        })
        .finally(() => (this.isLoading = false));
    },
    //得到清單結束

    //搜尋功能開始
    searchGroupList() {
      if (this.search == null) {
        return;
      }
      if (this.search == "") {
        this.fetchGroupList();
        return;
      }
      this.isSearching = true;
      this.isLoading = true;
      console.log();

      apiSearchGroup({
        str: this.search,
        page: this.searchPage,
        isPlaying: true
      })
        .then(res => {
          //搜尋失敗，輸入錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            //搜尋失敗跳出錯誤訊息
            console.log(this.$data.errMsg);
            this.$bus.$emit("message:push", this.$data.errMsg, "error");
            this.$bus.$emit("isLoading:push", false);
            return;
          }
          //得到搜尋結果
          console.log(res.data);
          this.$data.items = res.data.group.docs;
          this.$data.searchPages = res.data.group.pages;
          this.$data.searchPage = res.data.group.page;
        })
        .catch(err => {
          //編輯失敗，伺服器錯誤
          console.log(err);
          this.$bus.$emit("message:push", err, "error");
        })
        .finally(() => (this.isLoading = false));
    }
  },
  watch: {
    search(val) {
      this.searchGroupList();
    },
    page(val) {
      this.$vuetify.goTo(this.$refs.search);
      this.fetchGroupList();
    },
    searchPage(val) {
      this.$vuetify.goTo(this.$refs.search);
      this.searchGroupList();
    }
  }
};
</script>
<style>
.v-groupCard--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  width: 100%;
  height: 5rem;
  font-size: 1.5rem;
}
</style>
