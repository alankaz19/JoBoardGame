<template>
  <div>
    <v-card flat>
      <v-card-title class="ml-4" style="font-size:2rem">
        <span>Facebook 登入</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-layout row justify-center xs8 sm4 md2 mt-3>
<v-facebook-login version="v3.3" app-id="490724168342839"></v-facebook-login>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>

import { VFBLogin as VFacebookLogin } from 'vue-facebook-login-component'

export default {
  components: {
    VFacebookLogin
  }
}
</script>
