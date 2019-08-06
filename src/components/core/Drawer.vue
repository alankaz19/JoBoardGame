<template>
  <v-navigation-drawer v-model="drawer" app dark temporary>
    <v-list>
      <v-list-tile
        v-for="(link, i) in activeLinks"
        :key="i"
        :to="link.to"
        :href="link.href"
        @click="onClick($event, link)"
      >
        <v-list-tile-title v-text="link.text" />
      </v-list-tile>
      <v-list-tile v-if="isLogin" @click="logout">
        <span>登出</span>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CoreDrawer",

  computed: {
    ...mapGetters(["links"]),
    isLogin() {
      return this.$store.state.isLogin;
    },
    activeLinks () {
      let links = [];
      links = this.$store.state.items
      return links.filter(function(item) {
        return item.isActive;
      });
    },
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },

  methods: {
    ...mapMutations(["setDrawer"]),
    onClick(e, item) {
      e.stopPropagation();

      if (item.to === "/") {
        this.$vuetify.goTo(0);
        this.setDrawer(false);
        return;
      }

      if (item.to || !item.href) return;

      this.$vuetify.goTo(item.to);
      this.setDrawer(false);
    },
     logout() {
      localStorage.removeItem('userInfo');
      this.delCookie('session')
      this.$router.push("/");
      this.$router.go('/');
    }
  }
};
</script>
