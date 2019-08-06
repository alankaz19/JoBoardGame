<template>
  <v-layout row>
    <v-flex>
      <v-card  style="height:530px">
        <v-toolbar flat color="primary lighten-1" dark>
          <v-toolbar-title>成員列表</v-toolbar-title>
        </v-toolbar>
        <v-list id="scroll-target" style="max-height: 450px;" class="scroll-y">
          <v-hover v-for="(item,index) in editPlayers" :key="index">
            <v-list-tile
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 0}`"
              avatar
              class="my-2"
              style="cursor:pointer;margin-left:auto;margin-right:auto;max-width:350px;border-bottom:1px #B0B0B0 solid;"
              @click="goToUserPage(item.memberId)"
            >
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <img :src="item.avatarPath" />
              </v-list-tile-avatar>
            </v-list-tile>
          </v-hover>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    players: Array
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    goToUserPage(id) {
       this.$router.push(`/user/${id}`);
     },
  },
  created() {
    console.log(this.players)
  },
  computed: {
    editPlayers: {
      get: function() {
        return this.players;
      },
      set: function(newValue) {
        this.items = newValue;
      }
    },
  },
};
</script>