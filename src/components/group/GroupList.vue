<template>
  <v-container mt-2>
      <v-tabs centered color="primary lighten-1" dark icons-and-text>
        <v-tabs-slider color="grey darken-3"></v-tabs-slider>

        <v-tab  style="font-size:1.2rem" href="#tab-1">
          我的揪團
          <v-icon style="font-size:2rem">🙌🏼</v-icon>
        </v-tab>

        <v-tab style="font-size:1.2rem" href="#tab-2">
          申請中
          <v-icon style="font-size:2rem">🙏🏼</v-icon>
        </v-tab>

        <v-tab-item    v-for="i in 2" :key="i" :value="'tab-' + i">
          <v-card style=" background-color:transparent"  p-5 flat v-if="i === 1">
        <MyGroups />
      </v-card>

      <v-card style=" background-color:transparent" flat v-if="i === 2">
        <Applying  />
      </v-card>
        </v-tab-item>
        <v-flex></v-flex>
      </v-tabs>
  </v-container>
</template>
          



<script>
import { apiGetGroupList, apiSearchGroup } from "../../utils/api.js";
import MyGroups from "./MyGroups";
import Applying from "./Applying";
export default {
  components:{
    MyGroups,
    Applying
  },
  props: {
    // groups: Object
  },
  data() {
    return {
      items: [
        {
          title: "正在揪團",
          icon: "mdi-account-plus"
        },
        {
          title: "正在遊玩",
          icon: "mdi-puzzle"
        }
      ],
    };
  },
  methods: {
  }
};
</script>

<style>
.mobile {
  width: 100%;
  border-radius: 0rem;
}

::-webkit-scrollbar {
  display: none;
}

.pad2 {
  padding-right: 1.2rem;
  padding-left: 1.2rem;
}
.pad4 {
  padding-right: 2rem;
  padding-left: 2rem;
}
</style>
