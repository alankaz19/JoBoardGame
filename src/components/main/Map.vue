<template>
  <div>
    <div class="mapouter">
      <div class="gmap_canvas">
        <!-- search bar start here -->
        <v-autocomplete
          flat
          v-model="model"
          :items="markers"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="name"
          label="尋找桌遊店家..."
          solo
        >
          <template v-slot:no-data>
            <v-list-tile>
              <v-list-tile-title>
                請輸入想要找的
                <strong>桌遊店名 或 區域</strong>
              </v-list-tile-title>
            </v-list-tile>
          </template>
          <template v-slot:selection="{ item, selected }">
            <v-chip :selected="selected" color="blue-grey" class="white--text">
              <v-icon left>mdi-map-marker</v-icon>
              <span v-text="item.name"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-tile-avatar
              color="indigo"
              class="font-weight-light white--text"
              style="font-size:1.5rem"
            >{{ item.name.charAt(0) }}</v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-text="item.city +' '+ item.dist"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-tile-action>
          </template>
        </v-autocomplete>
        <!-- search bar end here---------->
        <!-- map start here---------->
        <!-- <template>
          <div id="map"></div>
        </template>-->

        <template v-if="markers">
          <div class="mapouter font-face">
            <GmapMap
              ref="mapRef"
              :center="center"
              :zoom="16"
              :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUi: false
              }"
              map-type-id="terrain"
              style="width: 100%; height: 95%"
            >
              <gmap-cluster>
                <GmapMarker
                  ref="markersRef"
                  v-for="(m, index) in markers"
                  :key="index"
                  :icon="{ url: require('../../assets/marker.png'),
                size: {width: 46, height: 46, f: 'px', b: 'px'},
                scaledSize: {width: 46, height: 46, f: 'px', b: 'px'}}"
                  :title="m.name"
                  :animation="2"
                  :position="m.position"
                  :clickable="true"
                  @click="
                  focusMarker = m.position; 
                  infoTitle = m.name;
                  infoCity = m.city;
                  infoDist = m.dist;
                  infoAddress = m.address;
                  showInfoWindow();
                  markerBounce(index)"
                />
              </gmap-cluster>
            </GmapMap>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.font-face {
  font-size: 1.5rem;
  text-align: center;
  margin-right: 10px;
  font-family: "Noto Sans TC", sans-serif;
  src: url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");
}

.mapouter {
  text-align: left;
  height: 100%;
  width: 100%;
  position: absolute;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 96%;
  width: 100%;
}

.text {
  font-size: 30px;
  color: red;
}
</style>


<script>
import { apiGetAllStore } from "../../utils/api.js";
import google from "google";
import { setTimeout } from "timers";
import { spread } from "q";
import { spawn } from "child_process";
export default {
  components: {
    GmapCluster: () => import("vue2-google-maps/dist/components/cluster")
  },
  data: () => ({
    markerIndex: 0,
    model: "",
    errMsg: "",
    isLoading: false,
    model: null,
    search: null,
    infoTitle: "",
    infoAddress: "",
    infoLink: "",
    infoCity: "",
    infoDist: "",
    focusMarker: {},
    markers: [],
    store: {},
    center: { lat: 0, lng: 0 }
  }),
  created() {
    this.locationRequest();
    this.fetchStores();
    console.log(this.center);
  },
  mounted() {},
  methods: {
    getInfoStyle() {
      let contentString =
        '<div id="content" style="color:black">' +
        '<div id="siteNotice">' +
        "</div>" +
        `<h1 id="firstHeading" class="firstHeading font-face">🎉${this.infoTitle}</h1>` +
        '<div id="bodyContent">' +
        `<span class="font-face" style="font-size:1rem;margin-right:10px">${this.infoCity} ${this.infoDist} ${this.infoAddress} </span>` +
        "<div style='margin-bottom: 6px; text-align: center'>" +
        `<a href='https://www.google.com/maps/search/${this.infoTitle}' target='_blank'>📍以google地圖顯示</a>` +
        "</div>" +
        "</div>" +
        "</div>";
      return contentString;
    },
    showInfoWindow() {
      //取得map實體
      this.$refs.mapRef.$mapPromise.then(map => {
        //windowInfo 樣式
        let contentString = this.getInfoStyle();
        //windowInfo 實體
        let infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        //取得marker實體
        var image = {
          url: "",
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(32, 32),
          anchor: new google.maps.Point(16, 48),
          scaledSize: new google.maps.Size(32, 32)
        };

        let marker = new google.maps.Marker({
          position: this.focusMarker,
          map: map,
          icon: image,
          title: this.infoTitle
        });

        infowindow.open(map, marker);
        google.maps.event.addListener(map, "click", function(event) {
          infowindow.close();
        });
      });
    },

    fetchStores() {
      //取得所有店家
      apiGetAllStore({})
        .then(res => {
          //獲取失敗，token錯誤
          if (res.data.status === 400) {
            this.$data.errMsg = res.data.msg;
            this.$data.isLogin = false;
            //印出錯誤碼
            console.log(this.$data.errMsg);
            this.$bus.$emit("message:push", this.$data.errMsg, "error");
            //獲取失敗跳出錯誤訊息
            return;
          }
          //獲取成功，得到會員資料
          const stores = res.data.store;
          console.log(stores);
          let markers = [];
          for (let index = 0; index < stores.length; index++) {
            let marker = { position: { lat: 0, lng: 0 } };
            marker.position.lat =  parseFloat( stores[index].lat);
            marker.position.lng = parseFloat( stores[index].lng); 
            marker.name = stores[index].name;
            marker.city = stores[index].city;
            marker.dist = stores[index].dist;
            marker.address = stores[index].address;

            markers.push(marker);
          }

          //地標陣列
          this.$data.markers = markers;

          //--------
          console.log("完成地標抓取");
        })
        .catch(err => {
          //獲取失敗，伺服器錯誤
          console.log(err);
        });
    },
    markerBounce(index) {
      let markers = this.$refs.markersRef;
      let marker = markers[index].$markerObject;
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2000);
    },
    locationRequest() {
      let vm = this;
      let xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB_YFV0_EDruQW_3kBrMRPv6qk0d5BvMTc"
      );
      xhr.onload = function() {
        // do something
        var response = JSON.parse(this.responseText);
        vm.center = response.location;
        console.log(vm.center);
      };
      xhr.send();
    }
  },

  computed: {},
  watch: {
    markerIndex(val) {
      console.log(val);
    }
  }
};
</script>



