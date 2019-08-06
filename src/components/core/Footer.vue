<template>
  <v-footer
    style="background:transparent"
    dark
    height="auto"
  >
    <v-container mx-auto>
      <v-layout wrap>
        <v-flex xs12 sm9>
          <v-btn
            flat
            v-for="(item, i) in items"
            :key="i"
            :href="item.href"
            class="ml-0 mr-2"
            color="white"
            target="_blank"
          >
            <v-icon v-text="item.icon" />
          </v-btn>
        </v-flex>
        <v-spacer />
        <div
          class="mr-0  hidden-xs-only"
          square
          title="Go to top"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </div>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          href: '#!',
          icon: 'mdi-instagram'
        },
        {
          href: '#!',
          icon: 'mdi-facebook'
        },
        {
          href: '#!',
          icon: 'mdi-github-circle'
        }
      ]
    })
  }
</script>
