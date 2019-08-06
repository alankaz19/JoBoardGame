<template>
  <v-tabs centered icons-and-text>
    <v-tabs-slider color="primary"></v-tabs-slider>

    <v-tab href="#tab-3">
      FB
      <v-icon>mdi-facebook</v-icon>
    </v-tab>

    <v-tab href="#tab-1">
      Login
      <v-icon>account_circle</v-icon>
    </v-tab>

    <v-tab href="#tab-2">
      Sign up
      <v-icon>assignment</v-icon>
    </v-tab>

    <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
      <v-card p-5 flat v-if="i === 1">
        <LoginForm @closeDialog="closeDialog" />
      </v-card>

      <v-card flat v-if="i === 2">
        <RegisterForm @closeDialog="closeDialog" />
      </v-card>

      <v-card flat v-if="i === 3">
        <Facebook />
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Facebook from "./Facebook";
export default {
  components: {
    LoginForm,
    RegisterForm,
    Facebook
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
};
</script>
