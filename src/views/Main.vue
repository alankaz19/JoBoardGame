<template>
  <div class="main">
    <v-container>
    <VerticalTabs />

    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Main',

    components: {
      VerticalTabs: () => import('@/components/main/VerticalTabs'),
      }
  }
</script>