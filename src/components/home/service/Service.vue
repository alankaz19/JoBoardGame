<template>
  <v-item-group>
    <v-container fluid grid-list-xl>
      <v-layout row justify-center wrap >
        <v-flex
          v-for="n in 3"
          :key="n"
          xs12
          sm4
          md4
        >
          <v-item style=" border-radius: 1rem">
            <v-card
              slot-scope="{ active, toggle }"
              :color="active ? 'primary' : 'pink'"
              class="d-flex align-center"
              dark
              height="250"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div
                  v-if="active"
                  class="display-3 text-xs-center"
                >
                  <v-icon>face</v-icon>
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
</template>

<script>
  export default {
    name: 'Service',

  }
</script>