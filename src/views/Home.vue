<template>
  <div id="home">
    <Banner />
    <v-container>
      <Service />
      <Carousel />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {},
  components: {
    Banner: () => import("@/components/home/Banner"),
    Carousel: () => import("@/components/home/Carousel"),
    Service: () => import("@/components/home/service/Service")
  }
};
</script>
