<template>
  <v-layout wrap align-center>
    <v-flex xs12 md3 mr-3>
      <v-select
        v-model="editCity"
        :readonly="!isEditable"
        :items="arr"
        item-text="name"
        menu-props="auto"
        label="選擇城市"
        hide-details
        prepend-icon="map"
        single-line
      ></v-select>
    </v-flex>
    <v-flex xs12 md3 mr-3>
      <v-select
        v-model="editDist"
        :readonly="!isEditable"
        :items="distArr"
        item-text="name"
        menu-props="auto"
        label="選擇區域"
        hide-details
        single-line
      ></v-select>
    </v-flex>
    <v-flex xs12 md5 mr-3>
      <v-select
        v-if="isEditable"
        v-model="editStore"
        :readonly="!isEditable"
        :items="storeArr"
        menu-props="auto"
        item-text="name"
        :return-object='true'
        label="選擇店名"
        hide-details
        single-line
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import arrAll from "../../../utils/addSelect";
import { apiGetDistStore } from "../../../utils/api.js";

export default {
  props: {
    myCity: { type: String, default: "" },
    myDist: { type: String, default: "" },
    myStore: { type: String, default: "" },
    isEditable: { type: Boolean, default: true }
  },
  data() {
    return {
      arr: arrAll,
      city: "",
      dist: "",
      store: "",
      storeAddress:"",
      storeInfo:{},
      distArr: [],
      storeArr: [],
    };
  },
  methods: {
    updateDist: function() {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.city) {
          this.distArr = obj.sub;
          break;
        }
      }
      this.dist = this.distArr[0].name;
    },
    updateStore: function() {
      for (var i in this.distArr) {
        var obj = this.distArr[i];
        if (obj.name == this.dist) {
          this.storeArr = obj.sub;
          break;
        }
      }
      if (this.storeArr && this.storeArr.length > 0 && this.storeArr[0].name) {
        this.store = this.storeArr[0].name;
      } else {
        this.store = "";
      }
    },
    fetchStoreInfo() {
      let token = this.getCookie("session");
      apiGetDistStore(
        {
          city: this.$data.city,
          dist: this.$data.dist
        },
        {
          headers: { "x-access-token": token }
        },
      )
        .then(res => {
          //獲取失敗，token錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            this.$data.isLogin = false;
            //印出錯誤碼
            console.log(this.$data.errMsg);
            //獲取失敗跳出錯誤訊息
            return;
          }
          //獲取成功，得到會員資料
          const storeInfo = res.data.store;
          console.log(storeInfo);

          this.$data.storeArr = storeInfo;
        })
        .catch(err => {
          //獲取失敗，伺服器錯誤
          console.log(err);
        });
    }
  },
  created: function() {
    let fetchCity = this.myCity;
    this.city = fetchCity;
    let fetchDist = this.myDist;
    this.dist = fetchDist;
    let fetchStore = this.myStore;
    this.store = fetchStore;

    // this.updateDist();
    // this.updateStore();
  },
  computed: {
    editCity: {
      get: function() {
        let fetchCity = this.myCity;
         this.city = fetchCity;
        return this.myCity;
      },
      set: function(newValue) {
        this.city = newValue;
      }
    },
    editDist: {
      get: function() {
        let fetchDist = this.myDist;
        this.dist = fetchDist;
        return this.myDist;
      },
      set: function(newValue) {
        this.dist = newValue;
      }
    },
    editStore: {
      get: function() {
        let fetchStore = this.myStore;
        this.store = fetchStore;
        return this.myStore;
      },
      set: function(newValue) {
        this.store = newValue.name;
        this.storeAddress = newValue.address;
      }
    }
  },
  watch: {
    city: function() {
      this.updateDist();
      this.updateStore();
      this.$emit("updateCity", this.city);
    },
    dist: function() {
      this.updateStore();
      this.fetchStoreInfo();
      this.$emit("updateDist", this.dist);
    },
    store: function() {
      this.$emit("updateStoreName", this.store);
      this.$emit("updateStoreAddress", this.storeAddress)
    }
  }
};
</script>