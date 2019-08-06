<template>
  <v-layout align-center justify-center :wrap="isMobile">
    <v-item-group v-model="window" class="shrink mr-4" mandatory>
      <v-layout style="margin-left:20px" :column="!isMobile" :wrap="!isMobile">
        <v-item style="text-align:center" v-for="(item,index) in items" :key="index">
          <div slot-scope="{ active, toggle }">
            <v-btn
              color="primary"
              :class="{'pad2':isMobile,'pad4':!isMobile}"
              class="my-3 elevation-5"
              :input-value="active"
              @click="toggle"
              style="height:110px; text-align:center; font-size:1.2rem; border-radius: 0.2rem 0.2rem ; "
            >{{item.title}}</v-btn>
          </div>
        </v-item>
      </v-layout>
    </v-item-group>
    <v-flex>
      <v-window v-model="window" :vertical="!isMobile">
        <v-window-item style="height:600px" v-for="(item,index) in items" :key="index">
          <v-card flat>
            <v-card-text class="primary lighten-1">
              <v-layout align-center ml-4>
                <span style="font-size:1.5rem" class="white--text">{{ item.title }}</span>
                <v-spacer></v-spacer>
                  <v-icon v-text="item.icon"></v-icon>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-flex id="scroll-target" style="height:550px;" class="scroll-y">
            <v-card flat style=" background-color:transparent" v-if="index === 0">
              <Inviting />
            </v-card>

            <v-card flat style="background-color:transparent" v-if="index === 1">
              <Playing />
            </v-card>

            <v-card style="height:100%" flat v-if="index === 2">
              <Map />
            </v-card>
          </v-flex>
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "VerticalTabs",
  components: {
    Inviting: () => import("@/components/main/Inviting"),
    Playing: () => import("@/components/main/Playing"),
    Map: () => import("@/components/main/Map")
  },
  data: () => ({
    isMobile: false,
    items: [
      {
        title: "😎正在揪團",
        icon: "mdi-account-plus"
      },
      {
        title: "🤙正在遊玩",
        icon: "mdi-puzzle"
      },
      {
        title: "🌏附近桌遊",
        icon: "mdi-map-marker"
      }
    ],
    length: 3,
    window: 0,
   
  }),
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    }
  },
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
