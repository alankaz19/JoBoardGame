<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          },
          {
            src: 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          },
          {
            src: 'https://images.pexels.com/photos/1153929/pexels-photo-1153929.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ]
      }
    }
  }
</script>