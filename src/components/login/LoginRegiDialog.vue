<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn round class="bg" large dark v-on="on">馬上開始</v-btn>
      </template>
      <template>
        <v-card>
          <v-btn
            color="primary"
            absolute
            right
            fab
            small
            style="margin-top:1rem;margin-right:0.1rem;"
            @click="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <LoginTabs @closeDialog="dialog=false" />
        </v-card>
      </template>
    </v-dialog>
  </v-layout>
</template>

<script>
import LoginTabs from "./LoginTabs";

export default {
  components: {
    LoginTabs
  },
  data: () => ({
    dialog: false
  })
};
</script>

<style scoped>
.bg {
  background: linear-gradient(to right top, #4b6a8a, #74a9be);
}
</style>
